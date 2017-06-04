# API Documentation
## Table of contents
 * **Users**(#users)
    * [/users/ - POST](#get-user)
    * [**Students**](#students)
      * [/users/students - GET](#filter-students)
      * [/users/students/:id - GET](#get-student)
### Users

#### Get User
Return the user information for the user of the userid.
#### Method
POST
#### URL Structure
`api/users/`
#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|---------------|-----------------|--------------|--------------|
| **id** |    String              |     Yes      |  The id of the user.  |

#### Example Request Body
```
{
   id: 1232
}
```
#### Example Response
```
{
   "status": 200,
   "data" : {
      "id": 1232,
      "utorid": "gxsanda1",
      "user_type": "Instructor",
      "first_name" "Grey",
      "last_name": "Gxsanda",
      "email": "grey.gxsanda@mail.utoronto.ca"
   }
}
```
### Students
#### Filter Students
Returns all students that matches this field.

##### Method
GET
##### URL structure
`/api/users/students/`
##### Request Queries

| Queries        |      Type      |    Required?    |  Description |
|---------------|-------------|----|------|
| **email**     |  String         |        No        |  The email of the student.|
| **id** |    String              |        No        |  The id of the student. |
| **first_name** | String         |        No        |  The first name of the student.  |
| **last_name** | String          |        No        |  The last name of the student.  |
| **utorid** | String             |        No        |  The utorid of the student.  |
| **student_number**     | Number |        No        |  The student number of the student.  |
| **status** | String             |        No        |  The status of the student.   |
| **contract_number**    | Number |        No        |  The contract number of the student. |
| **user_type** | String          |        No        |  The user type of the student.   |



#### Get Student
##### Method
GET
##### URL structure
`/api/users/students/123456`
##### Request Parameters

| Parameter       |      Type      | Required? |  Description |
|---------------|-------------|---|--------|
| **id**     |  String         | Yes | The id of the student. |
