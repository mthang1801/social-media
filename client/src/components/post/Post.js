import React , {useEffect, useState }from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getPost} from "../../flux/actions/post";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = ({post : {post , loading}, getPost, match}) => {  
  useEffect(() => {
    getPost(match.params.id);
  },[loading, getPost])
  
  
  return loading || post === null ? <Spinner/> :(
    <>
      <Link to="/posts" class="btn">Back To Posts</Link>
      <PostItem post={post} showActions={false}/>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <CommentForm postId={match.params.id}/>
        <div class="comments">
          {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={match.params.id} />
          ))}
        </div>
      </div>

    </>
  )
}

Post.propTypes = {
  post : PropTypes.object.isRequired,
  getPost : PropTypes.func.isRequired,
}

const  mapStateToProps = state => ({
  post : state.post
})
export default connect(mapStateToProps,{getPost})(Post)
