'use strict';
var logger = require('../lib/logger');

module.exports = function (router) {
    router.route('/').get(function (req, res, next) {
        logger.debug("1");
        res.sendResponse("API is live.");

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};