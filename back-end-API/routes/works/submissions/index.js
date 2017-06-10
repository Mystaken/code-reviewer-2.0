'use strict';

var validator   = require('../../../lib/validator'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    submissions_model  = require('../../../models/submissions'),

    subs_get_schema    = require('../../../schemas/works/submissions/submissions_get');
    //subs_put_schema    = require('../../schemas/works/works_put'),
    //works_post_schema   = require('../../schemas/works/works_post');


module.exports = function (router) {

    router.route('/').get(function(req, res, next) {
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
        }

        // if user is a student, it must be his own work, otherwise 404
        if (req.session_user_type !== 'admin' ) {
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
    }).put(function(req, res, next) {
        
    }).post(function(req, res, next) {
        
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
}