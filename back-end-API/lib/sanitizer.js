'use strict';
var sanitize    = require('validator'),
    sanitizer;


sanitizer = {
    /** Sanitizes a string to an integer
     * @param str {String} The string to be sanitized.
     *
     * @return {String} The sanitized string.
     */
    stringToInteger: function(str) {
        if (sanitize.isInt(str)) {
            return sanitize.toInt(str);
        }
        return str;
    }
};

module.exports = {
    /** Sanitizes a the string to a specified type
     * @param string {String}   The string to be sanatized.
     * @param type {String}     The methodology of sanitization
     * @return {String} The sanitized string.
     */
    sanitize: function(str, type) {
        return sanitizer[type](str);
    }
};
