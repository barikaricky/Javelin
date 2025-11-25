// Javelin Brand Colors
export const COLORS = {
  // Primary Colors
  PRIMARY_BLUE: '#003A67',
  PRIMARY_YELLOW: '#FFCC00',
  
  // Secondary Colors
  SECONDARY_GREEN: '#00AA55',
  
  // Neutral Colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#F5F5F5',
  GRAY_MEDIUM: '#CCCCCC',
  GRAY_DARK: '#333333',
  
  // Accent Colors
  BLUE_LIGHT: '#0066CC',
  BLUE_DARK: '#002044',
  YELLOW_LIGHT: '#FFD633',
  YELLOW_DARK: '#CC9900',
  GREEN_LIGHT: '#00CC66',
  GREEN_DARK: '#008844',
};

// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  APPLICATIONS: '/applications',
  CONTACT: '/contact',
  SITES: '/sites',
  SERVICES: '/services',
};

// Breakpoints for Responsive Design
export const BREAKPOINTS = {
  MOBILE: '320px',
  MOBILE_LARGE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px',
  DESKTOP_LARGE: '1440px',
  DESKTOP_XL: '1920px',
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Our Sites', path: '/sites' },
  { name: 'Recruitment', path: '/recruitment' },
  { name: 'Contact Us', path: '/contact' },
];
