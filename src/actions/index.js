import * as ReadableAPI from '../utils/ReadableAPI'

export const ALL_POSTS_IN = 'ALL_POSTS_IN'
export const CAT_POSTS_IN = 'CAT_POSTS_IN'
export const SINGLE_POST_IN = 'SINGLE_POST_IN'

export const SHOW_MORE = 'SHOW_MORE'
export const SHOW_LESS = 'SHOW_LESS'

export const SELECT_ONE_FOR_DELETION = 'SELECT_ONE_FOR_DELETION'
export const SELECT_ALL_FOR_DELETION = 'SELECT_ALL_FOR_DELETION'
export const SELECT_NONE_FOR_DELETION = 'SELECT_NONE_FOR_DELETION'

export const REMOVE_POST = 'REMOVE_POST'

export const FETCH_CATEGORY = 'FETCH_CATEGORY'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const SELECT_COMMENT = 'SELECT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const NEW_COMMENT = 'NEW_COMMENT'

export function selectOneForDeletion(id){
  return {
    type: SELECT_ONE_FOR_DELETION,
    id
  }
}

export function selectAllForDeletion(){
  return {
    type: SELECT_ALL_FOR_DELETION
  }
}

export function selectNoneForDeletion(){
  return {
    type: SELECT_NONE_FOR_DELETION
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

export const showMore = (postId) => dispatch => (
  ReadableAPI
    .fetchComments(postId)
    .then(comments => dispatch(loadDetails(postId, comments)))
)
export const loadDetails = (postId, comments) => ({
  type: SHOW_MORE,
  postId,
  comments
})

export function showLess() {
  return {
    type: SHOW_LESS
  }
}

export function selectCategory(path){
  return {
    type: SELECT_CATEGORY,
    path
  }
}

export function selectComment(commentId){
  return {
    type: SELECT_COMMENT,
    commentId
  }
}

export function deleteComment(commentId){
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function editComment(commentId){
  return {
    type: EDIT_COMMENT,
    commentId
  }
}

export function newComment(commentId){
  return {
    type: NEW_COMMENT,
    commentId
  }
}
