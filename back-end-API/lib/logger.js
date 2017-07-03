'use strict';

var moment = require('moment'),
    colors = require('colors');
/**
 * Return a formatted date.
 */
function logDate() {
    return '[' + moment().format('MM/DD/YYYY, HH:mm:ss') + ']';
}

function fatal(str) {
    console.log(logDate().red, '[FATAL]'.red, str.toString().red);
}

function error(str) {
    console.log(logDate().red, '[ERROR]'.red, str.toString().red);
}

function warn(str) {
    console.log(logDate().yellow, '[WARN]'.yellow, str.toString().yellow);
}

function info(str) {
    console.log(logDate(), '[INFO]', str.toString());
}

function debug(str) {
    console.log(logDate().grey, '[DEBUG]'.grey, str.toString().grey);
}
function log(str) {
    console.log(str);
}
module.exports = {
    fatal: fatal,
    error: error,
    warn: warn,
    info: info,
    debug: debug
};