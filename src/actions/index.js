import * as ReadableAPI from '../utils/ReadableAPI'
import {
  SHOW_EDIT_COMMENT_FORM,
  HIDE_EDIT_COMMENT_FORM,
  SELECT_CATEGORY,
  SELECT_COMMENT,
  ALL_POSTS_IN,
  CAT_POSTS_IN,
  SINGLE_POST_IN,
  SHOW_MORE,
  SHOW_LESS,
  REMOVE_POST,
  FETCH_CATEGORY,  
  SORT_POSTS,
  SORT_COMMENTS,
  UPDATE_POST_STATE,
  UPDATE_COMMENT_STATE,
  COUNT_COMMENTS,
  COUNT_COMMENTS_LOAD_DETAILS,
} from './types'

export function showEditCommentForm({body, commentId, postId}){
  return {
    type: SHOW_EDIT_COMMENT_FORM,
    body,
    commentId,
    postId,
  }
}

export function hideEditCommentForm(){
  return {
    type: HIDE_EDIT_COMMENT_FORM,
  }
}

export const votePost = (id, voteDirection) => dispatch => (
  ReadableAPI
    .votePost(id, voteDirection)
    .then(thisPost => dispatch(updatePostState(thisPost)))
)
export function updatePostState(thisPost){
  return {
    type: UPDATE_POST_STATE,
    thisPost,
  }
}

export const voteComment = (id, voteDirection) => dispatch => (
  ReadableAPI
    .voteComment(id, voteDirection)
    .then(thisComment => dispatch(updateCommentState(thisComment)))
)
export function updateCommentState(thisComment){
  return {
    type: UPDATE_COMMENT_STATE,
    thisComment,
  }
}

export function sortPosts(field){
  return {
    type: SORT_POSTS,
    field
  }
}

export function sortComments(field){
  return {
    type: SORT_COMMENTS,
    field
  }
}

export function selectCategory(category){
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function selectComment(commentId){
  return {
    type: SELECT_COMMENT,
    commentId
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

export const editPost = (id, payload) => dispatch => (
  ReadableAPI
    .editPost(id, payload)
    .then(post => dispatch(singlePostIn(post)))
)
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

export const deletePost = (id) => dispatch => (
  ReadableAPI
    .deletePost(id)
    .then(() => dispatch(removePost(id)))
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

export const fetchCatPosts = (category) => dispatch => (
  ReadableAPI
    .fetchCatPosts(category)
    .then(posts => dispatch(catPostsIn(category, posts)))
)
export const catPostsIn = (category, posts) => ({
  type: CAT_POSTS_IN,
  category,
  posts
})

export const deleteComment = (commentId) => dispatch => (
  ReadableAPI.deleteComment(commentId)
)

export const editComment = (commentId, body) => dispatch => (
  ReadableAPI.editComment(commentId, body)
)

export const newComment = (values) => dispatch => (
  ReadableAPI.newComment(values)
    .then(newComment => ReadableAPI.fetchComments(newComment.parentId))
    .then(comments => dispatch(countCommentsLoadDetails(comments[0].parentId, comments)))
)
// TODO how to clean this line above: how to pass 'newComment.parentId to the next api call?'
export const countCommentsLoadDetails = (postId, comments) => ({
    // this simply does COUNT_COMMENTS and SHOW_MORE
    type: COUNT_COMMENTS_LOAD_DETAILS,
    postId,
    comments,
})

export const downloadComments = (postId) => dispatch => (
  ReadableAPI
    .fetchComments(postId)
    .then( comments => dispatch(countComments(postId, comments)))
)
export const countComments = (postId, comments) => ({
  type: COUNT_COMMENTS,
  postId,
  comments,
})

export const showMorePlus = (postId) => dispatch => (
  ReadableAPI
    .fetchComments(postId)
    .then(comments => dispatch(countCommentsLoadDetails(postId, comments)))
)

export const showMore = (postId) => dispatch => (
  ReadableAPI
    .fetchComments(postId)
    .then( comments => dispatch(loadDetails(postId, comments)))
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
