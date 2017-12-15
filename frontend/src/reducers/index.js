import { combineReducers } from 'redux'
import categoriesReducer from './categories-reducer'
import postsReducer from './posts-reducer'

const comments = (stata, action) => ([])

export default combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments
})
