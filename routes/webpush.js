'use strict';
var router = require('express').Router();
const webpush = require('web-push')
const urlsafeBase64 = require('urlsafe-base64');
const vapidKeys = webpush.generateVAPIDKeys();
const {publicKey,privateKey} = vapidKeys;
var decodedVapidPublickKey = urlsafeBase64.decode(publicKey);
decodedVapidPublickKey = JSON.stringify(decodedVapidPublickKey.toJSON().data)

router.get('/', function(req, res, next) {
  res.render('webpush',{publicKey,privateKey, decodedVapidPublickKey})
});

router.post('/push', function(req,res,next){
    const subscription = JSON.parse(req.body['subscription']);
    const message = req.body['message'];
    const options = {
        TTL: 24*60*60,
        vapidDetails: {
            subject: 'mailto:liguoming@beisen.com',
            publicKey,
            privateKey
        }
    };
    console.log(subscription, message, options)
    webpush.sendNotification(subscription, message, options)
    res.json({subscription, message});

})

// 新增 Todo 项目

module.exports = router;
