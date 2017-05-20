'use strict';

var mongoose = require('mongoose');

var review_schema = require("../../models/review_schema.js");

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
        //TODO check query
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
