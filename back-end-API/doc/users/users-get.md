Get Users
===
### Description
Return the user information for the user of the input **user_id**

### Method
GET

### URL Structure
`api/users/`

### User Privileges
`Administrator`: Full Access
`Other`: Only if **user_id** is same as session user.

### Request Query
| Queries        | Type   | Required? | Description           |
|----------------|--------|-----------|-----------------------|
| **user_id**    | String |     Yes   |  The id of the user.  |


### Validation
<table>
  <thead>
    <tr>
      <td>Action</td>
      <td>Expected Status</td>
      <td>Expected Response</td>
    </tr>
  </thead>

  <tbody>

    <tr>
      <td><b>user_id</b> not inputted</td>
      <td>400</td>
      <td>
      </td>
    </tr>

  </tbody>
</table>

#### Example Request Body
```
{
   "user_id": "5935ed0e5ecf04cc3388de8e"
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
