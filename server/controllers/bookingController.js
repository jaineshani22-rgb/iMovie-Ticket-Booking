const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

// @desc    Create new ticket booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { movie, seats, totalPrice, showDate, showTime } = req.body;

    if (!movie || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: 'Please select a movie and at least one seat' });
    }

    const movieDoc = await Movie.findById(movie);
    if (!movieDoc) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const targetDate = showDate || new Date().toISOString().split('T')[0];
    const targetTime = showTime || '06:30 PM';

    // Check if any requested seat is already booked for this movie + date + showtime
    const existingBookings = await Booking.find({
      movie,
      showDate: targetDate,
      showTime: targetTime,
      seats: { $in: seats }
    });

    if (existingBookings.length > 0) {
      const conflictSeats = existingBookings.flatMap((b) => b.seats).filter((s) => seats.includes(s));
      return res.status(400).json({
        message: `Seat(s) ${[...new Set(conflictSeats)].join(', ')} are already booked for this showtime`
      });
    }

    const calculatedPrice = totalPrice || seats.length * (movieDoc.ticketPrice || 250);

    const booking = await Booking.create({
      user: req.user.id,
      movie,
      seats,
      totalPrice: calculatedPrice,
      showDate: targetDate,
      showTime: targetTime
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('movie', 'title posterUrl theater duration genre language')
      .populate('user', 'username email');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

// @desc    Fetch logged-in user's bookings
// @route   GET /api/bookings/user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('movie', 'title posterUrl theater duration genre language ticketPrice')
      .sort({ bookingDate: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user bookings', error: error.message });
  }
};

// @desc    Fetch occupied seats for a specific movie, date, and showtime
// @route   GET /api/bookings/occupied
exports.getOccupiedSeats = async (req, res) => {
  try {
    const { movieId, showDate, showTime } = req.query;
    if (!movieId) {
      return res.status(400).json({ message: 'movieId query parameter is required' });
    }

    const query = { movie: movieId };
    if (showDate) query.showDate = showDate;
    if (showTime) query.showTime = showTime;

    const bookings = await Booking.find(query).select('seats');
    const occupiedSeats = [...new Set(bookings.flatMap((b) => b.seats))];

    res.status(200).json({ occupiedSeats });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch occupied seats', error: error.message });
  }
};