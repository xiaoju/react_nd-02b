import * as ReadableAPI from '../utils/ReadableAPI'

export const ALL_POSTS_IN = 'ALL_POSTS_IN'
export const CAT_POSTS_IN = 'CAT_POSTS_IN'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'

export const SELECT_POST = 'SELECT_POST'
export const SELECT_ALL_POST = 'SELECT_ALL_POST'
export const SELECT_NONE_POST = 'SELECT_NONE_POST'

export const SHOW_POST = 'SHOW_POST'

export const FETCH_CATEGORY = 'FETCH_CATEGORY'
export const SHOW_ALL_CATEGORY = 'SHOW_ALL_CATEGORY'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function removePost() {
  return {
    type: REMOVE_POST
  }
}

// addPost() moves to store.Posts the form data from store.form.newPost.values
// They are provided as 'values' by redux-from.
export function addPost({title, body, author, path, timestamp, id}){
  return {
    type: ADD_POST,
    title,
    body,
    author,
    path,
    timestamp,
    id
  }
}

export function selectPost(id){
  // for example clic several posts in the list to delete several
  return {
    type: SELECT_POST,
    id
  }
}

export function showPost(thisPost){
  // for example show in Post Details View the post just created through form
  return {
    type: SHOW_POST,
    thisPost
  }
}

export function selectAllPost(){
  return {
    type: SELECT_ALL_POST
  }
}

export function selectNonePost(){
  return {
    type: SELECT_NONE_POST
  }
}

export const fetchCategories = () => dispatch => (
  ReadableAPI
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)))
)
export const receiveCategories = categories => ({
  type: FETCH_CATEGORY,
  categories
})

export const fetchAllPosts = () => dispatch => (
  ReadableAPI
    .fetchAllPosts()
    .then(posts => dispatch(updatePostsList(posts)))
)
export const updatePostsList = posts => ({
  type: ALL_POSTS_IN,
  posts
})

export const fetchCatPosts = (path) => dispatch => (
  ReadableAPI
    .fetchCatPosts(path)
    .then(posts => dispatch(updatedCatPosts(path, posts)))
)
export const updatedCatPosts = (path, posts) => ({
  type: CAT_POSTS_IN,
  path,
  posts
})

export function showAllCategories() {
  return {
    type: SHOW_ALL_CATEGORY
  }
}

export function selectCategory(path){
  return {
    type: SELECT_CATEGORY,
    path
  }
}
