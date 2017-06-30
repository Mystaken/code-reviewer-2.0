Delete Work
===
### Description
Delete a **work_id**.

### Method
DELETE

### URL Structure
`api/works`

### User Privileges
* `Administrator`: Full Access
* `Other`: No Access

### Request Query
| Field       | Type   | Required? | Description          |
|-------------|--------|-----------|----------------------|
| **work_id** | String | Yes       | The id of this work. |

### Validation
| Action                               | Status | Expected Response                                                         |
|--------------------------------------|--------|---------------------------------------------------------------------------|
| **work_id** not inputted.            | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/work_id" ] }` |
| Additional Fields inputted.          | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| No active work with **work_id**.     | 404    | `{ "code": "NOT_FOUND", "param": [ "#/work_id" ] }`                       |


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
    "data": "5935ed0e5ecf04cc3388de8e"
}
```
