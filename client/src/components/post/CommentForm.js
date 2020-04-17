import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {addComment} from "../../flux/actions/post";
import {connect} from "react-redux";
const CommentForm = ({addComment , postId}) => {
  const [comment, setComment] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    addComment(comment, postId) 
    setComment("")   ;
  }
  return (
    <form class="form my-1" onSubmit={onSubmit}>
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Comment on this post"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <input type="submit" class="btn btn-dark my-1" value="Submit" />
    </form>
  )
}

CommentForm.propTypes = {
  addComment : PropTypes.func.isRequired
}

export default connect(null,{addComment})(CommentForm)
