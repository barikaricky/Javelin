const GalleryItem = require('../models/GalleryItem');
const { deleteImage, getImageUrl } = require('../middleware/uploadMiddleware');

// @desc    Get all gallery items (public)
// @route   GET /api/gallery
// @access  Public
const getGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    const galleryItems = await GalleryItem.find(filter)
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all gallery items (admin - includes inactive)
// @route   GET /api/gallery/admin
// @access  Private/Admin
const getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await GalleryItem.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
const getGalleryItem = async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }
    
    res.json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryItem = async (req, res) => {
  try {
    const { title, description, category, order, isActive } = req.body;
    
    // Handle image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }
    
    const image = getImageUrl(req.file);
    const imagePublicId = req.file.filename || req.file.public_id;
    
    const galleryItem = await GalleryItem.create({
      title,
      description,
      category: category || 'work-in-action',
      image,
      imagePublicId,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });
    
    res.status(201).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
const updateGalleryItem = async (req, res) => {
  try {
    let galleryItem = await GalleryItem.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }
    
    const updateData = { ...req.body };
    
    // Handle new image upload
    if (req.file) {
      // Delete old image
      if (galleryItem.imagePublicId) {
        await deleteImage(galleryItem.imagePublicId);
      }
      updateData.image = getImageUrl(req.file);
      updateData.imagePublicId = req.file.filename || req.file.public_id;
    }
    
    galleryItem = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }
    
    // Delete image from storage
    if (galleryItem.imagePublicId) {
      await deleteImage(galleryItem.imagePublicId);
    }
    
    await galleryItem.deleteOne();
    
    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get gallery categories
// @route   GET /api/gallery/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = [
      { value: 'work-in-action', label: 'Work in Action' },
      { value: 'events', label: 'Events' },
      { value: 'team', label: 'Team' },
      { value: 'facilities', label: 'Facilities' },
      { value: 'other', label: 'Other' }
    ];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getGalleryItems,
  getAllGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getCategories
};
