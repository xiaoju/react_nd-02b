import uuid from 'uuid4'

const api = "//localhost:5001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())

export const fetchAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const fetchCatPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const fetchComments = (postId) =>
// {
//   console.log('postId :',postId)
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    // .then((res) => console.log(res))
// }

export const editPost = (id, payload) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(payload)
    })
    .then(res => res.json())

export const editComment = (commentId, body) =>
// payload = {timestamp: ..., body: ...}
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(
      {
        body: body,
        id: uuid(),
        timestamp: Date.now(),
      }
    )
    })
    .then(res => res.json())

export const postPost = (payload) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      ...payload,
      id: uuid(),
      timestamp: Date.now(),
    })
  })
  .then(res => res.json())

export const votePost = (id, voteDirection) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      option: voteDirection,
    })
  })
  .then(res => res.json())

export const voteComment = (id, voteDirection) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      option: voteDirection,
    })
  })
  .then(res => res.json())

export const newComment = (payload) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      ...payload,
      id: uuid(),
      timestamp: Date.now(),
    })
  })
  .then(res => res.json())
  // TODO parentId: Should match a post id in the database.

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
