'use strict';

var validator   = require('../../../lib/validator'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    annotations_model      = require('../../../models/annotations'),
    submissions_model      = require('../../../models/submissions'),
    feedbacks_model        = require('../../../models/feedbacks'),
    submission_files_model = require('../../../models/submission_files'),

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

        if (!mongoose.validID(req.query.submissions_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submissions_id' ]
            });
        }
        return feedbacks_model.aggregate([
                {
                    $match: {
                        submission_id: mongoose.Types.ObjectId(req.query.submission_id),
                        review_by: mongoose.Types.ObjectId(req.session_user_id),
                        status: 'active'
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return annotations_model.aggregate([
                        {
                            $match: {
                                submission_id: mongoose.Types.ObjectId(req.query.submission_id),
                                review_by: mongoose.Types.ObjectId(req.session_user_id),
                                status: 'active'
                            }
                        },
                        {
                            $project : {
                                annotation_id: "$_id",
                                _id: 0,
                                submission_file_id: 1,
                                annotation: 1,
                                start: 1,
                                end: 1
                            }
                        }
                    ]).exec();
            }).then(function(ret) {
                return res.sendResponse({
                        review_by:     req.session_user_id,
                        submission_id: req.query.submission_id,
                        annotations:   ret
                    });
            }).catch(function (err) {
                res.requestError(err);
            });
    }).put(function(req, res, next) {
        var error;
        validator.validate(req.body, annotations_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        if (!mongoose.validID(req.body.submission_file_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_file_id' ]
            });
        }
        return submission_files_model.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(req.body.submission_file_id),
                        status: 'active'
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_file_id' ]
                    });
                }
                return feedbacks_model.aggregate([{
                        $match: {
                            submission_id: mongoose.Types.ObjectId(req.body.submission_id),
                            review_by: mongoose.Types.ObjectId(req.session_user_id),
                            status: 'active'
                        }
                    }]).exec();
            }).then(function(ret) {
                if (!ret || !ret.length) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return new annotations_model({
                    submission_file_id: mongoose.Types.ObjectId(req.body.submission_file_id),
                    review_by: mongoose.Types.ObjectId(req.body.session_user_id),
                    status: 'active',
                    end: req.body.end,
                    start: req.body.start,
                    submission_id: req.body.submission_id,
                    annotation: req.body.annotation
                }).save()
            }).then(function(ret) {
                return res.sendResponse(ret._id);
            }).catch(function (err) {
                console.log(err);
                return res.requestError(err);
            });
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

        if (!mongoose.validID(req.query.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }
        match_query = {
            _id:    mongoose.Types.ObjectId(req.query.submission_id)
        }
        if (req.session_user_type !== 'admin') {
            match_query.author_id = mongoose.Types.ObjectId(req.session_user_id);
        }
        return submissions_model.aggregate([
                {
                    $match: match_query
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return annotations_model.aggregate([
                        {
                            $match: {
                                submission_id:    mongoose.Types.ObjectId(req.query.submission_id),
                                status: 'active'
                            }
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
                    ]).exec();
            }).then(function (ret) {
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