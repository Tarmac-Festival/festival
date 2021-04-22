const functions = require('firebase-functions');
const admin = require('firebase-admin');
const rp = require('request-promise');
const serviceAccount = require("../key/festival-allstedt-firebase-adminsdk-k9w4f-32e9d571b2.json");
const userMailSubject = "Tarmac Festival: Danke für deine Nachricht";
const userMailMessage = "<p>Hallo {{name}},</p><p>vielen Dank für deine Nachricht.<br>Wir melden uns so schnell wie möglich bei dir.</p><p>Beste Grüße,<br>Dein Tarmac Team</p>";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://festival-allstedt.firebaseio.com"
});

exports.checkRecaptcha = functions.https.onRequest((req :any, res:any) => {
    if (!req.body.token) {
        throw new functions.https.HttpsError('invalid-argument');
    }
    if (!req.body.email) {
        throw new functions.https.HttpsError('invalid-argument');
    }
    if (!req.body.userMail) {
        throw new functions.https.HttpsError('invalid-argument');
    }
    if (!req.body.userName) {
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
    const userMail = req.body.userMail;
    const userName = req.body.userName;
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
    }).then(async (result : any )=> {
        console.log("recaptcha result", result);
        if (result.success && result.score >= 0.6) {
            let mailCollection = admin.firestore().collection('mail');
            await mailCollection.add({
                to: [email],
                message: {
                    html: message,
                    subject: subject
                }
            }).catch((error : any) => {
                console.error("Could not save mail", error);
            });
            await mailCollection.add({
                to: [userMail],
                message: {
                    html: userMailMessage.replace("{{name}}", userName),
                    subject: userMailSubject
                }
            }).catch((error : any) => {
                console.error("Could not save user mail", error);
            });
            res.json({result: 'success'});
        }
        else {
            res.json({result: 'failed'});
        }
    }).catch((reason : any) => {
        console.log("Recaptcha request failure", reason);
        res.json({result: 'error'});
    })
});