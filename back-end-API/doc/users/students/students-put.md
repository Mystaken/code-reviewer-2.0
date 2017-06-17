Put Students
===
### Description
Create a student from the provided student information.

### Method
PUT

### URL Structure
`api/users/students/`

### User Privileges
`Administrator`: Full Access
`Other`: Not Allowed

### Request Body
| Queries            | Type    | Required? |  Description                       |
|--------------------|---------|-----------|------------------------------------|
| **email**          | String  | Yes       |  The email of the student.         |
| **first_name**     | String  | Yes       |  The first name of the student.    |
| **last_name**      | String  | Yes       |  The last name of the student.     |
| **utorid**         | String  | Yes       |  The utorid of the student.        |
| **student_number** | Number  | Yes       |  The student number of the student.|

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
      <td>Required field not inputted</td>
      <td><i>400</i></td>
      <td>
<pre>
For each field:
{
  "code":"OBJECT_ADDITIONAL_PROPERTIES",
  "param": "#/{{field.name}}" 
}
</pre>
      </td>
    </tr>
  </tbody>
</table>