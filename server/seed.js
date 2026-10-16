const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Booking = require('./models/Booking');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Booking.deleteMany();
    await Movie.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const userPassword = await bcrypt.hash('user123', salt);

    const [adminUser, demoUser] = await User.insertMany([
      {
        username: 'Admin Manager',
        email: 'admin@imovies.com',
        password: adminPassword,
        role: 'admin'
      },
      {
        username: 'Tanishq Pardeshi',
        email: 'user@imovies.com',
        password: userPassword,
        role: 'user'
      }
    ]);

    const movies = await Movie.insertMany([
      {
        title: 'Dune: Part Two',
        description:
          'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
        genre: ['Sci-Fi', 'Adventure', 'Action'],
        duration: 166,
        posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        releaseDate: new Date('2024-03-01'),
        ticketPrice: 320,
        theater: 'iMovies IMAX Laser - Screen 1',
        rating: 8.8,
        language: 'English',
        showtimes: ['10:30 AM', '02:15 PM', '06:30 PM', '10:00 PM']
      },
      {
        title: 'Oppenheimer',
        description:
          'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
        genre: ['Biography', 'Drama', 'History'],
        duration: 180,
        posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        releaseDate: new Date('2023-07-21'),
        ticketPrice: 300,
        theater: 'iMovies Dolby Atmos - Screen 2',
        rating: 8.9,
        language: 'English',
        showtimes: ['11:00 AM', '03:00 PM', '07:00 PM']
      },
      {
        title: 'Spider-Man: Across the Spider-Verse',
        description:
          'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
        genre: ['Animation', 'Action', 'Sci-Fi'],
        duration: 140,
        posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
        releaseDate: new Date('2023-06-02'),
        ticketPrice: 250,
        theater: 'iMovies 4DX - Screen 3',
        rating: 8.7,
        language: 'English',
        showtimes: ['10:00 AM', '01:30 PM', '05:00 PM', '08:30 PM']
      },
      {
        title: 'The Batman',
        description:
          'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the citys hidden corruption.',
        genre: ['Action', 'Crime', 'Drama'],
        duration: 176,
        posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
        releaseDate: new Date('2022-03-04'),
        ticketPrice: 280,
        theater: 'iMovies IMAX Laser - Screen 1',
        rating: 8.3,
        language: 'English',
        showtimes: ['12:00 PM', '04:00 PM', '08:00 PM']
      },
      {
        title: 'Interstellar',
        description:
          'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft to find a new planet for humans.',
        genre: ['Sci-Fi', 'Drama', 'Adventure'],
        duration: 169,
        posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        releaseDate: new Date('2014-11-07'),
        ticketPrice: 350,
        theater: 'iMovies 70mm IMAX - Screen 1',
        rating: 9.0,
        language: 'English',
        showtimes: ['11:30 AM', '03:30 PM', '07:30 PM']
      },
      {
        title: 'Top Gun: Maverick',
        description:
          'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when leading TOP GUNs elite graduates.',
        genre: ['Action', 'Drama'],
        duration: 130,
        posterUrl: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
        releaseDate: new Date('2022-05-27'),
        ticketPrice: 260,
        theater: 'iMovies Dolby Atmos - Screen 2',
        rating: 8.4,
        language: 'English',
        showtimes: ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM']
      }
    ]);

    // Pre-book a few seats on Dune: Part Two so the seat grid immediately shows taken seats!
    const today = new Date().toISOString().split('T')[0];
    await Booking.create({
      user: demoUser._id,
      movie: movies[0]._id,
      seats: ['D4', 'D5', 'E6', 'E7'],
      totalPrice: 1280,
      showDate: today,
      showTime: '06:30 PM'
    });

    console.log('✅ Database Seeded Successfully!');
    console.log('-------------------------------------------');
    console.log('Admin Login:    admin@imovies.com / admin123');
    console.log('Customer Login: user@imovies.com  / user123');
    console.log('-------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();