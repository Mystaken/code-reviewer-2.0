Delete Submission File
===
### Description
Delete file **submission_file_id**.

### Method
Delete

### URL Structure
`api/works/submissions/files`

### User Privileges
* `Admin`: Full Access
* `Other`: Only if file belongs to session user.

### Request Body
| Field       | Type   | Required? | Description                            |
|-------------|--------|-----------|----------------------------------------|
| **submission_file_id** | String | Yes       | The id of the work for the submission. |

### Validation
| Action                                            | Status | Expected Response                                                               |
|---------------------------------------------------|--------|---------------------------------------------------------------------------------|
| **submission_file_id** not inputted.                         | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/submission_file_id" ] }` |
| Additional Fields inputted.                       | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No active submission with **submission_id**.            | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_file_id" ] }`                       |

#### Example Request Body
```
{
    "submission_file_id": "5935ed0e5ecf04cc3388de8e"
}
```
#### Example Response
```
{
    "status": 200,
    "data": "5935ed0e5ecf04cc3388de8e"
}
```
