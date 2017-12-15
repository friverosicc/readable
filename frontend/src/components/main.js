import React, { Component } from 'react'
import queryString from 'query-string'
import Categories from './categories'
import Header from './header'
import PostList from './postList'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPosts, fetchPostsByCategory } from '../actions/post-actions'

const sortOptions = {
  'timestamp_asc': { name: 'Newest', method: (a, b) => (a.timestamp < b.timestamp ) },
  'timestamp_dsc': { name: 'Oldest', method: (a, b) => (a.timestamp > b.timestamp) },
  'score_dsc': { name: 'Highest score', method: (a, b) => (a.voteScore < b.voteScore) },
  'score_asc': { name: 'Lowest score', method: (a, b) => (a.voteScore > b.voteScore) }
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.handlerChangeSortBy = this.handlerChangeSortBy.bind(this)
  }

  componentDidMount() {
    const category = this.props.match.path.split('/')[1]

    if (category.length === 0)
      this.props.fetchPosts()
    else
      this.props.fetchPostsByCategory(category)
  }

  handlerChangeSortBy(ev) {
    const { value } = ev.target
    const pathname = this.props.history.location.pathname
    this.props.history.push({ pathname, search: `sortBy=${value}` })
  }

  render() {
    const { search } = this.props.location
    const optionSelected = (search) ? queryString.parse(search).sortBy : 'timestamp_asc'
    const options = Object.keys(sortOptions)
                    .map(key => (<option key={key} value={key}>{sortOptions[key].name}</option>))

    const sortByMethod = sortOptions[optionSelected].method
    const posts = (sortByMethod) ? this.props.posts.sort(sortByMethod) : this.props.posts
    const navigationPath = [{ name: 'Home' }]

    return (
      <div className="container-fluid">
        <Header items={navigationPath}/>

        <Categories/>

        <hr className="my-4"/>

        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="form-group row">
              <label htmlFor="sortBy" className="col-1 col-form-label text-nowrap">Sort by</label>
              <div className="col-3">
                <select id="sortBy" className="form-control form-control-sm" onChange={this.handlerChangeSortBy} defaultValue={optionSelected}>
                  {options}
                </select>
              </div>

              <div className="col-8 text-right">
                <button className="btn btn-sm btn-primary">New Post</button>
              </div>
            </div>
          </div>
        </div>

        <PostList  posts={posts}/>
        
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
