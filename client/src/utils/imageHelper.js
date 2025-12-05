// Import logo
import logo from '../assets/images/javelin-logo.png';

// Import available images
import adminImage from '../assets/images/admin image.pg.jpg';
import mdImage from '../assets/images/md_image.jpg';
import site1 from '../assets/images/site1.jpg';
import site2 from '../assets/images/site2.jpg';
import site3 from '../assets/images/site3.jpg';

// Use data URIs as fallbacks for development
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Crect width="1200" height="800" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="48" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3EJavelin Security%3C/text%3E%3C/svg%3E';

// Logo export
export const LOGO = logo;

// Hero images - Using available images
export const HERO_IMAGES = {
  SLIDE_1: adminImage,
  SLIDE_2: mdImage,
  SLIDE_3: site1,
  SLIDE_4: site2,
  SLIDE_5: site3,
  SLIDE_6: adminImage,
};

export const ANNOUNCEMENT_IMAGE = adminImage;

// Fallback/placeholder images
export const PLACEHOLDER_IMAGES = {
  GUARD: FALLBACK_IMAGE,
  SECURITY: FALLBACK_IMAGE,
  DEFAULT: FALLBACK_IMAGE,
};

// Get all images from folder for gallery
export const GALLERY_IMAGES = [
  adminImage,
  mdImage,
  site1,
  site2,
  site3,
  adminImage,
];

// Team images
export const TEAM_IMAGES = {
  CEO: adminImage,
  MD: mdImage,
  OPS_MANAGER: site1,
  HR_MANAGER: site2,
  SUPERVISOR_1: site3,
  SUPERVISOR_2: adminImage,
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
