import React from 'react'
import Post from './post'

const PostList = (props) => {
  const posts = props.posts
    .filter(post => (!post.deleted))
    .map(post => <Post key={post.id} post={post} showAccessToDetails={true}/>)

  return (
    <div>{posts}</div>
  )
}

export default PostList
