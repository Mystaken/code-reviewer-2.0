'use strict';

module.exports = function (router) {
    router.route('/').get(function (req, res, next) {
        return res.sendResponse("EHH22");
    }).put(function (req, res, next) {

    }).delete(function (req, res, next) {

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};