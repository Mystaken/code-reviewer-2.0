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
            uri: 'https://' + process.env.DOMAIN + '/userinfo',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true // Automatically parses the JSON string in the response
        };
        return request(options)
            .then(function (result) {
                // if this user has a valid access_token
                if (result !== null) {
                    // get this user's user_id and user_type by his email
                    return user_model.findOne({email: result.email}, "_id user_type", function(err, user) {
                        if (err) return res.forbidden();
                        if (user === null) return res.forbidden();
                        // set this user's user_id and user_type
                        req.session_user_id = user._id.toString();
                        req.session_user_type = user.user_type;
                        next();
                    });
                // if this user does not have a valid access_token, i.e. can't get his email
                } else {
                    res.forbidden();
                }
            })
            .catch(function (err) {
                return res.forbidden();
            });
    } else {
        return res.forbidden();
    }
}