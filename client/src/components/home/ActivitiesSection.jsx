import React, { useState, useEffect } from 'react';
import { FaBullhorn, FaCalendarAlt, FaTrophy, FaNewspaper, FaArrowRight } from 'react-icons/fa';
import { apiGet } from '../../services/api';
import './ActivitiesSection.css';

const ActivitiesSection = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await apiGet('/activities');
        if (response.success && response.data.length > 0) {
          setActivities(response.data.slice(0, 6)); // Show max 6 activities
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'event': return <FaCalendarAlt />;
      case 'achievement': return <FaTrophy />;
      case 'news': return <FaNewspaper />;
      default: return <FaBullhorn />;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      default: return 'priority-low';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section className="activities-section">
        <div className="container">
          <div className="section-header">
            <h2>Latest Activities & News</h2>
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (activities.length === 0) {
    return null; // Don't render section if no activities
  }

  return (
    <section className="activities-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest Activities & News</h2>
          <p>Stay updated with our latest happenings and achievements</p>
        </div>

        <div className="activities-grid">
          {activities.map((activity) => (
            <div key={activity._id} className={`activity-card ${getPriorityClass(activity.priority)}`}>
              <div className="activity-card__icon">
                {getIcon(activity.type)}
              </div>
              <div className="activity-card__badge">
                {activity.type}
              </div>
              <h3 className="activity-card__title">{activity.title}</h3>
              <p className="activity-card__description">{activity.description}</p>
              <div className="activity-card__footer">
                <span className="activity-card__date">
                  <FaCalendarAlt /> {formatDate(activity.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
