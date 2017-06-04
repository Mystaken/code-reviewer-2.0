module.exports = {
    first_name : String,
    last_name : String,
    utorid : {
        type: String,           // data type
        required: true,
        unique: true            // avoid duplicates
    },
    student_number : {
        type: Number,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    status : String,            
    last_login : Date,
    contract_number: Number,    // number of contracts a TA has
    user_type: String           // one of "instructor", "TA", "Student"
}