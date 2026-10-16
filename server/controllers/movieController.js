const Movie = require('../models/Movie');

// @desc    Fetch all active movies
// @route   GET /api/movies
exports.getMovies = async (req, res) => {
  try {
    const { search, genre } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre && genre !== 'All') {
      query.genre = { $in: [genre] };
    }

    const movies = await Movie.find(query).sort({ releaseDate: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error: error.message });
  }
};

// @desc    Fetch single movie by ID
// @route   GET /api/movies/:id
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie details', error: error.message });
  }
};

// @desc    Add a new movie (Admin)
// @route   POST /api/movies
exports.addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      duration,
      posterUrl,
      releaseDate,
      ticketPrice,
      theater,
      rating,
      language,
      showtimes
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Movie title is required' });
    }

    const movie = await Movie.create({
      title,
      description,
      genre: Array.isArray(genre) ? genre : genre ? genre.split(',').map((g) => g.trim()) : ['Action'],
      duration: Number(duration) || 120,
      posterUrl,
      releaseDate: releaseDate || Date.now(),
      ticketPrice: Number(ticketPrice) || 250,
      theater: theater || 'iMovies IMAX Laser - Screen 1',
      rating: Number(rating) || 8.5,
      language: language || 'English',
      showtimes: Array.isArray(showtimes) && showtimes.length > 0
        ? showtimes
        : ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM']
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie', error: error.message });
  }
};