import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { newsAPI } from '../services/api';
import { buildImageUrl } from '../utils/imageHelper';
import { FiCalendar, FiEye, FiArrowRight, FiSearch, FiClock } from 'react-icons/fi';
import './News.css';

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
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

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  const filteredAndSortedPosts = () => {
    let filtered = posts;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt);
        case 'oldest':
          return new Date(a.publishedAt || a.createdAt) - new Date(b.publishedAt || b.createdAt);
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });
    
    return sorted;
  };

  const displayedPosts = filteredAndSortedPosts();

  return (
    <div className="news-page">
      <SEO 
        title="Security News & Blog - Expert Insights from Javelin Associates Nigeria"
        description="Read the latest security news, industry insights, safety tips, and expert advice from Javelin Associates. Stay informed about security trends in Nigeria and Rivers State."
        keywords="security news Nigeria, security blog, security tips Nigeria, security industry news, Port Harcourt security news, security insights, safety tips Nigeria, Javelin Associates blog"
        url="/#/news"
      />
      <section className="news-hero">
        <div className="container">
          <h1>Security News & Expert Insights</h1>
          <p>Stay updated with the latest security news, industry insights, and expert advice from Nigeria's leading security company</p>
        </div>
      </section>

      <section className="news-content">
        <div className="container">
          {/* Search and Sort Bar */}
          <div className="news-controls">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="sort-select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

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
          ) : displayedPosts.length === 0 ? (
            <div className="no-posts">
              <p>{searchQuery ? `No articles found for "${searchQuery}"` : 'No posts found'}</p>
              {searchQuery && (
                <button className="btn btn-primary" onClick={() => setSearchQuery('')}>
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="posts-count">
                <p>Showing {displayedPosts.length} {displayedPosts.length === 1 ? 'article' : 'articles'}</p>
              </div>
              <div className="news-grid">
                {displayedPosts.map(post => (
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
                        <span><FiClock /> {calculateReadingTime(post.content)} min read</span>
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
