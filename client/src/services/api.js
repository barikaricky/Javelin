const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Ensure API_URL ends with /api
const API_URL = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Generic API functions
export const apiGet = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const apiPost = async (endpoint, data) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
};

export const apiPut = async (endpoint, data) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
};

export const apiDelete = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

// Upload file
export const uploadFile = async (file) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  return response.json();
};

// Activities
export const getActivities = (params = '') => apiGet(`/activities${params}`);
export const getActivity = (id) => apiGet(`/activities/${id}`);
export const createActivity = (data) => apiPost('/activities', data);
export const updateActivity = (id, data) => apiPut(`/activities/${id}`, data);
export const deleteActivity = (id) => apiDelete(`/activities/${id}`);

// Bonuses & Benefits
export const getBonuses = (params = '') => apiGet(`/bonuses${params}`);
export const getBonus = (id) => apiGet(`/bonuses/${id}`);
export const createBonus = (data) => apiPost('/bonuses', data);
export const updateBonus = (id, data) => apiPut(`/bonuses/${id}`, data);
export const deleteBonus = (id) => apiDelete(`/bonuses/${id}`);

// Team Members
export const getTeamMembers = (params = '') => apiGet(`/team${params}`);
export const getTeamMember = (id) => apiGet(`/team/${id}`);
export const createTeamMember = (data) => apiPost('/team', data);
export const updateTeamMember = (id, data) => apiPut(`/team/${id}`, data);
export const deleteTeamMember = (id) => apiDelete(`/team/${id}`);

// Guards
export const getGuards = (params = '') => apiGet(`/guards${params}`);
export const getReadyGuards = () => apiGet('/guards/ready');
export const getGuard = (id) => apiGet(`/guards/${id}`);
export const createGuard = (data) => apiPost('/guards', data);
export const updateGuard = (id, data) => apiPut(`/guards/${id}`, data);
export const updateGuardDeployment = (id, data) => apiPut(`/guards/${id}/deployment`, data);
export const deleteGuard = (id) => apiDelete(`/guards/${id}`);
export const getGuardStats = () => apiGet('/guards/stats');

// Gallery
export const getGalleryImages = (params = '') => apiGet(`/gallery${params}`);
export const getGalleryCategories = () => apiGet('/gallery/categories');
export const getGalleryImage = (id) => apiGet(`/gallery/${id}`);
export const createGalleryImage = (data) => apiPost('/gallery', data);
export const updateGalleryImage = (id, data) => apiPut(`/gallery/${id}`, data);
export const deleteGalleryImage = (id) => apiDelete(`/gallery/${id}`);

// Sites
export const getSites = (params = '') => apiGet(`/sites${params}`);
export const getSiteStats = () => apiGet('/sites/stats');
export const getSite = (id) => apiGet(`/sites/${id}`);
export const createSite = (data) => apiPost('/sites', data);
export const updateSite = (id, data) => apiPut(`/sites/${id}`, data);
export const deleteSite = (id) => apiDelete(`/sites/${id}`);

// Bookings
export const getBookings = (params = '') => apiGet(`/bookings${params}`);
export const getBooking = (id) => apiGet(`/bookings/${id}`);
export const createBooking = (data) => apiPost('/bookings', data);
export const updateBooking = (id, data) => apiPut(`/bookings/${id}`, data);
export const deleteBooking = (id) => apiDelete(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => apiPut(`/bookings/${id}/status`, { status });
export const cancelBooking = (id) => apiPut(`/bookings/${id}/status`, { status: 'cancelled' });

const apiExports = {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  uploadFile
};

export default apiExports;
