Get Student
===
##### NOTE: TA privileges still in progress

### Description
Return the student information for the student with **user_id**

### Method
GET

### URL Structure
`api/users/students`

### User Privileges
* `Administrator`: Full Access
* `Student`: Only access to **session_user_id**
* `TA`: If TA is reviewing the students work.

### Request Query
| Field          | Type   | Required? | Description              |
|----------------|--------|-----------|--------------------------|
| **user_id**    | String | Yes       |  The id of the student.  |


### Validation
| Action                                | Status | Expected Response                                                         |
|---------------------------------------|--------|---------------------------------------------------------------------------|
| **user_id** not inputted or invalid.  | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/user_id" ] }` |
| Additional Fields inputted.           | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| Student has no access to **user_id**. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/user_id" ] }`                       |
| TA has no access to **user_id**.      | 404    | `{ "code": "NOT_FOUND", "param": [ "#/user_id" ] }`                       |
| No active user with **user_id**.      | 404    | `{ "code": "NOT_FOUND", "param": [ "#/user_id" ] }`                       |
| **user_id** exists but not a student. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/user_id" ] }`                       |


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
    "data" : {
        "user_id": "59447dc6fe01ea7a6edb4e34" ,
        "student_number" 1314,
        "first_name" "Grey",
        "last_name": "Gxsanda",
        "utorid": "gxsanda1",
        "email": "grey.gxsanda@mail.utoronto.ca",
        "last_login": "01-23-13 13:03:32"
    }
}
```