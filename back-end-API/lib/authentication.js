'use strict';

var request     = require('request-promise'),
    user_model  = require('../models/users');

module.exports = function(req, res, next) {
    // headers and access_token found
    if (req.headers && req.headers.access_token) {
        // send a get request to auth0 to retrive uesr email
        var options = {
            uri: 'https://code-reviewer.auth0.com/userinfo',
            headers: {
                'Authorization': 'Bearer ' + req.headers.access_token
            },
            json: true // Automatically parses the JSON string in the response
        };
        
        request(options)
            .then(function (result) {
                // get this user's user_id and user_type by his email
                user_model.findOne({email: result.email}, "_id user_type", function(err, result) {
                    if (err) console.log(err);
                    // set this user's user_id and user_type
                    req.session_user_id = JSON.stringify(result._id);
                    req.session_user_type = result.user_type;
                })
            })
            .catch(function (err) {
                console.log("failed to get the user's email from auth0");
            });
        next();
    } else {
        return res.forbidden();
    }
}