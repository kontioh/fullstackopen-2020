const initialState = { message: null, timeout: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeout !== null) {
        clearTimeout(state.timeout)
      }
      return action.data
    case 'CLEAR_NOTIFICATION':
      return { message: null, timeout: null } 
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    const timeout = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 1000*time)
    dispatch({ type: 'SET_NOTIFICATION', data: { message, timeout } })
  }
}

export default notificationReducer