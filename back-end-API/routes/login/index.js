'use strict';

var validator   = require('../../lib/validator'),
    utils       = require('../../lib/utils'),
    Promise     = require('bluebird'),
    request     = require('request')


module.exports = function (router) {

    router.route('/').post(function(req, res, next) {
        // if post.body contains email and password
        if (req.body.email && req.body.password) {
            // get auth0 access_token by email and password
            var options = { 
                method: 'POST',
                url: 'https://code-reviewer.auth0.com/oauth/token',
                headers: { 'content-type': 'application/json' },
                body: { 
                    grant_type: 'password',
                    username: req.body.email,
                    password: req.body.password,
                    scope: 'email',
                    audience: "https://code-reviewer.auth0.com/userinfo",
                    client_id: 'GlFGQP9HVzIjec0DnqyytQNl2Fh1V5uA',
                    client_secret: 'uBf8hhwWGAmoN2qfdUVQPL7EGJ8CYkRa_73TC1JPO6Ophiemb9lK3VySysaatIey' 
                },
                json: true
            };

            // get token, expire_at and send it back to the user
            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                return res.status(200).json(body)
            });
        }
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};