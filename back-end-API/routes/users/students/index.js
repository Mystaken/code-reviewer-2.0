'use strict';

var validator   = require('../../../lib/validator'),
    sanitizer   = require('../../../lib/sanitizer'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    user_model  = require('../../../models/users'),

    student_get_schema      = require('../../../schemas/users/students/students_get'),
    student_put_schema      = require('../../../schemas/users/students/students_put'),
    student_delete_schema   = require('../../../schemas/users/students/students_delete'),
    student_post_schema     = require('../../../schemas/users/students/students_post'),
    student_all_get_schema  = require('../../../schemas/users/students/students_all_get');

module.exports = function (router) {
    router.route('/').get(function(req, res, next) {
        var error;
        validator.validate(req.query, student_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        // need to do something about tas..
        if (req.session_user_type !== 'admin' &&
            req.session_user_id !== req.query.user_id) {
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

        return user_model.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.query.user_id),
                    status: 'active'
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
                    last_login: { 
                        $dateToString: { 
                            format: "%Y-%m-%d %H:%M:%S", 
                            date: "$last_login" 
                        }
                    }
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
            return res.requestError(err);
        });

    }).put(function (req, res, next) {
        var error;
        if (req.session_user_type !== 'admin') {
            return res.forbidden();
        }
        validator.validate(req.body, student_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        // checking if user exists
        return user_model.aggregate([
                {
                    $match: {
                        $or: [
                            { utorid: req.body.utorid },
                            { student_number: req.body.student_number },
                            { email: req.body.email }
                        ]
                    }   
                }
            ]).exec().then(function(ret) {
                // if user exists, return error message.
                if (ret.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'user_id' ]
                    });
                }
                // create new user
                return new user_model({
                    first_name:     req.body.first_name,
                    last_name:      req.body.last_name,
                    email:          req.body.email,
                    utorid:         req.body.utorid,
                    student_number: req.body.student_number,
                    last_login:     new Date(),
                    user_type:      'student',
                    status:         'active'
                }).save();
            }).then(function(ret) {
                res.sendResponse(ret._id);
            }).catch(function(err) {
                return res.requestError(err);
            });

    }).post(function (req, res, next) {
        var error,
            query,
            update_query;

        if (req.session_user_type !== 'admin' &&
            req.session_user_id !== req.query.user_id) {
            return res.requestError({
                code: 'NOT_FOUND',
                params: [ 'user_id' ]
            });
        }

        validator.validate(req.body, student_post_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: 'VALIDATION', message: error });
        }

        if (!mongoose.validID(req.body.user_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }

        query = {
            _id: mongoose.Types.ObjectId(req.body.user_id),
            user_type: 'student',
            status: 'active'
        };
        update_query = utils.clean({
            first_name: req.body.first_name,
            last_name:  req.body.last_name,
            status: 'active'
        });
        return user_model.find(query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'user_id' ]
                    });
            }
            return user_model.findOneAndUpdate(query, update_query)
                .exec()
        }).then(function(ret) {
            res.sendResponse(ret._id);
        }).catch(function (err) {
            res.requestError(err);
        });

    }).delete(function (req, res, next) {
        var error,
            query;
        if (req.session_user_type !== 'admin') {
            return res.requestError({
                code: 'NOT_FOUND',
                params: [ 'user_id' ]
            });
        }
        validator.validate(req.body, student_delete_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            _id: mongoose.Types.ObjectId(req.body.user_id),
            user_type: 'student'
        }
        return user_model.find(query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'user_id' ]
                    });
            }
            return user_model.findOneAndUpdate(query, {
                    status: 'inactive'
                }).exec();
        }).then(function(ret) {
            res.sendResponse(ret._id);
        }).catch(function (err) {
            res.requestError(err);
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });

    router.route('/all').get(function(req, res, next) {
        var error,
            query;
        if (req.session_user_type !== 'admin' &&
            req.session_user_type !== 'ta') {
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
        query = {
            email:      req.query.email,
            first_name: req.query.first_name,
            last_name:  req.query.last_name,
            utorid:     req.query.utorid,
            status:     req.query.status,
            user_type:  'student',
            student_number: req.query.last_name
        };
        if (req.query.user_id) {
            if (!mongoose.validID(req.query.user_id)) {
                return res.sendResponse([]);
            }
            query._id = mongoose.Types.ObjectId(req.query.user_id);
        }
        utils.clean(query);
        // handle lastlogin!!
        return user_model.aggregate([
            { $match: query },
            { $project : {
                user_id: "$_id",
                _id: 0,
                email: 1,
                first_name: 1,
                utorid: 1,
                status: 1,
                student_number: 1,
                last_login: { 
                    $dateToString: { 
                        format: "%Y-%m-%d %H:%M:%S", 
                        date: "$last_login" 
                    }
                }
            }
        }
        ]).exec().then(function(ret) {
            return res.sendResponse(ret);
        }).catch(function(err) {
            res.requestError(err);
        });
    }).all(function(req, res, next) {
        return res.invalidVerb();
    });
};
