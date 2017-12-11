import React from 'react'
import Post from './post'

const PostList = (props) => {
  const posts = props.posts.map(post => <Post key={post.id} post={post}/>)

  return (
    <div>{posts}</div>
  )
}

export default PostList
