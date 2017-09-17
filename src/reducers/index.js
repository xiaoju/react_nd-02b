import { combineReducers } from 'redux'
import listReducer from './listReducer'

const appReducer = combineReducers({
  Posts: listReducer
})

export default appReducer
