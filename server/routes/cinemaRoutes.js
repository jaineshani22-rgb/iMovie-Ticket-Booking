const express = require('express');
const router = express.Router();
const { getCinemas, getCinemaById, getCinemaShowtimes } = require('../controllers/cinemaController');

router.get('/', getCinemas);
router.get('/:id', getCinemaById);
router.get('/:id/showtimes', getCinemaShowtimes);

module.exports = router;
