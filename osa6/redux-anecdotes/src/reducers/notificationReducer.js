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

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({ type: 'SET_NOTIFICATION', data: { message } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION', data: { message: null } })
    }, 1000*time)
  }
}

export default notificationReducer