export const POST_FETCH = 'POST_FETCH'
export const POST_FLUSH = 'POST_FLUSH'

export const SELECT_POST = 'SELECT_POST'
export const SELECT_ALL_POST = 'SELECT_ALL_POST'
export const SELECT_NONE_POST = 'SELECT_NONE_POST'

export function postFetch(){
  return {
    type: POST_FETCH
  }
}

export function postFlush () {
  return {
    type: POST_FLUSH
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
