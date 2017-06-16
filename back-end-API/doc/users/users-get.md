Get Users
===
# Description
Return the user information for the user of the input **user_id**

# Method
GET

# URL Structure
`api/users/`

#### Request Query
| Queries        | Type      | Required?    | Description           |
|----------------|-----------|--------------|-----------------------|
| **user_id**    |  String   |     Yes      |  The id of the user.  |


# Validation
| Action                  | Expected Status  | Expected Response                                                       |
|-------------------------|------------------|-------------------------------------------------------------------------|
| user_id not inputted    |       `400`      | ```{"code":"OBJECT_MISSING_REQUIRED_PROPERTY","param": "#/user_id" }``` |