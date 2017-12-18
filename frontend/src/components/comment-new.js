import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Header from './header'
import { connect } from 'react-redux'
import { createComment } from '../actions/comment-actions'

class CommentNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      parentId: props.match.params.id,
      author: '',
      body: ''
    }

    this.createCommentRequestSent = false
    this.save = this.save.bind(this)
  }

  save() {
    this.props.createComment(this.state)
    this.createCommentRequestSent = true
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

  componentWillReceiveProps(newProps) {
    this.setState({ parentId: newProps.match.params.id })
  }

  render() {
    const { category, id } = this.props.match.params
    const navigationPath = [{ url: '/', name: 'Home'}, { url: `/${category}/${id}`, name: 'Post' }, { name: 'Create a new comment' }]
    const requiredMessage = <div className="invalid-feedback">This field is required</div>
    const disabled = (this.isValid()) ? '' : 'disabled' 

    if (!this.props.processing && this.createCommentRequestSent)
      return (
        <div className="container-fluid">
          <Header items={navigationPath}/>
          <div className="alert alert-success" role="alert">Comment created successfully <Link to={`/${category}/${id}`}>Go back to the post</Link></div>
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
                       className={(this.state.author) ? "form-control" : "form-control is-invalid"}
                       required
                       onChange={event => this.setState({ author: event.target.value})}/>
                {(this.state.author) ? '' : requiredMessage} 
              </div>

              <div className="form-group">
                <label htmlFor="txtBody">Body</label>
                <textarea id="txtBody"
                          className={(this.state.body) ? "form-control" : "form-control is-invalid"}
                          row="4"
                          required
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
                <Link to="/" role="button" className="btn btn-sm btn-secondary ml-2">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ processing }) => ({  processing })
const mapDispatchToProps = dispatch => ({
  createComment: comment => dispatch(createComment(comment))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentNew))
