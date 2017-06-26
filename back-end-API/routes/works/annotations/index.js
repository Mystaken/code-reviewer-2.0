'use strict';

var validator   = require('../../../lib/validator'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    annotations_model = require('../../../models/annotations'),
    submissions_model = require('../../../models/submissions'),
    feedbacks_model   = require('../../../models/feedbacks'),

    annotations_all_get_schema = require('../../../schemas/works/annotations/annotations_get'),
    annotations_get_schema     = require('../../../schemas/works/annotations/annotations_get'),
    annotations_put_schema     = require('../../../schemas/works/annotations/annotations_put'),
    annotations_delete_schema  = require('../../../schemas/works/annotations/annotations_delete');

module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        var error;

        validator.validate(req.query, annotations_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        if (req.session_user_type !== 'admin' &&
            req.session_user_id !== req.query.user_id) {
            return res.forbidden();
        }

        if (!mongoose.validID(req.query.submissions_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submissions_id' ]
            });
        }
        return feedbacks_model.aggregate([
                {
                    $match: {
                        _id:       mongoose.Types.ObjectId(req.query.submission_id),
                        review_by: mongoose.Types.ObjectId(req.query.user_id),
                        status:    'active'
                    }
                },
                { 
                    $project : {
                        annotation_id: "$_id",
                        _id: 0,
                        annotation: 1,
                        start: 1,
                        end: 1
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return res.sendResponse({
                        review_by:     req.query.user_id,
                        submission_id: req.query.submission_id,
                        annotations:   ret
                    });
            }).catch(function (err) {
                res.requestError(err);
            });
    }).put(function(req, res, next) {

    }).delete(function(req, res, next) {
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });


    router.route('/all').get(function(req, res, next) {
        var error,
            match_query;

        validator.validate(req.query, annotations_all_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        if (!mongoose.validID(req.query.submissions_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submissions_id' ]
            });
        }
        match_query = {
            _id:    mongoose.Types.ObjectId(req.query.submission_id),
            status: 'active'
        }
        if (req.session_user_type !== 'admin') {
            match_query.author_id = mongoose.Types.ObjectId(req.query.user_id);
        }
        return submissions_model.aggregate([
                {
                    $match: match_query
                },
                { 
                    $project : {
                        annotation_id: "$_id",
                        _id: 0,
                        review_by: 1,
                        annotation: 1,
                        start: 1,
                        end: 1
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return res.sendResponse({
                        submission_id: req.query.submission_id,
                        annotations: ret
                    });
            }).catch(function (err) {
                res.requestError(err);
            });

    }).all(function(req, res, next) {
        return res.invalidVerb();
    });
};