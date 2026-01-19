import { useState } from 'react';
import '../../styles/demos/DemoPage.css';

export default function SocialMediaDemo() {
  const [posts, setPosts] = useState([
    { id: 1, user: 'John Doe', avatar: '👤', content: 'Just finished an amazing project! 🚀', likes: 24, comments: 5, time: '2h ago' },
    { id: 2, user: 'Jane Smith', avatar: '👩', content: 'Beautiful sunset today! 🌅', image: '🌅', likes: 156, comments: 12, time: '5h ago' },
    { id: 3, user: 'Bob Johnson', avatar: '👨', content: 'New tech stack is working great! #coding #webdev', likes: 42, comments: 8, time: '1d ago' },
  ]);

  const [newPost, setNewPost] = useState('');

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([{
        id: posts.length + 1,
        user: 'You',
        avatar: '😊',
        content: newPost,
        likes: 0,
        comments: 0,
        time: 'just now'
      }, ...posts]);
      setNewPost('');
    }
  };

  const likePost = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
      <div className="demo-hero">
        <h1>Social Media Platform Demo</h1>
        <p>Real-time messaging and content sharing platform</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Create Post</h2>
          <div style={{ marginBottom: '2rem' }}>
            <textarea
              className="demo-input"
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              style={{ width: '100%', minHeight: '100px', resize: 'vertical', marginBottom: '1rem' }}
            />
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button className="demo-button outline" style={{ padding: '0.5rem 1rem' }}>
                📷 Photo
              </button>
              <button className="demo-button outline" style={{ padding: '0.5rem 1rem' }}>
                🎥 Video
              </button>
              <button className="demo-button outline" style={{ padding: '0.5rem 1rem' }}>
                😊 Feeling
              </button>
              <button className="demo-button primary" onClick={addPost} style={{ marginLeft: 'auto' }}>
                Post
              </button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Feed</h2>
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2.5rem' }}>{post.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{post.user}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{post.time}</div>
                  </div>
                </div>
                <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>{post.content}</p>
                {post.image && (
                  <div style={{ 
                    fontSize: '4rem', 
                    textAlign: 'center', 
                    padding: '2rem', 
                    background: '#f9fafb', 
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {post.image}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                  <button 
                    onClick={() => likePost(post.id)}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#6b7280'
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                  <button style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280'
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>💬</span>
                    <span>{post.comments}</span>
                  </button>
                  <button style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6b7280'
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>📤</span>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Trending Topics</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['#webdev', '#react', '#javascript', '#coding', '#tech', '#design'].map(tag => (
              <span key={tag} style={{
                padding: '0.5rem 1rem',
                background: '#e0e7ff',
                color: '#4338ca',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Online Friends</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['👤', '👩', '👨', '🧑', '👧', '👦'].map((avatar, index) => (
              <div key={index} style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ 
                  fontSize: '3rem', 
                  position: 'relative',
                  marginBottom: '0.5rem'
                }}>
                  {avatar}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '16px',
                    height: '16px',
                    background: '#10b981',
                    border: '2px solid white',
                    borderRadius: '50%'
                  }}></span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Friend {index + 1}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
