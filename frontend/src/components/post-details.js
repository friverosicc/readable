import React, { Component } from 'react'
import Post from './post'
import Header from './header'
import Comment from './comment'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPost } from '../actions/post-actions'
import { fetchComments } from '../actions/comment-actions'

class PostDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { category, id } = this.props.match.params
    this.props.fetchPost(id)
    this.props.fetchComments(id)
  }

  render() {
    const post = (this.props.post) ? <Post post={this.props.post}/> : ''
    const navigationPath = [{ url: '/', name: 'Home'}, { name: 'Post' }]
    const comments = this.props.comments.map(comment => (<Comment comment={comment}/>))

    return(
      <div className="container-fluid">
        <Header items={navigationPath}/>

        <div className="row justify-content-center mb-3">
          <div className="col-xl-6 col-lg-8 text-right">
            <button className="btn btn-sm btn-primary">New Post</button>
          </div>
        </div>

        {post}
        {comments}
      </div>
    ) 
  }
}

const mapStateToProps = ({ posts, comments }, ownProps) => {
  const { id } = ownProps.match.params

  const commentList = Object.keys(comments)
                            .map(key => (comments[key]))
                            .filter(comment => (comment.parentId === id))
                            .sort((a, b) => (a.timestamp < b.timestamp))

  return {
    post: posts[id],
    comments: commentList
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  fetchComments: id => dispatch(fetchComments(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
