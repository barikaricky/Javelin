const BonusBenefit = require('../models/BonusBenefit');

// @desc    Get all bonuses/benefits
// @route   GET /api/bonuses
// @access  Public
exports.getBonusBenefits = async (req, res) => {
  try {
    const { type, audience, active, limit = 10, page = 1 } = req.query;
    
    const query = {};
    if (type) query.type = type;
    if (audience) query.targetAudience = audience;
    if (active !== undefined) query.isActive = active === 'true';

    const bonuses = await BonusBenefit.find(query)
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await BonusBenefit.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bonuses.length,
      total,
      pages: Math.ceil(total / limit),
      data: bonuses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bonuses/benefits',
      error: error.message
    });
  }
};

// @desc    Get single bonus/benefit
// @route   GET /api/bonuses/:id
// @access  Public
exports.getBonusBenefit = async (req, res) => {
  try {
    const bonus = await BonusBenefit.findById(req.params.id).populate('postedBy', 'name');

    if (!bonus) {
      return res.status(404).json({
        success: false,
        message: 'Bonus/Benefit not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bonus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bonus/benefit',
      error: error.message
    });
  }
};

// @desc    Create bonus/benefit
// @route   POST /api/bonuses
// @access  Private (Head Poster)
exports.createBonusBenefit = async (req, res) => {
  try {
    req.body.postedBy = req.user.id;

    const bonus = await BonusBenefit.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Bonus/Benefit created successfully',
      data: bonus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating bonus/benefit',
      error: error.message
    });
  }
};

// @desc    Update bonus/benefit
// @route   PUT /api/bonuses/:id
// @access  Private (Head Poster)
exports.updateBonusBenefit = async (req, res) => {
  try {
    let bonus = await BonusBenefit.findById(req.params.id);

    if (!bonus) {
      return res.status(404).json({
        success: false,
        message: 'Bonus/Benefit not found'
      });
    }

    bonus = await BonusBenefit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Bonus/Benefit updated successfully',
      data: bonus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating bonus/benefit',
      error: error.message
    });
  }
};

// @desc    Delete bonus/benefit
// @route   DELETE /api/bonuses/:id
// @access  Private (Head Poster)
exports.deleteBonusBenefit = async (req, res) => {
  try {
    const bonus = await BonusBenefit.findById(req.params.id);

    if (!bonus) {
      return res.status(404).json({
        success: false,
        message: 'Bonus/Benefit not found'
      });
    }

    await bonus.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Bonus/Benefit deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting bonus/benefit',
      error: error.message
    });
  }
};
