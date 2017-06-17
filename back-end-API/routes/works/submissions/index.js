'use strict';

var validator   = require('../../../lib/validator'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    submissions_model  = require('../../../models/submissions'),

    subs_get_schema    = require('../../../schemas/works/submissions/submissions_get'),
    //subs_upload_schema = require('../../../schemas/works/submissions/submissions_upload'),
    subs_post_schema   = require('../../../schemas/works/submissions/submissions_post');



module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        validator.validate(req.query, subs_get_schema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ code: "VALIDATION", message: error });

        if (!mongoose.validID(req.query.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }

        var match_query = {
            _id: mongoose.Types.ObjectId(req.query.submission_id),
            status: 'active'
        };

        // if user is a student, it must be his own work, otherwise 404
        if (req.session_user_type === 'student' ) {
            match_query.author_id = mongoose.Types.ObjectId(req.session_user_id);
        }

        return submissions_model.aggregate([
            { 
                $match: match_query
            },
            { 
                $project : {
                    submission_id: "$_id",
                    _id: 0,
                    work_id: 1,
                    author_id: 1,
                    code: 1,
                    file_name: 1,
                    mark: 1
                }
            }
        ]).exec().then(function(sub) {
            if (!sub || !sub.length) {
                return Promise.reject({
                    code: "NOT_FOUND",
                    params: [ 'submission_id' ]
                });
            }
            return res.sendResponse(sub);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).post(function(req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        var error,   find_query,   update_query;

        validator.validate(req.body, subs_post_schema);
        error = validator.getLastErrors();
        if (error) return res.requestError({ code: "VALIDATION", message: error });

        find_query = {
            _id: mongoose.Types.ObjectId(req.body.submission_id),
            status: 'active'
        };

        if (req.session_user_type === 'student' ) {
            match_query.author_id = mongoose.Types.ObjectId(req.session_user_id);
        }

        update_query = {
            code: req.body.code,
            file_name: req.body.file_name,
            mark: req.body.mark,
            status: 'active'
        }

        //utils.clean(update_query);
        return submissions_model.find(find_query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
            }
            return submissions_model.findOneAndUpdate(find_query, update_query).exec();
        }).then(function(ret) {
            res.sendResponse(ret._id);
        }).catch(function (err) {
            res.requestError(err);
        });
    }).delete(function (req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        if (req.session_user_type !== 'admin') res.forbidden();
        validator.validate(req.body, subs_delete_schema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ code: "VALIDATION", message: error });

        var query = {
            _id: mongoose.Types.ObjectId(req.body.submission_id),
        }
        return submissions_model.find(query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
            }
            return submissions_model.findOneAndUpdate(query, {status: 'inactive'}).exec();
        }).then(function(ret) {
            res.sendResponse(ret._id);
        }).catch(function (err) {
            res.requestError(err);
        });

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });


    router.route('/upload/').get(function(req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
}