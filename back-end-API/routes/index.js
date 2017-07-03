'use strict';

module.exports = function (router) {
    router.route('/').get(function (req, res, next) {
        res.sendResponse("API is live.");

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};