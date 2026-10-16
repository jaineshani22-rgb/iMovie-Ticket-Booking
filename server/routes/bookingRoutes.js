const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getOccupiedSeats
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/occupied', getOccupiedSeats);
router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);

module.exports = router;