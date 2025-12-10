const Site = require('../models/Site');
const { deleteImage, getImageUrl } = require('../middleware/uploadMiddleware');

// @desc    Get all sites (public)
// @route   GET /api/sites
// @access  Public
const getSites = async (req, res) => {
  try {
    const sites = await Site.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: sites.length,
      data: sites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all sites (admin - includes inactive)
// @route   GET /api/sites/admin
// @access  Private/Admin
const getAllSites = async (req, res) => {
  try {
    const sites = await Site.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: sites.length,
      data: sites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single site
// @route   GET /api/sites/:id
// @access  Public
const getSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    
    if (!site) {
      return res.status(404).json({
        success: false,
        message: 'Site not found'
      });
    }
    
    res.json({
      success: true,
      data: site
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create site
// @route   POST /api/sites
// @access  Private/Admin
const createSite = async (req, res) => {
  try {
    const { name, location, description, services, coordinates, order, isActive } = req.body;
    
    // Handle image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }
    
    const image = getImageUrl(req.file);
    const imagePublicId = req.file.filename || req.file.public_id;
    
    // Parse services if it's a string
    let parsedServices = services;
    if (typeof services === 'string') {
      try {
        parsedServices = JSON.parse(services);
      } catch (e) {
        parsedServices = services.split(',').map(s => s.trim());
      }
    }
    
    // Parse coordinates if it's a string
    let parsedCoordinates = coordinates;
    if (typeof coordinates === 'string') {
      try {
        parsedCoordinates = JSON.parse(coordinates);
      } catch (e) {
        parsedCoordinates = {};
      }
    }
    
    const site = await Site.create({
      name,
      location,
      description,
      image,
      imagePublicId,
      services: parsedServices || [],
      coordinates: parsedCoordinates,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });
    
    res.status(201).json({
      success: true,
      data: site
    });
  } catch (error) {
    console.error('Create site error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update site
// @route   PUT /api/sites/:id
// @access  Private/Admin
const updateSite = async (req, res) => {
  try {
    let site = await Site.findById(req.params.id);
    
    if (!site) {
      return res.status(404).json({
        success: false,
        message: 'Site not found'
      });
    }
    
    const updateData = { ...req.body };
    
    // Parse services if it's a string
    if (typeof updateData.services === 'string') {
      try {
        updateData.services = JSON.parse(updateData.services);
      } catch (e) {
        updateData.services = updateData.services.split(',').map(s => s.trim());
      }
    }
    
    // Parse coordinates if it's a string
    if (typeof updateData.coordinates === 'string') {
      try {
        updateData.coordinates = JSON.parse(updateData.coordinates);
      } catch (e) {
        delete updateData.coordinates;
      }
    }
    
    // Handle new image upload
    if (req.file) {
      // Delete old image
      if (site.imagePublicId) {
        await deleteImage(site.imagePublicId);
      }
      updateData.image = getImageUrl(req.file);
      updateData.imagePublicId = req.file.filename || req.file.public_id;
    }
    
    site = await Site.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: site
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete site
// @route   DELETE /api/sites/:id
// @access  Private/Admin
const deleteSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    
    if (!site) {
      return res.status(404).json({
        success: false,
        message: 'Site not found'
      });
    }
    
    // Delete image from storage
    if (site.imagePublicId) {
      await deleteImage(site.imagePublicId);
    }
    
    await site.deleteOne();
    
    res.json({
      success: true,
      message: 'Site deleted successfully'
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
  getSites,
  getAllSites,
  getSite,
  createSite,
  updateSite,
  deleteSite
};
