'use strict';
var Promise = require('bluebird'),
    ZSchema = require('z-schema'),
    moment  = require('moment'),
    opt = {},
    validator;


ZSchema.registerFormat("date", function (date) {
    return date && moment(date, 'YYYY-MM-DD', true).isValid();
});
validator = new ZSchema(opt);

function validate(json, schema) {
    return validator.validate(json, schema);
}

function validateDev(json, schema) {
    schema.additionalProperties = true;
    return validator.validate(json, schema);
}
module.exports = {
    getLastErrors: function(opt) {
        var last_errors = validator.getLastErrors();
        if (last_errors) {
            return last_errors.map(function (err) {
                var path;
                if (err.code === 'OBJECT_ADDITIONAL_PROPERTIES') {
                    path = err.params[0].map(function(param){
                        return '#/' + param;
                    });
                } else if (err.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                    path = [ '#/' + err.params[0] ];
                } else {
                    path = [ err.path ];
                }
                return {
                    code: err.code,
                    param: path
                };
            });
        }
    },
    configure: function(opt) {
        if (opt.environment === 'production') {
            this.validate = validate;
        } else {
            this.validate = validateDev;
        }
        return Promise.resolve();
    },
    validFile: function(opt) {
        if (!opt.file) {
            return [{
                code: 'OBJECT_MISSING_REQUIRED_PROPERTY',
                param: [ '#/' + opt.name ] 
            }];
        }
        if (!opt.file.name || !opt.file.size || opt.file.length) {
            return [{
                code: "INVALID_TYPE",
                param: [ "#/" + opt.name ] 
            }];
        }
    }
};