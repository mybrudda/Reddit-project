import React from "react";
import "../styling/PostItem.css";

function PostItem({ post, onClick }) {
  return (
    <div className="post-item" onClick={onClick}>
      <h2>{post.title}</h2>
      <p>{post.subreddit}</p>
    </div>
  );
}

export default PostItem;
