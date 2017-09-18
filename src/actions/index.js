export const FETCH_POST = 'FETCH_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'

export const SELECT_POST = 'SELECT_POST'
export const SELECT_ALL_POST = 'SELECT_ALL_POST'
export const SELECT_NONE_POST = 'SELECT_NONE_POST'

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

// newPost() fills in store.newPost
// export function newPost({id, timestamp, title, body, author, category}){
//   return {
//     type: NEW_POST,
//     id,
//     timestamp,
//     title,
//     body,
//     author,
//     category
//   }
// }

// addPost() moves data from store.newPost to store.Posts
// store.newPost got input data from a controlled form
// export function addPost(){
//   return {
//     type: ADD_POST
//   }
// }
// export function addPost({id, timestamp, title, body, author, category}) {
//   return {
//     type: ADD_POST,
//     id,
//     timestamp,
//     title,
//     body,
//     author,
//     category
//   }
// }

export function selectPost(postId){
  return {
    type: SELECT_POST,
    postId
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
