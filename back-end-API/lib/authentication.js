'use strict';

var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // find access_token
    var access_token;
    if (req.headers.access_token)
        access_token = req.headers.access_token;
    else
        access_token = req.body.access_token;
    // if access_token is found
    if (access_token) {
        
        // verify custom access_token by CLIENT_SECRET
        // TODO: check expire time
        try {
            var decoded = jwt.verify(access_token, process.env.SECRET);
            req.session_user_id = decoded.user_id;
            req.session_user_type = decoded.user_type;
            next();
        } catch (err) {
            res.forbidden();
        }
    } else {
        return res.forbidden();
    }
}