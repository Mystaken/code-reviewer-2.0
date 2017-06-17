Get Work
===
### Description
Return the work information for the user with **work_id**

### Method
GET

### URL Structure
`api/works`

### User Privileges
* `Other`: Full Access

### Request Body
| Field       | Type   | Required? | Description          |
|------------ |--------|-----------|----------------------|
| **work_id** | String | Yes       | The id of this work. |

### Validation
| Action                          | Status | Expected Response                                                         |
|---------------------------------|--------|---------------------------------------------------------------------------|
| **work_id** not inputted.       | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/work_id" ] }` |
| Additional Fields inputted.     | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| No active work with **work_id** | 404    | `{ "code": "NOT_FOUND", "param": [ "#/work_id" ] }`                       |

#### Example Request Body
```
{
   "work_id": 123
}
```

#### Example Response
```
{
   "status": 200,
   "data": {
      "work_id": 123,
      "name": "Assignment 1",
      "num_peers": 5,
      "required_files": [ "a1.py", "a2.py"],
      "feedback_questions": [ "Is this good?" ],
      "repo_path": "assignment/a1"
   }
}
```