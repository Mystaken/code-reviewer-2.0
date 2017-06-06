'use strict';

var mongoose = require('mongoose'),
    submissionRulesSchema;

submissionRulesSchema = mongoose.Schema({
    name: {                         // name of this work
        type: String,
        required: true,
        uinque: true
    },
    num_peers : {                   // number of students in a group
        type: Number,
        min: 0,
        max: 7
    },
    required_files : [String],      // e.g. ["a1_design.py", "a1_testing.py"]
    repo_path: String,              // repo from MarkUs
    feedback_questions: [String],   // e.g. How descriptive the variable names are
                                    //      Is this function efficient
    student_submission_deadline : Date,
    peer_review_deadline : Date,
    ta_review_deadline : Date,
    status: String
});


module.exports = mongoose.model('submissionRules', submissionRulesSchema);

