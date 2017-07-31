'use strict';

var validator = require('../../../../lib/validator'),
    mongoose  = require('mongoose'),

    submissions_model = require('../../../../models/submissions'),
    marks_get_schema  = require('../../../../schemas/works/submissions/marks/marks_get'),
    marks_post_schema = require('../../../../schemas/works/submissions/marks/marks_post');

module.exports = function (router) {
    router.route('/').get(function(req, res, next) {
        var error;
        if (req.session_user_type !== 'admin') {
           req.query.author_id
        }
        if (!mongoose.validID(req.query.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }
        validator.validate(req.query, marks_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return submissions_model.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.query.submission_id),
                    author_id: req.body.author_id
                },{
                    $project: {
                        submission_id: "$_id",
                        _id: 0,
                        mark: 1
                    }
                }  
            }
        ]).exec().then(function(ret) {
             if (!ret || !ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
            }
            return res.sendResponse(ret);
        });
    }).post(function(req, res, next) {
        var error,
            query;
        if (!mongoose.validID(req.query.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }
        validator.validate(req.query, marks_post_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            _id: mongoose.Types.ObjectId(req.query.submission_id)
        };
        return submissions_model.aggregate([{
            $match: query
        }]).exec().then(function(ret) {
             if (!ret || !ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
            }
            return submissions_model.findOneAndUpdate(query, {
                    mark: req.body.mark,
                }).exec();
        }).then(function(ret) {
            return res.sendResponse(ret._id);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
