# Get Students
## Method
GET
## URL structure
`http://localhost:3000/api/users/students/`
## Request Queries

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



# Get One Student
## Method
GET
## URL structure
`http://localhost:3000/api/users/students/123456`
## Request Parameters

| Parameter       |      Type      | Required? |  Description |
|---------------|-------------|---|--------|
| **id**     |  String         | Required| |
