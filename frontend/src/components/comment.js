import React from 'react'
import moment from 'moment'
import { MdMoreHoriz, MdEdit, MdDelete, MdComment, MdAccessTime, MdExpandLess, MdExpandMore } from 'react-icons/lib/md'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sendPostVote, deletePost } from '../actions/post-actions'

const Comment = (props) => {
  const { comment } = props

  const vote = (id, option) => {
    props.sendPostVote(id, option)
  }

  const remove = id => {
    props.deletePost(id)
  }

  return (
    <div className="row justify-content-center">
      <div className="col-xl-6 col-lg-8">
        <div className="card mb-3 bg-light">
          <div className="card-body d-flex flex-row">
            <div className="col-10">
              <h4 className="card-title">{comment.title}</h4>
              <small className="text-muted">by {comment.author}</small>
              <p className="card-text">{comment.body}</p>
            </div>

            <div className="col-2 d-flex flex-column justify-content-center align-items-center">
              <button className="btn btn-sm btn-success" onClick={() => vote(comment.id, 'upVote')}><MdExpandLess/></button>
              <span className="display-4">{comment.voteScore}</span>
              <button className="btn btn-sm btn-success" onClick={() => vote(comment.id, 'downVote')}><MdExpandMore/></button>
            </div>
          </div>

          <div className="card-footer">
            <div className="row">
              <div className="col-6">
                <h6>
                  <span className="badge badge-danger">{moment(comment.timestamp).fromNow()} <MdAccessTime/></span>
                </h6>
              </div>

              <div className="col-6 text-right">
                <button type="button" className="btn btn-sm btn-primary mr-1"><MdEdit/> Edit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => remove(comment.id)}><MdDelete/> Delete</button>
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
  sendPostVote: (id, option) => dispatch(sendPostVote(id, option)),
  deletePost: (id) => dispatch(deletePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
