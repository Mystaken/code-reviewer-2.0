'use strict';

var validator   = require('../../../lib/validator'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    annotations_model   = require('../../../models/annotations'),
    submissions_model   = require('../../../models/submissions'),

    annotations_get_schema    = require('../../../schemas/works/annotations/annotations_get'),
    annotations_put_schema    = require('../../../schemas/works/annotations/annotations_put'),
    annotations_delete_schema = require('../../../schemas/works/annotations/annotations_delete');

module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        var error;
        //need to check permissions
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
        return submissions_model.aggregate([
                { 
                    $match: {
                        _id:        mongoose.Types.ObjectId(req.query.submission_id),
                        status:     'active'
                    } 
                }
            ]).exec().then(function (submissions) {
                if (!submissions || !submissions.length) {
                    return res.requestError({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
                }
                return annotations_model.aggregate([
                    {
                        $match: {
                            submission_id: mongoose.Types.ObjectId(req.query.submission_id),
                            status: 'active'
                        } 
                    },{
                        $project: {
                            submission_id: 1,
                            start: 1,
                            end: 1,
                            annotation_id: "$_id",
                            _id: 0,
                        }
                    }
                ]).exec();
            }).then(function (ret) {
                return res.sendResponse(ret);
            }).catch(function (err) {
                return res.responseError(err);
            });
    }).put(function(req, res, next) {
        var error;
        //need to check permissions
        validator.validate(req.query, annotations_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return new annotations_model({
            submission_id: req.body.submission_id,
            annotations: req.body.annotation,
            start: req.body.start,
            end: req.body.end,
            review_by: mongoose.Types.ObjectId(req.session_user_id),
            status: 'active'
        }).then(function (ret) {
            return res.sendResponse(ret._id);
        }).catch(function(err) {
            return res.responseError(err);
        });
    }).delete(function(req, res, next) {
        var error,
            query;

        validator.validate(req.body, annotations_delete_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            _id: mongoose.Types.ObjectId(req.body.annotation_id),
            status: 'active'
        };
        return annotations_model.find(query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'user_id' ]
                    });
            }
            return annotations_model.findOneAndUpdate(query, {
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

        if (!mongoose.validID(req.query.submissions_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }
    }).all(function(req, res, next) {
        return res.invalidVerb();
    });
};