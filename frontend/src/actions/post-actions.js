import { API, FETCH_POSTS, SEND_POST_VOTE } from '../constants/action-types'

export const fetchPosts = () => ({
  type: API,
  payload: Object.assign({ url: 'posts', method: 'GET' }, FETCH_POSTS)
})

export const sendPostVote = (id, option) => ({
  type: API,
  payload: Object.assign({ url: `posts/${id}`, method: 'POST', body: { option } }, SEND_POST_VOTE)
})
