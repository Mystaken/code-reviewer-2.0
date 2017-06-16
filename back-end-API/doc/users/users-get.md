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
      <td><center>400</center></td>
      <td>
<pre>
{
  "code":"OBJECT_ADDITIONAL_PROPERTIES",
  "param": "#/user_id" 
}
  
</pre>
      </td>
    </tr>
  </tbody>
</table>
