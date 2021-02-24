import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import sample from './sample'

export default combineReducers({ sample, form })