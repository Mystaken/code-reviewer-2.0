Get Submission
===
### Description
Return the submission information for **submission_id**

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
| Action                                                  | Status | Expected Response                                                               |
|---------------------------------------------------------|--------|---------------------------------------------------------------------------------|
| **submission_id** not inputted.                         | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/submission_id" ] }` |
| Additional Fields inputted.                             | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No active work with **submission_id**.                  | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| Session user does not have access to **submission_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |

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
       "submission_id": "5935ed0e5ecf04cc3388de8e",
       "work_id": "5935ed0e5ecf04cc3388de8f",
       "author_id": "5935ed0e5ecf04cc3388de8f",
       "files": ["5935ed0e5ecf04cc3388de8e", "5935ed0e5ecf04cc3388de8f"],
       "create_date": "1996-12-30"
   }
}
```
