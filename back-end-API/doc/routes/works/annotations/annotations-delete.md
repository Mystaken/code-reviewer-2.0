Delete Annotation
===
### Description
Delete annotations with **annotation_id**.

### Method
DELETE

### URL Structure
`api/work/annotations`

### User Privileges
* `Administrator`: Full Access
* `Other`: Only if **annotation_id** belongs to session user

### Request Query
| Field             | Type   | Required? | Description               |
|-------------------|--------|-----------|---------------------------|
| **annotation_id** | String | Yes       | The id of the annotation. |


### Validation
| Action                                                  | Status | Expected Response                                                               |
|---------------------------------------------------------|--------|---------------------------------------------------------------------------------|
| **annotation_id** not inputted.                         | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/submission_id" ] }` |
| Additional Fields inputted.                             | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| No active annotation with **annotation_id**.            | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |
| Session user does not have access to **annotation_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/submission_id" ] }`                       |

#### Example Request Body
```
{
    "annotation_id": "5935ed0e5ecf04cc3388de8e"
}
```
#### Example Response
```
{
    "status": 200,
    "data" : "5935ed0e5ecf04cc3388de8e"
}
```
