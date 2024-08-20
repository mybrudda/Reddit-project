import React, { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import "../styling/CommentSection.css";

function CommentsSection({ postUrl, numComments }) {
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [displayCount, setDisplayCount] = useState(10);

  const fetchComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }

    if (commentsLoaded) {
      setShowComments(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${postUrl}.json`);
      const data = await response.json();
      const commentsData = data[1].data.children.map((comment) => ({
        id: comment.data.id,
        author: comment.data.author,
        body: comment.data.body,
        created_utc: comment.data.created_utc,
      }));
      setComments(commentsData);
      setCommentsLoaded(true);
      setShowComments(true);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setLoading(false);
    }
  };

  const displayedComments = comments.slice(0, displayCount);

  return (
    <div className="comments-section">
      <div className="comments-header" onClick={fetchComments}>
        <FaCommentAlt className="comment-icon" />
        <span className="comment-count">{numComments} comments</span>
      </div>

      {loading && <p>Loading comments...</p>}

      {showComments && commentsLoaded && (
        <div className="comments-list">
          {displayedComments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>
                <strong>{comment.author}</strong>
              </p>
              <p className="comment-body">{comment.body}</p>
            </div>
          ))}
          {comments.length > displayCount && showComments && (
            <button onClick={() => setDisplayCount(displayCount + 10)}>
              Show More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
