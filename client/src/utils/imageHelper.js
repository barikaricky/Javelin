const API_BASE_URL = process.env.REACT_APP_API_URL ? 
  process.env.REACT_APP_API_URL.replace('/api', '') : 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');

/**
 * Convert whatever the backend stored (Windows path, relative path, etc.)
 * into a browser-safe URL.
 */
export const buildImageUrl = (rawPath) => {
  if (!rawPath) return '/images/javelin-logo.png'; // Default fallback

  // Already a full URL or protocol-relative URL or data URI
  if (/^(https?:)?\/\//i.test(rawPath) || rawPath.startsWith('data:')) {
    return rawPath;
  }

  // If it starts with /uploads, construct full URL
  if (rawPath.startsWith('/uploads')) {
    return `${API_BASE_URL}${rawPath}`;
  }

  // If it starts with uploads (without slash)
  if (rawPath.startsWith('uploads')) {
    return `${API_BASE_URL}/${rawPath}`;
  }

  // Default case: assume it's a relative path
  return rawPath;
};

export const getImageOrDefault = (imageUrl, defaultImage = '/images/javelin-logo.png') => {
  return imageUrl || defaultImage;
};

// Shared image constants used across the app
export const LOGO = '/images/javelin-logo.png';

export const ANNOUNCEMENT_IMAGE = '/images/javelin-guard-4.jpg';

export const PLACEHOLDER_IMAGES = {
  GUARD: '/images/javelin-guard-4.jpg',
  SERVICE: '/assets/images/services/default.jpg',
  GENERIC: '/images/javelin-logo.png',
};
