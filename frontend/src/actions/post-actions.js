import { API, FETCH_POSTS, FETCH_POST, SEND_POST_VOTE, DELETE_POST, CREATE_POST, EDIT_POST } from '../constants/action-types'
import uuid from 'uuid/v1'

export const fetchPosts = () => ({
  type: API,
  payload: { url: 'posts', method: 'GET', ...FETCH_POSTS }
})

export const fetchPostsByCategory = (category) => ({
  type: API,
  payload: { url: `${category}/posts`, method: 'GET', ...FETCH_POSTS }
})

export const sendPostVote = (id, option) => ({
  type: API,
  payload: { url: `posts/${id}`, method: 'POST', body: { option }, ...SEND_POST_VOTE }
})

export const deletePost = (id) => ({
  type: API,
  payload: { url: `posts/${id}`, method: 'DELETE', ...DELETE_POST }
})

export const fetchPost = (id) => ({
  type: API,
  payload: { url: `posts/${id}`, method: 'GET', ...FETCH_POST }
})

export const createPost = (post) => ({
  type: API,
  payload: {
    url: `posts`,
    method: 'POST',
    body: {
      ...post,
      timestamp: Date.now(),
      id: uuid()
    },
    ...CREATE_POST
  },
})

export const editPost = (post) => ({
  type: API,
  payload: {
    url: `posts/${post.id}`,
    method: 'PUT',
    body: {
      ...post,
      timestamp: Date.now(),
    },
    ...EDIT_POST
  },
})
