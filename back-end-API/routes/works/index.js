'use strict';

var validator   = require('../../lib/validator'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),
    submission_rules_model  = require('../../models/submission_rules'),

    works_get_schema = require('../../schemas/works/works_get'),
    works_put_schema = require('../../schemas/works/works_put')


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
                            date: "$student_submission_deadline" 
                        }
                    },
                    ta_review_deadline: { 
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$student_submission_deadline" 
                        }
                    }
                }
            }
        ]).exec().then(function(work) {
            console.log(1);
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
            student_submission_deadline: req.body.student_submission_deadline || mongoose.getDefaultDate(),
            peer_review_deadline: req.body.peer_review_deadline || mongoose.getDefaultDate(),
            ta_review_deadline: req.body.ta_review_deadline || mongoose.getDefaultDate(),
            status: 'active'
        };
        return res.sendResponse(1);
        //check if work exists
        return submission_rules_model.aggregate([
                {
                    $match: {
                        name: req.body.name
                    }   
                }
            ]).exec().then(function(ret) {
                // if user exists, return error message.
                if (ret.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'work_id' ]
                    });
                }
                // create new work
                return new submission_rules_model(query).save();
            }).then(function(ret) {
                res.sendResponse(ret._id);
            }).catch(function(err) {
                return res.requestError(err);
            });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
}