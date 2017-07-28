'use strict';

var Promise = require('bluebird'),
    fs      = Promise.promisifyAll(require('fs'));

module.exports = {
    /*
     * Removes all blank attributes from object.
     * @param obj {Object} The object to be cleaned.
     */
    clean: function(obj) {
        for (var item in obj) { 
            if (obj[item] === null || obj[item] === undefined) {
                delete obj[item];
            }
        }
        return obj;
    },

    /* Removes a file at the path
     * @param path {str} the path of the file.
     * *May throw error if no file at path* -- Need to test.
     */
    promiseRemoveFile: function (path) {
        return fs.unlinkAsync(path);
    }
};