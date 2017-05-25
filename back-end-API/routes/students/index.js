'use strict';

var validator = require('../../lib/validator');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/csca08');

module.exports = function (router) {
    router.route('/').get(function (req, res, next) {
        var student_json = {
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

        var student_schema = new mongoose.Schema(student_json);
        var student_model = mongoose.model('students', student_schema);
        student_model.find({}, function(err, students) {
            if (err) return res.requestError({
                status: 404,
                message: "no students found"
            });
            return res.sendResponse(students);
        });
    }).post(function(req, res, next) {
        var utormail = req.body.utormail;
        var student_json = {
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

        var student_schema = new mongoose.Schema(student_json);
        var student_model = mongoose.model('students', student_schema);
        console.log(utormail);
        student_model.update({first_name: "Joshua"}, {first_name: "Joshuaaaaaaaaa"}, function(err, raw){
            if (err) return res.requestError({
                status: 404,
                message: "can't change student first name"
            });
            return res.sendResponse(raw);
        });


    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};
