'use strict';

var validator   = require('../../lib/validator'),
    utils       = require('../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    feedbacks_model   = require('../../models/feedbacks'),
    submissions_model = require('../../models/submissions'),

    feedback_get_schema    = require('../../schemas/feedbacks/feedbacks_get'),
    feedback_put_schema    = require('../../schemas/feedbacks/feedbacks_put'),
    feedback_post_schema   = require('../../schemas/feedbacks/feedbacks_post');

module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        var error;

        validator.validate(req.query, feedback_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        if (!mongoose.validID(req.query.feedback_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'feedback_id' ]
            });
        }
        return feedbacks_model.aggregate([
                { 
                    $match: {
                        _id: mongoose.Types.ObjectId(req.query.submission_id),
                        status: 'active'
                    } 
                },{
                    $project: {
                        feedback_id: "$_id",
                        _id: 0,
                        work_id: 1,
                        feedbacks: 1,
                        mark: 1
                    }
                }
            ]).exec().then(function (submission) {
                if (!submission || !submission.length) {
                    return res.requestError({
                        code: "NOT_FOUND",
                        params: [ 'feedback_id' ]
                    });
                }
                return res.sendResponse(work);
            }).catch(function (error) {
                res.requestError(error);
            })
    }).put(function(req, res, next) {
        var error,
            date;

        validator.validate(req.body, feedback_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        if (!mongoose.validID(req.query.submission_id) || !mongoose.validID(req.query.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id', 'author_id' ]
            });
        }
        date = new Date();
        return submissions_model.aggregate([
                { 
                    $match: {
                        _id:        mongoose.Types.ObjectId(req.query.submission_id),
                        author_id:  mongoose.Types.ObjectId(req.query.author_id),
                        status:     'active'
                    } 
                }
            ]).exec().then(function (work) {
                if (!work || !work.length) {
                    return res.requestError({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
            }).then(function() {
                return new feedbacks_model({
                    work_id: req.body.work_id,
                    author: req.body.author,
                    review_by: req.session_user_id,
                    feedbacks: req.body.feedbacks,
                    mark: req.body.mark,
                    create_date: date,
                    last_updated: date,
                    status: 'active'
                }).save();
            }).then(function(ret) {
                res.sendResponse(ret._id);
            }).catch(function (error) {
                res.requestError(error);
            });
    }).post(function(req, res, next) {
        var error,
            find_query,
            update_query;

        validator.validate(req.body, feedback_post_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        if (!mongoose.validID(req.query.feedback_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'feedback_id' ]
            });
        }

        find_query = {
            _id: mongoose.Types.ObjectId(req.body.feedback_id),
            status: 'active'
        };
        update_query = utils.clean({
            feedbacks: req.body.feedbacks,
            mark: req.body.mark,
            last_updated: new Date()
        });

        return feedbacks_model.find(find_query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'feedback_id' ]
                    });
            }
            return feedbacks_model.findOneAndUpdate(find_query, update_query)
                .exec()
        }).then(function(ret) {
            res.sendResponse(ret._id);
        }).catch(function (err) {
            res.requestError(err);
        });
    });
}