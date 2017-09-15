import { combineReducers } from 'redux'
import listReducer from './listReducer'

const readableApp = combineReducers({
  Posts: listReducer
})

export default readableApp
