const TeamMember = require('../models/TeamMember');
const { deleteImage, getImageUrl } = require('../middleware/uploadMiddleware');

// @desc    Get all team members (public)
// @route   GET /api/team
// @access  Public
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all team members (admin - includes inactive)
// @route   GET /api/team/admin
// @access  Private/Admin
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
const getTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private/Admin
const createTeamMember = async (req, res) => {
  try {
    const { name, position, bio, socialLinks, order, isActive } = req.body;

    const defaultImage = process.env.DEFAULT_TEAM_IMAGE || '/assets/images/placeholders/guard-placeholder.jpg';

    let image = defaultImage;
    let imagePublicId = null;

    if (req.file) {
      image = getImageUrl(req.file);
      imagePublicId = req.file.filename || req.file.public_id;
    }
    
    // Parse socialLinks if it's a string
    let parsedSocialLinks = socialLinks;
    if (typeof socialLinks === 'string') {
      try {
        parsedSocialLinks = JSON.parse(socialLinks);
      } catch (e) {
        parsedSocialLinks = {};
      }
    }
    
    parsedSocialLinks = parsedSocialLinks || {};
    
    const teamMember = await TeamMember.create({
      name,
      position,
      bio,
      image,
      imagePublicId,
      socialLinks: parsedSocialLinks,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true
    });
    
    res.status(201).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
const updateTeamMember = async (req, res) => {
  try {
    let teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    const updateData = { ...req.body };
    
    // Parse socialLinks if it's a string
    if (typeof updateData.socialLinks === 'string') {
      try {
        updateData.socialLinks = JSON.parse(updateData.socialLinks);
      } catch (e) {
        delete updateData.socialLinks;
      }
    }
    
    // Handle new image upload
    if (req.file) {
      // Delete old image
      if (teamMember.imagePublicId) {
        await deleteImage(teamMember.imagePublicId);
      }
      updateData.image = getImageUrl(req.file);
      updateData.imagePublicId = req.file.filename || req.file.public_id;
    }
    
    teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    // Delete image from storage
    if (teamMember.imagePublicId) {
      await deleteImage(teamMember.imagePublicId);
    }
    
    await teamMember.deleteOne();
    
    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Reorder team members
// @route   PUT /api/team/reorder
// @access  Private/Admin
const reorderTeamMembers = async (req, res) => {
  try {
    const { orderUpdates } = req.body; // Array of { id, order }
    
    const bulkOps = orderUpdates.map(item => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order }
      }
    }));
    
    await TeamMember.bulkWrite(bulkOps);
    
    res.json({
      success: true,
      message: 'Order updated successfully'
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
  getTeamMembers,
  getAllTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers
};
