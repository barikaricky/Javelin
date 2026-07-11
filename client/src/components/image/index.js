// Images are served from public/images folder
// Use these constants for image paths

export const IMAGE_PATHS = {
  LOGO_1: '/images/javelin-logo-1.jpg',
  LOGO_2: '/images/javelin-logo-2.jpg',
  SITE_2: '/images/javelin-site-2.jpg',
  SITE_3: '/images/javelin-site-3.jpg',
  SITE_5: '/images/javelin-site-5.jpg',
  GUARD_4: '/images/javelin-guard-4.jpg',
};

// Helper function to get image URL
export const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};
