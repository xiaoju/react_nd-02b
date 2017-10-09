import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import postsReducer from './postsReducer'
import categoriesReducer from './categoriesReducer'
import commentsReducer from './commentsReducer'
import editCommentFormReducer from './editCommentFormReducer'

const appReducer = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
  comments: commentsReducer,
  editCommentFormReducer: editCommentFormReducer,
  form: formReducer
})

export default appReducer
