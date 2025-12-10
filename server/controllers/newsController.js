const NewsPost = require('../models/NewsPost');
const { deleteImage, getImageUrl } = require('../middleware/uploadMiddleware');

// @desc    Get all published news posts (public)
// @route   GET /api/news
// @access  Public
const getNewsPosts = async (req, res) => {
  try {
    const { category, limit, page } = req.query;
    const filter = { status: 'published', isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    
    const total = await NewsPost.countDocuments(filter);
    const newsPosts = await NewsPost.find(filter)
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    res.json({
      success: true,
      count: newsPosts.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: newsPosts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all news posts (admin - includes drafts)
// @route   GET /api/news/admin
// @access  Private/Admin
const getAllNewsPosts = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    const newsPosts = await NewsPost.find(filter)
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: newsPosts.length,
      data: newsPosts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single news post by slug
// @route   GET /api/news/slug/:slug
// @access  Public
const getNewsPostBySlug = async (req, res) => {
  try {
    const newsPost = await NewsPost.findOne({ 
      slug: req.params.slug,
      status: 'published',
      isActive: true
    }).populate('author', 'name');
    
    if (!newsPost) {
      return res.status(404).json({
        success: false,
        message: 'News post not found'
      });
    }
    
    // Increment views
    newsPost.views += 1;
    await newsPost.save({ validateBeforeSave: false });
    
    res.json({
      success: true,
      data: newsPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single news post by ID
// @route   GET /api/news/:id
// @access  Public/Admin
const getNewsPost = async (req, res) => {
  try {
    const newsPost = await NewsPost.findById(req.params.id)
      .populate('author', 'name');
    
    if (!newsPost) {
      return res.status(404).json({
        success: false,
        message: 'News post not found'
      });
    }
    
    res.json({
      success: true,
      data: newsPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create news post
// @route   POST /api/news
// @access  Private/Admin
const createNewsPost = async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, status } = req.body;
    
    // Handle image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a featured image'
      });
    }
    
    const featuredImage = getImageUrl(req.file);
    const imagePublicId = req.file.filename || req.file.public_id;
    
    // Parse tags if it's a string
    let parsedTags = tags;
    if (typeof tags === 'string') {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        parsedTags = tags.split(',').map(t => t.trim());
      }
    }
    
    const newsPost = await NewsPost.create({
      title,
      excerpt,
      content,
      featuredImage,
      imagePublicId,
      category: category || 'news',
      tags: parsedTags || [],
      author: req.user._id,
      status: status || 'draft'
    });
    
    await newsPost.populate('author', 'name');
    
    res.status(201).json({
      success: true,
      data: newsPost
    });
  } catch (error) {
    console.error('Create news post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update news post
// @route   PUT /api/news/:id
// @access  Private/Admin
const updateNewsPost = async (req, res) => {
  try {
    let newsPost = await NewsPost.findById(req.params.id);
    
    if (!newsPost) {
      return res.status(404).json({
        success: false,
        message: 'News post not found'
      });
    }
    
    const updateData = { ...req.body };
    
    // Parse tags if it's a string
    if (typeof updateData.tags === 'string') {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch (e) {
        updateData.tags = updateData.tags.split(',').map(t => t.trim());
      }
    }
    
    // Handle new image upload
    if (req.file) {
      // Delete old image
      if (newsPost.imagePublicId) {
        await deleteImage(newsPost.imagePublicId);
      }
      updateData.featuredImage = getImageUrl(req.file);
      updateData.imagePublicId = req.file.filename || req.file.public_id;
    }
    
    // Handle status change to published
    if (updateData.status === 'published' && newsPost.status !== 'published') {
      updateData.publishedAt = new Date();
    }
    
    newsPost = await NewsPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name');
    
    res.json({
      success: true,
      data: newsPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete news post
// @route   DELETE /api/news/:id
// @access  Private/Admin
const deleteNewsPost = async (req, res) => {
  try {
    const newsPost = await NewsPost.findById(req.params.id);
    
    if (!newsPost) {
      return res.status(404).json({
        success: false,
        message: 'News post not found'
      });
    }
    
    // Delete image from storage
    if (newsPost.imagePublicId) {
      await deleteImage(newsPost.imagePublicId);
    }
    
    await newsPost.deleteOne();
    
    res.json({
      success: true,
      message: 'News post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get news categories
// @route   GET /api/news/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = [
      { value: 'news', label: 'News' },
      { value: 'blog', label: 'Blog' },
      { value: 'announcement', label: 'Announcement' },
      { value: 'press-release', label: 'Press Release' }
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
  getNewsPosts,
  getAllNewsPosts,
  getNewsPostBySlug,
  getNewsPost,
  createNewsPost,
  updateNewsPost,
  deleteNewsPost,
  getCategories
};
