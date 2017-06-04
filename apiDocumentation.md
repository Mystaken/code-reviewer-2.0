# API Documentation
## Table of contents
  * [**Users**](#users)
    * [api/users/ - POST](#get-user)
    * [**Students**](#students)
      * [api/users/students - GET](#filter-students)
      * [api/users/students/:id - GET](#get-student)
      * [api/users/students/ - PUT](#add-students)
      * [api/users/students/upload - POST](#upload-student-file)
  * [**Works**](#works)
    * [api/works - GET](#get-work)
    * [api/works - PUT](#create-work)
    * [api/works - POST](#update-work)
    * [api/works/all - GET](#get-all-work)
    * [**Feedbacks**](#feedbacks)
      * [/api/works/feedbacks - GET](#get-feedback)
      * [/api/works/feedbacks - PUT](#add-feedback)

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
   "id": 1232
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

Works
===

Get Work
---
Get the work for the id.
#### Method
GET
#### URL Structure
`api/works`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **work_id**    |    String      |     Yes      |  The id of this work.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
|  work_id not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"<work_id>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":["<additional_param>"]}` |
| work_id does not exist in database | Return error status `404` with message: `{"code":"NOT_FOUND","param":["work_id"]}`|
#### Example Request Body
```
{
   "work_id": 123
}
```

#### Example Response
```
{
   "status": 200,
   "data": {
      "work_id", 123
      "work_name": "Assignment 1",
      "num_peers": 5,
      "required_files": [ "a1.py", "a2.py"],
      "feedback_questions": [ "Is this good?" ],
      "repo_path": "assignment/a1",
      "student_submission_dead_line": "2017-12-17",
      "peer_review_deadline": "2017-12-30",
      "ta_review_deadline": "2017-12-30"
   }
}
```

Create work
---
Create a work
#### Method
PUT
#### URL Structure
`api/works`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **work_name**       |    String      |     Yes      |  The name of this work.  |
| **num_peers**  |    Number      |      Yes     |  The number of students who will be assigned to review each work. |
| **required_files** | Array of Strings | No    | The required files for this assignment. |
| **feedback_questions** | Array of Strings | No | The list of feedback questions for this work. |
| **repo_path**  | String |      No      |  The markus repo path |
| **student_submission_deadline** |   String  | No   |  The deadline of the student submission. Format: YYYY-MM-DD. |
| **peer_review_deadline** |   String  | No   |  The deadline of the student peer review. Format: YYYY-MM-DD. |
| **ta_review_deadline** |   String  | No   |  The deadline of the ta review. Format: YYYY-MM-DD. |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
| field not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"<field>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":["<additional_param>"]}` |
| num_peers larger than maximum in database | Return error status `400` with message: `{"code":"MAXIMUM","param":["num_peers"]}`|
| num_peers lower than minimum in database | Return error status `400` with message: `{"code":"MINIMUM","param":["num_peers"]}`|

#### Example Request Body
```
{
   "work_name": "Assignment 1",
   "num_peers": 5,
   "required_files": [ "a1.py", "a2.py"],
   "repo_path": "assignment/a1",
   "student_submission_dead_line": "2017-12-17",
   "feedback_questions": [ "Is this good?" ],
   "peer_review_deadline": "2017-12-30",
   "ta_review_deadline": "2017-12-30"
}
```

#### Example Response
```
{
   "status": 200,
   "data": 14
}
```

Update Work
---
Update the work. NOTE, the fields inputted will overwrite the original.
#### Method
POST
#### URL Structure
`api/works`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **work_id**    |    String      |     Yes      |  The id of this work.  |
| **name**    |    String      |     No      |  The new name of this work.  |
| **num_peers**    |    Number      |     No      |  The new  number of peer reviews of this work.  |
| **required_files**    |    Array of Strings      |     Yes      |  The new list of required files of this work.  |
| **feedback_questions** | Array of Strings | No | The list of feedback questions for this work. |
| **repo_path**    |    String      |     Yes      |  The new repo_path of this work.  |
| **student_submission_deadline** |   String  | No   |  The deadline of the student submission. Format: YYYY-MM-DD. |
| **peer_review_deadline** |   String  | No   |  The deadline of the student peer review. Format: YYYY-MM-DD. |
| **ta_review_deadline** |   String  | No   |  The deadline of the ta review. Format: YYYY-MM-DD. |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
|  work_id not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"<work_id>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":["<additional_param>"]}` |
| work_id does not exist in database | Return error status `404` with message: `{"code":"NOT_FOUND","param":["work_id"]}`|
| num_peers larger than maximum in database | Return error status `400` with message: `{"code":"MAXIMUM","param":["num_peers"]}`|
| num_peers lower than minimum in database | Return error status `400` with message: `{"code":"MINIMUM","param":["num_peers"]}`|

#### Example Request Body
```
"data": {
   "work_id", 123
   "work_name": "Assignment 1",
   "num_peers": 5,
   "required_files": [ "a1.py", "a2.py"],
   "repo_path": "assignment/a1",
   "student_submission_dead_line": "2017-12-17",
   "peer_review_deadline": "2017-12-30",
   "ta_review_deadline": "2017-12-30",
   "feedback_questions": [ "Is this good?" ]
}
```
#### Example Response
```
{
   "status": 200,
   "data": 123
}
```

Get All Work
---
Get the work for the id.
#### Method
GET
#### URL Structure
`api/works/all`

#### Example Response
```
{
   "status": 200,
   "data": [
      {
         "work_id", 123
         "work_name": "Assignment 1",
         "num_peers": 5,
         "required_files": [ "a1.py", "a2.py"],
         "feedback_questions": [ "Is this good?" ],
         "repo_path": "assignment/a1",
         "student_submission_dead_line": "2017-12-17",
         "peer_review_deadline": "2017-12-30",
         "ta_review_deadline": "2017-12-30"
      },
   ...
   ]
}
```

Feedbacks
===
Get Feedback
---
Return the user information for the user of the userid.
#### Method
POST
#### URL Structure
`api/works/feedbacks`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **feedback_id** |    Number     |     Yes      |  The id of the feedback.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| feedback_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"feedback_id"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":["<additional_param>"]}` |
| feedback_id does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND" }` |
| feedback exists user does not have access to this feedback | Return error status `404` with message: `{ "code": "NOT_FOUND" }` |
#### Example Request Body
```
{
   "feedback_id": 1232
}
```
#### Example Response
```
{
   "status": 200,
   "data" : {
        "feedback_id": 31
        "work_id": 34,
        "feedbacks": [
            "Good",
            "Great"
        ],
        "mark": 79,
        "author": 35
   }
}
```

Add Feedback
---
Return the user information for the user of the userid.
#### Method
PUT
#### URL Structure
`api/works/feedbacks`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **work_id** |    Number     |     Yes      |  The id of the work this feedback belongs to.  |
| **feedbacks** |    Array of String     |     Yes      |  The feedback answers to the feedback questsion in the work.  |
| **author** |    Number    |     Yes      |  The author of this feedback.  |
| **mark** |    Number     |     Yes      |  The mark assigned to this student.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| field not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"<field>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":["<additional_param>"]}` |
| work_id does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND" }` |
| work exists user does not have access to the work | Return error status `404` with message: `{ "code": "NOT_FOUND" }` |
#### Example Request Body
{
    "work_id": 34,
    "feedbacks": [
        "Good",
        "Great"
    ],
    "mark": 79,
    "author": 35
}

#### Example Response
```
{
   "feedback_id": 1232
}
```
