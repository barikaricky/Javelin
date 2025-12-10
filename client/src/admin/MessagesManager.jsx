import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { FiMail, FiTrash2, FiX, FiEye, FiFilter, FiCheck, FiArchive } from 'react-icons/fi';
import './Manager.css';
import './MessagesManager.css';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, unread: 0 });

  const statuses = [
    { value: 'new', label: 'New', color: '#4dabf7' },
    { value: 'read', label: 'Read', color: '#868e96' },
    { value: 'replied', label: 'Replied', color: '#51cf66' },
    { value: 'archived', label: 'Archived', color: '#fab005' }
  ];

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [filterStatus]);

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getMessages({ status: filterStatus || undefined });
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await contactAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const viewMessage = async (message) => {
    setSelectedMessage(message);
    if (message.status === 'new') {
      try {
        await contactAPI.updateMessage(message._id, { status: 'read' });
        fetchMessages();
        fetchStats();
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await contactAPI.updateMessage(id, { status });
      fetchMessages();
      fetchStats();
      if (selectedMessage?._id === id) {
        setSelectedMessage(prev => ({ ...prev, status }));
      }
    } catch (error) {
      console.error('Error updating message:', error);
      setError('Failed to update message');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await contactAPI.deleteMessage(id);
      fetchMessages();
      fetchStats();
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="manager-loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="manager messages-manager">
      <div className="manager-header">
        <div>
          <h1>Contact Messages</h1>
          <p>
            {stats.unread > 0 ? (
              <span className="unread-count">{stats.unread} unread message{stats.unread !== 1 ? 's' : ''}</span>
            ) : (
              'All messages read'
            )} • {stats.total} total
          </p>
        </div>
        <div className="filter-group">
          <FiFilter />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Messages</option>
            {statuses.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="messages-container">
        <div className="messages-list-panel">
          {messages.length === 0 ? (
            <div className="no-messages">
              <FiMail size={48} />
              <p>No messages found</p>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message._id} 
                className={`message-list-item ${message.status === 'new' ? 'unread' : ''} ${selectedMessage?._id === message._id ? 'selected' : ''}`}
                onClick={() => viewMessage(message)}
              >
                <div className="message-list-header">
                  <strong>{message.name}</strong>
                  <span 
                    className="status-dot" 
                    style={{ backgroundColor: statuses.find(s => s.value === message.status)?.color }}
                    title={message.status}
                  />
                </div>
                <p className="message-list-subject">{message.subject}</p>
                <p className="message-list-preview">{message.message.substring(0, 60)}...</p>
                <span className="message-list-date">{formatDate(message.createdAt)}</span>
              </div>
            ))
          )}
        </div>

        <div className="message-detail-panel">
          {selectedMessage ? (
            <>
              <div className="message-detail-header">
                <div>
                  <h2>{selectedMessage.subject}</h2>
                  <p className="message-sender">
                    From: <strong>{selectedMessage.name}</strong> ({selectedMessage.email})
                    {selectedMessage.phone && <span> • {selectedMessage.phone}</span>}
                  </p>
                  <p className="message-date">{formatDate(selectedMessage.createdAt)}</p>
                </div>
                <button className="btn-close" onClick={() => setSelectedMessage(null)}>
                  <FiX />
                </button>
              </div>
              
              <div className="message-detail-body">
                <p>{selectedMessage.message}</p>
              </div>
              
              <div className="message-detail-actions">
                <a 
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="btn-primary"
                  onClick={() => updateStatus(selectedMessage._id, 'replied')}
                >
                  <FiMail /> Reply via Email
                </a>
                <button 
                  className="btn-secondary"
                  onClick={() => updateStatus(selectedMessage._id, 'replied')}
                >
                  <FiCheck /> Mark as Replied
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => updateStatus(selectedMessage._id, 'archived')}
                >
                  <FiArchive /> Archive
                </button>
                <button 
                  className="btn-icon btn-danger"
                  onClick={() => handleDelete(selectedMessage._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <FiEye size={48} />
              <p>Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;
