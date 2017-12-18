import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './header'
import { connect } from 'react-redux'
import { createPost, fetchPost } from '../actions/post-actions'

class PostEdit extends Component {
  constructor(props) {
    super(props)

    if (props.post) {
      const { title, author, category, body } = props.post
      this.state = { title, author, category, body }
    } else {
      this.state = {
        title: '',
        author: '',
        category: '',
        body: ''
      }
    }

    this.createPostRequestSent = false
    this.save = this.save.bind(this)
  }

  save() {
    this.props.createPost(this.state)
    this.createPostRequestSent = true
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
      const { title, author, category, body } = post
      this.setState({ title, author, category, body })
    }
  }

  render() {
    const categories = this.props.categories.map(({ name }) => (
      <option key={name} value={name}>{name}</option>
    ))

    const navigationPath = [{ url: '/', name: 'Home'}, { name: 'Edit post' }]
    const requiredMessage = <div className="invalid-feedback">This field is required</div>
    const disabled = (this.isValid()) ? '' : 'disabled' 

    if (!this.props.processing && this.createPostRequestSent)
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
                       className={(this.state.author) ? "form-control" : "form-control is-invalid"}
                       required
                       value={this.state.author}
                       onChange={event => this.setState({ author: event.target.value})}/>
                {(this.state.author) ? '' : requiredMessage} 
              </div>

              <div className="form-group">
                <label htmlFor="slcCategory">Category</label>
                <select id="slcCategory"
                        className="form-control"
                        value={this.state.category}
                        onChange={event => this.setState({ category: event.target.value })}>
                  {categories}
                </select>
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

const mapStateToProps = ({ categories, posts, processing }, ownProps) => ({
  post: posts[ownProps.match.params.id],
  categories: Object.keys(categories).map(key => (categories[key])),
  processing
})


const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post)),
  fetchPost: id => dispatch(fetchPost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)
