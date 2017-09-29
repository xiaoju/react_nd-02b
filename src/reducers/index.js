import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import listReducer from './listReducer'
import categoryReducer from './categoryReducer'
import commentsReducer from './commentsReducer'

const appReducer = combineReducers({
  Posts: listReducer,
  Categories: categoryReducer,
  comments: commentsReducer,
  form: formReducer
})

export default appReducer
