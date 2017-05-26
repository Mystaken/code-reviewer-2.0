module.exports = {
    name: String,               // name of this file
    utorid: String,             // utorid of the student
    review_by: Array,           // students going to review this code
    ta: String,                 // the TA who is going to mark this assignment
    code: String,               // the actual code
    report: String,             // the report.txt
    failed_test_cases: Array,   // [String] or [Number]
    self_assess : Number,       
    mark : Number
}