import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ items=[] }) => {
  const list = items.map(item => {
    const { url, name } = item

    if (url)
      return (
        <li key={name} className="breadcrumb-item active" aria-current="page">
          <Link to={url}>{name}</Link>
        </li>
      )
    return <li key={name} className="breadcrumb-item active" aria-current="page">{name}</li>
  })

  return (
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            {list}
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default Header
