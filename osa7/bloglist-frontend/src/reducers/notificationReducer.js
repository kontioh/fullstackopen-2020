const initialState = { message: null, type: 'success' }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return { message: null , type: null }
    default:
      return state
  }
}

export const newNotification = (message, type) => {
  return async dispatch => {
    dispatch({ type: 'NEW_NOTIFICATION', data: { message, type } })
    setTimeout(() => { dispatch({ type: 'CLEAR_NOTIFICATION' }) }, 5000)
  }
}

export default notificationReducer