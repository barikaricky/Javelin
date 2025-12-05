import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaHome, FaBullhorn, FaGift, FaUsers, FaUserShield, FaImages, 
  FaSignOutAlt, FaBars, FaTimes, FaPlus, FaEdit, FaTrash,
  FaChartBar, FaCalendarAlt, FaCog
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout, isHeadPoster } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    activities: 0,
    bonuses: 0,
    team: 0,
    guards: 0,
    gallery: 0
  });
  const [data, setData] = useState({
    activities: [],
    bonuses: [],
    team: [],
    guards: [],
    gallery: []
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    if (!isHeadPoster) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [isHeadPoster, navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [activitiesRes, bonusesRes, teamRes, guardsRes, galleryRes] = await Promise.all([
        api.getActivities(),
        api.getBonuses(),
        api.getTeamMembers(),
        api.getGuards(),
        api.getGalleryImages()
      ]);

      setData({
        activities: activitiesRes.data || [],
        bonuses: bonusesRes.data || [],
        team: teamRes.data || [],
        guards: guardsRes.data || [],
        gallery: galleryRes.data || []
      });

      setStats({
        activities: activitiesRes.total || activitiesRes.data?.length || 0,
        bonuses: bonusesRes.total || bonusesRes.data?.length || 0,
        team: teamRes.count || teamRes.data?.length || 0,
        guards: guardsRes.total || guardsRes.data?.length || 0,
        gallery: galleryRes.total || galleryRes.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      let result;
      switch (type) {
        case 'activities':
          result = await api.deleteActivity(id);
          break;
        case 'bonuses':
          result = await api.deleteBonus(id);
          break;
        case 'team':
          result = await api.deleteTeamMember(id);
          break;
        case 'guards':
          result = await api.deleteGuard(id);
          break;
        case 'gallery':
          result = await api.deleteGalleryImage(id);
          break;
        default:
          return;
      }

      if (result.success) {
        fetchAllData();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const menuItems = [
    { id: 'overview', icon: <FaChartBar />, label: 'Overview' },
    { id: 'activities', icon: <FaBullhorn />, label: 'Activities' },
    { id: 'bonuses', icon: <FaGift />, label: 'Bonuses & Benefits' },
    { id: 'team', icon: <FaUsers />, label: 'Team Members' },
    { id: 'guards', icon: <FaUserShield />, label: 'Guards' },
    { id: 'gallery', icon: <FaImages />, label: 'Gallery' },
  ];

  const renderOverview = () => (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActiveTab('activities')}>
          <FaBullhorn className="stat-icon" />
          <div className="stat-info">
            <h3>{stats.activities}</h3>
            <p>Activities</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => setActiveTab('bonuses')}>
          <FaGift className="stat-icon" />
          <div className="stat-info">
            <h3>{stats.bonuses}</h3>
            <p>Bonuses & Benefits</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => setActiveTab('team')}>
          <FaUsers className="stat-icon" />
          <div className="stat-info">
            <h3>{stats.team}</h3>
            <p>Team Members</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => setActiveTab('guards')}>
          <FaUserShield className="stat-icon" />
          <div className="stat-info">
            <h3>{stats.guards}</h3>
            <p>Guards</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => setActiveTab('gallery')}>
          <FaImages className="stat-icon" />
          <div className="stat-info">
            <h3>{stats.gallery}</h3>
            <p>Gallery Images</p>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h3>Recent Activities</h3>
        <div className="recent-list">
          {data.activities.slice(0, 5).map(activity => (
            <div key={activity._id} className="recent-item">
              <div className="recent-item__info">
                <h4>{activity.title}</h4>
                <span>{new Date(activity.createdAt).toLocaleDateString()}</span>
              </div>
              <span className={`badge ${activity.type}`}>{activity.type}</span>
            </div>
          ))}
          {data.activities.length === 0 && (
            <p className="no-data">No activities yet. Create your first activity!</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderDataTable = (type, items, columns) => (
    <div className="data-section">
      <div className="section-header">
        <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <Link to={`/admin/${type}/new`} className="add-btn">
          <FaPlus /> Add New
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="no-data-box">
          <p>No {type} found. Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  <td className="actions">
                    <Link to={`/admin/${type}/edit/${item._id}`} className="edit-btn">
                      <FaEdit />
                    </Link>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(type, item._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'activities':
        return renderDataTable('activities', data.activities, [
          { key: 'title', label: 'Title' },
          { key: 'type', label: 'Type', render: (val) => <span className={`badge ${val}`}>{val}</span> },
          { key: 'isPublished', label: 'Status', render: (val) => val ? '✅ Published' : '📝 Draft' },
          { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
        ]);
      case 'bonuses':
        return renderDataTable('bonuses', data.bonuses, [
          { key: 'title', label: 'Title' },
          { key: 'type', label: 'Type', render: (val) => <span className={`badge ${val}`}>{val}</span> },
          { key: 'targetAudience', label: 'Audience' },
          { key: 'isActive', label: 'Status', render: (val) => val ? '✅ Active' : '❌ Inactive' }
        ]);
      case 'team':
        return renderDataTable('team', data.team, [
          { key: 'name', label: 'Name' },
          { key: 'position', label: 'Position' },
          { key: 'department', label: 'Department' },
          { key: 'isActive', label: 'Status', render: (val) => val ? '✅ Active' : '❌ Inactive' }
        ]);
      case 'guards':
        return renderDataTable('guards', data.guards, [
          { key: 'name', label: 'Name' },
          { key: 'guardId', label: 'Guard ID' },
          { key: 'rank', label: 'Rank' },
          { key: 'status', label: 'Status', render: (val) => <span className={`badge ${val}`}>{val}</span> },
          { key: 'isReadyForDeployment', label: 'Ready', render: (val) => val ? '✅' : '❌' }
        ]);
      case 'gallery':
        return renderDataTable('gallery', data.gallery, [
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'isPublished', label: 'Status', render: (val) => val ? '✅ Published' : '📝 Draft' },
          { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
        ]);
      default:
        return renderOverview();
    }
  };

  return (
    <div className={`admin-dashboard ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <FaUserShield className="logo-icon" />
          <span className="logo-text">Javelin Admin</span>
          <button className="toggle-btn mobile" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-item">
            <FaHome />
            <span>View Site</span>
          </Link>
          <button className="nav-item logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <div className="header-right">
            <span className="welcome">Welcome, {user?.name || 'Admin'}</span>
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        <div className="content-body">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;
