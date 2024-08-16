import React from "react";
import "../styling/PostList.css";
import PostItem from "./PostItem";

function PostList({ posts, onSelectPost }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onClick={() => onSelectPost(post)}
        />
      ))}
    </div>
  );
}

export default PostList;
