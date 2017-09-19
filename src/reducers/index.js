import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import listReducer from './listReducer'
import categoryReducer from './categoryReducer'

const appReducer = combineReducers({
  Posts: listReducer,
  Categories: categoryReducer,
  form: formReducer
})

export default appReducer
