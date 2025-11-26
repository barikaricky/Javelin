// Import logo
import logo from '../assets/images/javelin-logo.png';

// Import guard images - using actual filenames
import guard1 from '../assets/images/javelin-logo-1.jpg';
import guard2 from '../assets/images/javelin-site-2.jpg';
import guard3 from '../assets/images/javelin-site-3.jpg';
import guard4 from '../assets/images/javelin-guard-4.jpg';
import guard5 from '../assets/images/javelin-logo-2.jpg';
import guard6 from '../assets/images/javelin-site-5.jpg';

// Use data URIs as fallbacks for development
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Crect width="1200" height="800" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="48" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3EJavelin Security%3C/text%3E%3C/svg%3E';

// Logo export
export const LOGO = logo;

// Hero images - Using imported images
export const HERO_IMAGES = {
  SLIDE_1: guard1,
  SLIDE_2: guard2,
  SLIDE_3: guard3,
  SLIDE_4: guard4,
  SLIDE_5: guard5,
  SLIDE_6: guard6,
};

export const ANNOUNCEMENT_IMAGE = guard1;

// Fallback/placeholder images
export const PLACEHOLDER_IMAGES = {
  GUARD: FALLBACK_IMAGE,
  SECURITY: FALLBACK_IMAGE,
  DEFAULT: FALLBACK_IMAGE,
};

// Get all images from folder for gallery
export const GALLERY_IMAGES = [
  guard1,
  guard2,
  guard3,
  guard4,
  guard5,
  guard6,
];

// Team images
export const TEAM_IMAGES = {
  CEO: guard1,
  MD: guard2,
  OPS_MANAGER: guard3,
  HR_MANAGER: guard4,
  SUPERVISOR_1: guard5,
  SUPERVISOR_2: guard6,
};

// Image loading helper with fallback
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Use fallback image on error
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
  // In production, you'd use different image sizes
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
