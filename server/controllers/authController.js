const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const inMemoryStore = require('../config/inMemoryStore');

const getJwtSecret = () => process.env.JWT_SECRET || 'imovies_default_super_secret_jwt_key_32_chars_min';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, username: user.username, email: user.email },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    let userExists = null;
    let usingFallback = false;

    try {
      userExists = await User.findOne({ email: email.toLowerCase() });
    } catch (err) {
      usingFallback = true;
      userExists = inMemoryStore.findUserByEmail(email);
    }

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user;
    if (!usingFallback) {
      try {
        user = await User.create({
          username,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'user'
        });
      } catch (err) {
        user = inMemoryStore.createUser({
          username,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'user'
        });
      }
    } else {
      user = inMemoryStore.createUser({
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'user'
      });
    }

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    let user = null;
    try {
      user = await User.findOne({ email: email.toLowerCase() });
    } catch (err) {
      user = inMemoryStore.findUserByEmail(email);
    }

    // Also check in-memory store if not found in db
    if (!user) {
      user = inMemoryStore.findUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc    Get user profile & booking stats
// @route   GET /api/auth/profile
exports.getProfile = async (req, res) => {
  try {
    let user = null;
    try {
      user = await User.findById(req.user.id).select('-password');
    } catch (e) {
      // Ignored
    }
    if (!user) {
      user = inMemoryStore.findUserById(req.user.id);
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookings = inMemoryStore.getUserBookings(req.user.id);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      totalBookings: bookings.length,
      favorites: user.favorites || []
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve profile', error: error.message });
  }
};

// @desc    Toggle movie in user's favorites
// @route   POST /api/auth/favorites/:movieId
exports.toggleFavorite = async (req, res) => {
  try {
    const { movieId } = req.params;
    const favorites = inMemoryStore.toggleFavorite(req.user.id, movieId);
    return res.status(200).json({ favorites });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to toggle favorite', error: error.message });
  }
};