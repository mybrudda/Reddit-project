import React from "react";
import "../styling/PostDetail.css";
import CommentsSection from "./CommentSection";

function PostDetail({ post, onBack }) {
  const title = post.title;
  const description = post.selftext || "No content available";
  const url = post.url;

  return (
    <div className="post-detail-parent">
      <div className="post-detail">
        <button onClick={onBack}>Back</button>
        <h2>{title}</h2>
        <p>{post.subreddit}</p>
        <p>{description}</p>
        {post.videoUrl ? (
          <video controls>
            <source src={post.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video available</p>
        )}
        <a href={url} target="_blank" rel="noopener noreferrer">View on Reddit</a>

        <CommentsSection postUrl={url} numComments={post.num_comments} />
      </div>
      
    </div>
  );
}

export default PostDetail;
