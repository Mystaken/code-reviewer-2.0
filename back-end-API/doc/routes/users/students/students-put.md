Add Student
===
### Description
Create a student from the provided student information.

### Method
PUT

### URL Structure
`api/users/students`

### User Privileges
* `Administrator`: Full Access
* `Other`: Not Allowed

### Request Body
| Field              | Type    | Required? |  Description                       |
|--------------------|---------|-----------|------------------------------------|
| **email**          | String  | Yes       |  The email of the student.         |
| **first_name**     | String  | Yes       |  The first name of the student.    |
| **last_name**      | String  | Yes       |  The last name of the student.     |
| **utorid**         | String  | Yes       |  The utorid of the student.        |
| **student_number** | String  | Yes       |  The student number of the student.|

### Validation
| Action                                      | Status | Expected Response                                                               |
|---------------------------------------------|--------|---------------------------------------------------------------------------------|
| Required field not inputted.                | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/<field>" ] }`       |
| Additional fields inputted.                 | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`           |
| Active student already exists.              | 400    | `{ "code": "EXISTS", "param": [ "#/email", "#/utorid", "#/student_number" ] }`  |
| Deleted student exists.                     | 400    | `{ "code": "EXISTS", "param": [ "#/email", "#/utorid", "#/student_number" ] }`  |
| **email** length greater than 1000.         | 400    | `{ "code": "MAXIMUM", "param": [ "#/email", "#/utorid", "#/email" ] }`          |
| **first_name** length greater than 100.     | 400    | `{ "code": "MAXIMUM", "param": [ "#/email", "#/utorid", "#/first_name" ] }`     |
| **last_name** length greater than 100.      | 400    | `{ "code": "MAXIMUM", "param": [ "#/email", "#/utorid", "#/last_name" ] }`      |
| **utorid** length greater than 100.         | 400    | `{ "code": "MAXIMUM", "param": [ "#/email", "#/utorid", "#/utorid" ] }`         |
| **student_number** length greater than 100. | 400    | `{ "code": "MAXIMUM", "param": [ "#/email", "#/utorid", "#/student_number" ] }` |

#### Example Request Body
```
{
    "student_number": 1001524987,
    "email": "kevin.gao@hotmail.com",
    "first_name": "Kevin",
    "last_name": "Gao",
    "utorid": "gaotianx",
}
```
#### Example Response
```
{
   "status": 200,
   "data" : "59447dc6fe01ea7a6edb4e34"
}
```
