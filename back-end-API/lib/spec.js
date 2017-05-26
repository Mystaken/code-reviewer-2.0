'use strict';

var configExpress   = require('./config-express'),
    configMongoose     = require('./config-mongoose');


module.exports = function(app) {
    return {
        configure: function () {
            configExpress.configure(app);
            configMongoose.configure(app);
        },
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};