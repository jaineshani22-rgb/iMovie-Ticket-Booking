import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Ticket
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showDate, setShowDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [showTime, setShowTime] = useState('06:30 PM');

  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingError, setBookingError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/movies/${id}`);
        setMovie(data);
        if (data.showtimes?.length > 0) {
          setShowTime(data.showtimes.includes('06:30 PM') ? '06:30 PM' : data.showtimes[0]);
        }
      } catch (error) {
        console.error('Failed to load movie:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Fetch occupied seats whenever movie, date, or time changes
  useEffect(() => {
    if (!id) return;
    const fetchOccupied = async () => {
      try {
        const { data } = await API.get('/bookings/occupied', {
          params: { movieId: id, showDate, showTime }
        });
        setOccupiedSeats(data.occupiedSeats || []);
        setSelectedSeats([]);
      } catch (error) {
        console.error('Error fetching occupied seats:', error);
      }
    };
    fetchOccupied();
  }, [id, showDate, showTime]);

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    setBookingError('');
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const handleConfirmBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (selectedSeats.length === 0) {
      setBookingError('Please select at least one seat on the map.');
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError('');

      await API.post('/bookings', {
        movie: movie._id,
        seats: selectedSeats,
        showDate,
        showTime
      });

      navigate('/bookings');
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center text-slate-400">
        Movie not found.
      </div>
    );
  }

  const unitPrice = movie.ticketPrice || 250;
  const totalAmount = selectedSeats.length * unitPrice;
  const showtimesList =
    movie.showtimes && movie.showtimes.length > 0
      ? movie.showtimes
      : ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Movie Overview Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-2xl">
        <img
          src={
            movie.posterUrl ||
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80'
          }
          alt={movie.title}
          className="w-48 sm:w-56 rounded-2xl object-cover shadow-xl mx-auto md:mx-0 border border-slate-800"
        />

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {(Array.isArray(movie.genre) ? movie.genre : [movie.genre]).map((g, i) => (
              <span
                key={i}
                className="text-xs font-bold bg-rose-600/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full"
              >
                {g}
              </span>
            ))}
            <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {movie.rating || 8.5} / 10
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{movie.title}</h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            {movie.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" />
              {movie.duration || 120} mins
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              {movie.theater || 'iMovies IMAX Laser - Screen 1'}
            </span>
            <span className="text-white font-bold bg-slate-800 px-3 py-1 rounded-lg">
              ₹{unitPrice} / Seat
            </span>
          </div>

          {/* Date & Showtime Controls */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                Select Show Date
              </label>
              <input
                type="date"
                value={showDate}
                onChange={(e) => setShowDate(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Select Showtime
              </label>
              <div className="flex flex-wrap gap-2">
                {showtimesList.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setShowTime(time)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      showTime === time
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Auditorium & Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Auditorium Seat Map */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
          <div className="max-w-lg mx-auto text-center space-y-2">
            <div className="cinema-screen mx-auto" />
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
              All Eyes This Way — IMAX Laser Screen
            </p>
          </div>

          {/* Seat Grid A1 - H8 */}
          <div className="overflow-x-auto">
            <div className="min-w-[420px] max-w-lg mx-auto space-y-2.5">
              {ROWS.map((row) => (
                <div key={row} className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="w-5 text-xs font-bold text-slate-500 text-right">{row}</span>
                  {COLS.map((col) => {
                    const seatId = `${row}${col}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <React.Fragment key={seatId}>
                        {col === 5 && <div className="w-4 sm:w-6" />}
                        <button
                          type="button"
                          disabled={isOccupied}
                          onClick={() => toggleSeat(seatId)}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-t-xl rounded-b-md text-xs font-bold transition-all flex items-center justify-center border ${
                            isOccupied
                              ? 'bg-slate-800/90 border-slate-700 text-slate-600 cursor-not-allowed'
                              : isSelected
                              ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/40 scale-105'
                              : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-rose-500 hover:text-white'
                          }`}
                        >
                          {seatId}
                        </button>
                      </React.Fragment>
                    );
                  })}
                  <span className="w-5 text-xs font-bold text-slate-500">{row}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-slate-950 border border-slate-700 inline-block" />
              Available
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-rose-600 border border-rose-400 inline-block" />
              Selected
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-slate-800 border border-slate-700 inline-block" />
              Occupied
            </div>
          </div>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl sticky top-24">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Ticket className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg font-bold text-white">Booking Summary</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Movie</span>
              <span className="text-white font-semibold text-right">{movie.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Show Date</span>
              <span className="text-white font-medium">{showDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Showtime</span>
              <span className="text-rose-400 font-bold">{showTime}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-400">Selected Seats</span>
              <span className="text-white font-bold text-right">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
            <span className="text-slate-300 font-medium">Total Payable</span>
            <span className="text-2xl font-extrabold text-white">₹{totalAmount}</span>
          </div>

          {bookingError && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{bookingError}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleConfirmBooking}
            disabled={bookingLoading || selectedSeats.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-600/25 transition text-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            {bookingLoading
              ? 'Confirming Ticket...'
              : user
              ? 'Confirm & Book Tickets'
              : 'Login to Book Seats'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;