'use strict';

var validator = require('../../lib/validator'),
    mongoose = require('mongoose');

module.exports = function (router) {
    router.route('/').get(function(req, res, next) {
        var user_model,
            error;

        validator.validate(req.query, {
            type: "object",
            properties: {
                utorid: {  type: "string" }
            },
            additionalProperties: false,
            required: ["utorid"]
        });
        error = validator.getLastErrors();
        if (error) return res.requestError({ status: 400, message: error });

        return mongoose.getModel('user').then(function(user_model) {
            return user_model.findAsync(req.query);
        }).then(function(ret) {
            return res.sendResponse(ret);
        }).catch(function(err) {
            return res.requestError({
                message: "Server Error"
            });
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};