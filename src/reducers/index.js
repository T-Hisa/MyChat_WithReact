import {
  INCREMENT
} from '../actions'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const sample = (state = {}, action) => {
  switch (action.type) {
    case INCREMENT:
      console.log('action in reducer!!!', action)
      return {count: state.count++}
    default:
      console.log('action default in reducer', action)
      return {}
  }
}

export default combineReducers({ sample, form })