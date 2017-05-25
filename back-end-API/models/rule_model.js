var mongoose = require('mongoose');

// define rule schema
var rule_schema = new mongoose.Schema({
    work_name : {
        type: String,
        required: true,
        unique: true
    },
    late_penalty : String,
    num_peers : {
        type: Number,
        min: 0,
        max: 7
    },
    required_files : [String],
    repo_path : String,
    folder_name: String,
    instruction : String,
    num_feedbacks : {
        type: Number,
        max: 20
    },
    feedback_questions: [String],
    student_submission_deadline : String,
    release_to_peers : String,
    peer_review_deadline : String,
    release_to_tas : String,
    ta_review_deadline : String,
    release_to_students : String,
    release : Number,
    release_self_review : Number,
    release_mark : Number,
    loaded : Number,
    distributed : Number,
    ta_distributed : Number,
    ta_selected : [String]
});

module.exports = mongoose.model('rules', rule_schema);
