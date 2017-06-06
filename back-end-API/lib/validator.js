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
                var path;
                console.log(err);
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