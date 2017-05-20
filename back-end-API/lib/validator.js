'use strict';
var Promise = require('bluebird'),
    ZSchema = require('z-schema'),
    opt = {},
    validator = new ZSchema(opt);


module.exports = {
    validate: function(json, schema) {
        return validator.validate(json, schema);
    },

    getLastErrors: function() {
        var lastErrors = validator.getLastErrors();
        if (lastErrors) {
            return lastErrors.map(function (err) {
                return {
                    code: err.code,
                    param: err.params[0]
                };
            });
        }
    }
};