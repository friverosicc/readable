import React, { Component } from 'react'
import Post from './post'
import Header from './header'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPost } from '../actions/post-actions'
//|import { fetchComments } from '../actions/comment-actions'

class PostDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { category, id } = this.props.match.params
    this.props.fetchPost(id)
  }

  render() {
    const post = (this.props.post) ? <Post post={this.props.post}/> : ''
    const navigationPath = [{ url: '/', name: 'Home'}, { name: 'Post' }]

    return(
      <div className="container-fluid">
        <Header items={navigationPath}/>

        <div className="row justify-content-center mb-3">
          <div className="col-xl-6 col-lg-8 text-right">
            <button className="btn btn-sm btn-primary">New Post</button>
          </div>
        </div>

        {post}
      </div>
    ) 
  }
}

const mapStateToProps = ({ posts }, ownProps) => {
  const { id } = ownProps.match.params
  return { post: posts[id] }
}

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
