// Use data URIs as fallbacks for development
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Crect width="1200" height="800" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="48" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3EJavelin Security%3C/text%3E%3C/svg%3E';

// Logo export
export const LOGO = '/images/javelin-logo.png';

// Hero images - Using your actual image names
export const HERO_IMAGES = {
  SLIDE_1: '/images/site1.jpg',
  SLIDE_2: '/images/site2.jpg',
  SLIDE_3: '/images/site3.jpg',
  SLIDE_4: '/images/md_image.jpg',
  SLIDE_5: '/images/admin-image.jpg',
  SLIDE_6: '/images/guard1.jpg',
};

export const ANNOUNCEMENT_IMAGE = '/images/site1.jpg';

// Fallback/placeholder images
export const PLACEHOLDER_IMAGES = {
  GUARD: FALLBACK_IMAGE,
  SECURITY: FALLBACK_IMAGE,
  DEFAULT: FALLBACK_IMAGE,
};

// Get all images from folder for gallery
export const GALLERY_IMAGES = [
  '/images/site1.jpg',
  '/images/site2.jpg',
  '/images/site3.jpg',
  '/images/md_image.jpg',
  '/images/admin-image.jpg',
  '/images/guard1.jpg',
  '/images/guard2.jpg',
  '/images/guard3.jpg',
  '/images/guard4.jpg',
  '/images/guard5.jpg',
];

// Team images
export const TEAM_IMAGES = {
  CEO: '/images/md_image.jpg',
  MD: '/images/site1.jpg',
  OPS_MANAGER: '/images/site2.jpg',
  HR_MANAGER: '/images/site3.jpg',
  SUPERVISOR_1: '/images/guard1.jpg',
  SUPERVISOR_2: '/images/guard2.jpg',
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
