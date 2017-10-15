'use strict';

var validator   = require('../../../lib/validator'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    feedbacks_model   = require('../../../models/feedbacks'),
    submissions_model = require('../../../models/submissions'),

    feedback_get_schema    = require('../../../schemas/works/feedbacks/feedbacks_get'),
    feedback_put_schema    = require('../../../schemas/works/feedbacks/feedbacks_put'),
    feedback_post_schema   = require('../../../schemas/works/feedbacks/feedbacks_post'),
    feedback_all_get_schema = require('../../../schemas/works/feedbacks/feedbacks_all_get'),
    feedback_all_delete_schema = require('../../../schemas/works/feedbacks/feedbacks_all_delete');

module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        var error;

        validator.validate(req.query, feedback_get_schema);
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
        return feedbacks_model.aggregate([{
            $match: { 
                $or: [{
                    work_id: mongoose.Types.ObjectId(req.query.work_id),
                    author: mongoose.Types.ObjectId(req.session_user_id),
                    status: 'active'
                },{ 
                    work_id: mongoose.Types.ObjectId(req.query.work_id),
                    review_by: mongoose.Types.ObjectId(req.session_user_id),
                    status: 'active'
                }]
            }
        },{
            $project: {
                feedback_id: "$_id",
                _id: 0,
                submission_id: 1,
                feedbacks: 1,
                mark: 1,
                last_updated: 1,
                review_by: 1,
                create_date: 1,
                work_id: 1,
                author: 1
            }
        }]).exec().then(function(ret) {
            if (!ret || !ret.length) {
                return Promise.reject({
                    code: "NOT_FOUND",
                    params: [ 'work_id' ]
                });
            }
            return res.sendResponse(ret);
        }).catch(function (error) {
            return res.requestError(error);
        });
    }).put(function(req, res, next) {
        var error,
            date;

        validator.validate(req.body, feedback_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        if (!mongoose.validID(req.body.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }
        date = new Date();
        return submissions_model.aggregate([
                { 
                    $match: {
                        _id: mongoose.Types.ObjectId(req.body.submission_id)
                    } 
                }
            ]).exec().then(function (work) {
                if (!work || !work.length) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return new feedbacks_model({
                    submission_id: req.body.submission_id,
                    author: work[0].author_id,
                    work_id: work[0].work_id,
                    review_by: req.session_user_id,
                    feedbacks: req.body.feedbacks || [],
                    mark: req.body.mark || 0,
                    create_date: date,
                    last_updated: date,
                    status: 'active'
                }).save();
            }).then(function(ret) {
                return res.sendResponse(ret._id);
            }).catch(function (error) {
                return res.requestError(error);
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
        if (!mongoose.validID(req.body.feedback_id)) {
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
                .exec();
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

        validator.validate(req.query, feedback_all_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }


        var query = req.query
        if (req.query.submission_id) query.submission_id = mongoose.Types.ObjectId(req.query.submission_id);
        if (req.query.work_id) query.work_id = mongoose.Types.ObjectId(req.query.work_id);
        if (req.query.author) query.author = mongoose.Types.ObjectId(req.query.author);
        if (req.query.review_by) query.review_by = mongoose.Types.ObjectId(req.query.review_by);

        return feedbacks_model.aggregate([
            { 
                $match: query
            },{
                $project: {
                    feedback_id: "$_id",
                    _id: 0,
                    submission_id: 1,
                    feedbacks: 1,
                    mark: 1,
                    author: 1,
                    review_by: 1
                }
            }
        ]).exec().then(function (submission) {
            if (!submission || !submission.length) {
                return res.requestError({
                    code: "NOT_FOUND",
                    params: [ 'feedback_id' ]
                });
            }
            return res.sendResponse(submission);
        }).catch(function (error) {
            return res.requestError(error);
        });
    }).delete(function (req, res, next) {
        if (req.session_user_type !== 'admin') return res.forbidden();

        var error;
        validator.validate(req.query, feedback_all_delete_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return feedbacks_model.remove(
            {work_id: mongoose.Types.ObjectId(req.query.work_id)} 
        ).exec().then(function(feedbacks) {
            return res.sendResponse(1);
        }).catch(function(err) {
            return res.requestError(err);
        });
    });
};




