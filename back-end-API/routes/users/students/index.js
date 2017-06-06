'use strict';

var validator   = require('../../../lib/validator'),
    sanitizer   = require('../../../lib/sanitizer'),
    mongoose    = require('mongoose'),
    user_model  = require('../../../schemas/users');


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

module.exports = function (router) {
    router.route('/').get(function(req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        validator.validate(req.query, query_shcema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ status: 400, message: error });

        user_model.getAsync({email:req.session.user}).then(function (user) {
            // if user is instructor, he can do every thing
            // otherwise, ifuser_id is given and matches the TA/student logged in
            // he can do any thing (because req.query includes user_id) he is getting his own info
            if (user.user_type === "instructor" || user.id === req.query.user_id) {
                return user_model.findAsync(req.query);
            }
            return Promise.reject("Invalid user type, premission denied.");
        }).then(function (data) { return res.sendResponse(data);
        }).catch(function (err) { return res.requestError({ message: "Server Error" });
        });

    }).put(function (req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        validator.validate(req.query, query_shcema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ status: 400, message: error });

        user_model.getAsync({email:req.session.user}).then(function (user) {
            if (user.user_type === "instructor") //TODO KEVIN HELP TO　ＦＩＬＬ　ＩＮ　ＴＨＥ CODE FOR PUT
            return Promise.reject("Invalid user type, premission denied.");
        }).then(function (data) { return res.sendResponse(data);
        }).catch(function (err) { return res.requestError({ message: "Server Error" });
        });

    }).post(function (req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        validator.validate(req.query, query_shcema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ status: 400, message: error });

        user_model.getAsync({email:req.session.user}).then(function (user) {
            if (user.user_type === "instructor" || user.id === req.query.user_id) {
                //TODO KEVIN HELP TO　ＦＩＬＬ　ＩＮ　ＴＨＥ CODE FOR POST
            }
            return Promise.reject("Invalid user type, premission denied.");
        }).then(function (data) { return res.sendResponse(data);
        }).catch(function (err) { return res.requestError({ message: "Server Error" });
        });

    }).delete(function (req, res, next) {
        //if (!req.session.user) return res.status(403).end("Forbidden");
        validator.validate(req.query, query_shcema);
        var error = validator.getLastErrors();
        if (error) return res.requestError({ status: 400, message: error });

        user_model.getAsync({email:req.session.user}).then(function (user) {
            if (user.user_type === "instructor") //TODO KEVIN HELP TO　ＦＩＬＬ　ＩＮ　ＴＨＥ CODE FOR DELETE
            return Promise.reject("Invalid user type, premission denied.");
        }).then(function (data) { return res.sendResponse(data);
        }).catch(function (err) { return res.requestError({ message: "Server Error" });
        });

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });

    router.route('/all').get(function(req, res, next) {
        var error,
            query = req.query;
        if (req.sessionUserType !== 'admin' &&
            req.sessionUserType !== 'ta') {
            return res.forbidden();
        }
        if (query.student_number) {
            query.student_number = sanitizer.sanitize(query.student_number,
                'stringToInteger');
        }
        validator.validate(query, {
            type: "object",
            properties: {
                user_id: {
                    type: "string",
                    maxLength: 100
                },
                email: {
                    type: "string",
                    maxLength: 100
                },
                first_name: {
                    type: "string",
                    maxLength: 100
                },
                last_name: {
                    type: "string",
                    maxLength: 100
                },
                utorid: {
                    type: "string",
                    maxLength: 100
                },
                student_number: {
                    type: "number"
                },
                status: {
                    type: "string",
                    maxLength: 100
                }

            },
            additionalProperties: false
        });
        return user_model.findAsync({
            _id: "5935ed0e5ecf04cc3388de8e"
        }).then(function(ret) {
            return res.sendResponse(ret);
        });
    }).all(function(req, res, next) {
        return res.invalidVerb();
    });
};