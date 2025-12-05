const GalleryImage = require('../models/GalleryImage');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getGalleryImages = async (req, res) => {
  try {
    const { category, published, limit = 20, page = 1 } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (published !== undefined) query.isPublished = published === 'true';

    const images = await GalleryImage.find(query)
      .populate('postedBy', 'name')
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await GalleryImage.countDocuments(query);

    res.status(200).json({
      success: true,
      count: images.length,
      total,
      pages: Math.ceil(total / limit),
      data: images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery images',
      error: error.message
    });
  }
};

// @desc    Get single gallery image
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id).populate('postedBy', 'name');

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.status(200).json({
      success: true,
      data: image
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching image',
      error: error.message
    });
  }
};

// @desc    Upload gallery image
// @route   POST /api/gallery
// @access  Private (Head Poster)
exports.createGalleryImage = async (req, res) => {
  try {
    req.body.postedBy = req.user.id;

    const image = await GalleryImage.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: image
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private (Head Poster)
exports.updateGalleryImage = async (req, res) => {
  try {
    let image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Image updated successfully',
      data: image
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating image',
      error: error.message
    });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Head Poster)
exports.deleteGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
};

// @desc    Get gallery categories with counts
// @route   GET /api/gallery/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await GalleryImage.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};
