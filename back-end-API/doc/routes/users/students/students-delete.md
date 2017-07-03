Delete Student
===
### Description
Delete a student of the given **user_id**

### Method
DELETE

### URL Structure
`api/users/students`

### User Privileges
* `Administrator`: Full Access
* `Other`: No access

### Request Body
| Field          | Type   | Required? | Description                        |
|----------------|--------|-----------|------------------------------------|
| **user_id**    | String | Yes       | The id of the student.             |


### Validation
| Action                                       | Status | Expected Response                                                         |
|----------------------------------------------|--------|---------------------------------------------------------------------------|
| **user_id** not inputted.                    | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/user_id" ] }` |
| Additional Fields inputted.                  | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| No active user with **user_id**.             | 404    | `{ "code": "NOT_FOUND", "param": [ "#/user_id" ] }`                       |
| Session user does not have access to route.  | 403    | `{ "code": "Forbidden" }`                                                 |

#### Example Request Body
```
{
    "user_id": "59447dc6fe01ea7a6edb4e34"
}
```
#### Example Response
```
{
    "status": 200,
    "data" : "59447dc6fe01ea7a6edb4e34"
}
```
