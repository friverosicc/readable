import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './header'
import { connect } from 'react-redux'
import { editPost, fetchPost } from '../actions/post-actions'

class PostEdit extends Component {
  constructor(props) {
    super(props)

    if (props.post) {
      const { title, author, category, body } = props.post
      this.state = { title, author, category, body }
    } else {
      this.state = {
        title: '',
        body: '',
        author: '',
        category: ''
      }
    }

    this.editPostRequestSent = false
    this.save = this.save.bind(this)
  }

  save() {
    this.props.editPost({ ...this.state, id: this.props.post.id })
    this.editPostRequestSent = true
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
    this.props.fetchPost(this.props.match.params.id)
  }

  componentWillReceiveProps({ post }) {
    if (post) {
      const { title, body, author, category } = post
      this.setState({ title, body, author, category })
    }
  }

  render() {
    const navigationPath = [{ url: '/', name: 'Home'}, { name: 'Edit post' }]
    const requiredMessage = <div className="invalid-feedback">This field is required</div>
    const disabled = (this.isValid()) ? '' : 'disabled' 

    if (!this.props.processing && this.editPostRequestSent)
      return (
        <div className="container-fluid">
          <Header items={navigationPath}/>
          <div className="alert alert-success" role="alert">Post updated successfully <Link to="/">Go back to the post list</Link></div>
        </div>
      )

    return (
      <div className="container-fluid">
        <Header items={navigationPath}/>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <form>
              <div className="form-group">
                <label htmlFor="txtTitle">Title</label>
                <input type="text"
                       id="txtTitle"
                       className={(this.state.title) ? "form-control" : "form-control is-invalid"}
                       required
                       value={this.state.title}
                       onChange={event => this.setState({ title: event.target.value })}/>
              {(this.state.title) ? '' : requiredMessage} 
              </div>

              <div className="form-group">
                <label htmlFor="txtAuthor">Author</label>
                <input type="text"
                       id="txtAuthor"
                       className="form-control"
                       disabled
                       value={this.state.author}/>
              </div>

              <div className="form-group">
                <label htmlFor="txtCategory">Category</label>
                <input type="text"
                       id="txtCategory"
                       className="form-control"
                       disabled
                       value={this.state.category}/>
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
                <Link to="/" role="button" className="btn btn-sm btn-secondary ml-2">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, processing }, ownProps) => ({
  post: posts[ownProps.match.params.id],
  processing
})


const mapDispatchToProps = dispatch => ({
  editPost: post => dispatch(editPost(post)),
  fetchPost: id => dispatch(fetchPost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)
