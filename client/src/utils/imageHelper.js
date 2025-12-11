export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Convert whatever the backend stored (Windows path, relative path, etc.)
 * into a browser-safe URL.
 */
export const buildImageUrl = (rawPath) => {
  if (!rawPath) return '';

  // Already a full URL or protocol-relative URL or data URI
  if (/^(https?:)?\/\//i.test(rawPath) || rawPath.startsWith('data:')) {
    return rawPath;
  }

  // Normalize Windows backslashes → POSIX-style slashes
  const normalized = rawPath.replace(/\\/g, '/');

  // Try to extract `/uploads/...` if present
  const uploadsIdx = normalized.toLowerCase().lastIndexOf('/uploads/');
  let relativePath = normalized;

  if (uploadsIdx !== -1) {
    // e.g. "C:/path/server/uploads/file.jpg" → "/uploads/file.jpg"
    relativePath = normalized.slice(uploadsIdx);
  } else if (!normalized.startsWith('/')) {
    relativePath = `/${normalized}`;
  }

  return `${API_BASE_URL}${relativePath}`;
};

// Shared image constants used across the app
export const LOGO = '/images/javelin-logo.png';

export const ANNOUNCEMENT_IMAGE = '/images/javelin-guard-4.jpg';

export const PLACEHOLDER_IMAGES = {
  GUARD: '/images/javelin-guard-4.jpg',
  SERVICE: '/assets/images/services/default.jpg',
  GENERIC: '/images/javelin-logo.png',
};
