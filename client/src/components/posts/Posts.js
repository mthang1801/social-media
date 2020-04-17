import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect}from "react-redux";
import {getPosts, addPost} from "../../flux/actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import { compareSync } from 'bcryptjs';
const Posts = ({getPosts, post : {posts , loading}, auth, addPost}) => {
  const [text, setText] = React.useState("");
  useEffect(() => {      
      getPosts();     
  }, [loading]);

  const onAddPost = async e => {
    e.preventDefault();
    if(addPost(text)){
      setText("");
    }
  }
  return loading ? <Spinner/> : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community</p>
      {/* Posts form */}
      <div className="posts-form">
        <div className="post-form-header bg-primary">
          <h4>Say something...</h4>
        </div>
        <form action="" className="form my-1" onSubmit={onAddPost}>
          <textarea name="post" value={text} id="post" placeholder="Create a post" rows="6" onChange={e => setText(e.target.value)}></textarea>
          <input type="submit" value="Submit" className="btn btn-dark my-1"/>
        </form>
        <div className="posts">
          {posts.map( post => (
            <PostItem key={post._id} post={post}/>
          ))}
        </div>
      </div>
    </>
  )
}

Posts.propTypes = {
  post : PropTypes.object.isRequired,
  getPosts : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  addPost : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post : state.post, 
  auth : state.auth
})
export default connect(mapStateToProps, {getPosts, addPost})(Posts)
