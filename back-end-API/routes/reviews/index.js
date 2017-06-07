'use strict';


var validator = require('../../lib/validator'),
    mongoose = require('mongoose');

// set the schema of the query
var query_shcema = {
    type: "object", //json object
    properties: {    // properties in the json object
        work_id: {  type: "string" },
        review_by: { type: "string" }   
    },
    additionalProperties: false, // no additional properties other than additional properties
    //required: [] // required fields  
};


var findReview = function(req, res) {
    // mongoose.getModel returns promise with the user_model promise
    return mongoose.getModel('review').then(function(review_model) {
        return review_model.findAsync(req.query);
    }).then(function(reviews) {
        if (!reviews) return res.status(404).end("reviews not found.");
        return res.sendResponse(reviews);
    }).catch(function(err) {
        return res.requestError({ message: "Server Error" });
    });
};

module.exports = function (router) {
    router.route('/').get(function (req, res, next) {
        //TODO check log in
        //if (!req.session.user) return res.status(403).end("Forbidden");
        // validate the req.query
        validator.validate(req.query, query_shcema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ status: 400, message: error});

        //Check permission
        return mongoose.getModel('user').then(function(user_model) {
            return user_model.findAsync({email:req.session.user});
        }).then(function(users) {
            if (!users) return res.status(404).end("user not found.");
            if (users.user_type === "instructor") {
                return mongoose.getModel('review').then(function(review_model) {
                    return review_model.findAsync(req.query);
                }).then(function(reviews) {

                });
            }
        }).catch(function(err) {
            return res.requestError({ message: "Server Error" });
        });




        // // Check for permission
        // return mongoose.getModel('user').then(function(user_model) {
        //     return user.findAsync({email:req.session.user});
        // }).then(function(users) {
        //     if (!users) return res.status(404).end("user not found.");

        //     if (users.user_type === "instructor") return findReview(req, res);

        //     if (users.user_type === "student") {

        //         return mongoose.getModel('submission').then(function(review_model) {
        //             return review_model.findAsync(req.query);
        //         }).then(function(submissions) {
        //             if (!submissions) return res.status(404).end("submission not found.");
                    
        //             if (req.query.work_id && req.query.work_id !in submissions.work_id) {
        //                 return res.status(403).end("work_id doesn't belong to yours.");
        //             }
        //             if (req.query.review_by && req.query.review_by !== users._id) {
        //                 return res.status(403).end("review_by ...........");
        //             }
        //             if (!req.query.work_id && !req.query.review_by) {
        //                 return status(403).end("need to give at least work_id or review_by");
        //             }

        //             return findReview(req, res);

        //         }).catch(function(err) {
        //             return res.requestError({ message: "Server Error" });
        //         });
        //     }

        //     return res.sendResponse(reviews);
        // }).catch(function(err) {
        //     return res.requestError({ message: "Server Error" });
        // });


    }).put(function (req, res, next) {

    }).delete(function (req, res, next) {

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};
