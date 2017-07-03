Update Work
===
### Description
Update the work information of given **work_id**. NOTE: will overwrite original.

### Method
POST

### URL Structure
`api/works`

### User Privileges
* `Administrator`: Full Access
* `Other`: No Access

#### Request Body
| Queries                | Type             | Required? | Description                                   |
|------------------------|------------------|-----------|-----------------------------------------------|
| **work_id**            | String           | Yes       | The id of this work.                          |
| **name**               | String           | No        | The new name of this work.                    |
| **num_peers**          | Number           | No        | The new  number of peer reviews of this work. |
| **required_files**     | Array of Strings | No        | The new list of required files of this work.  |
| **feedback_questions** | Array of Strings | No        | The list of feedback questions for this work. |
| **repo_path**          | String           | No        | The markus repo path                          |

### Validation
| Action                              | Status | Expected Response                                                         |
|-------------------------------------|--------|---------------------------------------------------------------------------|
| **work_id** not inputted.           | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/work_id" ] }` |
| Additional Fields inputted.         | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| No active work with **work_id**.    | 404    | `{ "code": "NOT_FOUND", "param": [ "#/work_id" ] }`                       |
| **num_peers** than maximum allowed. | 400    | `{ "code": "MAXIMUM","param": [ "#/num_peers" ] }`                        |
| **num_peers** than minimum allowed. | 400    | `{ "code": "MINIMUM","param": [ "#/num_peers" ] }`                        |

#### Example Request Body
```
"data": {
    "work_id", "5935ed0e5ecf04cc3388de8e"
    "work_name": "Assignment 1",
    "num_peers": 5,
    "required_files": [ "a1.py", "a2.py"],
    "repo_path": "assignment/a1"
}
```
#### Example Response
```
{
    "status": 200,
    "data": "5935ed0e5ecf04cc3388de8e"
}
```