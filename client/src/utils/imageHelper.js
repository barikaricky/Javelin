// Use data URIs as fallbacks for development
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Crect width="1200" height="800" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="48" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3EJavelin Security%3C/text%3E%3C/svg%3E';

// Logo export - actual logo exists
export const LOGO = '/images/javelin-logo.png';

// Hero images - Using public folder paths
export const HERO_IMAGES = {
  SLIDE_1: '/images/javelin-logo-1.jpg',
  SLIDE_2: '/images/javelin-site-2.jpg',
  SLIDE_3: '/images/javelin-site-3.jpg',
  SLIDE_4: '/images/javelin-guard-4.jpg',
  SLIDE_5: '/images/javelin-logo-2.jpg',
  SLIDE_6: '/images/javelin-site-5.jpg',
};

export const ANNOUNCEMENT_IMAGE = '/images/javelin-logo-1.jpg';

// Fallback/placeholder images
export const PLACEHOLDER_IMAGES = {
  GUARD: FALLBACK_IMAGE,
  SECURITY: FALLBACK_IMAGE,
  DEFAULT: FALLBACK_IMAGE,
};

// Get all images from folder for gallery
export const GALLERY_IMAGES = [
  '/images/javelin-logo-1.jpg',
  '/images/javelin-site-2.jpg',
  '/images/javelin-site-3.jpg',
  '/images/javelin-guard-4.jpg',
  '/images/javelin-logo-2.jpg',
  '/images/javelin-site-5.jpg',
];

// Team images
export const TEAM_IMAGES = {
  CEO: '/images/javelin-logo-1.jpg',
  MD: '/images/javelin-site-2.jpg',
  OPS_MANAGER: '/images/javelin-site-3.jpg',
  HR_MANAGER: '/images/javelin-guard-4.jpg',
  SUPERVISOR_1: '/images/javelin-logo-2.jpg',
  SUPERVISOR_2: '/images/javelin-site-5.jpg',
};

// Image loading helper with fallback
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      img.src = FALLBACK_IMAGE;
      resolve(img);
    };
    img.src = src;
  });
};

// Get image with fallback
export const getImageWithFallback = (imagePath, fallback = FALLBACK_IMAGE) => {
  return imagePath || fallback;
};

// Get optimized image source based on screen size
export const getResponsiveImage = (imagePath) => {
  return imagePath;
};

// Check if image exists
export const imageExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};
