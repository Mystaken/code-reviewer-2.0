Update Submission
===
### Description
Update the submission for **submission_id**.

### Method
POST

### URL Structure
`api/works/submissions`

### User Privileges
* `Administrator`: Full Access
* `Other`: No Access

### Request Query
| Field             | Type   | Required? | Description                |
|-------------------|--------|-----------|----------------------------|
| **submission_id** | String | Yes       | The id of this submission. |
| **mark**          | Number | Yes       | The id of this submission. |

### Validation
| Action                                                  | Status | Expected Response                                                               |
|---------------------------------------------------------|--------|---------------------------------------------------------------------------------|
| **submission_id** not inputted.                         | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/submission_id" ] }` |
| Additional Fields inputted.                             | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No active submission with **submission_id**.            | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| Session user does not have access to **submission_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| **mark** greater than maximum allowed.                  | 400    | `{ "code": "MAXIMUM","param": [ "#/mark" ] }`                                   |
| **mark** lower than minimum allowed                     | 400    | `{ "code": "MINIMUM","param": [ "#/mark" ] }`                                   |

#### Example Request Body
```
{
    "file_id": "5935ed0e5ecf04cc3388de8e"
    "mark": "99"
}
```
#### Example Response
```
{
    "status": 200,
    "data": "5935ed0e5ecf04cc3388de8e"
}
```
