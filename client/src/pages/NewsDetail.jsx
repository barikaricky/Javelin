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
  const [readingProgress, setReadingProgress] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const generateTableOfContents = (content) => {
    const lines = content.split('\n').filter(line => line.trim());
    const headings = [];
    let headingCount = 0;
    
    lines.forEach((line, index) => {
      if (line.length > 20 && line.length < 100 && !line.includes('.') && index < lines.length / 2) {
        headingCount++;
        headings.push({
          id: `section-${headingCount}`,
          text: line,
          level: 2
        });
      }
    });
    
    return headings.slice(0, 6);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBookmark = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      alert('Article link copied to clipboard!');
    }
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
          {/* Reading Progress Bar */}
          <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />

          <div className="article-layout">
            <div className="article-main">
              {/* Article Tools */}
              <div className="article-tools">
                <button className="tool-btn" onClick={handlePrint} title="Print Article">
                  <FiArrowLeft style={{ transform: 'rotate(-90deg)' }} /> Print
                </button>
                <button className="tool-btn" onClick={handleBookmark} title="Share Article">
                  <FiShare2 /> Share
                </button>
                {calculateReadingTime(post.content) > 5 && (
                  <button className="tool-btn" onClick={() => setShowTOC(!showTOC)} title="Table of Contents">
                    📑 Contents
                  </button>
                )}
              </div>

              {/* Table of Contents for long articles */}
              {showTOC && calculateReadingTime(post.content) > 5 && (
                <div className="table-of-contents">
                  <h3>Table of Contents</h3>
                  <ul>
                    {generateTableOfContents(post.content).map((heading, index) => (
                      <li key={index}>
                        <a href={`#${heading.id}`}>{heading.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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

              {/* Author Bio */}
              {post.author && (
                <div className="author-bio">
                  <div className="author-avatar">
                    <FiUser />
                  </div>
                  <div className="author-info">
                    <h4>About the Author</h4>
                    <h3>{post.author.name || 'Javelin Associates Team'}</h3>
                    <p>
                      {post.author.bio || `Security expert at Javelin Associates Ltd, Nigeria's leading security company. Specialized in providing insights on security best practices, industry trends, and safety solutions for businesses across Rivers State and Nigeria.`}
                    </p>
                  </div>
                </div>
              )}

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

              {/* Comments Section */}
              <div className="comments-section">
                <h3>💬 Join the Discussion</h3>
                <p className="comments-info">
                  Share your thoughts, ask questions, or discuss security topics with our community.
                </p>
                <div className="comments-placeholder">
                  <div className="comment-cta">
                    <h4>Want to share your thoughts?</h4>
                    <p>Contact our team to discuss security solutions or share your insights</p>
                    <Link to="/contact" className="btn btn-primary">
                      Contact Our Security Experts
                    </Link>
                  </div>
                  <div className="comment-notice">
                    <p>
                      <strong>Note:</strong> For immediate security concerns or consultations, 
                      please call us directly at <strong>08103323437</strong> or <strong>09153542986</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="related-posts">
                  <h3>📚 Related Articles</h3>
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
                <div className="newsletter-icon">📧</div>
                <h3>Stay Security-Savvy</h3>
                <p>Get expert security tips, industry insights, and exclusive updates delivered to your inbox</p>
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe Now
                  </button>
                </form>
                <p className="newsletter-note">Join 500+ security professionals. Unsubscribe anytime.</p>
              </div>

              {/* Quick Stats */}
              <div className="sidebar-card stats-card">
                <h3>📊 Why Choose Us</h3>
                <div className="stat-item">
                  <strong>15+</strong>
                  <span>Years Experience</span>
                </div>
                <div className="stat-item">
                  <strong>24/7</strong>
                  <span>Availability</span>
                </div>
                <div className="stat-item">
                  <strong>500+</strong>
                  <span>Satisfied Clients</span>
                </div>
                <div className="stat-item">
                  <strong>100%</strong>
                  <span>Licensed & Insured</span>
                </div>
              </div>

              {/* Categories */}
              <div className="sidebar-card">
                <h3>📑 Browse Topics</h3>
                <ul className="category-list">
                  <li><Link to="/news?category=news">📰 Security News</Link></li>
                  <li><Link to="/news?category=blog">✍️ Expert Blog</Link></li>
                  <li><Link to="/news?category=announcement">📢 Announcements</Link></li>
                  <li><Link to="/news?category=press-release">📄 Press Releases</Link></li>
                </ul>
              </div>

              {/* CTA Card */}
              <div className="sidebar-card cta-card">
                <h3>🛡️ Secure Your Business Today</h3>
                <p>Professional security solutions tailored to your needs in Port Harcourt and across Nigeria</p>
                <div className="cta-buttons">
                  <Link to="/contact" className="btn btn-primary btn-block">Get Free Quote</Link>
                  <a href="tel:+2348103323437" className="btn btn-outline btn-block">📞 Call Now</a>
                </div>
              </div>

              {/* Popular Services */}
              <div className="sidebar-card">
                <h3>🔥 Popular Services</h3>
                <ul className="services-list">
                  <li><Link to="/services#armed-guards">Armed Security Guards</Link></li>
                  <li><Link to="/services#k9-units">K-9 Security Units</Link></li>
                  <li><Link to="/services#cctv">CCTV Surveillance</Link></li>
                  <li><Link to="/services#mobile-patrol">Mobile Patrol</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
