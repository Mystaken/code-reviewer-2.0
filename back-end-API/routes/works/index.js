'use strict';

var validator   = require('../../lib/validator'),
    utils       = require('../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    works_model  = require('../../models/works'),

    works_get_schema    = require('../../schemas/works/works_get'),
    works_put_schema    = require('../../schemas/works/works_put'),
    works_post_schema   = require('../../schemas/works/works_post'),
    works_delete_schema = require('../../schemas/works/works_delete'),
    works_all_get_schema = require('../../schemas/works/works_all_get');


module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        var error;

        validator.validate(req.query, works_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        if (!mongoose.validID(req.query.work_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'work_id' ]
            });
        }
        return works_model.aggregate([
            { 
                $match: {
                    _id: mongoose.Types.ObjectId(req.query.work_id),
                    status: 'active'
                } 
            },
            { 
                $project : {
                    work_id: "$_id",
                    _id: 0,
                    name: 1,
                    num_peers: 1,
                    required_files: 1,
                    repo_path: 1,
                    folder_name: 1,
                    feedback_questions: 1
                }
            }
        ]).exec().then(function(work) {
            if (!work || !work.length) {
                return Promise.reject({
                    code: "NOT_FOUND",
                    params: [ 'work_id' ]
                });
            }
            return res.sendResponse(work[0]);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).put(function(req, res, next) {
        var error,
            query;
        if (req.session_user_type !== 'admin') {
            return res.forbidden();
        }
        validator.validate(req.body, works_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            name: req.body.name,
            num_peers: req.body.num_peers,
            required_files: req.body.required_files || [],
            feedback_questions: req.body.feedback_questions || [],
            repo_path: req.body.repo_path || "",
            folder_name: req.body.folder_name || "",
            peer_review: false,
            self_review: false,
            mark_review: false,
            status: 'active'
        };

        for (var i = 0; i < query.feedback_questions.length; i ++) {
            if (!mongoose.validID(query.feedback_questions[i])) {
                return res.requestError({
                    code: "NOT_FOUND",
                    params: [ 'query.feedback_questions[i]' ]
                });
            }
            query.feedback_questions[i] = mongoose.Types.ObjectId(query.feedback_questions[i]);
        } 
        //check if work exists
        return works_model.aggregate([
                {
                    $match: {
                        name: req.body.name
                    }   
                }
            ]).exec().then(function(ret) {
                if (ret.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'name' ]
                    });
                }
                return new works_model(query).save();
            }).then(function(ret) {
                res.sendResponse(ret._id);
            }).catch(function(err) {
                return res.requestError(err);
            });
    }).post(function(req, res, next) {
        var error,
            find_query,
            update_query;

        if (req.session_user_type !== 'admin') {
            return res.forbidden();
        }
        validator.validate(req.body, works_post_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        find_query = {
            _id: mongoose.Types.ObjectId(req.body.work_id),
            status: 'active'
        };
        update_query = {
            name: req.body.name,
            num_peers: req.body.num_peers,
            required_files: req.body.required_files,
            feedback_questions: req.body.feedback_questions,
            repo_path: req.body.repo_path,
            folder_name: req.body.folder_name,
            peer_review: req.body.peer_review,
            self_review: req.body.self_review,
            mark_review: req.body.mark_review,
            status: 'active'
        };

        utils.clean(update_query);
        return works_model.find(find_query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'work_id' ]
                    });
            }
            return works_model.findOneAndUpdate(find_query, update_query).exec();
        }).then(function(ret) {
            res.sendResponse(ret._id);
        }).catch(function (err) {
            res.requestError(err);
        });
    }).delete(function (req, res, next) {
        var error,
            query;
        if (req.session_user_type !== 'admin') {
            return res.forbidden();
        }

        validator.validate(req.body, works_delete_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            _id: mongoose.Types.ObjectId(req.body.work_id)
        };
        return works_model.find(query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'work_id' ]
                    });
            }
            return works_model.findOneAndUpdate(query, {
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
        var error;
        validator.validate(req.query, works_all_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return works_model.aggregate([
            { 
                $project : {
                    work_id: "$_id",
                    _id: 0,
                    num_peers: 1,
                    name: 1,
                    required_files: 1,
                    repo_path: 1,
                    folder_name: 1,
                    feedback_questions: 1,
                    peer_review: 1,
                    self_review: 1,
                    mark_review: 1,
                    status: 1
                }
            }
        ]).exec().then(function(works) {
            return res.sendResponse(works);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};