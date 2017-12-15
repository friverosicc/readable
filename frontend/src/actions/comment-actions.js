import { API, FETCH_COMMENTS } from '../constants/action-types'

export const fetchComments = (postId) => ({
  type: API,
  payload: Object.assign({ url: `posts/${postId}/comments`, method: 'GET' }, FETCH_COMMENTS)
})

