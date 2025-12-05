const Site = require('../models/Site');

// @desc    Get all sites
// @route   GET /api/sites
// @access  Public
exports.getSites = async (req, res) => {
  try {
    const sites = await Site.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: sites.length,
      data: sites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sites',
      error: error.message
    });
  }
};

// @desc    Get single site
// @route   GET /api/sites/:id
// @access  Public
exports.getSite = async (req, res) => {
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
      message: 'Error fetching site',
      error: error.message
    });
  }
};

// @desc    Create site
// @route   POST /api/sites
// @access  Private (head_poster)
exports.createSite = async (req, res) => {
  try {
    req.body.postedBy = req.user._id;
    const site = await Site.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Site created successfully',
      data: site
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating site',
      error: error.message
    });
  }
};

// @desc    Update site
// @route   PUT /api/sites/:id
// @access  Private (head_poster)
exports.updateSite = async (req, res) => {
  try {
    const site = await Site.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!site) {
      return res.status(404).json({
        success: false,
        message: 'Site not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Site updated successfully',
      data: site
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating site',
      error: error.message
    });
  }
};

// @desc    Delete site
// @route   DELETE /api/sites/:id
// @access  Private (head_poster)
exports.deleteSite = async (req, res) => {
  try {
    const site = await Site.findByIdAndDelete(req.params.id);
    
    if (!site) {
      return res.status(404).json({
        success: false,
        message: 'Site not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Site deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting site',
      error: error.message
    });
  }
};

// @desc    Get site statistics
// @route   GET /api/sites/stats
// @access  Public
exports.getSiteStats = async (req, res) => {
  try {
    const sites = await Site.find({ isActive: true });
    
    const totalSites = sites.length;
    const totalGuards = sites.reduce((sum, site) => sum + site.guards, 0);
    
    res.json({
      success: true,
      data: {
        totalSites,
        totalGuards,
        monitoring: '24/7'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching site statistics',
      error: error.message
    });
  }
};
