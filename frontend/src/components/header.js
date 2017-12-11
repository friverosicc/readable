import React from 'react'

const Header = () => {
  return (
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">Home</li>
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default Header
