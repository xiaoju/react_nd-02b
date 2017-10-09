import * as ReadableAPI from '../utils/ReadableAPI'

export const SHOW_EDIT_COMMENT_FORM = 'SHOW_EDIT_COMMENT_FORM'
export const HIDE_EDIT_COMMENT_FORM = 'HIDE_EDIT_COMMENT_FORM'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_COMMENT = 'SELECT_COMMENT'

export const ALL_POSTS_IN = 'ALL_POSTS_IN'
export const CAT_POSTS_IN = 'CAT_POSTS_IN'
export const SINGLE_POST_IN = 'SINGLE_POST_IN'

export const SHOW_MORE = 'SHOW_MORE'
export const SHOW_LESS = 'SHOW_LESS'

export const REMOVE_POST = 'REMOVE_POST'

export const FETCH_CATEGORY = 'FETCH_CATEGORY'

export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const NEW_COMMENT = 'NEW_COMMENT'

export const SORT_POSTS = 'SORT_POSTS'
export const SORT_COMMENTS = 'SORT_COMMENTS'

export const UPDATE_POST_STATE = 'UPDATE_POST_STATE'
export const UPDATE_COMMENT_STATE = 'UPDATE_COMMENT_STATE'

export function showEditCommentForm({body, commentId, postId}){
// export function showEditCommentForm(){
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

export const deleteComment = (postId, commentId) => dispatch => (
  // console.log('postId: ', postId, ', commentId: ', commentId) &&
  ReadableAPI.deleteComment(commentId)
    // .then( () => ReadableAPI.fetchComments(postId) )
    // .then( comments => dispatch(loadDetails(postId, comments)))
  && ReadableAPI.fetchComments(postId)
    .then(comments => dispatch(showMore(postId, comments)))
)

export const editComment = (postId, commentId, payload) => dispatch => (
  ReadableAPI.editComment(commentId, payload)
    // .then( () => ReadableAPI.fetchComments(postId) )
    // .then( comments => dispatch(loadDetails(postId, comments)))
  && ReadableAPI.fetchComments(postId)
    .then(comments => dispatch(showMore(postId, comments)))
)

export const newComment = (values) => dispatch => (
  ReadableAPI.newComment(values)
    .then( (newComment) => ReadableAPI.fetchComments(newComment.parentId) )
    .then( comments => dispatch(loadDetails(comments[0].parentId, comments)))
    // .then(comments => dispatch(showMore(comments[0].parentId, comments)))
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
