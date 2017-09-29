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

export const fetchComments = (id) =>
fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json())

export const postPost = (payload) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body : JSON.stringify( payload )
    })
    .then(res => res.json())

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    }
  })