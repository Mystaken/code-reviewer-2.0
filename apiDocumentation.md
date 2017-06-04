# API Documentation
## Table of contents
 * Users
    * [/users/](#get-user)
    * [Students](#students)
      * [/users/students](#filter-students)
      * [/users/students/:id](#get-student)
### Users
<hr>
#### Get User
Return the user information for the user of the userid.
#### Method
POST
#### URL Structure
`api/users/`
#### Request Body

| Queries        |      Type      |  Description |
|---------------|-------------|------|
| **id** |    String              |   |

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
<hr>
### Students
#### Filter Students
Returns all students that matches this field.

##### Method
GET
##### URL structure
`/api/users/students/`
##### Request Queries

| Queries        |      Type      |  Description |
|---------------|-------------|------|
| **email**     |  String         |  |
| **id** |    String              |   |
| **first_name** | String         |    |
| **last_name** | String          |    |
| **utorid** | String             |    |
| **student_number**     | Number |    |
| **status** | String             |     |
| **contract_number**    | Number |   |
| **user_type** | String          |     |



#### Get Student
##### Method
GET
##### URL structure
`/api/users/students/123456`
##### Request Parameters

| Parameter       |      Type      | Required? |  Description |
|---------------|-------------|---|--------|
| **id**     |  String         | Required| |
