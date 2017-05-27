'use strict';

var mongoose    = require('mongoose'),
    Promise     = require('bluebird'),
    config      = require('../config/config.json'),
    schemas     = [
        {
            name: 'user',
            path: '../schemas/user_schema'
        },
        {
            name: 'submission_rule',
            path: '../schemas/submission_rule_schema'
        },
        {
            name: 'submission',
            path: '../schemas/submission_schema'
        }];

/** Configures the schemas in mongo
 * @param schemas {[Objects]} List of schemas
 */
function configSchemas(schemas) {
    schemas.forEach(function(schema) {
        var sch =  mongoose.Schema(require(schema.path)),
            promise = Promise.promisifyAll(mongoose.model(schema.name, sch));
        mongoose[schema.name] = promise;
    });
}

function getModel(name) {
    return Promise.try(function() {
        if (!mongoose[name]) {
            throw new Error("No model in mongoose.");
        }
        return mongoose[name];
    });
}

module.exports = {
    /** Configures the mongoose
     * @param app {Express} the express app
     */
    configure: function (app) {
        configSchemas(schemas);
        mongoose.getModel = getModel;
    }
};
