import * as ReadableAPI from '../utils/ReadableAPI'

export const ALL_POSTS_IN = 'ALL_POSTS_IN'
export const CAT_POSTS_IN = 'CAT_POSTS_IN'
export const SINGLE_POST_IN = 'SINGLE_POST_IN'

export const COMMENTS_IN = 'COMMENTS_IN'

export const REMOVE_POST = 'REMOVE_POST'

export const SELECT_POST = 'SELECT_POST'
export const SELECT_ALL_POST = 'SELECT_ALL_POST'
export const SELECT_NONE_POST = 'SELECT_NONE_POST'

// export const SHOW_POST = 'SHOW_POST'

export const FETCH_CATEGORY = 'FETCH_CATEGORY'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function selectPost(id){
  // for example clic several posts in the list to delete several
  return {
    type: SELECT_POST,
    id
  }
}

// export function showPost(thisPost){
//   // for example show in Post Details View the post just created through form
//   return {
//     type: SHOW_POST,
//     thisPost
//   }
// }

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

export const postPost = (values) => dispatch => (
  ReadableAPI
    .postPost(values)
    .then(post => dispatch(singlePostIn(post)))
)
export function singlePostIn({id, timestamp, title, body, author, category, voteScore, deleted}){
  return {
    type: SINGLE_POST_IN,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export const deletePost = (selectedIds) => dispatch => (
  selectedIds.map( id =>
    ReadableAPI
      .deletePost(id)
      .then(() => dispatch(removePost(id)))
  )
)
export const removePost = (id) => ({
  type: REMOVE_POST,
  id
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
    .then(posts => dispatch(catPostsIn(path, posts)))
)
export const catPostsIn = (path, posts) => ({
  type: CAT_POSTS_IN,
  path,
  posts
})

export const fetchComments = (id) => dispatch => (
  ReadableAPI
    .fetchComments(id)
    .then(comments => dispatch(commentsIn(comments)))
)
export const commentsIn = comments => ({
  type: COMMENTS_IN,
  comments
})

export function selectCategory(path){
  return {
    type: SELECT_CATEGORY,
    path
  }
}
