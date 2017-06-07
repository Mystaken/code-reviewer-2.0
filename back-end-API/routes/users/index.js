'use strict';

var validator   = require('../../lib/validator'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),
    user_model  = require('../../models/users'),

    user_get_schema = require('../../schemas/users/users_get');

module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        var error,
            user_id;

        if (req.session_user_type !== 'admin') {
            return res.forbidden();
        }
        validator.validate(req.query, user_get_schema);
        error = validator.getLastErrors();
        if (error) return res.requestError({ code: "VALIDATION", message: error });

        if (!mongoose.validID(req.query.user_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }
        return user_model.aggregate([
            { 
                $match: {
                    _id: mongoose.Types.ObjectId(req.query.user_id)
                } 
            },
            { 
                $project : {
                    user_id: "$_id",
                    _id: 0,
                    email: 1,
                    first_name: 1,
                    last_name: 1,
                    user_type: 1,
                    utorid: 1
                }
            }
        ]).exec().then(function(users) {
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