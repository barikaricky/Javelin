const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      console.log('🔐 Token received, verifying...');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'javelin-secret-key');
      console.log('✅ Token verified, user ID:', decoded.id);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.log('❌ User not found in database for ID:', decoded.id);
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      console.log('✅ User found:', req.user.email, 'Role:', req.user.role);

      if (!req.user.isActive) {
        console.log('❌ User account is deactivated');
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated'
        });
      }

      next();
    } catch (error) {
      console.error('❌ Auth error:', error.message);
      if (error.name === 'JsonWebTokenError') {
        console.error('   JWT Error: Invalid token signature or format');
      } else if (error.name === 'TokenExpiredError') {
        console.error('   JWT Error: Token has expired');
      }
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
        error: error.message
      });
    }
  }

  if (!token) {
    console.log('❌ No token provided in request');
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};

// Admin role check
const admin = (req, res, next) => {
  console.log('🔒 Checking admin access for user:', req.user?.email, 'Role:', req.user?.role);
  
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    console.log('✅ Admin access granted');
    next();
  } else {
    console.log('❌ Access denied - User role:', req.user?.role, '(Required: admin or superadmin)');
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.',
      userRole: req.user?.role,
      requiredRole: 'admin or superadmin'
    });
  }
};

// Super admin role check
const superAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Super admin only.'
    });
  }
};

module.exports = { protect, admin, superAdmin };
