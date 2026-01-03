import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { newsAPI } from '../services/api';
import { buildImageUrl } from '../utils/imageHelper';
import { FiCalendar, FiUser, FiEye, FiArrowLeft, FiTag, FiClock, FiShare2, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './NewsDetail.css';

const NewsDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
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
      const normalizedPost = {
        ...postData,
        featuredImage: buildImageUrl(postData.featuredImage)
      };
      setPost(normalizedPost);
      
      // Fetch related posts
      fetchRelatedPosts(postData.category, postData._id);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (category, currentPostId) => {
    try {
      const response = await newsAPI.getAll({ category, limit: 3 });
      const related = (response.data.data || [])
        .filter(p => p._id !== currentPostId)
        .slice(0, 3)
        .map(p => ({
          ...p,
          featuredImage: buildImageUrl(p.featuredImage)
        }));
      setRelatedPosts(related);
    } catch (err) {
      console.error('Error fetching related posts:', err);
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

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
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
      <SEO 
        title={`${post.title} - Javelin Associates Security Blog`}
        description={post.excerpt || post.content.substring(0, 160)}
        keywords={`security news, ${post.tags?.join(', ')}, security Nigeria, ${post.category}`}
        url={`/#/news/${post.slug}`}
        ogImage={post.featuredImage}
      />
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
                <span><FiClock /> {calculateReadingTime(post.content)} min read</span>
                <span><FiEye /> {post.views} views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="article-layout">
            <div className="article-main">
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

              {/* Share Section */}
              <div className="article-share">
                <h3><FiShare2 /> Share This Article</h3>
                <div className="share-buttons">
                  <button className="share-btn facebook" onClick={() => shareOnSocial('facebook')}>
                    <FiFacebook /> Facebook
                  </button>
                  <button className="share-btn twitter" onClick={() => shareOnSocial('twitter')}>
                    <FiTwitter /> Twitter
                  </button>
                  <button className="share-btn linkedin" onClick={() => shareOnSocial('linkedin')}>
                    <FiLinkedin /> LinkedIn
                  </button>
                  <button className="share-btn whatsapp" onClick={() => shareOnSocial('whatsapp')}>
                    <FaWhatsapp /> WhatsApp
                  </button>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="related-posts">
                  <h3>Related Articles</h3>
                  <div className="related-grid">
                    {relatedPosts.map(related => (
                      <Link 
                        key={related._id} 
                        to={`/news/${related.slug}`} 
                        className="related-card"
                      >
                        <img src={related.featuredImage} alt={related.title} />
                        <div className="related-content">
                          <span className="related-category">{related.category}</span>
                          <h4>{related.title}</h4>
                          <span className="related-date">
                            <FiCalendar /> {formatDate(related.publishedAt || related.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="article-footer">
                <Link to="/news" className="btn btn-outline">
                  <FiArrowLeft /> Back to All Articles
                </Link>
                <Link to="/contact" className="btn btn-primary">
                  Contact Us for Security Services
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="article-sidebar">
              {/* Newsletter Signup */}
              <div className="sidebar-card newsletter-card">
                <h3>Stay Informed</h3>
                <p>Subscribe to our newsletter for security tips and updates</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>
              </div>

              {/* Categories */}
              <div className="sidebar-card">
                <h3>Categories</h3>
                <ul className="category-list">
                  <li><Link to="/news?category=news">News</Link></li>
                  <li><Link to="/news?category=blog">Blog</Link></li>
                  <li><Link to="/news?category=announcement">Announcements</Link></li>
                  <li><Link to="/news?category=press-release">Press Releases</Link></li>
                </ul>
              </div>

              {/* CTA Card */}
              <div className="sidebar-card cta-card">
                <h3>Need Security Services?</h3>
                <p>Contact us for a free consultation</p>
                <Link to="/contact" className="btn btn-primary btn-block">Get Quote</Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
