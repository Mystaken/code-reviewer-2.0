'use strict';

var configExpress = require('./config-express');


module.exports = function(app) {
    return {
        configure: function () {
            configExpress.configure(app);
        },
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};