import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>Blogs created</strong></td>
          </tr>
          {users.length > 0
            ? users.map(u =>
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>
              )
            : null}
        </tbody>
      </table>
    </div>
  )
}

export default Users