Get All Work
===
### Description
Return all works in the database.

### Method
GET

### URL Structure
`api/works/all`

### User Privileges
* `Other`: Full Access

### Validation
| Action                      | Status | Expected Response                                                     |
|-----------------------------|--------|-----------------------------------------------------------------------|
| Additional Fields inputted. | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }` |

#### Example Response
```
{
    "status": 200,
    "data": [
        {
            "work_id", 123
            "work_name": "Assignment 1",
            "num_peers": 5,
            "required_files": [ "a1.py", "a2.py"],
            "feedback_questions": [ "Is this good?" ],
            "repo_path": "assignment/a1",
            "student_submission_deadline": "2017-10-20",
            "peer_review_deadline": "2017-10-20",
            "ta_review_deadline": "2017-10-20"
        },
        ...
    ]
}
```
