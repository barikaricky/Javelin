import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsAPI } from '../services/api';
import { buildImageUrl } from '../utils/imageHelper';
import { FiCalendar, FiUser, FiEye, FiArrowLeft, FiTag } from 'react-icons/fi';
import './NewsDetail.css';

const NewsDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await newsAPI.getBySlug(slug);
      const postData = response.data.data;
      
      // Normalize image URL
      setPost({
        ...postData,
        featuredImage: buildImageUrl(postData.featuredImage)
      });
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Post not found');
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

  if (loading) {
    return (
      <div className="news-detail-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Post Not Found</h2>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/news" className="btn-back">
              <FiArrowLeft /> Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <article className="news-article">
        <div className="article-hero" style={{ backgroundImage: `url(${post.featuredImage})` }}>
          <div className="article-hero-overlay">
            <div className="container">
              <Link to="/news" className="back-link">
                <FiArrowLeft /> Back to News
              </Link>
              <span className="article-category">{post.category}</span>
              <h1>{post.title}</h1>
              <div className="article-meta">
                <span><FiCalendar /> {formatDate(post.publishedAt || post.createdAt)}</span>
                {post.author && <span><FiUser /> {post.author.name}</span>}
                <span><FiEye /> {post.views} views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="article-content">
            {post.excerpt && (
              <p className="article-excerpt">{post.excerpt}</p>
            )}
            <div className="article-body">
              {post.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="article-tags">
                <FiTag />
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="article-footer">
            <Link to="/news" className="btn-back">
              <FiArrowLeft /> Back to All News
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
