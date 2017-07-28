Upload Submission File
===
### Description
Upload a file to **work_id**.

### Method
POST

### URL Structure
`api/works/submissions/files`

### User Privileges
* `Administrator`: Full Access

### Request Body
| Field             | Type   | Required? | Description                |
|-------------------|--------|-----------|----------------------------|
| **work_id**       | String | Yes       | The id of this submission. |
| **submission**    | File   | Yes       | The file to be uploaded.  |

### Validation
| Action                                            | Status | Expected Response                                                               |
|---------------------------------------------------|--------|--------------------------------------------------------------------------------|
| **work_id** not inputted.                         | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/work_id" ] }` |
| Additional Fields inputted.                       | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No active submission with **work_id**.            | 404    | `{ "code": "NOT_FOUND", "param": [ "#/work_id" ] }`                       |
| File invalid.                                     | 400    | `{ "code": "NOT_FOUND", "param": [ "#/submission" ] }`                        |

#### Example Request Body
```
{
    "work_id": "5935ed0e5ecf04cc3388de8e"
}
```
#### Example Response
```
{
    "status": 200,
    "data": "2315ed0e5ecf04cc3388de8e"// the file_id
}
```
