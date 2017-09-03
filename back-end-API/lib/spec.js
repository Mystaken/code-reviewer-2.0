'use strict';

var configExpress   = require('./config-express'),
    configMongoose  = require('./config-mongoose'),
    validator       = require('./validator');


module.exports = function(app) {
    return {
        configure: function (opt) {
            return configExpress.configure(app, opt).then(function() {
                return configMongoose.configure(app, opt);
            }).then(function() {
                return validator.configure(app, opt);
            });
        },
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};