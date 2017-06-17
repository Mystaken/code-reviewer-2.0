Put Students
===
### Description
Create a student from the provided student information.

### Method
PUT

### URL Structure
`api/users/students/`

### User Privileges
* `Administrator`: Full Access
* `Other`: Not Allowed

### Request Body
| Queries            | Type    | Required? |  Description                       |
|--------------------|---------|-----------|------------------------------------|
| **email**          | String  | Yes       |  The email of the student.         |
| **first_name**     | String  | Yes       |  The first name of the student.    |
| **last_name**      | String  | Yes       |  The last name of the student.     |
| **utorid**         | String  | Yes       |  The utorid of the student.        |
| **student_number** | Number  | Yes       |  The student number of the student.|

### Validation
| Action                                      | Status | Expected Response                                                              |
|---------------------------------------------|--------|--------------------------------------------------------------------------------|
| Session user does not have access to route. | 403    | `{ "code": "Forbidden" }`                                                      |
| Required field not inputted                 | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/<field>" ] }`      |
| Additional fields inputted                  | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`          |
| Student already exists                      | 400    | `{ "code": "EXISTS", "param": [ "#/email", "#/utorid", "#/student_number" ] }` |

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