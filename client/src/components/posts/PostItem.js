import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { addLike, addUnlike, deletePost } from "../../flux/actions/post";
import { connect } from "react-redux";
const PostItem = ({ post, addLike, auth, addUnlike, deletePost , showActions = true}) => {
  const onDeletePost = postId => {
    if(window.confirm("Are you sure? It can't undo")){
      deletePost(postId);
    }
  }
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className='round-img' src={post.avatar} alt='' />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{post.text}</p>
        <p className='post-date'>
          <Moment format='YYYY/MM/DD'>{post.createdAt}</Moment>
        </p>
        {showActions && (
          <>
          <button
          type='button'
          className='btn btn-light'
          onClick={() => addLike(post._id)}
          >
            <i className='fas fa-thumbs-up'></i>
            {post.likes.length > 0 && <span>&nbsp;{post.likes.length}</span>}
          </button>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => addUnlike(post._id)}
          >
            <i className='fas fa-thumbs-down'></i>
            {post.unlikes.length > 0 && <span>&nbsp;{post.unlikes.length}</span>}
          </button>
            <Link to={`/post/${post._id}`} className='btn btn-primary'>
              Discussion{" "}
              {post.comments.length > 0 && (
                <span className='comment-count'>&nbsp;{post.comments.length}</span>
              )}
            </Link>
            {!auth.isLoading && auth.user._id === post.user && <button type='button' className='btn btn-danger' onClick={() => onDeletePost(post._id)}>
            <i className='fas fa-times'></i>
            </button>}
          </>
        )}
      
       
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addUnlike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, addUnlike, deletePost })(
  PostItem
);
