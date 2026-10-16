const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, addMovie } = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', protect, admin, addMovie);

module.exports = router;