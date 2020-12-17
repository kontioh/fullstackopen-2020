const initialState = { message: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return { message: null }
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: { message: null }
  }
}

export default notificationReducer