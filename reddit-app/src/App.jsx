import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PostDetail from "./components/PostDetail";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSearch = async (query, type = "search") => {
    let url = "";

    if (type === "top") {
      url = `https://www.reddit.com/top.json?t=day&limit=20`;
    } else {
      url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
        query
      )}&sort=relevance&limit=20`;
    }

    try {
      const response = await fetch(url, {
        headers: { "User-agent": "your-app-name" },
      });
      const data = await response.json();

      const posts = data.data.children.map((post) => {
        const postData = post.data;
        let videoUrl = null;

        if (postData.media && postData.media.reddit_video) {
          videoUrl = postData.media.reddit_video.fallback_url;
        } else if (
          postData.secure_media &&
          postData.secure_media.reddit_video
        ) {
          videoUrl = postData.secure_media.reddit_video.fallback_url;
        }

        const postDate = new Date(postData.created_utc * 1000);

        return {
          id: postData.id,
          title: postData.title,
          subreddit: postData.subreddit_name_prefixed,
          selftext: postData.selftext,
          url: `https://www.reddit.com${postData.permalink}`,
          imageUrl:
            postData.thumbnail && postData.thumbnail.startsWith("http")
              ? postData.thumbnail
              : null,
          videoUrl: videoUrl,
          author: postData.author,
          created_at: postDate.toLocaleString(),
          num_comments: postData.num_comments,
        };
      });

      setPosts(posts);
      setSelectedPost(null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch top posts of the day when the app loads
    handleSearch("", "top");
  }, []);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      {selectedPost ? (
        <PostDetail post={selectedPost} onBack={handleBack} />
      ) : (
        <PostList posts={posts} onSelectPost={handleSelectPost} />
      )}
    </div>
  );
}

export default App;
