'use strict';

var express     = require('express'),
    Promise     = require('bluebird'),
    path        = require('path'),
    sanitizer   = require('./sanitizer');

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
        return this.send({
            status: 200,
            data : response
        });
    };

    /** Sends a 403 status if route exist but verb is incorrect.
     */
    response.invalidVerb = function () {
        return this.send({
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
                    params: err.params.map(e=>'#/' + e)
                }]
            });
        } else if (err.code === "EXISTS") {
            return this.status(404).send({
                status: 404,
                message: [{
                    code: "EXISTS",
                    params: err.params.map(e=>'#/' + e)
                }]
            });
        }
        return this.status(500).send({
            status: 500,
            error: err
        });
    };

    /** Sends a error response if user does not have permission
     * @param err {Object} Not being used.
     */
    response.forbidden = function (err) {
        this.status(403).send({
            status: 403,
            message: "You do not have access to this page."
        });
    };
}

function configureMiddleware(app) {
    app.use(function (req, res, next) {
        req.session_user_id   = "5935ed0e5ecf04cc3388de8e";
        req.session_user_type = "admin";
        next();
    });
}

module.exports = {
    /** Configures the Express app
     * @param app {Express} the express app
     */
    configure: function (app) {
        configureRequest(express.request);
        configureResponse(express.response);
        configureMiddleware(app);
    }
};
