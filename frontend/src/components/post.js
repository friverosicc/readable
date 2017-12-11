import React from 'react'
import moment from 'moment'
import { MdEdit, MdDelete, MdComment, MdAccessTime, MdExpandLess, MdExpandMore } from 'react-icons/lib/md'
import { connect } from 'react-redux'
import { sendPostVote } from '../actions/post-actions'

const Post = (props) => {
  const { post } = props

  const vote= (option) => {
    const { post } = props
    props.sendPostVote(post.id, option)
  }

  return (
    <div className="row justify-content-center">
      <div className="col-xl-6 col-lg-8">
        <div className="card mb-3">
          <div className="card-body d-flex flex-row">
            <div className="col-10">
              <h4 className="card-title">{post.title}</h4>
              <small className="text-muted">by {post.author}</small>
              <p className="card-text">{post.body}</p>
            </div>

            <div className="col-2 d-flex flex-column justify-content-center align-items-center">
              <button className="btn btn-success" onClick={() => vote('upVote')}><MdExpandLess/></button> 
              <span className="display-4">{post.voteScore}</span>
              <button className="btn btn-success" onClick={() => vote('downVote')}><MdExpandMore/></button> 
            </div>
          </div>

          <div className="card-footer">
            <div className="row">
              <div className="col-6">
                <h6>
                  <span className="badge badge-info mr-1">{post.commentCount} <MdComment/></span>
                  <span className="badge badge-danger">{moment(post.timestamp).fromNow()} <MdAccessTime/></span>
                </h6>
              </div>

              <div className="col-6 text-right">
                <button type="button" className="btn btn-sm btn-primary mr-1"><MdEdit/> Edit</button>
                <button type="button" className="btn btn-sm btn-secondary"><MdDelete/> Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  sendPostVote: (id, option) => dispatch(sendPostVote(id, option))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
