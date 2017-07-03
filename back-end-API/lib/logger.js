'use strict';

var moment = require('moment'),
    colors = require('colors'),
    funcs  = {
    };
/**
 * Return a formatted date.
 */
function logDate() {
    return '[' + moment().format('MM/DD/YYYY, HH:mm:ss') + ']';
}

function log(str) {
    console.log(str);
}
module.exports = {
    fatal: log,
    error: log,
    warn: log,
    info: log,
    debug: log,
    setup: function(opt) {
        var funcs,
            logFunc;

        logFunc = console.log;

        funcs = {
            fatal: function(str) {
                logFunc(logDate().red, '[FATAL]'.red, str.toString().red);
            },

            error: function(str) {
                logFunc(logDate().red, '[ERROR]'.red, str.toString().red);
            },

            warn: function(str) {
                logFunc(logDate().yellow, '[WARN]'.yellow, str.toString().yellow);
            },

            info: function(str) {
                logFunc(logDate(), '[INFO]', str.toString());
            },

            debug: function(str) {
                logFunc(logDate().grey, '[DEBUG]'.grey, str.toString().grey);
            }
        };
        if (opt && opt.environment == 'production') {
            funcs.debug = function() {};
        }
        Object.keys(funcs).map(function(e) {
            this[e] = funcs[e];
        }, this);
    }
};