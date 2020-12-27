import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if ( !notification.message ) {
    return null
  }

  return (
    <Alert variant={notification.type === 'success' ? 'success' : 'danger'}>
      {notification.message}
    </Alert>
  )
}

export default Notification