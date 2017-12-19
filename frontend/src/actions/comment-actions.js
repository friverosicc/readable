import { API, FETCH_COMMENT, FETCH_COMMENTS, SEND_COMMENT_VOTE, DELETE_COMMENT, CREATE_COMMENT, EDIT_COMMENT } from '../constants/action-types'
import { fetchPost } from './post-actions'
import uuid from 'uuid/v1'

export const fetchComments = (postId) => ({
  type: API,
  payload: { url: `posts/${postId}/comments`, method: 'GET', ...FETCH_COMMENTS }
})

export const fetchComment = (commentId) => ({
  type: API,
  payload: { url: `comments/${commentId}`, method: 'GET', ...FETCH_COMMENT }
})

export const sendCommentVote = (id, option) => ({
  type: API,
  payload: { url: `comments/${id}`, method: 'POST', body: { option }, ...SEND_COMMENT_VOTE }
})

export const deleteComment = (postId, commentId) => ({
  type: API,
  payload: {
    url: `comments/${commentId}`,
    method: 'DELETE',
    SUCCESS: [{ type: DELETE_COMMENT.SUCCESS }, fetchPost(postId)]
  }
})

export const createComment = (comment) => ({
  type: API,
  payload: {
    url: 'comments',
    method: 'POST',
    body: {
      ...comment,
      timestamp: Date.now(),
      id: uuid()
    },
    ...CREATE_COMMENT
  },
})

export const editComment = (comment) => ({
  type: API,
  payload: {
    url: `comments/${comment.id}`,
    method: 'PUT',
    body: {
      ...comment,
      timestamp: Date.now()
    },
    ...EDIT_COMMENT
  },
})
