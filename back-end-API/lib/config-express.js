'use strict';

var express   = require('express'),
    Promise   = require('bluebird'),
    path      = require('path'),
    config    = require('../config/config'),
    sanitizer = require('./sanitizer');

/** Configures the functions to the request object.
 * @param request {Express.request} the request object
 */
function configureRequest (request) {

    /** Sanitizes a the request variable to a specified type
     * @param key {str}     the request variable to be sanatized.
     * @param type {str}    the methodology of sanitization
     * Updates the request object with the sanitized variable.
     */
    request.sanitize = function(key, type) {
        var fields = this.query || this.body;
        fields[key] = sanitizer.sanitize(fields[key], type);
    };
}

/* Configures the functions to the response object.
 * @param response {Express.response} the response object
 */
function configureResponse (response) {
    /** Sends a 200 request from API with the data.
     * This function should be used instead of request.send
     */
    response.sendResponse = function (response) {
        return this.status(200).send({
            status: 200,
            data : response
        });
    };

    /** Sends a 403 status if route exist but verb is incorrect.
     */
    response.invalidVerb = function () {
        return this.status(403).send({
            status: 403
        });
    };

    /** Sends a error response. If no status is given, send 
        a status 500 response with no message.
     * @param err.status {int}  the error response status
     * @param err.message {str} the error message
     */
    response.requestError = function (err) {
        if (err.code === "VALIDATION") {
            return this.status(400).send({
                status: 400,
                message: err.message
            });
        } else if (err.code === "NOT_FOUND") {
            return this.status(404).send({
                status: 404,
                message: [{
                    code: "NOT_FOUND",
                    params: err.params.map(function(e) {
                        return '#/' + e;
                    })
                }]
            });
        } else if (err.code === "EXISTS") {
            return this.status(400).send({
                status: 400,
                message: [{
                    code: "EXISTS",
                    params: err.params.map(function(e) {
                        return '#/' + e;
                    })
                }]
            });
        }
        return this.status(500).send({
            status: 500
        });
    };

    /** Sends a error response if user does not have permission
     * @param err {Object} Not being used.
     */
    response.forbidden = function (err) {
        this.status(403).send({
            status: 403,
            message: "Forbidden."
        });
    };
}

function configureMiddleware(app, opt) {
    switch(opt.environment) {
        case "production":
            app.use(function (req, res, next) {
                req.session_user_id   = '597454be305f03346c012275';
                req.session_user_type = 'admin';
                res.cookie(config.cookie.session.name,
                  JSON.stringify({
                    session_user_id: req.session_user_id,
                    session_user_type: req.session_user_type
                  }),{
                    expires: new Date(Date.now() + 900000)
                  });
                next();
            });
            break;
        case "development":
            app.use(function (req, res, next) {
                req.session_user_id = req.query.session_user_id || req.body.session_user_id || opt.user_id;
                req.session_user_type = req.query.session_user_type || req.body.session_user_type || opt.user_type;
                res.cookie(config.cookie.session.name,
                  JSON.stringify({
                    session_user_id: req.session_user_id,
                    session_user_type: req.session_user_type
                  }),{
                    expires: new Date(Date.now() + 900000)
                  });
                next();
            });
            break;
    }
}

module.exports = {
    /** Configures the Express app
     * @param app {Express} the express app
     */
    configure: function (app, opt) {
        configureRequest(express.request, opt);
        configureResponse(express.response, opt);
        configureMiddleware(app, opt);
        return Promise.resolve();
    }
};
