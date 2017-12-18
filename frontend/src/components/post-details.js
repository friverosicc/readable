import React, { Component } from 'react'
import Post from './post'
import Header from './header'
import CommentList from './comment-list'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
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

        {(this.props.post) ? (
          <div className="container-fluid">
            <div className="row justify-content-center mb-3">
              <div className="col-xl-6 col-lg-8 text-right">
                <Link role="button" to={`/${this.props.post.category}/${this.props.post.id}/comments/new`} className="btn btn-sm btn-primary">New Comment</Link>
              </div>
            </div>

            <Post post={this.props.post}/>
            <CommentList postId={this.props.post.id}/>
          </div>
        ) : <div className="text-center"><h1>Post Not Found</h1></div>}
      </div>
    ) 
  }
}

const mapStateToProps = ({ posts, processing }, ownProps) => {
  const { id } = ownProps.match.params
  return { post: posts[id], processing }
}

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
