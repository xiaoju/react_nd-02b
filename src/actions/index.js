export const FETCH_POST = 'FETCH_POST'
export const REMOVE_POST = 'REMOVE_POST'

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

export function selectPost(postId){
  // console.log('The post with following id has been selected: ', postId )
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
