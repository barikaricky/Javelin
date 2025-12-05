const express = require('express');
const router = express.Router();
const {
  getGalleryImages,
  getGalleryImage,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getCategories
} = require('../controllers/galleryController');
const { protect, headPosterOnly } = require('../middleware/auth');

router.get('/categories', getCategories);

router.route('/')
  .get(getGalleryImages)
  .post(protect, headPosterOnly, createGalleryImage);

router.route('/:id')
  .get(getGalleryImage)
  .put(protect, headPosterOnly, updateGalleryImage)
  .delete(protect, headPosterOnly, deleteGalleryImage);

module.exports = router;
