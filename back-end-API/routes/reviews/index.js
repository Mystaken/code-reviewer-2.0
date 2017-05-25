'use strict';

var mongoose = require('mongoose');

var review_schema = require("../../models/review_schema.js");
var validator = require('../../lib/validator');

// set the schema of the query
var QuerySchema = function() {
    return {
        type: "object", //json object
        properties: {    // properties in the json object
            author: {  type: "string" },   //first_name should be string
            review_by: { type: "string" }   
        },
        additionalProperties: false, // no additional properties other than additional properties
        //required: [] // required fields  
    };

}

// generates search arg for GET, add more queries if needed
var searchInfo = function(query) {
    var search_info = {};
    if (query.author) search_info.author = query.author;
    if (query.review_by) search_info.review_by = query.review_by;
    return search_info;
}



module.exports = function (router) {
    router.route('/:work_name/').get(function (req, res, next) {
        //TODO check log in

        var query_shcema = QuerySchema();

        // validate the req.query (req.body if form data)
        validator.validate(req.query, query_shcema);

        // get any errors in the format
        var error = validator.getLastErrors();

        // if there's any error, send an error response
        // IMPORTANT: return to exit we don't continue with the request!
        if (error) return res.requestError({ status: 400, message: error});
        
        var review_model = mongoose.model(req.params.work_name + "_reviews", review_schema);

        review_model.find(searchInfo(req.query) ,function(err, reviews) {
            if (err) res.status(404).end("review not found.");
            return res.sendResponse(reviews);
        });

    }).put(function (req, res, next) {

    }).delete(function (req, res, next) {

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};
