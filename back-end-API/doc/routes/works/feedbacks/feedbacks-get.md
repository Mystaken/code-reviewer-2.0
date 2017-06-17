Get Feedback
===
### Description
Return the feedback information for the user with **feedback_id**

### Method
GET

### URL Structure
`api/works/feedbacks`

### User Privileges
* `Administrator`: Full Access
* `Other`: Only access to **session_user_id**

### Request Query
| Field           | Type   | Required? | Description             |
|-----------------|--------|-----------|-------------------------|
| **feedback_id** | String | Yes       | The id of the feedback. |

### Validation
| Action                                      | Status | Expected Response                                                             |
|---------------------------------------------|--------|-------------------------------------------------------------------------------|
| **feedback_id** not inputted.               | 400    | `{ "code": "OBJECT_MISSING_REQUIRED_PROPERTY","param": [ "#/feedback_id" ] }` |
| Additional Fields inputted.                 | 400    | `{ "code": "OBJECT_ADDITIONAL_PROPERTIES","param": [ "#/<field>" ] }`         |
| No active feedback with **feedback_id**.    | 404    | `{ "code": "NOT_FOUND", "param": [ "#/feedback_id" ] }`                       |
| Session user does not have access to route. | 404    | `{ "code": "NOT_FOUND", "param": [ "#/feedback_id" ] }`                       |

#### Example Request Body
```
{
   "feedback_id": "5935ed0e5ecf04cc3388de8e"
}
```

#### Example Response
```
{
    "status": 200,
    "data" : {
        "feedback_id": "5935ed0e5ecf04cc3388de8e",
        "submission_id": "5935ed0e5ecf04cc3388de8e",
        "feedbacks": [
            "Good",
            "Great"
        ],
        "mark": 79,
        "author_id": 35,
        "create_date": "10-06-30 23:32:32",
        "last_updated": "10-06-30 23:32:32"
    }
}
```