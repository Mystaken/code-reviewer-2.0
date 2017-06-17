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
<pre>
{
  "code":"OBJECT_MISSING_REQUIRED_PROPERTY",
  "param": "#/user_id" 
}]
</pre>
      </td>
    </tr>

    <tr>
      <td>Additional Fields inputted</td>
      <td><i>400</i></td>
      <td>
<pre>
For each field
{
  "code":"OBJECT_ADDITIONAL_PROPERTIES",
  "param": "#/user_id" 
}]
</pre>
      </td>
    </tr>

    <tr>
      <td><b>user_id</b> exists but session user does not have permission.</td>
      <td><i>404</i></td>
      <td>
<pre>
{
  "code":"NOT_FOUND",
  "param": "#/user_id" 
}
</pre>
      </td>
    </tr>

    <tr>
      <td>No user found for <b>user_id</b></td>
      <td><i>404</i></td>
      <td>
<pre>
{
  "code":"NOT_FOUND",
  "param": "#/user_id" 
}
</pre>
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
