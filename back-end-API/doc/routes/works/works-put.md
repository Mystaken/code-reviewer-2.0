Create Work
===
### Description
Create a work from the provided work information.

### Method
PUT

### URL Structure
`api/works`

### User Privileges
* `Administrator`: Full Access
* `Other`: No Access

#### Request Body
| Field                  | Type             | Required? | Description                                                      |
|------------------------|------------------|-----------|------------------------------------------------------------------|
| **name**               | String           | Yes       | The name of this work.                                           |
| **num_peers**          | Number           | No        | The number of students who will be assigned to review each work. |
| **required_files**     | Array of Strings | No        | The required files for this assignment.                          |
| **feedback_questions** | Array of Strings | No        | The list of feedback questions for this work.                    |
| **repo_path**          | String           | No        | The markus repo path                                             |


### Validation
| Action                                      | Status | Expected Response                                                         |
|---------------------------------------------|--------|---------------------------------------------------------------------------|
| **name** not inputted.                      | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/name" ] }`    |
| Additional Fields inputted.                 | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| **num_peers** greater than maximum allowed. | 400    | `{ "code": "MAXIMUM","param": [ "#/num_peers" ] }`                        |
| **num_peers** lower than minimum allowed.   | 400    | `{ "code": "MINIMUM","param": [ "#/num_peers" ] }`                        |

#### Example Request Body
```
{
    "name": "Assignment 1",
    "num_peers": 5,
    "required_files": [ "a1.py", "a2.py"],
    "repo_path": "assignment/a1",
    "feedback_questions": [ "Is this good?" ]
}
```

#### Example Response
```
{
    "status": 200,
    "data": "5935ed0e5ecf04cc3388de8e"
}
```