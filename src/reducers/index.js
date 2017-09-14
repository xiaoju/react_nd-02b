import { combineReducers } from 'redux'
import postsReducer from './postsReducer'

const readableApp = combineReducers({
  postsReducer
})

export default readableApp
