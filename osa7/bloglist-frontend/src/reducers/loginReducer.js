const initialState = null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export const setCurrentUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logoutUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

export default loginReducer