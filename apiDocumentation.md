# API Documentation
## Table of contents
  * [**Users**](#users)
    * [/users/ - POST](#get-user)
    * [**Students**](#students)
      * [/users/students - GET](#filter-students)
      * [/users/students/:id - GET](#get-student)
      * [/users/students/ - PUT](#add-students)
      * [/users/students/upload - POST](#upload-student-file)

Users
===

Get User
---
Return the user information for the user of the userid.
#### Method
POST
#### URL Structure
`api/users/`
#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|---------------|-----------------|--------------|--------------|
| **user_id** |    String              |     Yes      |  The id of the user.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
| user_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"user_id"}` |
| user_id exists but user doesn't have permission to view user. | Return error status `404` with message: `{ "code": "NOT_FOUND" }` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":["<additional_param>"]}` |
| user_id does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND" }` |

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
Students
===

Filter Students
---
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



Get Student
---
##### Method
GET
##### URL structure
`/api/users/students/123456`
##### Request Parameters

| Parameter       |      Type      | Required? |  Description |
|---------------|-------------|---|--------|
| **id**     |  String         | Yes | The id of the student. |

Add Students
---
Adds a student to the database
#### Method
PUT
#### URL Structure
`api/users/students`
#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|---------------|-----------------|--------------|--------------|
| **email**     |  String         |        Yes        |  The email of the student.|
| **first_name** | String         |        Yes        |  The first name of the student.  |
| **last_name** | String          |        Yes        |  The last name of the student.  |
| **utorid** | String             |        Yes        |  The utorid of the student.  |
| **student_number**     | Number |        Yes        |  The student number of the student.  |


#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
| field not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"<field>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":["<additional_param>"]}` |

#### Example Request Body
```
{
      "id": 1232,
      "first_name" "Grey",
      "last_name": "Gxsanda",
      "utorid": "gxsanda1",
      "email": "grey.gxsanda@mail.utoronto.ca"
}
```
#### Example Response
```
{
   "status": 200,
   "data" : 12352 
}

```

Upload Student File
---
Upload a student csv file and add the students to the server
#### Method
POST

#### File format
UTORiD,First Name,Last Name,Student Number,Email

#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
| CSV file corrupted/incorrect format | Return `400` with message { "code": "INVALID_INPUT", error: "File corrupted or incorrect format" } |
#### URL Structure
`api/users/students/upload`

#### Example Response
```
{
   "status": 200
}
```