'use strict';

var validator   = require('../../lib/validator'),
    utils       = require('../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    submission_rules_model  = require('../../models/submission_rules'),

    feedback_get_schema    = require('../../schemas/works/feedback_get'),
    feedback_put_schema    = require('../../schemas/works/feedback_put'),
    feedback_post_schema   = require('../../schemas/works/feedback_post');

module.exports = function (router) {
    router.route('/')
}