'use strict';

var validator   = require('../../../lib/validator'),
    sanitizer   = require('../../../lib/sanitizer'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),

    user_model  = require('../../../models/users'),

    student_get_schema = require('../../../schemas/users/students/studentsGet'),
    student_all_get_schema = require('../../../schemas/users/students/studentsAllGet');

module.exports = function (router) {
    router.route('/').get(function(req, res, next) {
        var error;
        validator.validate(req.query, student_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        // need to do something about tas..
        if (req.sessionUserType !== 'admin' &&
            req.sessionUserId !== req.query.user_id) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }
        if (!mongoose.validID(req.query.user_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }
        user_model.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.query.user_id)
                }
            },{
                $project: {
                    user_id: "$_id",
                    _id: 0,
                    student_number: 1,
                    first_name: 1,
                    last_name: 1,
                    utorid: 1,
                    email: 1,
                    last_login: 1
                }
            }
        ]).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                    code: "NOT_FOUND",
                    params: [ 'user_id' ]
                });
            }
            return res.sendResponse(ret);
        }).catch(function(err) {
            return res.requestError({ message: "Server Error" });
        });

    }).put(function (req, res, next) {
        var error;
        if (req.sessionUserType !== 'admin') {
            return res.forbidden();
        }
        validator.validate(req.query, {
            type: 'object',
            properties: {
                email: {
                    type: "string",
                    maxLength: 1000
                },
                first_name: {
                    type: "string",
                    maxLength: 100
                },
                last_name: {
                    type: "string",
                    maxLength: 100
                },
                utorid: {
                    type: "string",
                    maxLength: 100
                },
                student_number: {
                    type: "number",
                    maxLength: 100
                }
            },
            additionalProperties: false,
            required: [ "email", "first_name", "first_name", "last_name", "utorid", "student_number" ]
        });
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        user_model.create({
            first_name:     req.query.first_name,
            last_name:      req.query.last_name,
            email:          req.query.email,
            status:         'Active',
            student_number: req.query.student_number,
            user_type:      'student'
        });

    }).post(function (req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        validator.validate(req.query, query_shcema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ status: 400, message: error });

        user_model.getAsync({email:req.session.user}).then(function (user) {
            if (user.user_type === "instructor" || user.id === req.query.user_id) {
                //TODO KEVIN HELP TO　ＦＩＬＬ　ＩＮ　ＴＨＥ CODE FOR POST
            }
            return Promise.reject("Invalid user type, premission denied.");
        }).then(function (data) { return res.sendResponse(data);
        }).catch(function (err) { return res.requestError({ message: "Server Error" });
        });

    }).delete(function (req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        validator.validate(req.query, query_shcema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ status: 400, message: error });

        user_model.getAsync({email:req.session.user}).then(function (user) {
            if (user.user_type === "instructor") //TODO KEVIN HELP TO　ＦＩＬＬ　ＩＮ　ＴＨＥ CODE FOR DELETE
            return Promise.reject("Invalid user type, premission denied.");
        }).then(function (data) { return res.sendResponse(data);
        }).catch(function (err) { return res.requestError({ message: "Server Error" });
        });

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });

    router.route('/all').get(function(req, res, next) {
        var error,
            query;
        if (req.sessionUserType !== 'admin' &&
            req.sessionUserType !== 'ta') {
            return res.forbidden();
        }
        if (req.query.student_number) {
            req.query.student_number = sanitizer.sanitize(req.query.student_number,
                'stringToInteger');
        }
        validator.validate(req.query, student_all_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        if (req.query.user_id && !mongoose.validID(req.query.user_id)) {
            return res.sendResponse([]);
        }
        query = {
            _id:        mongoose.Types.ObjectId(req.query.user_id),
            email:      req.query.email,
            first_name: req.query.first_name,
            last_name:  req.query.last_name,
            utorid:     req.query.utorid,
            status:     req.query.status,
            user_type:  'student',
            student_number: req.query.last_name,
        }
        utils.clean(query);
        return user_model.aggregate([
            { $match: query },
            { $project : {
                user_id: "$_id",
                _id: 0,
                email: 1,
                first_name: 1,
                utorid: 1,
                status: 1,
                student_number: 1
            }
        }
        ]).exec().then(function(ret) {
            return res.sendResponse(ret);
        });
    }).all(function(req, res, next) {
        return res.invalidVerb();
    });
};