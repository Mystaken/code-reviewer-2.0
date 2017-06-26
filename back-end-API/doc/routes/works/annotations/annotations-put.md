Add Annotation
===
### Description
Add a new annotation for **submission_id**.

### Method
DELETE

### URL Structure
`api/work/annotations`

### User Privileges
* `Administrator`: Full Access
* `Other`: Only if user is reviewing **submission_id**.

### Request Query
| Field             | Type   | Required? | Description                                  |
|-------------------|--------|-----------|----------------------------------------------|
| **submission_id** | Number | Yes       |  The id of the submission of the annotation. |
| **annotation**    | String | Yes       |  The annotation.                             |
| **start**         | Number | Yes       |  The start of the annotation.                |
| **end**           | Number | Yes       |  The end of the annotation.                  |


### Validation
| Action                                       | Status | Expected Response                                                               |
|----------------------------------------------|--------|---------------------------------------------------------------------------------|
| Required field not inputted.                 | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/<field>" ] }`       |
| Additional Fields inputted.                  | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No active submission with **submission_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| User not reviewing **submission_id**.        | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| **start** after **end**.                     | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |

#### Example Request Body
```
{
    "submission_id": "5935ed0e5ecf04cc3388de8e",
    "annotation": "A good one",
    "start": 4,
    "end": 10
}
```

#### Example Response
```
{
   "status": 200,
   "data": "5935ed0e5ecf04cc3388de8e"
}
```