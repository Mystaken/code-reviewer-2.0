'use strict';

var validator   = require('../../lib/validator'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),
    user_model  = mongoose.getModel('user');

module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        var error,
            user_id;

        if (req.sessionUserType !== 'Admin') {
            return res.forbidden();
        }
        validator.validate(req.query, {
            type: "object",
            properties: {
                user_id: {
                    type: "string"
                }
            },
            additionalProperties: false,
            required: [ "user_id" ]
        });
        error = validator.getLastErrors();
        if (error) return res.requestError({ code: "VALIDATION", message: error });

        if (!mongoose.validID(req.query.user_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }
        return user_model.findAsync({
            _id: req.query.user_id
        }).then(function(users) {
            if (!users || !users.length) {
                return Promise.reject({
                    code: "NOT_FOUND",
                    params: [ 'user_id' ]
                });
            }
            return res.sendResponse(users);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};