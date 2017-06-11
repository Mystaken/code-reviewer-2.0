# API Documentation
## Table of contents
  * [**Users**](#users)
    * [api/users/ - GET](#get-user)
    * [**Students**](#students)
      * [api/users/students/all - GET](#filter-students)
      * [api/users/students/ - GET](#get-student)
      * [api/users/students/ - PUT](#add-students)
      * [api/users/students/ - POST](#update-students)
      * [api/users/students/ - DELETE](#delete-students)
      * [api/users/students/upload - POST](#upload-student-file)
  * [**Works**](#works)
    * [api/works - GET](#get-work)
    * [api/works - PUT](#create-work)
    * [api/works - POST](#update-work)
    * [api/works/all - GET](#get-all-work)
    * [**Feedbacks**](#feedbacks)
      * [/api/works/feedbacks - GET](#get-feedback)
      * [/api/works/feedbacks - PUT](#add-feedback)
      * [/api/works/feedbacks - POST](#update-feedback)
    * [**Annotations**](#annotations)
      * [/api/works/annotations - GET](#get-annotation)
      * [/api/works/annotations - PUT](#add-annotation)
      * [/api/works/annotations - POST](#update-annotation)
      * [/api/works/annotations - DELETE](#delete-annotation)
    * [**Submissions**](#submissions)
      * [/api/works/submissions - GET](#get-submission)
      * [/api/works/submissions - POST](#update-submission)
      * [/api/works/submissions - DELETE](#delete-submission)
      * [/api/works/submissions/upload - POST](#upload-submission)

Users
===

Get User
---
Return the user information for the user of the userid.
#### Method
GET
#### URL Structure
`api/users/`
#### Request Query
| Queries        |  Type     |  Required?   |  Description          |
|----------------|-----------|--------------|-----------------------|
| **user_id**    |  String   |     Yes      |  The id of the user.  |

#### Validation
|  Action       |  Expected Result |
|---------------|-------------| 
| user_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param": "#/user_id" }` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param": "#/<additional_param>" }` |
| user exists but user doesn't have permission to view user. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/user_id" }` |
| user does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/user_id" }` |

#### Example Request Body
```
{
   "user_id": 1232
}
```
#### Example Response
```
{
   "status": 200,
   "data" : {
      "user_id": 1232,
      "utorid": "gxsanda1",
      "user_type": "Instructor",
      "first_name" "Grey",
      "last_name": "Gxsanda",
      "email": "grey.gxsanda@mail.utoronto.ca",
      "last_login": "01-23-13 13:03:32"
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
`/api/users/students/all`
##### Request Queries

| Queries        |      Type      |    Required?    |  Description |
|----------------|-------------|----|------|
| **email**     |  String         |        No        |  The email of the student.|
| **user_id** |    String              |        No        |  The id of the student. |
| **first_name** | String         |        No        |  The first name of the student.  |
| **last_name** | String          |        No        |  The last name of the student.  |
| **utorid** | String             |        No        |  The utorid of the student.  |
| **student_number**     | Number |        No        |  The student number of the student.  |
| **status** | String             |        No        |  The status of the student.   |

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
   ]
}
```
Get Student
---
##### Method
GET
##### URL structure
`/api/users/students`
##### Request Query

| Parameter       |      Type      | Required? |  Description |
|---------------|-------------|---|--------|
| **user_id**     |  String         | Yes | The id of the student. |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
| user_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param": "#/user_id"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |
| user exists but user doesn't have permission to view user. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/user_id" }` |
| user does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/user_id" }` |

#### Example Request Body
```
{
      "user_id": 1232
}
```
#### Example Response
```
{
   "status": 200,
   "data" : {
      "user_id": 1232,
      "student_number" 1314,
      "first_name" "Grey",
      "last_name": "Gxsanda",
      "utorid": "gxsanda1",
      "email": "grey.gxsanda@mail.utoronto.ca",
      "last_login": "01-23-13 13:03:32"
   }
}

```

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
| field not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/<field>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |

#### Example Request Body
```
{
      "student_number": 1232,
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
Update Students
---
Updates a student to the database
#### Method
POST
#### URL Structure
`api/users/students`
#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|---------------|-----------------|--------------|--------------|
| **user_id**     |  Int         |        Yes        |  The id of the student.|
| **first_name** | String         |        No        |  The new first name of the student.  |
| **last_name** | String          |        No        |  The new last name of the student.  |


#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
| user_id not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/user_id"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |

#### Example Request Body
```
{
      "user_id": 123231,
      "first_name" "Grey",
      "last_name": "Gxsanda"
}
```
#### Example Response
```
{
   "status": 200,
   "data" : 123231
}
```
Delete Students
---
Delete a student to the database. (set status to delete)
#### Method
POST
#### URL Structure
`api/users/students`
#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|---------------|-----------------|--------------|--------------|
| **user_id**     |  Int         |        Yes        |  The id of the student.|


#### Validation
|  Action  |  Expected Result |
|---------------|-------------|
| user_id not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/user_id"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |

#### Example Request Body
```
{
      "user_id": 123231
}
```
#### Example Response
```
{
   "status": 200,
   "data" : 123231
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
| CSV file corrupted/incorrect format | Return `400` with message { "code": "INVALID_INPUT", error: "#/file" } |
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
|  work_id not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/<work_id>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |
| work does not exist in database | Return error status `404` with message: `{"code":"NOT_FOUND","param":"#/work_id"}`|
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
      "work_id": 123
      "name": "Assignment 1",
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
| **name**       |    String      |     Yes      |  The name of this work.  |
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
| field not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/<field>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |
| num_peers larger than maximum in database | Return error status `400` with message: `{"code":"MAXIMUM","param":"#/num_peers"}`|
| num_peers lower than minimum in database | Return error status `400` with message: `{"code":"MINIMUM","param":"#/num_peers"}`|

#### Example Request Body
```
{
   "name": "Assignment 1",
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
|  work_id not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/<work_id>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |
| work does not exist in database | Return error status `404` with message: `{"code":"NOT_FOUND","param":"#/work_id"}`|
| num_peers larger than maximum in database | Return error status `400` with message: `{"code":"MAXIMUM","param":"#/num_peers"}`|
| num_peers lower than minimum in database | Return error status `400` with message: `{"code":"MINIMUM","param":"#/num_peers"}`|

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
Return the feedback information for the feedback of the feedback_id.
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
| feedback_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/feedback_id"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |
| feedback does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param":  "#/feedback_id"  }` |
| feedback exists user does not have access to this feedback | Return error status `404` with message: `{ "code": "NOT_FOUND", "param":  "#/feedback_id"  }` |
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
Add a new feedback for a work.
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
| field not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/<field>"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |
| work does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param":  "#/work_id"  }` |
| work exists user does not have access to the work | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/work_id"  }` |
#### Example Request Body
```
{
    "work_id": 34,
    "feedbacks": [
        "Good",
        "Great"
    ],
    "mark": 79,
    "author": 35
}
```
#### Example Response
```
{
   "status": 200,
   "data": {
       "feedback_id": 1232
   }
}
```

Update Feedback
---
Update a specific feedback. NOTE: it will overwrite what is in the database.
#### Method
POST
#### URL Structure
`api/works/feedbacks`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **feedback_id** |    Number     |     Yes      |  The id of the work this feedback belongs to.  |
| **feedbacks** |    Array of String     |     No      |  The new feedback answers to the feedback questsion in the work.  |
| **mark** |    Number     |     No      |  The new mark assigned to this student.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| feedback_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/feedback_id"}` |
| Additional fields entered | Return error status `400` with message for each additonal_param: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<additional_param>"}` |
| feedback does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/feedback_id"  }` |
| feedback exists user does not have access to the feedback | Return error status `404` with message: `{ "code": "NOT_FOUND", "param":  "#/feedback_id"  }` |
#### Example Request Body
```
{
    "feedback_id": 34,
    "feedbacks": [
        "Good",
        "Great"
    ],
    "mark": 79
}
```
#### Example Response
```
{
   "status": 200,
   "data": {
       "feedback_id": 1232
   }
}
```
Annotations
===
Get Annotation
---
Return all the annotation for a specific work.
#### Method
GET
#### URL Structure
`api/works/annotations`

#### Request Query
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **work_id** |    Number     |     Yes      |  The id of the work of the annotations.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| work_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/feedback_id"}` |
| Additional fields entered | Return error status `400` with message: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/work_id"}` |
| work does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/work_id" }` |
| work exists user does not have access to the work | Return error status `404` with message: `{ "code": "NOT_FOUND", "param":  "#/work_id" }` |
#### Example Request Body
{
    "work_id": 42
}

#### Example Response
```
{
   "status": 200,
   "data": {
       "work_id": 123,
       "annotations": {
          "annotation": "A good one",
          "start": 4,
          "end": 10,
          "annotation_id": 123
       }
   }
}
```

Add Annotation
---
Add a annotation for a specific work.
#### Method
PUT
#### URL Structure
`api/works/annotations`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **work_id** |    Number     |     Yes      |  The id of the work of the annotation  |
| **annotation** |    String     |     Yes      |  The annotation.  |
| **start** |    Number     |     Yes      |  The start of the annotation.  |
| **end** |    Number     |     Yes      |  The end of the annotation  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| field not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/<field>"}` |
| Additional fields entered | Return error status `400` with message for each field: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"<field>"}` |
| work does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param":"#/work_id"] }` |
| work exists user does not have access to the work | Return error status `404` with message: `{ "code": "NOT_FOUND", "param":"#/work_id" }` |
| invalid start and end. | Return error status `400` with message: `{ "code": "INVALID_DATA", "param": "#/start"}, { "code": "INVALID_DATA", "param": "#/end" }` |
#### Example Request Body
{
    "work_id": 123,
    "annotation": "A good one",
    "start": 4,
    "end": 10
}

#### Example Response
```
{
   "status": 200,
   "data": 145
}
```

Update Annotation
---
Update a annotation for a specific annotation_id.
#### Method
POST
#### URL Structure
`api/works/annotations`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **annotation_id** |    Number     |     Yes      |  The id of the  of the annotation  |
| **annotation** |    String     |     Yes      |  The new annotation.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| field not inputted | Return error status `400` with message for each field: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/<field>"}` |
| Additional fields entered | Return error status `400` with message for each field: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<field>"}` |
| annotation does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param" "#/annotationid" }` |
| annotation exists user does not have access to the annotation | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/annotationid"   }` |
#### Example Request Body
{
    "work_id": 123,
    "annotation": "A good one"
}

#### Example Response
```
{
   "status": 200,
   "data": 145
}
```
Delete Annotation
---
Delete a annotation for a specific annotation_id.
#### Method
DELETE
#### URL Structure
`api/works/annotations`

#### Request Body
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **annotation_id** |    Number     |     Yes      |  The id of the  of the annotation  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| annotation_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"annotation_id"}` |
| Additional fields entered | Return error status `400` with message for each field: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<field>"}` |
| annotation does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param" "#/annotationid"  }` |
| annotation exists user does not have access to the annotation | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/annotationid" }` |

#### Example Request Body
```
{
    "annotation_id": 123,
}
```
#### Example Response
```
{
   "status": 200
}
```
Submissions
===
Get Submission
---
Return the submission for the submission_id
#### Method
GET
#### URL Structure
`api/works/submissions`

#### Request Query
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **submission_id** |    Number     |     Yes      |  The id of the work of the annotations.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| submission_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/submission_id"}` |
| Additional fields entered | Return error status `400` with message for each field: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<field>"}` |
| submission does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param" "#/submission_id" }` |
| submission exists user does not have access to the submission | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/submission_id" }` |
#### Example Request Body
{
    "submission_id": 42
}

#### Example Response
```
{
   "status": 200,
   "data": {
       "submission_id": 42,
       "work_id": 123,
       "author_id": 142,
       "code": "def a():\n    print(1)",
       "file_name": "ex1.py",
       "mark": 0
   }
}
```
Update Submission
---
Update the submission for the submission_id
#### Method
POST
#### URL Structure
`api/works/submissions`

#### Request Query
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **submission_id** |    Number   |     Yes    |  The id of the work of the annotations.  |
| **code**       |    String      |     Yes       |  The code of the work of the annotations.  |
| **file_name**       |    String      |     No       |  The new file_name of the work of the annotations.  |
| **mark**       |    Number      |     No       |  The new mark of the work of the annotations.  |
#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| submission_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/submission_id"}` |
| Additional fields entered | Return error status `400` with message for each field: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<field>"}` |
| submission does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param" "#/submission_id" }` |
| submission exists user does not have access to the submission | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/submission_id" }` |
#### Example Request Body
```
{
   "submission_id": 42,
   "code": "def b():\n    print(1)",
   "file_name": "ex2.py",
   "mark": 0
}
```
#### Example Response
```
{
   "status": 200,
   "data": 42
}
```

Delete Submission
---
Delete the submission for the submission_id
#### Method
DELETE
#### URL Structure
`api/works/submissions`

#### Request Query
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **submission_id** |    Number   |     Yes    |  The id of the work of the annotations.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| submission_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/submission_id"}` |
| Additional fields entered | Return error status `400` with message for each field: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<field>"}` |
| submission does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/submission_id"}` |
| submission exists user does not have access to the submission | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/submission_id" }` |
#### Example Request Body
```
{
   "submission_id": 42
}
```
#### Example Response
```
{
   "status": 200
}
```
Upload Submission
---
Upload
#### Method
POST
#### URL Structure
`api/works/submissions/upload`

#### Request Query
| Queries        |      Type      |  Required?   |  Description |
|----------------|----------------|--------------|--------------|
| **author_id** |    Number     |     Yes      |  The id of the work of the annotations.  |

#### Validation
|  Action  |  Expected Result |
|---------------|-------------| 
| author_id not inputted | Return error status `400` with message: `{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param":"#/author_id"}` |
| Additional fields entered | Return error status `400` with message for each field: `{"code":"OBJECT_ADDITIONAL_PROPERTIES","param":"#/<field>"}` |
| author_id does not exist. | Return error status `404` with message: `{ "code": "NOT_FOUND", "param": "#/author_id" }` |
| corrupted upload file | Return error status `404` with message: `{ "code": "INVALID_DATA", "param": "#/file" }` |


#### Example Request Body
{
    "author_id": 42
}

#### Example Response
```
{
   "status": 200,
   "data": 123
}
```
