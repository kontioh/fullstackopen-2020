import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

const Menu = ({ user, handleLogout }) => {
  const padding = { paddingRight: 5 }

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
    >
      <Navbar.Brand href="/">Blog app</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
          <Link to='/' style={padding}>blogs</Link>
          <Link to='/users' style={padding}>users</Link>
          {user.name} logged in <Button size="sm" onClick={handleLogout}>logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu