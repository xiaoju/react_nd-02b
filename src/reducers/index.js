import { combineReducers } from 'redux'
import postsReducer from './postsReducer'

const readableApp = combineReducers({
  Posts: postsReducer
})

export default readableApp
