import * as ReadableAPI from '../utils/ReadableAPI'

export const FETCH_POST = 'FETCH_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'

export const SELECT_POST = 'SELECT_POST'
export const SELECT_ALL_POST = 'SELECT_ALL_POST'
export const SELECT_NONE_POST = 'SELECT_NONE_POST'

export const SHOW_POST = 'SHOW_POST'

export const FETCH_CATEGORY = 'FETCH_CATEGORY'
export const SHOW_ALL_CATEGORY = 'SHOW_ALL_CATEGORY'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_ALL_CATEGORY ='SELECT_ALL_CATEGORY'
export const SELECT_NONE_CATEGORY = 'SELECT_NONE_CATEGORY'

export const FILTER_PER_CAT = 'FILTER_PER_CAT'

export function fetchPost(){
  return {
    type: FETCH_POST
  }
}

export function removePost() {
  return {
    type: REMOVE_POST
  }
}

// addPost() moves data from store.form.newPost.values to store.Posts
// no need to look up in store, redux-form passes them as 'values'
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

// export function fetchCategory(){
//   return {
//     type: FETCH_CATEGORY
//   }
// }

export const receiveCategories = categories => ({
  type: FETCH_CATEGORY,
  categories
})
export const fetchCategories = () => dispatch => (
  ReadableAPI
      .fetchCategories()
      .then(categories => dispatch(receiveCategories(categories)))
)

// export const RECEIVE_TODOS = "RECEIVE_TODOS";
// export const receiveTodos = todos => ({
//   type: RECEIVE_TODOS,
//   todos
// });
// export const fetchTodos = () => dispatch => (
//   TodoAPIUtil
//       .fetchTodos()
//       .then(todos => dispatch(receiveTodos(todos)))
// );

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

// export function selectAllCategory(){
//   return {
//     type: SELECT_ALL_CATEGORY
//   }
// }
//
// export function selectNoneCategory(){
//   return {
//     type: SELECT_NONE_CATEGORY
//   }
// }

// export function filterPerCat(){
//   return {
//     type: FILTER_PER_CAT
//   }
// }
