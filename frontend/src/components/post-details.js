import React, { Component } from 'react'
import Post from './post'
import Header from './header'
import CommentList from './comment-list'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPost } from '../actions/post-actions'

class PostDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
  }

  render() {
    const navigationPath = [{ url: '/', name: 'Home'}, { name: 'Post' }]

    return (
      <div className="container-fluid">
        <Header items={navigationPath}/>

        <div className="row justify-content-center mb-3">
          <div className="col-xl-6 col-lg-8 text-right">
            <button className="btn btn-sm btn-primary">New Post</button>
          </div>
        </div>

        {(this.props.post) ? (
          <div>
            <Post post={this.props.post}/>
            <CommentList postId={this.props.post.id}/>
          </div>
        ) : <div className="text-center"><h1>Post Not Found</h1></div>}
      </div>
    ) 
  }
}

const mapStateToProps = ({ posts, comments }, ownProps) => {
  const { id } = ownProps.match.params
  return { post: posts[id] }
}

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
