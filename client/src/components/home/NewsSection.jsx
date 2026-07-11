import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsAPI } from '../../services/api';
import { buildImageUrl } from '../../utils/imageHelper';
import { FiCalendar, FiEye, FiArrowRight } from 'react-icons/fi';
import './NewsSection.css';

const NewsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.getAll({ limit: 3 });
      const postsData = response.data.data || [];
      
      // Normalize image URLs
      const normalizedPosts = postsData.map(post => ({
        ...post,
        featuredImage: buildImageUrl(post.featuredImage)
      }));
      
      setPosts(normalizedPosts);
    } catch (error) {
      console.error('Error fetching news:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return null;
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Latest Updates</p>
          <h2>News & Insights</h2>
          <p>Stay informed with our latest news, security tips, and industry insights</p>
        </div>

        <div className="news-grid-home">
          {posts.map((post) => (
            <article key={post._id} className="news-card-home">
              <div className="news-card-home__image">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/javelin-logo.png';
                  }}
                />
                <span className="news-card-home__category">{post.category}</span>
              </div>
              
              <div className="news-card-home__content">
                <div className="news-card-home__meta">
                  <span className="meta-item">
                    <FiCalendar /> {formatDate(post.publishedAt || post.createdAt)}
                  </span>
                  <span className="meta-item">
                    <FiEye /> {post.views || 0} views
                  </span>
                </div>
                
                <h3 className="news-card-home__title">{post.title}</h3>
                <p className="news-card-home__excerpt">
                  {post.excerpt || post.content.substring(0, 120)}...
                </p>
                
                <Link to={`/news/${post.slug}`} className="news-card-home__link">
                  Read Article <FiArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="news-section__cta">
          <Link to="/news" className="btn btn-primary btn-lg">
            View All News & Updates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
