'use strict';

var Promise = require('bluebird'),
    fs      = Promise.promisifyAll(require('fs'));


module.exports = {
    readFileAsync: function(file) {
        return fs.readFileAsync(file, 'utf8');
    }
}