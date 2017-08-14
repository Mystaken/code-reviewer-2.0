'use strict';

var validator   = require('../../../lib/validator'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    feedbacks_model   = require('../../../models/feedback_questions');


module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        console.log("comming soon.")
    }).put(function(req, res, next) {
        // var error

        // validator.validate(req.body, feedback_questions_put_schema);
        // error = validator.getLastErrors();
        // if (error) {
        //     return res.requestError({ code: "VALIDATION", message: error });
        // }

        return feedback_questions_model.aggregate([
            {  
                $match: { feedback : req.body.feedback } 
            }
            ]).exec().then(function (feedback) {
                if (feedback.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'feedback' ]
                    });
                }
                return new feedback_questions_model({
                    feedback : req.body.feedback,
                    status: 'active'
                }).save();
            }).then(function(ret) {
                return res.sendResponse(ret._id);
            }).catch(function (error) {
                return res.requestError(error);
            });
    }).post(function(req, res, next) {
        console.log("comming soon.")
    }).delete(function(req, res, next) {
        return feedback_questions_model.aggregate([
            {  
                $match: { feedback : req.body.feedback } 
            }
            ]).exec().then(function (feedback) {
                if (feedback.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'feedback' ]
                    });
                }
                return new feedback_questions_model({
                    feedback : req.body.feedback,
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

};




