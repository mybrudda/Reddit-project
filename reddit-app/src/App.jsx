import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import PostDetail from './components/PostDetail';
import PostList from './components/PostList';

function App() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleSearch = async (query) => {
        const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=relevance`;

        try {
            const response = await fetch(url, {
                headers: { 'User-agent': 'your-app-name' }
            });
            const data = await response.json();

            const posts = data.data.children.map((post) => ({
                id: post.data.id,
                title: post.data.title,
                subreddit: post.data.subreddit_name_prefixed,
                selftext: post.data.selftext,
                url: `https://www.reddit.com${post.data.permalink}`,
                imageUrl: post.data.thumbnail && post.data.thumbnail.startsWith('http') ? post.data.thumbnail : null,  // Adding imageUrl
            }));

            setPosts(posts);
            setSelectedPost(null);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
