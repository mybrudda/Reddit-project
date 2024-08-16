import React from "react";
import defaultImage from "../assets/reddit-image.webp";
import "../styling/PostItem.css";

function PostItem({ post, onClick }) {
  const isDefaultImage = !post.imageUrl; // Check if the image is the default one

  return (
    <div className="post-item" onClick={onClick}>
      {/* Apply a different class if it's the default image */}
      <img 
        src={post.imageUrl || defaultImage} 
        alt={post.title} 
        className={isDefaultImage ? "post-image default-image" : "post-image"} 
      />
      <h2>{post.title}</h2>
      <p>{post.subreddit}</p>
    </div>
  );
}

export default PostItem;
