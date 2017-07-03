'use strict';

var configExpress   = require('./config-express'),
    configMongoose     = require('./config-mongoose');


module.exports = function(app) {
    return {
        configure: function (opt) {
            configMongoose.configure(app, opt);
            configExpress.configure(app, opt);
        },
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};