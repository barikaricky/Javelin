import React, { useState, useEffect } from 'react';
import { teamAPI, sitesAPI, galleryAPI, newsAPI, contactAPI } from '../services/api';
import { FiUsers, FiMapPin, FiImage, FiFileText, FiMail, FiTrendingUp } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    teamMembers: 0,
    sites: 0,
    galleryItems: 0,
    newsPosts: 0,
    unreadMessages: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [teamRes, sitesRes, galleryRes, newsRes, contactStatsRes, messagesRes] = await Promise.all([
        teamAPI.getAllAdmin(),
        sitesAPI.getAllAdmin(),
        galleryAPI.getAllAdmin(),
        newsAPI.getAllAdmin(),
        contactAPI.getStats(),
        contactAPI.getMessages({ limit: 5 })
      ]);

      setStats({
        teamMembers: teamRes.data.count || 0,
        sites: sitesRes.data.count || 0,
        galleryItems: galleryRes.data.count || 0,
        newsPosts: newsRes.data.count || 0,
        unreadMessages: contactStatsRes.data.data?.unread || 0
      });

      setRecentMessages(messagesRes.data.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Team Members', value: stats.teamMembers, icon: <FiUsers />, color: '#4dabf7' },
    { label: 'Operational Sites', value: stats.sites, icon: <FiMapPin />, color: '#51cf66' },
    { label: 'Gallery Items', value: stats.galleryItems, icon: <FiImage />, color: '#fcc419' },
    { label: 'News Posts', value: stats.newsPosts, icon: <FiFileText />, color: '#ff6b6b' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: <FiMail />, color: '#845ef7' },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to Javelin Security Admin Portal</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header">
            <h2><FiMail /> Recent Messages</h2>
          </div>
          <div className="messages-list">
            {recentMessages.length === 0 ? (
              <p className="no-data">No messages yet</p>
            ) : (
              recentMessages.map((message) => (
                <div key={message._id} className={`message-item ${message.status === 'new' ? 'unread' : ''}`}>
                  <div className="message-header">
                    <strong>{message.name}</strong>
                    <span className={`status-badge ${message.status}`}>{message.status}</span>
                  </div>
                  <p className="message-subject">{message.subject}</p>
                  <p className="message-preview">{message.message.substring(0, 100)}...</p>
                  <span className="message-date">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2><FiTrendingUp /> Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <a href="/admin/team" className="action-btn">
              <FiUsers /> Add Team Member
            </a>
            <a href="/admin/sites" className="action-btn">
              <FiMapPin /> Add Site
            </a>
            <a href="/admin/gallery" className="action-btn">
              <FiImage /> Add Gallery Item
            </a>
            <a href="/admin/news" className="action-btn">
              <FiFileText /> Create News Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
