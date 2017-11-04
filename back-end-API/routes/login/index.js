'use strict';

var validator   = require('../../lib/validator'),
    utils       = require('../../lib/utils'),
    Promise     = require('bluebird'),
    request     = require('request'),
    jwt         = require('jsonwebtoken'),
    user_model  = require('../../models/users');


module.exports = function (router) {

    router.route('/').post(function(req, res, next) {
        // if post.body contains email and password
        if (req.body && req.body.email && req.body.password) {
            // get auth0 access_token by email and password from auth0/userinfo
            var options = {
                method: 'POST',
                url: 'https://' + process.env.DOMAIN + '/oauth/token',
                headers: { 'content-type': 'application/json' },
                body: { 
                    grant_type: 'password',
                    username: req.body.email,
                    password: req.body.password,
                    scope: 'email',
                    audience: 'https://' + process.env.DOMAIN + '/userinfo',
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET 
                },
                json: true
            };
            // get token, expire_at and send it back to the user
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                // get this user's user_id and user_type by email
                user_model.findOne({email: req.body.email}, "_id user_type", function(err, user) {
                    if (err) return res.forbidden();
                    // if there's no user with this email in mongoDB
                    if (user === null) return res.forbidden();
                    
                    // set this user's user_id and user_type
                    var custom_access_token = jwt.sign({
                        user_id: user._id.toString(),
                        user_type: user.user_type
                    }, process.env.CLIENT_SECRET, { expiresIn: '24h'});

                    return res.sendResponse({
                        access_token: custom_access_token
                    });
                });
            });
        }
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};