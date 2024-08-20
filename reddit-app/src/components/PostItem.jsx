import React from "react";
import { FaCommentAlt } from "react-icons/fa"; // Import the comment icon from react-icons
import defaultImage from "../assets/reddit-image.webp";
import "../styling/PostItem.css";

function PostItem({ post, onClick }) {
  const isDefaultImage = !post.imageUrl; // Check if the image is the default one

  return (
    <div className="post-item" onClick={onClick}>
      {/* Apply a different class if it's the default image */}
      <h2>{post.title}</h2>
      <img 
        src={post.imageUrl || defaultImage} 
        alt={post.title} 
        className={isDefaultImage ? "post-image default-image" : "post-image"} 
      />
      <div className="post-content">
        <div className="post-meta">
          <p >Posted by <span className="post-author">{post.author}</span></p>
          <p className="post-date">{post.created_at}</p>
        </div>
        <p className="subreddit">{post.subreddit}</p>
        <div className="post-footer">
          <FaCommentAlt className="comment-icon" />
          <span className="comment-count">{post.num_comments} comments</span>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
