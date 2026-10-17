const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  toggleFavorite
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.post('/favorites/:movieId', protect, toggleFavorite);

module.exports = router;