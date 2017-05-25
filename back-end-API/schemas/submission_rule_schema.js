{
    name: {                         // name of this work
        type: String,
        required: true,
        uinque: true
    }
    deadline: Date,
    num_peers : {                   // number of students in a group
        type: Number,
        min: 0,
        max: 7
    },
    required_files : [String],      // e.g. ["a1_design.py", "a1_testing.py"]
    repo_path: String,              // repo from MarkUs
    instruction: String,            // some submission instruction about this wrok,
                                    // e.g. your code must not contain any import statements
    feedback_questions: [String],   // e.g. How descriptive the variable names are
                                    //      Is this function efficient
    student_submission_deadline : Date,
    release_to_peers : Date,
    peer_review_deadline : Date,
    release_to_tas : Date,
    ta_review_deadline : Date,
    release_to_students : Date
}

