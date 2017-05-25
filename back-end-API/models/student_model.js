var mongoose = require('mongoose');

// define studentSchema
var student_schema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    utorid : {
        type: String, // data type
        required: true,
        unique: true // avoid duplicates
    },
    student_number : String,
    email : String,
    is_active : Boolean// true == active, false == inactive
});

module.exports = mongoose.model('students', student_schema);
