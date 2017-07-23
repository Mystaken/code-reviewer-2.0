Upload Submission File
===
### Description
Upload a file to **work_id**.

### Method
PUT

### URL Structure
`api/works/submissions/files`

### User Privileges
* `Administrator`: Full Access
* `Other`: Only if **work_id** belongs to session user.

### Request Body
| Field             | Type   | Required? | Description                |
|-------------------|--------|-----------|----------------------------|
| **work_id** | String | Yes       | The id of this submission. |

### Validation
| Action                                            | Status | Expected Response                                                               |
|---------------------------------------------------|--------|---------------------------------------------------------------------------------|
| **work_id** not inputted.                         | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/submission_id" ] }` |
| Additional Fields inputted.                       | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No active submission with **work_id**.            | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| Session user does not have access to **work_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |

#### Example Request Body
```
{
    "work_id": "5935ed0e5ecf04cc3388de8e",
    "file": "def func(a, b):\n    pass"
}
```
#### Example Response
```
{
    "status": 200,
    "data": "2315ed0e5ecf04cc3388de8e" // the file_id
}
```
