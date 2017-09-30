import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import listReducer from './listReducer'
import categoryReducer from './categoryReducer'
import commentsReducer from './commentsReducer'

const appReducer = combineReducers({
  posts: listReducer,
  categories: categoryReducer,
  comments: commentsReducer,
  form: formReducer
})

export default appReducer
