'use strict';

var validator = require('../../lib/validator'),
    mongoose = require('mongoose');

module.exports = function (router) {
    /*
     * JUST FOR DEMO. PLEASE DO NOT COPY AND PASTE CODE WITH THE COMMENTS.
     * THE COMMENTS ARE JUST TO SHOW HOW IT WORKS.
     */
    router.route('/').get(function(req, res, next) {
        var error;
        //make sure utorid is in the query and no other parameters
        validator.validate(req.query, {
            type: "object",
            properties: {
                utorid: {  type: "string" }
            },
            additionalProperties: false,
            required: ["utorid"]
        });
        // Check if there's errors.
        error = validator.getLastErrors();
        // if there's an error, return error response.
        if (error) return res.requestError({ status: 400, message: error });

        // mongoose.getModel returns promise with the user_model promise
        return mongoose.getModel('user').then(function(user_model) {
            // user_model promise is the same as regular user_model but
            // adding Async at the end of every function returns a promise.
            // eg. user_model.find() = same old callback
            // user_model.findAsync() = same functionality as ^ but returns a promise.
            return user_model.findAsync(req.query);
        }).then(function(users) {
            return res.sendResponse(users);
        }).catch(function(err) {
            return res.requestError({
                message: "Server Error"
            });
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};