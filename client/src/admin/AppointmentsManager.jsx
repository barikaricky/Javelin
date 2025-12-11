import React, { useState, useEffect } from 'react';
import { FaCalendar, FaCheck, FaTimes, FaClock, FaPhone, FaVideo, FaBuilding, FaTrash, FaEye } from 'react-icons/fa';
import api from '../services/api';
import './AppointmentsManager.css';

const AppointmentsManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/appointments');
      const appointmentsList = Array.isArray(response.data?.data) ? response.data.data : [];
      setAppointments(appointmentsList);
      setError('');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch appointments';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      setAppointments((prev) => prev.map((apt) => (
        apt._id === id ? { ...apt, status } : apt
      )));
      setShowDetails(false);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update appointment';
      alert(message);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    try {
      await api.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((apt) => apt._id !== id));
      setShowDetails(false);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete appointment';
      alert(message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      case 'completed': return 'info';
      default: return 'secondary';
    }
  };

  const getMeetingIcon = (type) => {
    switch (type) {
      case 'in-person': return <FaBuilding />;
      case 'phone-call': return <FaPhone />;
      case 'video-call': return <FaVideo />;
      default: return <FaCalendar />;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="appointments-manager">
      <div className="appointments-header">
        <h1>Appointment Requests</h1>
        <p>Manage and process client appointment requests</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaCalendar />
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Appointments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <FaClock />
          </div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon confirmed">
            <FaCheck />
          </div>
          <div className="stat-info">
            <h3>{stats.confirmed}</h3>
            <p>Confirmed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCalendar />
          </div>
          <div className="stat-info">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </button>
        <button 
          className={filter === 'pending' ? 'active' : ''} 
          onClick={() => setFilter('pending')}
        >
          Pending ({stats.pending})
        </button>
        <button 
          className={filter === 'confirmed' ? 'active' : ''} 
          onClick={() => setFilter('confirmed')}
        >
          Confirmed ({stats.confirmed})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </button>
        <button 
          className={filter === 'cancelled' ? 'active' : ''} 
          onClick={() => setFilter('cancelled')}
        >
          Cancelled ({stats.cancelled})
        </button>
      </div>

      {/* Appointments List */}
      <div className="appointments-list">
        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <FaCalendar />
            <p>No appointments found</p>
          </div>
        ) : (
          filteredAppointments.map(appointment => (
            <div key={appointment._id} className="appointment-card">
              <div className="appointment-header-row">
                <div className="appointment-client">
                  <h3>{appointment.clientName}</h3>
                  {appointment.companyName && <p className="company">{appointment.companyName}</p>}
                </div>
                <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="appointment-details-grid">
                <div className="detail-item">
                  <span className="detail-icon">{getMeetingIcon(appointment.meetingType)}</span>
                  <span>{appointment.meetingType?.replace('-', ' ')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon"><FaCalendar /></span>
                  <span>{new Date(appointment.preferredDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon"><FaClock /></span>
                  <span>{appointment.preferredTime}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon"><FaPhone /></span>
                  <span>{appointment.phone}</span>
                </div>
              </div>

              <div className="appointment-service">
                <strong>Service Interest:</strong> {appointment.serviceInterest}
              </div>

              <div className="appointment-actions">
                <button 
                  className="btn-view"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowDetails(true);
                  }}
                >
                  <FaEye /> View Details
                </button>
                {appointment.status === 'pending' && (
                  <>
                    <button 
                      className="btn-approve"
                      onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                    >
                      <FaCheck /> Confirm
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                )}
                {appointment.status === 'confirmed' && (
                  <button 
                    className="btn-complete"
                    onClick={() => updateAppointmentStatus(appointment._id, 'completed')}
                  >
                    <FaCheck /> Mark Complete
                  </button>
                )}
                <button 
                  className="btn-delete"
                  onClick={() => deleteAppointment(appointment._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Appointment Details</h2>
              <button className="close-btn" onClick={() => setShowDetails(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Client Information</h3>
                <p><strong>Name:</strong> {selectedAppointment.clientName}</p>
                {selectedAppointment.companyName && (
                  <p><strong>Company:</strong> {selectedAppointment.companyName}</p>
                )}
                <p><strong>Email:</strong> {selectedAppointment.email}</p>
                <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
              </div>

              <div className="detail-section">
                <h3>Meeting Details</h3>
                <p><strong>Type:</strong> {selectedAppointment.meetingType?.replace('-', ' ')}</p>
                <p><strong>Preferred Date:</strong> {new Date(selectedAppointment.preferredDate).toLocaleDateString()}</p>
                <p><strong>Preferred Time:</strong> {selectedAppointment.preferredTime}</p>
                {selectedAppointment.alternateDate && (
                  <>
                    <p><strong>Alternate Date:</strong> {new Date(selectedAppointment.alternateDate).toLocaleDateString()}</p>
                    <p><strong>Alternate Time:</strong> {selectedAppointment.alternateTime}</p>
                  </>
                )}
              </div>

              <div className="detail-section">
                <h3>Service Interest</h3>
                <p>{selectedAppointment.serviceInterest}</p>
              </div>

              {selectedAppointment.message && (
                <div className="detail-section">
                  <h3>Additional Message</h3>
                  <p>{selectedAppointment.message}</p>
                </div>
              )}

              <div className="detail-section">
                <h3>Status</h3>
                <p>
                  <span className={`status-badge ${getStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsManager;
