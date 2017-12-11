import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Categories extends Component {
  constructor(props) {
    super(props)
  }

  buildLink(path, name, currentPath) {
    const targetPath = '/'+path
    const className = (targetPath === currentPath) ? "active" : ""

    return <Link key={path} className={"nav-link text-capitalize "+className} to={targetPath}>{name}</Link>
  }

  render() {
    const { pathname } = this.props.location
    const categories = this.props.categories.map(({ path, name}) => (
      this.buildLink(path, name, pathname)
    ))
    
    return (
      <div className="row">
        <div className="col">
          <nav className="nav nav-pills justify-content-center">
            {this.buildLink('', 'all', pathname)}
            {categories}
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: Object.keys(categories).map(key => (categories[key]))
})

export default withRouter(connect(mapStateToProps)(Categories))
