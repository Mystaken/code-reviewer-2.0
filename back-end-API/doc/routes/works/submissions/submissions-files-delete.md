Delete Submission File
===
### Description
Delete a file to **submission_id**.

### Method
DELETE

### URL Structure
`api/works/submissions/files`

### User Privileges
* `Administrator`: Full Access
* `Other`: Only if **submission_id** belongs to session user.

### Request Body
| Field        | Type   | Required? | Description          |
|--------------|--------|-----------|----------------------|
| **file_id**  | String | Yes       | The id of this file. |

### Validation
| Action                                            | Status | Expected Response                                                         |
|---------------------------------------------------|--------|---------------------------------------------------------------------------|
| **file_id** not inputted.                         | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/file_id" ] }` |
| Additional Fields inputted.                       | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| No active submission with **file_id**.            | 404    | `{ "code": "NOT_FOUND", "param": [ "#/file_id" ] }`                       |
| Session user does not have access to **file_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/file_id" ] }`                       |

#### Example Request Body
```
{
    "file_id": "5935ed0e5ecf04cc3388de8e"
}
```
#### Example Request Body
```
{
    "status": 200,
    "data": "5935ed0e5ecf04cc3388de8e"
}
```
