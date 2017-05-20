'use strict';

module.exports = function (router) {
    router.route('/vc/:vc/').get(function (req, res, next) {
    	console.log("-----")
    	// console.log(req.params.vc);
        return res.sendResponse(req.params.vc);
    }).put(function (req, res, next) {

    }).delete(function (req, res, next) {

    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};