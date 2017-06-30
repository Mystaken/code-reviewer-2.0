Add TA
===
### Description
Create a ta from the provided ta information.

### Method
PUT

### URL Structure
`api/users/tas`

### User Privileges
* `Administrator`: Full Access
* `Other`: Not Allowed

### Request Body
| Field               | Type    | Required? |  Description                      - |
|---------------------|---------|-----------|-------------------------------------|
| **email**           | String  | Yes       |  The email of the ta.          |
| **first_name**      | String  | Yes       |  The first name of the ta.     |
| **last_name**       | String  | Yes       |  The last name of the ta.      |
| **utorid**          | String  | Yes       |  The utorid of the ta.         |
| **student_number**  | Number  | Yes       |  The student number of the ta. |
| **contract_number** | Number  | Yes       |  The student number of the ta. |

### Validation
| Action                       | Status | Expected Response                                                              |
|------------------------------|--------|--------------------------------------------------------------------------------|
| Required field not inputted. | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/<field>" ] }`      |
| Additional fields inputted.  | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`          |
| Active ta already exists.    | 400    | `{ "code": "EXISTS", "param": [ "#/email", "#/utorid", "#/student_number" ] }` |
| Deleted ta exists.           | 400    | `{ "code": "EXISTS", "param": [ "#/email", "#/utorid", "#/student_number" ] }` |

#### Example Request Body
```
{
    "student_number": 1001524987,
    "email": "kevin.gao@hotmail.com",
    "first_name": "Kevin",
    "last_name": "Gao",
    "utorid": "gaotianx",
    "contract_number": 1
}
```
#### Example Response
```
{
   "status": 200,
   "data" : "59447dc6fe01ea7a6edb4e34"
}
```
