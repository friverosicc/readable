import React, { Component } from 'react'
import Categories from './categories'
import Header from './header'
import PostList from './postList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPosts, fetchPostsByCategory } from '../actions/post-actions'

class Main extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const category = this.props.match.path.split('/')[1]

    if (category.length === 0)
      this.props.fetchPosts()
    else
      this.props.fetchPostsByCategory(category)
  }

  render() {
    return (
      <div className="container-fluid">
        <Header/>

        <Categories/>

        <hr className="my-4"/>

        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="form-group row">
              <label htmlFor="sortBy" className="col-1 col-form-label text-nowrap">Sort by</label>
              <div className="col-3">
                <select id="sortBy" className="form-control form-control-sm">
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Ascendant score</option>
                  <option>Descendant score</option>
                </select>
              </div>

              <div className="col-8 text-right">
                <button className="btn btn-sm btn-primary">New Post</button>
              </div>
            </div>
          </div>
        </div>

        <PostList  posts={this.props.posts}/>
        
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts: Object.keys(posts).map(key => (posts[key])) })
const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))