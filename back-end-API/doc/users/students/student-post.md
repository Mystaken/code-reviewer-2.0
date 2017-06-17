Update Student
===
### Description
Update the students info of the given **user_id**

### Method
POST

### URL Structure
`api/users/students/`

### User Privileges
* `Administrator`: Full Access
* `Other`: Not Allowed

### Request Query
| Queries        | Type   | Required? | Description                        |
|----------------|--------|-----------|------------------------------------|
| **user_id**    | String | Yes       | The id of the student.             |
| **first_name** | String | No        | The new first name of the student. |
| **last_name**  | String | No        | The new last name of the student.  |