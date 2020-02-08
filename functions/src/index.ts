const functions = require('firebase-functions');
const admin = require('firebase-admin');
const rp = require('request-promise');
const serviceAccount = require("../key/festival-allstedt-firebase-adminsdk-k9w4f-32e9d571b2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://festival-allstedt.firebaseio.com"
});

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
    if (!req.body.token) {
        throw new functions.https.HttpsError('invalid-argument');
    }
    if (!req.body.email) {
        throw new functions.https.HttpsError('invalid-argument');
    }
    if (!req.body.message) {
        throw new functions.https.HttpsError('invalid-argument');
    }
    if (!req.body.subject) {
        throw new functions.https.HttpsError('invalid-argument');
    }

    const token = req.body.token;
    const email = req.body.email;
    const message = req.body.message.replace(/<script|<\/script/gi, "");
    const subject = req.body.subject.replace(/<script|<\/script/gi, "");

    console.log("recaptcha response token", token);
    rp({
        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
        method: 'POST',
        formData: {
            secret: '6LcuY9QUAAAAAOSQs5OhmuXWuvqoIUargzqfUbU8',
            response: token
        },
        json: true
    }).then(result => {
        console.log("recaptcha result", result);
        if (result.success && result.score >= 0.6) {
            admin.firestore().collection('mail').add({
                to: [email],
                message: {
                    html: message,
                    subject: subject
                }
            });
            res.json({result: 'success'});
        }
        else {
            res.json({result: 'failed'});
        }
    }).catch(reason => {
        console.log("Recaptcha request failure", reason);
        res.json({result: 'error'});
    })
});