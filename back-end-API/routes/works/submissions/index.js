'use strict';

var validator = require('../../../lib/validator'),
    utils     = require('../../../lib/utils'),
    reader    = require('../../../lib/reader'),
    mongoose  = require('mongoose'),
    Promise   = require('bluebird'),

    submissions_model = require('../../../models/submissions'),
    work_model        = require('../../../models/works'),

    submissions_files_get_schema    = require('../../../schemas/works/submissions/submissions_files_get'),
    submissions_files_delete_schema = require('../../../schemas/works/submissions/submissions_files_delete'),
    submissions_files_put_schema    = require('../../../schemas/works/submissions/submissions_files_put'),
    submissions_files_upload_schema = require('../../../schemas/works/submissions/submissions_files_upload');



module.exports = function (router) {
    router.route('/').get(function(req, res, next) {
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });

    router.route('/files').get(function(req, res, next) {
        var error;

        if (!mongoose.validID(req.query.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }
        validator.validate(req.query, submissions_files_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return submissions_model.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(req.query.submission_id),
                        status: 'active'
                    }
                },{
                    $project: {
                        submission_id: "$_id",
                        work_id: 1,
                        author_id: 1,
                        code: 1
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length || (ret.author_id !== req.session_user_id &&
                    req.session_user_type !== 'admin')) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return res.sendResponse(ret);
            }).catch(function(err) {
                return res.requestError(err);
            });
    }).delete(function (req, res, next) {
        var error,
            query;

        if (!mongoose.validID(req.body.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }
        validator.validate(req.body, submissions_files_delete_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        query = {
            _id: mongoose.Types.ObjectId(req.body.submission_id),
            status: 'active'
        };
        return submissions_model.aggregate([
                {
                    $match: query
                },{
                    $project: {
                        submission_id: "$_id",
                        work_id: 1,
                        author_id: 1,
                        code: 1
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length || (ret.author_id !== req.session_user_id &&
                    req.session_user_type !== 'admin')) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return submissions_model.findOneAndUpdate(query, {
                        status: 'inactive',
                        delete_date: new Date()
                    }).exec();
            }).then(function(ret) {
                res.sendResponse(ret._id);
            }).catch(function(err) {
                return res.requestError(err);
            });
    }).put(function(req, res, next) {
        var error;
        if (!mongoose.validID(req.body.work_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }

        validator.validate(req.body, submissions_files_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return work_model.aggregate([
            {
                $match: {
                    status: 'active',
                    _id: mongoose.Types.ObjectId(req.body.work_id)
                }   
            }
        ]).exec().then(function(ret) {
            if (!ret || !ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'work_id' ]
                    });
            }
            return new submissions_model({
                author_id: req.session_user_id,
                name: req.body.name,
                work_id: req.body.work_id,
                create_date: new Date(),
                code: req.body.content,
                status: 'active'
            }).save();
        }).then(function() {
            return res.sendResponse(ret._id);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).post(function(req, res, next) {
        var error,
            file = req.files.submission;
        // validations
        if (!mongoose.validID(req.body.work_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'work_id' ]
            });
        }
        error = validator.validFile({
            file: file,
            name: 'submissions'
        });
        if (error) {
            return res.requestError({ code: 'VALIDATION', message: error });
        }
        validator.validate(req.body, submissions_files_upload_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return work_model.aggregate([
            {
                $match: {
                    status: 'active',
                    _id: mongoose.Types.ObjectId(req.body.work_id)
                }   
            }
        ]).exec().then(function(ret) {
            if (!ret || !ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'work_id' ]
                    });
            }
            return reader.readFileAsync(file.path);
        }).then(function(ret) {
            return new submissions_model({
                author_id: req.session_user_id,
                name: req.body.name,
                work_id: req.body.work_id,
                create_date: new Date(),
                code: ret,
                status: 'active'
            }).save();
        }).then(function(ret) {
            return utils.promiseRemoveFile(file.path).then(function() {
                return res.sendResponse(ret._id);
            });
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};