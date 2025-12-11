import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsAPI } from '../services/api';
import { buildImageUrl } from '../utils/imageHelper';
import { FiCalendar, FiEye, FiArrowRight } from 'react-icons/fi';
import './News.css';

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { value: '', label: 'All' },
    { value: 'news', label: 'News' },
    { value: 'blog', label: 'Blog' },
    { value: 'announcement', label: 'Announcements' },
    { value: 'press-release', label: 'Press Releases' }
  ];

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await newsAPI.getAll({ 
        category: filter || undefined,
        page,
        limit: 9
      });
      
      const postsData = response.data.data || [];
      
      // Normalize image URLs
      const normalizedPosts = postsData.map(post => ({
        ...post,
        featuredImage: buildImageUrl(post.featuredImage)
      }));
      
      setPosts(normalizedPosts);
      setTotalPages(response.data.pages || 1);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="news-page">
      <section className="news-hero">
        <div className="container">
          <h1>News & Blog</h1>
          <p>Stay updated with the latest news, insights, and announcements from Javelin Security</p>
        </div>
      </section>

      <section className="news-content">
        <div className="container">
          <div className="news-filters">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
                onClick={() => { setFilter(cat.value); setPage(1); }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading posts...</p>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts found</p>
            </div>
          ) : (
            <>
              <div className="news-grid">
                {posts.map(post => (
                  <article key={post._id} className="news-card">
                    <div className="news-card-image">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/javelin-logo.png';
                        }}
                      />
                      <span className="news-category">{post.category}</span>
                    </div>
                    <div className="news-card-content">
                      <div className="news-meta">
                        <span><FiCalendar /> {formatDate(post.publishedAt || post.createdAt)}</span>
                        <span><FiEye /> {post.views || 0} views</span>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt || post.content.substring(0, 150)}...</p>
                      <Link to={`/news/${post.slug}`} className="read-more">
                        Read More <FiArrowRight />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    Previous
                  </button>
                  <span>Page {page} of {totalPages}</span>
                  <button 
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
