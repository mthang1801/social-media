import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {deleteComment} from "../../flux/actions/post";
const CommentItem = ({postId, comment : {user, _id, text, name, avatar, createdAt}, auth, deleteComment}) => { 
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`profile/${user}`}>
          <img
            class="round-img"
            src={avatar}
            alt={name}
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">
          {text}
        </p>
        <p class="post-date">
            Posted on <Moment format="YYYY/MM/DD">{createdAt}</Moment>
        </p>
        {!auth.isLoading && auth.user._id === user && <button class="btn btn-danger" onClick={() => deleteComment(_id, postId)}>Remove</button>}
       
      </div>     
    </div>
  )
}

CommentItem.propTypes = {
  comment : PropTypes.object.isRequired,
  postId : PropTypes.string.isRequired,
  auth : PropTypes.object.isRequired,
  deleteComment : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth : state.auth 
})

export default connect(mapStateToProps,{deleteComment})(CommentItem)
