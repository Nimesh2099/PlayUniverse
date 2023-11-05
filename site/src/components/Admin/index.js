import React from 'react'
import './styles.scss';
function UserTable() {
    return(
        <div>
        <h3> Users </h3>
        <table className="table">
  <caption>List of Users</caption>
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Age</th>
      <th scope="col">Date Of Joining</th>
      <th scope="col">Status</th>
      <th scope='col'>Delete</th>
      <th scope='col'>Update</th>
      <th scope='col'>View</th>
    </tr>
  </thead>
  <tbody>

  </tbody>
  </table>
  </div>
    )
}

export default UserTable