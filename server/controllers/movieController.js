const Movie = require('../models/Movie');
const inMemoryStore = require('../config/inMemoryStore');

// @desc    Fetch all active movies
// @route   GET /api/movies
exports.getMovies = async (req, res) => {
  const { search, genre } = req.query;
  try {
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre && genre !== 'All') {
      query.genre = { $in: [genre] };
    }

    const movies = await Movie.find(query).sort({ releaseDate: -1 });
    return res.status(200).json(movies);
  } catch (error) {
    // In-memory fallback if MongoDB is not connected
    const movies = inMemoryStore.getMovies(search, genre);
    return res.status(200).json(movies);
  }
};

// @desc    Fetch single movie by ID
// @route   GET /api/movies/:id
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      // Check in-memory store in case it was created there
      const fallbackMovie = inMemoryStore.getMovieById(req.params.id);
      if (fallbackMovie) return res.status(200).json(fallbackMovie);
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    const movie = inMemoryStore.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json(movie);
  }
};

// @desc    Add a new movie (Admin)
// @route   POST /api/movies
exports.addMovie = async (req, res) => {
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

  try {
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

    return res.status(201).json(movie);
  } catch (error) {
    const movie = inMemoryStore.createMovie(req.body);
    return res.status(201).json(movie);
  }
};