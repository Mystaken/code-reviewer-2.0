var mongoose = require('mongoose');

module.exports = {
    work_id: mongoose.Schema.Types.ObjectId,
    review_by: mongoose.Schema.Types.ObjectId,          // the student id who writes this review
    feedbacks: [String], 
    highlights: [String],       // annotations added by students
    num_stars : {
        type: Number,
        max: 5
    },
    mark : Number
}
