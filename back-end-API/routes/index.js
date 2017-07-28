'use strict';
var config = require('../config/config.json');

module.exports = function (router) {
    router.route('/').get(function (req, res, next) {
        res.status(200).send(config.app.name + ' is live! Visit <a target="_blank" href="' + config.app.doc_link +'">' + config.app.name + ' Documentation</a> for the documentation.');
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};