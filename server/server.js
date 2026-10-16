const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Booking = require('./models/Booking');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to iMovies API - Server is running' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      throw new Error('JWT_SECRET must be set to a secret with at least 32 characters');
    }

    await connectDB();
    await Booking.init();

    const server = app.listen(PORT);
    await new Promise((resolve, reject) => {
      server.once('listening', resolve);
      server.once('error', reject);
    });
    console.log(`iMovies Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error(`Failed to start iMovies Server: ${error.message}`);
    await mongoose.disconnect();
    process.exitCode = 1;
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;