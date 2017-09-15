export const POST_FETCH = 'POST_FETCH'
export const POST_FLUSH = 'POST_FLUSH'
export const SELECT_POST = 'SELECT_POST'

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
