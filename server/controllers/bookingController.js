const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const mongoose = require('mongoose');
const inMemoryStore = require('../config/inMemoryStore');

const isValidShowDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

// @desc    Create new ticket booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { movie, seats, showDate, showTime } = req.body;

    if (!movie || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: 'Please select a movie and at least one seat' });
    }

    if (typeof movie !== 'string' || !mongoose.isValidObjectId(movie)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    if (
      seats.length > 64 ||
      seats.some((seat) => typeof seat !== 'string' || !/^[A-H][1-8]$/.test(seat)) ||
      new Set(seats).size !== seats.length
    ) {
      return res.status(400).json({ message: 'Please select valid, unique seats' });
    }

    if (!isValidShowDate(showDate) || typeof showTime !== 'string' || !showTime.trim()) {
      return res.status(400).json({ message: 'A valid show date and showtime are required' });
    }

    let movieDoc = null;
    let usingFallback = false;

    try {
      movieDoc = await Movie.findById(movie);
    } catch (err) {
      usingFallback = true;
      movieDoc = inMemoryStore.getMovieById(movie);
    }

    if (!movieDoc) {
      movieDoc = inMemoryStore.getMovieById(movie);
      usingFallback = true;
    }

    if (!movieDoc) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (!movieDoc.showtimes || !movieDoc.showtimes.includes(showTime)) {
      return res.status(400).json({ message: 'The selected showtime is not available for this movie' });
    }

    if (!Number.isFinite(movieDoc.ticketPrice) || movieDoc.ticketPrice <= 0) {
      return res.status(500).json({ message: 'Movie ticket price is not configured correctly' });
    }

    if (!usingFallback) {
      let existingBookings = [];
      try {
        existingBookings = await Booking.find({
          movie,
          showDate,
          showTime,
          seats: { $in: seats }
        });
      } catch (err) {
        existingBookings = [];
      }

      if (existingBookings && existingBookings.length > 0) {
        const conflictSeats = existingBookings.flatMap((b) => b.seats).filter((s) => seats.includes(s));
        return res.status(409).json({
          message: `Seat(s) ${[...new Set(conflictSeats)].join(', ')} are already booked for this showtime`
        });
      }
    } else {
      const occupied = inMemoryStore.getOccupiedSeats(movie, showDate, showTime);
      const conflictSeats = seats.filter((s) => occupied.includes(s));
      if (conflictSeats.length > 0) {
        return res.status(409).json({
          message: `Seat(s) ${[...new Set(conflictSeats)].join(', ')} are already booked for this showtime`
        });
      }
    }

    const calculatedTotal = seats.length * movieDoc.ticketPrice;

    if (!usingFallback) {
      try {
        const booking = await Booking.create({
          user: req.user.id,
          movie,
          seats,
          totalPrice: calculatedTotal,
          showDate,
          showTime
        });

        const populatedBooking = await Booking.findById(booking._id)
          .populate('movie', 'title posterUrl theater duration genre language')
          .populate('user', 'username email');

        return res.status(201).json(populatedBooking || booking);
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({ message: 'One or more selected seats were just booked. Please choose different seats.' });
        }
        // Fall back to in-memory store if DB query failed
        const newBooking = inMemoryStore.createBooking({
          userId: req.user.id,
          movie,
          seats,
          totalPrice: calculatedTotal,
          showDate,
          showTime
        });
        return res.status(201).json({
          ...newBooking,
          movie: movieDoc,
          user: { _id: req.user.id, username: req.user.username || 'User', email: req.user.email || '' }
        });
      }
    } else {
      const newBooking = inMemoryStore.createBooking({
        userId: req.user.id,
        movie,
        seats,
        totalPrice: calculatedTotal,
        showDate,
        showTime
      });
      return res.status(201).json({
        ...newBooking,
        movie: movieDoc,
        user: { _id: req.user.id, username: req.user.username || 'User', email: req.user.email || '' }
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'One or more selected seats were just booked. Please choose different seats.' });
    }
    return res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

// @desc    Fetch logged-in user's bookings
// @route   GET /api/bookings/user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('movie', 'title posterUrl theater duration genre language ticketPrice')
      .sort({ bookingDate: -1 });

    if (!bookings || bookings.length === 0) {
      const fallbackBookings = inMemoryStore.getUserBookings(req.user.id);
      return res.status(200).json(fallbackBookings);
    }
    return res.status(200).json(bookings);
  } catch (error) {
    const fallbackBookings = inMemoryStore.getUserBookings(req.user.id);
    return res.status(200).json(fallbackBookings);
  }
};

// @desc    Fetch occupied seats for a specific movie, date, and showtime
// @route   GET /api/bookings/occupied
exports.getOccupiedSeats = async (req, res) => {
  try {
    const { movieId, showDate, showTime } = req.query;
    if (typeof movieId !== 'string' || !mongoose.isValidObjectId(movieId)) {
      return res.status(400).json({ message: 'A valid movieId query parameter is required' });
    }

    if (!isValidShowDate(showDate) || typeof showTime !== 'string' || !showTime.trim()) {
      return res.status(400).json({ message: 'Valid showDate and showTime query parameters are required' });
    }

    const query = { movie: movieId, showDate, showTime };

    try {
      const bookings = await Booking.find(query).select('seats');
      const occupiedSeats = [...new Set(bookings.flatMap((b) => b.seats))];
      // Also combine with in-memory occupied seats if any
      const inMemSeats = inMemoryStore.getOccupiedSeats(movieId, showDate, showTime);
      const combined = [...new Set([...occupiedSeats, ...inMemSeats])];
      return res.status(200).json({ occupiedSeats: combined });
    } catch (err) {
      const occupiedSeats = inMemoryStore.getOccupiedSeats(movieId, showDate, showTime);
      return res.status(200).json({ occupiedSeats });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch occupied seats', error: error.message });
  }
};