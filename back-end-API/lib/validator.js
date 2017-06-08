'use strict';
var Promise = require('bluebird'),
    ZSchema = require('z-schema'),
    utils   = require('./utils'),
    opt = {},
    validator;


ZSchema.registerFormat("date", function (str) {
    return utils.validDate(str);
});
validator = new ZSchema(opt);

module.exports = {
    validate: function(json, schema) {
        return validator.validate(json, schema);
    },

    getLastErrors: function() {
        var last_errors = validator.getLastErrors();
        if (last_errors) {
            return last_errors.map(function (err) {
                var path;
                if (err.code === 'OBJECT_ADDITIONAL_PROPERTIES') {
                    path = err.params[0].map(function(param){
                        return '#/' + param;
                    });
                } else if (err.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                    path = '#/' + err.params[0];
                } else {
                    path = [ err.path ];
                }
                return {
                    code: err.code,
                    param: path
                };
            });
        }
    }
};