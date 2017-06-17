Filter Students
===

### Description
Returns all students that matches the input filters.

### Method
GET

### URL Structure
`api/users/students/all`

### User Privileges
* `Administrator`: Full Access
* `Other`: Not Allowed

### Request Query
| Field              | Type   | Required? | Description                        |
|--------------------|--------|-----------|------------------------------------|
| **email**          | String | No        | The email of the student.          |
| **user_id**        | String | No        | The id of the student.             |
| **first_name**     | String | No        | The first name of the student.     |
| **last_name**      | String | No        | The last name of the student.      |
| **utorid**         | String | No        | The utorid of the student.         |
| **student_number** | Number | No        | The student number of the student. |
| **status**         | String | No        | The status of the student.         |

### Validation
| Action                                      | Status | Expected Response                                                         |
|---------------------------------------------|--------|---------------------------------------------------------------------------|
| Additional Fields inputted.                 | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`     |
| Session user does not have access to route. | 403    | `{ "code": "Forbidden" }`                                                 |

#### Example Request Query
```
{
    "user_id": 1232,
    "student_id" 1314,
    "first_name" "Grey",
    "last_name": "Gxsanda",
    "utorid": "gxsanda1",
    "email": "grey.gxsanda@mail.utoronto.ca",
    "last_login": "01-23-13 13:03:32"
}
```
#### Example Response
```
{
    "status": 200,
    "data" : [
        {
            "user_id": 1232,
            "student_number" 1314,
            "first_name" "Grey",
            "last_name": "Gxsanda",
            "utorid": "gxsanda1",
            "email": "grey.gxsanda@mail.utoronto.ca",
            "last_login": "01-23-13 13:03:32"
        },
        ...
    ]
}
```