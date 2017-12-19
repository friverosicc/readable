import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './header'
import { connect } from 'react-redux'
import { editComment, fetchComment } from '../actions/comment-actions'

class CommentEdit extends Component {
  constructor(props) {
    super(props)

    if (props.comment) {
      const { author, body } = props.comment
      this.state = { author, body }
    } else {
      this.state = {
        author: '',
        body: ''
      }
    }

    this.editCommentRequestSent = false
    this.save = this.save.bind(this)
  }

  save() {
    this.props.editComment({ body: this.state.body, id: this.props.comment.id })
    this.editCommentRequestSent = true
  }

  isValid() {
    let valid = true

    Object.keys(this.state)
          .map(key => {
            if (!this.state[key])
              valid = false
          })

    return valid
  }

  componentDidMount() {
    this.props.fetchComment(this.props.match.params.commentId)
  }

  componentWillReceiveProps({ comment }) {
    if (comment) {
      const { author, body } = comment
      this.setState({ author, body })
    }
  }

  render() {
    const { category, postId } = this.props.match.params
    const navigationPath = [{ url: '/', name: 'Home'}, { url: `/${category}/${postId}`, name: 'Post'}, { name: 'Edit comment' }]
    const requiredMessage = <div className="invalid-feedback">This field is required</div>
    const disabled = (this.isValid()) ? '' : 'disabled' 

    if (!this.props.processing && this.editCommentRequestSent)
      return (
        <div className="container-fluid">
          <Header items={navigationPath}/>
          <div className="alert alert-success" role="alert">Comment updated successfully <Link to={`/${category}/${postId}`}>Go back to the post detail</Link></div>
        </div>
      )

    return (
      <div className="container-fluid">
        <Header items={navigationPath}/>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <form>
              <div className="form-group">
                <label htmlFor="txtAuthor">Author</label>
                <input type="text"
                       id="txtAuthor"
                       disabled
                       className="form-control"
                       value={this.state.author}/>
              </div>

              <div className="form-group">
                <label htmlFor="txtBody">Body</label>
                <textarea id="txtBody"
                          className={(this.state.body) ? "form-control" : "form-control is-invalid"}
                          row="4"
                          required
                          value={this.state.body}
                          onChange={event => this.setState({ body: event.target.value })}/>
                {(this.state.body) ? '' : requiredMessage} 
              </div>

              <div className="form-group text-right">
                <button type="button"
                        className="btn btn-sm btn-primary"
                        disabled={disabled}
                        onClick={this.save}>
                  Save
                </button>
                <Link to={`/${category}/${postId}`} role="button" className="btn btn-sm btn-secondary ml-2">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ comments, processing }, ownProps) => ({
  comment: comments[ownProps.match.params.commentId],
  processing
})


const mapDispatchToProps = dispatch => ({
  editComment: comment => dispatch(editComment(comment)),
  fetchComment: id => dispatch(fetchComment(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit)
