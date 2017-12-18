import React, { Component } from 'react'
import Comment from './comment'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchComments } from '../actions/comment-actions'

class CommentList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { postId } = this.props
    this.props.fetchComments(postId)
  }

  render() {
    const comments = this.props.comments.map(comment => (<Comment key={comment.id} comment={comment}/>))

    return(
      <div className="container-fluid">
        {comments}
      </div>
    ) 
  }
}

const mapStateToProps = ({ comments }, ownProps) => {
  const { postId } = ownProps

  const commentList = Object.keys(comments)
                            .map(key => (comments[key]))
                            .filter(comment => (comment.parentId === postId && !comment.deleted))
                            .sort((a, b) => (a.timestamp < b.timestamp))

  return { comments: commentList }
}

const mapDispatchToProps = dispatch => ({
  fetchComments: id => dispatch(fetchComments(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
