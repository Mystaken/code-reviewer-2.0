'use strict';

var mongoose    = require('mongoose'),
    Promise     = require('bluebird'),
    config      = require('../config/config.json');

/*
 * Returns true iff the given id is valid.
 * @param id {String} The mongo id to be verified.
 */
function validID(id) {
    return id && id.match(/^[0-9a-fA-F]{24}$/);
}


/**
 * Returns the default date if no date provided.
 */
function getDefaultDate() {
    var res = new Date();
    res.setFullYear(res.getFullYear() + 1);
    return res;
}
module.exports = {
    /** Configures the mongoose
     * @param app {Express} the express app
     */
    configure: function (app) {
        mongoose.connect(config.mongo.server);
        mongoose.validID = validID;
        mongoose.Promise = Promise;
        mongoose.getDefaultDate = getDefaultDate;
    }
};
