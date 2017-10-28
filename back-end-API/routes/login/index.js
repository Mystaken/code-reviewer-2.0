'use strict';

var validator   = require('../../lib/validator'),
    utils       = require('../../lib/utils'),
    Promise     = require('bluebird'),
    request     = require('request')


module.exports = function (router) {

    router.route('/').post(function(req, res, next) {
        // if post.body contains email and password
        if (req.body && req.body.email && req.body.password) {
            // get auth0 access_token by email and password
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
                return res.sendResponse(body)
            });
        }
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};