'use strict';

var configExpress   = require('./config-express'),
    configMongoose     = require('./config-mongoose');


module.exports = function(app) {
    return {
        configure: function () {
            configMongoose.configure(app);
            configExpress.configure(app);
        },
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};