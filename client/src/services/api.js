import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
	baseURL: API_URL
});

// Add token to requests if available
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('adminToken');
		// Only add token if it's valid (JWT format: xxx.yyy.zzz)
		if (token && token.split('.').length === 3) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		if (config.data instanceof FormData) {
			delete config.headers['Content-Type'];
		} else if (!config.headers['Content-Type']) {
			config.headers['Content-Type'] = 'application/json';
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Handle response errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('adminToken');
			localStorage.removeItem('adminUser');
			window.location.href = '/admin/login';
		}
		return Promise.reject(error);
	}
);

// Auth API
export const authAPI = {
	login: (credentials) => api.post('/auth/login', credentials),
	register: (userData) => api.post('/auth/register', userData),
	getProfile: () => api.get('/auth/me'),
	updateProfile: (data) => api.put('/auth/profile', data),
	changePassword: (data) => api.put('/auth/password', data)
};

// Team API
export const teamAPI = {
	getAll: () => api.get('/team'),
	getAllAdmin: () => api.get('/team/admin/all'),
	getOne: (id) => api.get(`/team/${id}`),
	create: (formData) => api.post('/team', formData),
	update: (id, formData) => api.put(`/team/${id}`, formData),
	delete: (id) => api.delete(`/team/${id}`),
	reorder: (orderUpdates) => api.put('/team/reorder', { orderUpdates })
};

// Sites API
export const sitesAPI = {
	getAll: () => api.get('/sites'),
	getAllAdmin: () => api.get('/sites/admin/all'),
	getOne: (id) => api.get(`/sites/${id}`),
	create: (formData) => api.post('/sites', formData),
	update: (id, formData) => api.put(`/sites/${id}`, formData),
	delete: (id) => api.delete(`/sites/${id}`)
};

// Gallery API
export const galleryAPI = {
	getAll: (category) => api.get('/gallery', { params: { category } }),
	getAllAdmin: () => api.get('/gallery/admin/all'),
	getOne: (id) => api.get(`/gallery/${id}`),
	getCategories: () => api.get('/gallery/categories'),
	create: (formData) => api.post('/gallery', formData),
	update: (id, formData) => api.put(`/gallery/${id}`, formData),
	delete: (id) => api.delete(`/gallery/${id}`)
};

// News API
export const newsAPI = {
	getAll: (params) => api.get('/news', { params }),
	getAllAdmin: (params) => api.get('/news/admin/all', { params }),
	getOne: (id) => api.get(`/news/${id}`),
	getBySlug: (slug) => api.get(`/news/slug/${slug}`),
	getCategories: () => api.get('/news/categories'),
	create: (formData) => api.post('/news', formData),
	update: (id, formData) => api.put(`/news/${id}`, formData),
	delete: (id) => api.delete(`/news/${id}`)
};

// Contact API
export const contactAPI = {
	submit: (data) => api.post('/contact', data),
	getInfo: () => api.get('/contact/info'),
	updateInfo: (data) => api.put('/contact/info', data),
	getMessages: (params) => api.get('/contact/admin/all', { params }),
	getMessage: (id) => api.get(`/contact/admin/${id}`),
	updateMessage: (id, data) => api.put(`/contact/admin/${id}`, data),
	deleteMessage: (id) => api.delete(`/contact/admin/${id}`),
	getStats: () => api.get('/contact/admin/stats')
};

export default api;
