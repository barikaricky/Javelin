const Guard = require('../models/Guard');

// @desc    Get all guards
// @route   GET /api/guards
// @access  Public
exports.getGuards = async (req, res) => {
  try {
    const { status, rank, ready, limit = 20, page = 1 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (rank) query.rank = rank;
    if (ready !== undefined) query.isReadyForDeployment = ready === 'true';

    const guards = await Guard.find(query)
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Guard.countDocuments(query);

    res.status(200).json({
      success: true,
      count: guards.length,
      total,
      pages: Math.ceil(total / limit),
      data: guards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching guards',
      error: error.message
    });
  }
};

// @desc    Get guards ready for deployment
// @route   GET /api/guards/ready
// @access  Public
exports.getReadyGuards = async (req, res) => {
  try {
    const guards = await Guard.find({ 
      isReadyForDeployment: true,
      status: 'available'
    })
      .sort({ rating: -1, experience: -1 });

    res.status(200).json({
      success: true,
      count: guards.length,
      data: guards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching ready guards',
      error: error.message
    });
  }
};

// @desc    Get single guard
// @route   GET /api/guards/:id
// @access  Public
exports.getGuard = async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.id).populate('postedBy', 'name');

    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }

    res.status(200).json({
      success: true,
      data: guard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching guard',
      error: error.message
    });
  }
};

// @desc    Create guard
// @route   POST /api/guards
// @access  Private (Head Poster)
exports.createGuard = async (req, res) => {
  try {
    req.body.postedBy = req.user.id;

    const guard = await Guard.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Guard created successfully',
      data: guard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating guard',
      error: error.message
    });
  }
};

// @desc    Update guard
// @route   PUT /api/guards/:id
// @access  Private (Head Poster)
exports.updateGuard = async (req, res) => {
  try {
    let guard = await Guard.findById(req.params.id);

    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }

    guard = await Guard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Guard updated successfully',
      data: guard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating guard',
      error: error.message
    });
  }
};

// @desc    Update guard deployment status
// @route   PUT /api/guards/:id/deployment
// @access  Private (Head Poster)
exports.updateDeploymentStatus = async (req, res) => {
  try {
    const { status, site, startDate, endDate } = req.body;
    
    let guard = await Guard.findById(req.params.id);

    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }

    const updateData = {
      status,
      isReadyForDeployment: status === 'available'
    };

    if (status === 'deployed' && site) {
      updateData.currentDeployment = {
        site,
        startDate: startDate || new Date(),
        endDate
      };
    }

    guard = await Guard.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Guard deployment status updated',
      data: guard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating deployment status',
      error: error.message
    });
  }
};

// @desc    Delete guard
// @route   DELETE /api/guards/:id
// @access  Private (Head Poster)
exports.deleteGuard = async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.id);

    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Guard not found'
      });
    }

    await guard.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Guard deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting guard',
      error: error.message
    });
  }
};

// @desc    Get guard statistics
// @route   GET /api/guards/stats
// @access  Private
exports.getGuardStats = async (req, res) => {
  try {
    const total = await Guard.countDocuments();
    const available = await Guard.countDocuments({ status: 'available' });
    const deployed = await Guard.countDocuments({ status: 'deployed' });
    const onLeave = await Guard.countDocuments({ status: 'on_leave' });
    const training = await Guard.countDocuments({ status: 'training' });
    const inactive = await Guard.countDocuments({ status: 'inactive' });

    res.status(200).json({
      success: true,
      data: {
        total,
        available,
        deployed,
        onLeave,
        training,
        inactive
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching guard statistics',
      error: error.message
    });
  }
};
