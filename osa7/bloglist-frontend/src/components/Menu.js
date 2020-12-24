import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const padding = { paddingRight: 5 }
  const menuStyle = {
    'backgroundColor': 'lightGrey',
    'padding': 5
  }

  return (
    <div style={menuStyle}>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>

      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu