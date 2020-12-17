const initialState = ''

const filterReducer = (state = initialState, action) => {
  if (action.type === 'SET_FILTER') {
    return action.data
  }
  return state
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: filter
  }
}

export default filterReducer