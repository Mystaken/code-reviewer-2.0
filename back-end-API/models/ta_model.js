var mongoose = require('mongoose');

var ta_schema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    utorid : {
        type: String, // data type
        unique: true // avoid duplicates
    },
    student_number : String,
    email : {
    		type: String,
    		unique: true, // avoid duplicates
    		requied: true // primary key
    },
    to_review : [String],
    to_grade : [String],
    weight: Number,
    is_active : Boolean // true == active, false == inactive

});

module.exports = mongoose.model('tas', ta_schema);
