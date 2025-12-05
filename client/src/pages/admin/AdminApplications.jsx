import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaFileAlt, FaUser, FaSearch, FaFilter, FaEye, FaReply, FaTrash, FaCheckCircle,
  FaTimesCircle, FaSpinner, FaClock, FaUserTie, FaDownload,
  FaChevronLeft, FaChevronRight, FaTimes, FaBriefcase,
  FaClipboardCheck, FaCalendarAlt, FaPaperPlane, FaArrowLeft
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './AdminApplications.css';

const AdminApplications = () => {
  const { isHeadPoster } = useAuth();
  const navigate = useNavigate();
  
  // State
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyData, setReplyData] = useState({ subject: '', message: '' });
  const [notification, setNotification] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Status config
  const statusConfig = {
    pending: { color: '#f59e0b', label: 'Pending', icon: <FaClock /> },
    reviewing: { color: '#3b82f6', label: 'Reviewing', icon: <FaEye /> },
    shortlisted: { color: '#8b5cf6', label: 'Shortlisted', icon: <FaClipboardCheck /> },
    interview: { color: '#06b6d4', label: 'Interview', icon: <FaCalendarAlt /> },
    accepted: { color: '#10b981', label: 'Accepted', icon: <FaCheckCircle /> },
    rejected: { color: '#ef4444', label: 'Rejected', icon: <FaTimesCircle /> }
  };

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await axios.get(`${apiUrl}/applications?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setApplications(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      showNotification('Failed to fetch applications', 'error');
    } finally {
      setLoading(false);
    }
  }, [apiUrl, currentPage, statusFilter, searchTerm]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/applications/stats/overview`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    if (!isHeadPoster) {
      navigate('/admin/login');
      return;
    }
    fetchApplications();
    fetchStats();
  }, [isHeadPoster, navigate, fetchApplications, fetchStats]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // View application details
  const viewApplication = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSelectedApplication(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching application:', error);
      showNotification('Failed to load application details', 'error');
    }
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `${apiUrl}/applications/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        showNotification(`Application status updated to ${newStatus}`);
        fetchApplications();
        fetchStats();
        
        if (selectedApplication && selectedApplication._id === id) {
          setSelectedApplication(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('Failed to update status', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Send reply
  const sendReply = async () => {
    if (!replyData.subject || !replyData.message) {
      showNotification('Please fill in subject and message', 'error');
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${apiUrl}/applications/${selectedApplication._id}/reply`,
        replyData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        showNotification('Email sent successfully!');
        setShowReplyModal(false);
        setReplyData({ subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      showNotification('Failed to send email', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete application
  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${apiUrl}/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        showNotification('Application deleted successfully');
        fetchApplications();
        fetchStats();
        if (selectedApplication?._id === id) {
          setSelectedApplication(null);
        }
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      showNotification('Failed to delete application', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render Stats Cards
  const renderStats = () => (
    <div className="stats-overview">
      <div className="stat-card total">
        <FaFileAlt className="stat-icon" />
        <div className="stat-info">
          <h3>{stats?.total || 0}</h3>
          <p>Total Applications</p>
        </div>
      </div>
      <div className="stat-card recent">
        <FaClock className="stat-icon" />
        <div className="stat-info">
          <h3>{stats?.recent || 0}</h3>
          <p>This Week</p>
        </div>
      </div>
      {Object.entries(statusConfig).map(([key, config]) => (
        <div 
          key={key} 
          className="stat-card clickable"
          style={{ borderColor: config.color }}
          onClick={() => setStatusFilter(key)}
        >
          <span className="stat-icon" style={{ color: config.color }}>
            {config.icon}
          </span>
          <div className="stat-info">
            <h3>{stats?.byStatus?.[key] || 0}</h3>
            <p>{config.label}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // Render Application List
  const renderApplicationList = () => (
    <div className="applications-list">
      <div className="list-header">
        <h2>Applications</h2>
        <div className="list-controls">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="filter-box">
            <FaFilter />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <FaSpinner className="spinner" />
          <p>Loading applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <FaFileAlt />
          <p>No applications found</p>
        </div>
      ) : (
        <>
          <div className="applications-table">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr 
                    key={app._id}
                    className={selectedApplication?._id === app._id ? 'selected' : ''}
                    onClick={() => viewApplication(app._id)}
                  >
                    <td className="applicant-cell">
                      <div className="applicant-info">
                        <span className="applicant-name">
                          {app.personalDetails?.fullName || 'N/A'}
                        </span>
                        <span className="applicant-email">
                          {app.personalDetails?.email || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td>{app.personalDetails?.position || 'N/A'}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: statusConfig[app.status]?.color }}
                      >
                        {statusConfig[app.status]?.icon}
                        {statusConfig[app.status]?.label}
                      </span>
                    </td>
                    <td className="date-cell">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="actions-cell" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="action-btn view"
                        onClick={() => viewApplication(app._id)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => deleteApplication(app._id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <FaChevronLeft /> Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Render Application Detail
  const renderApplicationDetail = () => {
    if (!selectedApplication) return null;

    const app = selectedApplication;
    const personal = app.personalDetails || {};
    const guarantors = app.guarantors || [];
    const docs = app.documents || {};

    return (
      <div className="application-detail">
        <div className="detail-header">
          <button 
            className="back-btn"
            onClick={() => setSelectedApplication(null)}
          >
            <FaArrowLeft /> Back to List
          </button>
          <div className="header-actions">
            <select
              value={app.status}
              onChange={(e) => updateStatus(app._id, e.target.value)}
              className="status-select"
              style={{ borderColor: statusConfig[app.status]?.color }}
              disabled={actionLoading}
            >
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
            <button 
              className="reply-btn"
              onClick={() => setShowReplyModal(true)}
            >
              <FaReply /> Reply via Email
            </button>
          </div>
        </div>

        <div className="detail-content">
          {/* Personal Information */}
          <div className="detail-section">
            <h3><FaUser /> Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <span>{personal.fullName || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Email</label>
                <span>
                  <a href={`mailto:${personal.email}`}>{personal.email || 'N/A'}</a>
                </span>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <span>
                  <a href={`tel:${personal.phone}`}>{personal.phone || 'N/A'}</a>
                </span>
              </div>
              <div className="info-item">
                <label>Alternate Phone</label>
                <span>{personal.alternatePhone || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Date of Birth</label>
                <span>{personal.dateOfBirth ? new Date(personal.dateOfBirth).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Gender</label>
                <span className="capitalize">{personal.gender || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>State of Origin</label>
                <span>{personal.stateOfOrigin || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>LGA</label>
                <span>{personal.lga || 'N/A'}</span>
              </div>
              <div className="info-item full-width">
                <label>Address</label>
                <span>{personal.address || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Position Applied</label>
                <span className="highlight">{personal.position || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Experience</label>
                <span>{personal.experience || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Education</label>
                <span>{personal.education || 'N/A'}</span>
              </div>
              <div className="info-item full-width">
                <label>Skills</label>
                <span>{personal.skills || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Guarantors */}
          {guarantors.map((guarantor, index) => (
            <div key={index} className="detail-section guarantor-section">
              <h3><FaUserTie /> Guarantor {index + 1}</h3>
              <div className="guarantor-content">
                {guarantor.passportPhoto && (
                  <div className="guarantor-photo">
                    <img 
                      src={`${apiUrl.replace('/api', '')}/${guarantor.passportPhoto}`}
                      alt={`Guarantor ${index + 1}`}
                    />
                  </div>
                )}
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <span>{guarantor.name || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <span>
                      <a href={`tel:${guarantor.phone}`}>{guarantor.phone || 'N/A'}</a>
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <span>
                      <a href={`mailto:${guarantor.email}`}>{guarantor.email || 'N/A'}</a>
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Relationship</label>
                    <span>{guarantor.relationship || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Occupation</label>
                    <span>{guarantor.occupation || 'N/A'}</span>
                  </div>
                  <div className="info-item full-width">
                    <label>Address</label>
                    <span>{guarantor.address || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Documents */}
          <div className="detail-section">
            <h3><FaFileAlt /> Documents</h3>
            <div className="documents-grid">
              {docs.cv && (
                <a 
                  href={`${apiUrl.replace('/api', '')}/${docs.cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="document-card"
                >
                  <FaFileAlt />
                  <span>CV/Resume</span>
                  <FaDownload className="download-icon" />
                </a>
              )}
              {docs.passport && (
                <a 
                  href={`${apiUrl.replace('/api', '')}/${docs.passport}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="document-card"
                >
                  <FaUser />
                  <span>Passport Photo</span>
                  <FaDownload className="download-icon" />
                </a>
              )}
              {docs.certificate && (
                <a 
                  href={`${apiUrl.replace('/api', '')}/${docs.certificate}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="document-card"
                >
                  <FaBriefcase />
                  <span>Certificate</span>
                  <FaDownload className="download-icon" />
                </a>
              )}
              {docs.guarantorIds?.map((id, index) => (
                <a 
                  key={index}
                  href={`${apiUrl.replace('/api', '')}/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="document-card"
                >
                  <FaUserTie />
                  <span>Guarantor ID {index + 1}</span>
                  <FaDownload className="download-icon" />
                </a>
              ))}
            </div>
          </div>

          {/* Admin Notes */}
          <div className="detail-section">
            <h3><FaClipboardCheck /> Application Timeline</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-date">{formatDate(app.createdAt)}</span>
                  <p>Application Submitted</p>
                </div>
              </div>
              {app.adminNotes && (
                <div className="timeline-item">
                  <div className="timeline-marker note"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Admin Note</span>
                    <p>{app.adminNotes}</p>
                  </div>
                </div>
              )}
              <div className="timeline-item current">
                <div 
                  className="timeline-marker"
                  style={{ backgroundColor: statusConfig[app.status]?.color }}
                ></div>
                <div className="timeline-content">
                  <span className="timeline-date">Current Status</span>
                  <p style={{ color: statusConfig[app.status]?.color }}>
                    {statusConfig[app.status]?.label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Reply Modal
  const renderReplyModal = () => (
    <div className={`modal-overlay ${showReplyModal ? 'show' : ''}`}>
      <div className="modal reply-modal">
        <div className="modal-header">
          <h3><FaReply /> Reply to Applicant</h3>
          <button onClick={() => setShowReplyModal(false)}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <p className="reply-to">
            To: <strong>{selectedApplication?.personalDetails?.email}</strong>
          </p>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              placeholder="Email subject..."
              value={replyData.subject}
              onChange={(e) => setReplyData(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="8"
              placeholder="Your message to the applicant..."
              value={replyData.message}
              onChange={(e) => setReplyData(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>
          <div className="quick-templates">
            <span>Quick Templates:</span>
            <button onClick={() => setReplyData({
              subject: 'Application Received - Javelin Associates',
              message: `Dear ${selectedApplication?.personalDetails?.fullName},\n\nThank you for submitting your application for the ${selectedApplication?.personalDetails?.position} position at Javelin Associates.\n\nWe have received your application and it is currently under review. We will contact you if your qualifications match our requirements.\n\nBest regards,\nJavelin Associates HR Team`
            })}>
              Acknowledgment
            </button>
            <button onClick={() => setReplyData({
              subject: 'Interview Invitation - Javelin Associates',
              message: `Dear ${selectedApplication?.personalDetails?.fullName},\n\nCongratulations! We are pleased to inform you that you have been shortlisted for an interview for the ${selectedApplication?.personalDetails?.position} position.\n\nPlease contact us to schedule your interview at your earliest convenience.\n\nBest regards,\nJavelin Associates HR Team`
            })}>
              Interview Invite
            </button>
            <button onClick={() => setReplyData({
              subject: 'Application Status Update - Javelin Associates',
              message: `Dear ${selectedApplication?.personalDetails?.fullName},\n\nThank you for your interest in joining Javelin Associates.\n\nAfter careful consideration of your application for the ${selectedApplication?.personalDetails?.position} position, we regret to inform you that we will not be moving forward with your application at this time.\n\nWe appreciate your interest and wish you the best in your future endeavors.\n\nBest regards,\nJavelin Associates HR Team`
            })}>
              Rejection
            </button>
          </div>
        </div>
        <div className="modal-footer">
          <button 
            className="btn-cancel"
            onClick={() => setShowReplyModal(false)}
          >
            Cancel
          </button>
          <button 
            className="btn-send"
            onClick={sendReply}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <><FaSpinner className="spinner" /> Sending...</>
            ) : (
              <><FaPaperPlane /> Send Email</>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-applications">
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
          {notification.message}
        </div>
      )}

      <div className="page-header">
        <h1><FaFileAlt /> Applications Management</h1>
        <p>Review and manage job applications</p>
      </div>

      {stats && renderStats()}

      <div className="main-content">
        {selectedApplication ? renderApplicationDetail() : renderApplicationList()}
      </div>

      {renderReplyModal()}
    </div>
  );
};

export default AdminApplications;
