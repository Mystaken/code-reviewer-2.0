'use strict';

var validator   = require('../../lib/validator'),
    utils       = require('../../lib/utils'),
    Promise     = require('bluebird'),
    request     = require('request'),
    jwt         = require('jsonwebtoken'),
    bcrypt      = require('bcrypt'),
    user_model  = require('../../models/users'),
    authentication_model = require('../../models/authentication');

module.exports = function (router) {

    router.route('/').post(function(req, res, next) {
        // if post.body contains email and password
        if (req.body && req.body.email && req.body.password) {
            // find the user by email
            authentication_model.findOne({
                email: req.body.email
            }, function(err, auth) {
                if (err) throw err;
                // no user with this pasword exists in db
                if (!auth) {
                    return res.sendResponse({
                        message: "Authentication failed. Email not found."
                    });
                }
                // assume user exists, check password
                if (!bcrypt.compareSync(req.body.password, auth.hash)) {
                    return res.sendResponse({
                        message: "Authentication failed. Wrong password."
                    });
                }
                // assume password is correct
                // get this user's user_id and user_type by email
                user_model.findOneAndUpdate({email: req.body.email}, { $set: { last_login: new Date() }}, function(err, user) {
                    if (err) return res.forbidden();
                    // if there's no user with this email in mongoDB
                    if (user === null) return res.forbidden();
                    // set this user's user_id and user_type
                    var custom_access_token = jwt.sign({
                        user_id: user._id.toString(),
                        user_type: user.user_type
                    }, process.env.SECRET, { expiresIn: '24h'});

                    return res.sendResponse({
                        access_token: custom_access_token
                    });
                });
            });
        }
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};