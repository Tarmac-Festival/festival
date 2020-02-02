const functions = require('firebase-functions');
const admin = require('firebase-admin');
const rp = require('request-promise');

admin.initializeApp();

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
    const token = req.body.token;
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
                to: [req.body.email],
                message: {
                    html: req.body.message,
                    subject: req.body.subject
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