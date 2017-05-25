var mongoose = require('mongoose');

// define studentSchema
var instructor_schema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    email : String,
    is_active : Boolean // true == active, false == inactive
});

module.exports = mongoose.model('instructors', instructor_schema);
