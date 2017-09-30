import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import postsReducer from './postsReducer'
import categoriesReducer from './categoriesReducer'
import commentsReducer from './commentsReducer'

const appReducer = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
  comments: commentsReducer,
  form: formReducer
})

export default appReducer
