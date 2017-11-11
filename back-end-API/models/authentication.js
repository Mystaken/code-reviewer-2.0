'use strict';

var mongoose = require('mongoose'),
    authentication_schema;

authentication_schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('authentication', authentication_schema);