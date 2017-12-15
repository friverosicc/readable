import { API, FETCH_COMMENTS, SEND_COMMENT_VOTE, DELETE_COMMENT } from '../constants/action-types'
import { fetchPost } from './post-actions'

export const fetchComments = (postId) => ({
  type: API,
  payload: Object.assign({ url: `posts/${postId}/comments`, method: 'GET' }, FETCH_COMMENTS)
})

export const sendCommentVote = (id, option) => ({
  type: API,
  payload: Object.assign({ url: `comments/${id}`, method: 'POST', body: { option } }, SEND_COMMENT_VOTE)
})

export const deleteComment = (postId, commentId) => ({
  type: API,
  payload: {
    url: `comments/${commentId}`,
    method: 'DELETE',
    SUCCESS: [{ type: DELETE_COMMENT.SUCCESS }, fetchPost(postId)]
  }
})
