import React from "react";
import "../styling/PostDetail.css";

function PostDetail({ post, onBack }) {
  console.log(post);
  
  const title = post.title;
  const description = post.selftext || "No content available";
  const url = post.url;

  return (
    <div className="post-detail-parent">
         <div className="post-detail">
      <button onClick={onBack}>Back</button>
      <h2>{title}</h2>
      <p>{description}</p>
      {/* Link to the original Reddit post */}
      <a href={url} target="_blank" rel="noopener noreferrer">
        View on Reddit
      </a>
    </div>
    </div>
   
  );
}

export default PostDetail;