'use strict';

var request     = require('request-promise'),
    user_model  = require('../models/users');

module.exports = function(req, res, next) {
    // find access_token
    var access_token;
    if (req.headers.access_token)
        access_token = req.headers.access_token;
    else
        access_token = req.body.access_token;
    // if access_token is found
    if (access_token) {
        // send a get request to auth0 to retrive uesr email
        var options = {
            uri: 'https://code-reviewer.auth0.com/userinfo',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true // Automatically parses the JSON string in the response
        };
        return request(options)
            .then(function (result) {
                // get this user's user_id and user_type by his email
                return user_model.findOne({email: result.email}, "_id user_type", function(err, result) {
                    if (err) res.forbidden();
                    // set this user's user_id and user_type
                    req.session_user_id = result._id.toString();
                    req.session_user_type = result.user_type;
                    // console.log("authentication result", req.session_user_id, req.session_user_type)
                    next();
                });
                
            })
            .catch(function (err) {
                return res.forbidden();
            });
    } else {
        return res.forbidden();
    }
}