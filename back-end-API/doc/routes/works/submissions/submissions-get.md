Get Work
===
### Description
Return the submission information for **submission_d**

### Method
GET

### URL Structure
`api/works/submissions`

### User Privileges
* `Administrator`: Full Access
* `Other`: Only if submission belongs to student

### Request Query
| Field             | Type   | Required? | Description                |
|-------------------|--------|-----------|----------------------------|
| **submission_id** | String | Yes       | The id of this submission. |

### Validation
| Action                                            | Status | Expected Response                                                         |
|---------------------------------------------------|--------|---------------------------------------------------------------------------|
| **submission_id* not inputted.                    | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/work_id" ] }` |
| Additional Fields inputted.                       | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| No active work with **work_id**.                  | 404    | `{ "code": "NOT_FOUND", "param": [ "#/work_id" ] }`                       |
| Session user does not have access to **work_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/work_id" ] }`                       |

#### Example Request Body
```
{
    "submission_id": 42
}
```
#### Example Response
```
{
   "status": 200,
   "data": {
       "submission_id": 42,
       "work_id": 123,
       "author_id": 142,
       "file_name": "ex1.py",
       "mark": 0
   }
}
```
