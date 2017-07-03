'use strict';

var configExpress   = require('./config-express'),
    configMongoose     = require('./config-mongoose');


module.exports = function(app) {
    return {
        configure: function (opt) {
            return configMongoose.configure(app, opt).then(function(ret) {
                return configExpress.configure(app, opt);
            });
        },
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};