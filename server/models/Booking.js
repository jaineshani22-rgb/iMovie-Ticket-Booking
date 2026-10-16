const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  seats: { type: [String], required: true },
  totalPrice: { type: Number, required: true },
  showDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  showTime: {
    type: String,
    default: '06:30 PM'
  },
  bookingDate: { type: Date, default: Date.now }
});

bookingSchema.index(
  { movie: 1, showDate: 1, showTime: 1, seats: 1 },
  { unique: true, name: 'unique_movie_show_seat' }
);

module.exports = mongoose.model('Booking', bookingSchema);