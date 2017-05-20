'use strict';

/*
 * Some examples of how to use the validator.
 *
 *
 *
 */
var validator = require('../../lib/validator');

module.exports = function (router) {

    /*
     * test1 example
     * ---------------------------------------------------
     * request examples: 
     * http://localhost:3000/api/validator/test1?first_name=kevin
     * {"status":400,"message":[{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"last_name"}]}
     * http://localhost:3000/api/validator/test1?first_name=kevin&last_name=gao
     * {"status":200,"data":"EHH"}
     * http://localhost:3000/api/validator/test1?first_name=kevin&age=1&other=2
     * {"status":400,"message":[{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":["other","age"]}]}
     * 
     */
    router.route('/test1').get(function (req, res, next) {
        var error,
            schema;

        // define a schema to verify the request
        schema = {
            type: "object", //json object
            properties: {    // properties in the json object
                first_name: {  type: "string" },   //first_name should be string
                last_name: { type: "string" }   
            },
            additionalProperties: false, // no additional properties other than additional properties
            required: ["first_name", "last_name"] // required fields
        }

        // validate the req.query (req.body if form data)
        validator.validate(req.query, schema);

        // get any errors in the format
        error = validator.getLastErrors();

        // if there's any error, send an error response
        if (error) {
            // IMPORTANT: return to exit we don't continue with the request!
            return res.requestError( {
                status: 400,
                message: error
            });
        }
        // send back request.
        return res.sendResponse("EHH");
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};