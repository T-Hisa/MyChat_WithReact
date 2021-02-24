import {
  INCREMENT
} from '../actions'

const initialState = { count: 0 }

const sample = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      console.log('action in state!!!', Object.assign({}, state))
      console.log('action in reducer!!!', action)
      console.log('action in state!!!', state)
      return {count: state.count + 1}
    default:
      console.log('action default in reducer', action)
      return state
  }
}

export default sample