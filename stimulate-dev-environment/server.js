var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    Promise  = require('bluebird');


mongoose.connect('mongodb://localhost/csca08', { useMongoClient: true });


const admin_email = "code.reviewer.utsc@gmail.com";
const password = "1";
const emails = ['1@mail.utoronto.ca', '2@mail.utoronto.ca', '3@mail.utoronto.ca', '4@mail.utoronto.ca', '5@mail.utoronto.ca'];


var user_schema = mongoose.Schema({
    first_name: String,
    last_name: String,
    utorid: {
        type: String,           // data type
        required: true,
        unique: true            // avoid duplicates
    },
    student_number: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    },
    last_login : Date,
    contract_number: Number,    // number of contracts a TA has
    user_type: String           // one of  "ta", "student", "admin"
});

var authentication_schema = mongoose.Schema({
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

var user_model = mongoose.model('users', user_schema);
var auth_model = mongoose.model('authentication', authentication_schema)

// create admin
bcrypt.hash(password, 8, function(err, hash) {
    new auth_model({
        email: admin_email,
        hash: hash
    }).save();
    new user_model({
        email: admin_email,
        utorid: "admin1",
        user_type: "admin",
        status: "active"
    }).save();
    console.log("Added admin");
})


// create students
Promise.map(emails, function(email, i) {
    console.log("Adding", i);
    return bcrypt.hash(password, 8).then(function(hash) {
        return auth_model({
            email: email,
            hash: hash
        }).save();
    }).then(function() {
        new user_model({
            email: email,
            utorid: "student" + i,
            user_type: "student",
            status: "active"
        }).save();
    });
})
.then(function() {
    console.log("Done");
})
.catch(function(err) {
    consoel.log(err);
})
.finally(function() {
    console.log("All Done!")
})