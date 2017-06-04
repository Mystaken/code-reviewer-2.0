var mongoose = require('mongoose');

module.exports = {
    annotation_id: mongoose.Schema.Types.ObjectId,
    work_id: mongoose.Schema.Types.ObjectId,
    review_by: mongoose.Schema.Types.ObjectId,          // the student id who writes this review
    annotation: String,
    start: Number,
    end: Number
}
