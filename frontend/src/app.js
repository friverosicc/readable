import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Main from './components/main'
import PostDetails from './components/post-details'
import PostNew from './components/post-new'
import { fetchCategories } from './actions/category-actions'
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categoryRoutes = this.props.categories.map(({ path }) => (<Route exact key={path} path={`/${path}`} render={() => (<Main categories={this.props.categories}/>)} />))

    return (
      <Switch>
        <Route exact path="/" render={() => (<Main/>)} />
        {categoryRoutes}
        <Route exact path="/posts/new" component={PostNew}/>
        <Route exact path="/:category/:id" component={PostDetails} />
        <Route render={() => <h1>Page Not Found</h1>} />
      </Switch>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: Object.keys(categories).map(key => (categories[key]))
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
