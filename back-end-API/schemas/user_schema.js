module.exports = {
    first_name : String,
    last_name : String,
    utorid : {
        type: String, // data type
        required: true,
        unique: true // avoid duplicates
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
    contract_number: Number,
    user_type: String
}