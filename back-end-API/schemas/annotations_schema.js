var mongoose = require('mongoose');

module.exports = {
    work_id: mongoose.Schema.Types.ObjectId,
    review_by: mongoose.Schema.Types.ObjectId,          // the student id who writes this review
    annotation: String,
    start: Number,
    end: Number
}
