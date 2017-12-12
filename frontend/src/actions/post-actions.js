import { API, FETCH_POSTS, SEND_POST_VOTE, DELETE_POST } from '../constants/action-types'

export const fetchPosts = () => ({
  type: API,
  payload: Object.assign({ url: 'posts', method: 'GET' }, FETCH_POSTS)
})

export const fetchPostsByCategory = (category) => ({
  type: API,
  payload: Object.assign({ url: `${category}/posts`, method: 'GET' }, FETCH_POSTS)
})

export const sendPostVote = (id, option) => ({
  type: API,
  payload: Object.assign({ url: `posts/${id}`, method: 'POST', body: { option } }, SEND_POST_VOTE)
})

export const deletePost = (id) => ({
  type: API,
  payload: Object.assign({ url: `posts/${id}`, method: 'DELETE' }, DELETE_POST)
})
