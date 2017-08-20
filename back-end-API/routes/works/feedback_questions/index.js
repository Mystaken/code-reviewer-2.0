'use strict';

var validator   = require('../../../lib/validator'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    feedback_questions_model   = require('../../../models/feedback_questions');


module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        // console.log("comming soon.")
        // var error;

        // validator.validate(req.query, works_get_schema);
        // error = validator.getLastErrors();
        // if (error) {
        //     return res.requestError({ code: "VALIDATION", message: error });
        // }
        // if (!mongoose.validID(req.query.feedback_question_id)) {
        //     return res.requestError({
        //         code: "NOT_FOUND",
        //         params: [ 'feedback_question_id' ]
        //     });
        // }
        return feedback_questions_model.aggregate([
            { 
                $match: {
                    _id: mongoose.Types.ObjectId(req.query.feedback_question_id),
                    status: 'active'
                } 
            },
            { 
                $project : {
                    feedback_question_id: "$_id",
                    _id: 0,
                    feedback_question: 1
                }
            }
        ]).exec().then(function(feedback_question) {
            if (!feedback_question || !feedback_question.length) {
                return Promise.reject({
                    code: "NOT_FOUND",
                    params: [ 'feedback_question_id' ]
                });
            }
            return res.sendResponse(feedback_question[0]);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).put(function(req, res, next) {
        // var error

        // validator.validate(req.body, feedback_questions_put_schema);
        // error = validator.getLastErrors();
        // if (error) {
        //     return res.requestError({ code: "VALIDATION", message: error });
        // }

        return feedback_questions_model.aggregate([
            {  
                $match: { feedback_question : req.body.feedback_question } 
            }
            ]).exec().then(function (feedback_question) {
                if (feedback_question.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'feedback_question' ]
                    });
                }
                return new feedback_questions_model({
                    feedback_question : req.body.feedback_question,
                    status: 'active'
                }).save();
            }).then(function(ret) {
                return res.sendResponse(ret);
            }).catch(function (error) {
                return res.requestError(error);
            });
    }).post(function(req, res, next) {
        console.log("comming soon.")
    }).delete(function(req, res, next) {
        return feedback_questions_model.aggregate([
            {  
                $match: { feedback_question : req.body.feedback_question } 
            }
            ]).exec().then(function (feedback) {
                if (feedback_question.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'feedback_question' ]
                    });
                }
                return new feedback_questions_model({
                    feedback_question : req.body.feedback_question,
                    status: 'active'
                }).remove();
            }).then(function(ret) {
                return res.sendResponse(ret._id);
            }).catch(function (error) {
                return res.requestError(error);
            });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });


    router.route('/all').get(function(req, res, next) {
        // var error;

        // validator.validate(req.query, feedback_all_get_schema);
        // error = validator.getLastErrors();
        // if (error) {
        //     return res.requestError({ code: "VALIDATION", message: error });
        // }
        return feedback_questions_model.aggregate([
            {
                $project: {
                    feedback_question_id: "$_id",
                    _id: 0,
                    feedback_question: 1
                }
            }
        ]).exec().then(function (feedback_questions) {
            return res.sendResponse(feedback_questions);
        }).catch(function (error) {
            res.requestError(error);
        });
    });
};




