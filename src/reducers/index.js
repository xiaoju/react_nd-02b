import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import listReducer from './listReducer'

const appReducer = combineReducers({
  Posts: listReducer,
  form: formReducer
})

export default appReducer
