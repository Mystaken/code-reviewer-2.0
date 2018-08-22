"use strict";

var jwt = require("jsonwebtoken"),
  config = require("../config/config.json");

module.exports = function(req, res, next) {
  // find access_token
  var access_token;
  if (req.headers.access_token) access_token = req.headers.access_token;
  else access_token = req.body.access_token;
  // if access_token is found
  if (access_token) {
    // use dev secret if prod secret in .env is not found
    var secret = process.env.SECRET || config.secret;
    // verify custom access_token by CLIENT_SECRET
    // TODO: check expire time
    try {
      var decoded = jwt.verify(access_token, secret);
      req.session_user_id = decoded.user_id;
      req.session_user_type = decoded.user_type;
      next();
    } catch (err) {
      res.forbidden();
    }
  } else {
    return res.forbidden();
  }
};
