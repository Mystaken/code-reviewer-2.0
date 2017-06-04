# API Documentation
## Table of contents
 * Users
    * [Students](#students)
      * [/users/students](#filter-students)
      * [/users/students/:id](#get-students)

### Students
#### Filter Students
Returns all students that matches this field.

##### Method
GET
##### URL structure
`http://localhost:3000/api/users/students/`
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



###### Get Student
## Method
GET
## URL structure
`http://localhost:3000/api/users/students/123456`
## Request Parameters

| Parameter       |      Type      | Required? |  Description |
|---------------|-------------|---|--------|
| **id**     |  String         | Required| |
