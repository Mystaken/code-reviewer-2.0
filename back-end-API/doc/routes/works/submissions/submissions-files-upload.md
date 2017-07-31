Upload Submission File
===
### Description
Upload a file to **submission_id**.

### Method
POST

### URL Structure
`api/works/submissions/files`

### User Privileges
* `Other`: Full Access

### Request Body
| Field          | Type   | Required? | Description                            |
|----------------|--------|-----------|----------------------------------------|
| **submission_id**    | String | Yes       | The id of the submission. |
| **submission** | File   | Yes       | The file to be uploaded.               |
| **name**       | String | Yes       | The name of this submission.           |

### Validation
| Action                                            | Status | Expected Response                                                               |
|---------------------------------------------------|--------|--------------------------------------------------------------------------------|
| **submission_id** not inputted.                         | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/submission_id" ] }` |
| Additional Fields inputted.                       | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No active submission with **submission_id**.            | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| File invalid.                                     | 400    | `{ "code": "NOT_FOUND", "param": [ "#/submission" ] }`                        |

#### Example Request Body
```
{
    "submission_id": "5935ed0e5ecf04cc3388de8e",
    "name": "a1"
}
```
#### Example Response
```
{
    "status": 200,
    "data": "2315ed0e5ecf04cc3388de8e"// the file_id
}
```
