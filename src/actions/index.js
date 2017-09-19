export const FETCH_POST = 'FETCH_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'

export const SELECT_POST = 'SELECT_POST'
export const SELECT_ALL_POST = 'SELECT_ALL_POST'
export const SELECT_NONE_POST = 'SELECT_NONE_POST'


export const FETCH_CATEGORY = 'FETCH_CATEGORY'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_ALL_CATEGORY ='SELECT_ALL_CATEGORY'
export const SELECT_NONE_CATEGORY = 'SELECT_NONE_CATEGORY'

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
export function addPost({title, body, author, category, timestamp, id}){
  console.log('adding post!')
  return {
    type: ADD_POST,
    title,
    body,
    author,
    category,
    timestamp,
    id
  }
}

export function selectPost(id){
  return {
    type: SELECT_POST,
    id
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

export function fetchCategory(){
  return {
    type: FETCH_CATEGORY
  }
}

export function selectCategory(id){
  return {
    type: SELECT_CATEGORY,
    id
  }
}

export function selectAllCategory(){
  return {
    type: SELECT_ALL_CATEGORY
  }
}

export function selectNoneCategory(){
  return {
    type: SELECT_NONE_CATEGORY
  }
}
