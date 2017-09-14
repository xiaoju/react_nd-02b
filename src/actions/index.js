export const POST_FETCH = 'POST_FETCH'
export const POST_FLUSH = 'POST_FLUSH'

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
