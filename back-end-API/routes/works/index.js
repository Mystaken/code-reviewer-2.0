'use strict';

var validator   = require('../../lib/validator'),
    utils       = require('../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    submission_rules_model  = require('../../models/submission_rules'),

    works_get_schema    = require('../../schemas/works/works_get'),
    works_put_schema    = require('../../schemas/works/works_put'),
    works_post_schema   = require('../../schemas/works/works_post'),
    works_all_get_schema   = require('../../schemas/works/works_all_get');


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
        return submission_rules_model.aggregate([
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
                    feedback_questions: 1,
                    student_submission_deadline: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$student_submission_deadline" 
                        }
                    },
                    peer_review_deadline: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$peer_review_deadline" 
                        }
                    },
                    ta_review_deadline: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$ta_review_deadline" 
                        }
                    }
                }
            }
        ]).exec().then(function(work) {
            if (!work || !work.length) {
                return Promise.reject({
                    code: "NOT_FOUND",
                    params: [ 'work_id' ]
                });
            }
            return res.sendResponse(work);
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
            student_submission_deadline: mongoose.getDefaultDate(req.body.student_submission_deadline),
            peer_review_deadline: mongoose.getDefaultDate(req.body.peer_review_deadline),
            ta_review_deadline: mongoose.getDefaultDate(req.body.ta_review_deadline),
            status: 'active'
        };
        //check if work exists
        return submission_rules_model.aggregate([
                {
                    $match: {
                        name: req.body.name
                    }   
                }
            ]).exec().then(function(ret) {
                if (ret.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'work_id' ]
                    });
                }
                return new submission_rules_model(query).save();
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
            status: 'active'
        };
        if (req.body.student_submission_deadline) {
            update_query.student_submission_deadline = mongoose.getDefaultDate(req.body.student_submission_deadline);
        }
        if (req.body.peer_review_deadline) {
            update_query.peer_review_deadline = mongoose.getDefaultDate(req.body.peer_review_deadline);
        }
        if (req.body.ta_review_deadline) {
            update_query.ta_review_deadline = mongoose.getDefaultDate(req.body.ta_review_deadline);
        }
        utils.clean(update_query);
        return submission_rules_model.find(find_query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'work_id' ]
                    });
            }
            return submission_rules_model.findOneAndUpdate(find_query, update_query).exec();
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
        return submission_rules_model.aggregate([
            { 
                $project : {
                    work_id: "$_id",
                    _id: 0,
                    num_peers: 1,
                    required_files: 1,
                    feedback_questions: 1,
                    student_submission_deadline: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$student_submission_deadline" 
                        }
                    },
                    peer_review_deadline: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$peer_review_deadline" 
                        }
                    },
                    ta_review_deadline: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$ta_review_deadline" 
                        }
                    }
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
}