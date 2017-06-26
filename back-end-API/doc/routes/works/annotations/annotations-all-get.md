Get All Annotations
===
### Description
Return all annotations for a specific **submission_id**.

### Method
GET

### URL Structure
`api/work/annotations/all`

### User Privileges
* `Administrator`: Full Access
* `Other`: Only if **submission_id** belongs to session user

### Request Query
| Field             | Type   | Required? | Description               |
|-------------------|--------|-----------|---------------------------|
| **submission_id** | String | Yes       | The id of the submission. |

### Validation
| Action                                                  | Status | Expected Response                                                               |
|---------------------------------------------------------|--------|---------------------------------------------------------------------------------|
| **submission_id** not inputted or invalid.              | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/submission_id" ] }` |
| **user_id** not inputted or invalid.                    | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/user_id" ] }` |
| Additional Fields inputted.                             | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No annotations for **submission_id**                    | 200    | Empty list                                                                      |
| No active submission with **submission_id**.            | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| Session user does not have access to route.             | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| Session user does not have access to **submission_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |

#### Example Request Body
{
  "submission_id": "5935ed0e5ecf04cc3388de8e"
}

#### Example Response
```
{
    "status": 200,
    "data": {
        "submission_id": "5935ed0e5ecf04cc3388de8e",
        "annotations": [
            {
                "annotation": "A good one",
                "start": 4,
                "end": 10,
                "annotation_id": "5935ed0e5ecf04cc3388de8e"
            },
            ...
        ]
    }
}
```