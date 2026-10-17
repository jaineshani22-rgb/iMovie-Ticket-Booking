import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Ticket,
  ChevronLeft,
  MoveHorizontal
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

  const todayStr = new Date().toISOString().split('T')[0];
  const [showDate, setShowDate] = useState(todayStr);
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
      setBookingError('Please select at least one seat on the auditorium map.');
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

      // Direct redirect to digital boarding pass with state
      navigate('/bookings', {
        state: {
          newBooking: true,
          movieTitle: movie.title,
          seats: selectedSeats,
          totalPrice: selectedSeats.length * (movie.ticketPrice || 250),
          showDate,
          showTime
        }
      });
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking reservation could not be completed.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-slate-400 space-y-3">
        <p className="text-lg font-semibold text-white">Screening Not Found</p>
        <button
          onClick={() => navigate('/')}
          className="text-xs text-amber-400 hover:underline"
        >
          Return to All Movies
        </button>
      </div>
    );
  }

  const unitPrice = movie.ticketPrice || 250;
  const totalAmount = selectedSeats.length * unitPrice;
  const showtimesList =
    movie.showtimes && movie.showtimes.length > 0
      ? movie.showtimes
      : ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM'];

  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Now Showing
      </button>

      {/* Movie Presentation Overview Header */}
      <div className="bg-[#12151d] border border-amber-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-2xl shadow-black/60 relative overflow-hidden cinema-vignette">
        <img
          src={
            movie.posterUrl ||
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80'
          }
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="w-44 sm:w-56 aspect-[3/4] rounded-2xl object-cover shadow-2xl mx-auto md:mx-0 border border-amber-500/25 shrink-0"
        />

        <div className="flex-1 space-y-4">
          {/* Zero-Pill Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-amber-400 font-bold tracking-wide uppercase">
              {movie.language || 'English'}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{genres.join(', ')}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
              <span className="font-mono tabular-nums">{movie.rating || 8.5} / 10</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            {movie.title}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {movie.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="font-mono tabular-nums">{movie.duration || 120}</span> mins
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              {movie.theater || 'iMovies IMAX Laser - Screen 1'}
            </span>
            <span className="text-amber-400 font-bold bg-[#1a1d26] border border-amber-500/20 px-3 py-1 rounded-md font-mono tabular-nums">
              ₹{unitPrice} per seat
            </span>
          </div>

          {/* Date & Showtime Selector Module */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Screening Date
              </label>
              <input
                type="date"
                min={todayStr}
                value={showDate}
                onChange={(e) => setShowDate(e.target.value)}
                className="w-full sm:w-auto bg-[#0b0d11] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Select Showtime
              </label>
              <div className="flex flex-wrap gap-2">
                {showtimesList.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setShowTime(time)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                      showTime === time
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/25'
                        : 'bg-[#0b0d11] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
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
        <div className="lg:col-span-2 bg-[#12151d] border border-amber-500/20 rounded-3xl p-4 sm:p-8 space-y-6 sm:space-y-8 shadow-xl shadow-black/50">
          {/* Luminous Curved Cinema Screen */}
          <div className="max-w-md mx-auto text-center space-y-3">
            <div className="cinema-screen-vip mx-auto" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400/80 font-bold">
              All Eyes This Way — 4K Laser Projection
            </p>
          </div>

          {/* Mobile Horizontal Swipe Indicator */}
          <div className="sm:hidden flex items-center justify-center gap-2 text-[11px] text-amber-400/90 bg-amber-500/10 py-1.5 px-3 rounded-lg border border-amber-500/20">
            <MoveHorizontal className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Swipe horizontally to view full auditorium rows</span>
          </div>

          {/* Seat Grid A1 - H8 */}
          <div className="overflow-x-auto py-3 px-1 scrollbar-thin">
            <div className="min-w-[460px] max-w-lg mx-auto space-y-2.5">
              {ROWS.map((row) => {
                const isVipRow = ['F', 'G', 'H'].includes(row);
                return (
                  <div key={row} className="flex items-center justify-center gap-2 sm:gap-2.5">
                    <span className="w-5 text-xs font-bold text-slate-500 text-right font-mono shrink-0">
                      {row}
                    </span>
                    {COLS.map((col) => {
                      const seatId = `${row}${col}`;
                      const isOccupied = occupiedSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <React.Fragment key={seatId}>
                          {col === 5 && <div className="w-3 sm:w-5 shrink-0" />}
                          <button
                            type="button"
                            disabled={isOccupied}
                            onClick={() => toggleSeat(seatId)}
                            title={isOccupied ? `Seat ${seatId} Booked` : `Seat ${seatId} ${isVipRow ? '(VIP Recliner)' : ''}`}
                            className={`seat-vip w-10 h-10 min-w-[40px] min-h-[40px] rounded-t-xl rounded-b-md text-xs font-mono font-bold flex items-center justify-center border shrink-0 ${
                              isOccupied
                                ? 'bg-[#181b22] border-slate-800 text-slate-600 cursor-not-allowed'
                                : isSelected
                                ? 'bg-gradient-to-b from-amber-400 to-amber-500 border-amber-300 text-slate-950 font-black shadow-lg shadow-amber-500/35 scale-105'
                                : isVipRow
                                ? 'bg-[#161922] border-amber-500/30 text-amber-300/80 hover:border-amber-400 hover:text-white'
                                : 'bg-[#0d1016] border-slate-700/80 text-slate-300 hover:border-amber-400 hover:text-white'
                            }`}
                          >
                            {seatId}
                          </button>
                        </React.Fragment>
                      );
                    })}
                    <span className="w-5 text-xs font-bold text-slate-500 font-mono shrink-0">
                      {row}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seating Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-[#0d1016] border border-slate-700 inline-block" />
              <span>Standard (A–E)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-[#161922] border border-amber-500/40 inline-block" />
              <span>VIP Recliner (F–H)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-gradient-to-b from-amber-400 to-amber-500 border border-amber-300 inline-block shadow-sm" />
              <span className="text-amber-400 font-semibold">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-[#181b22] border border-slate-800 inline-block" />
              <span>Reserved</span>
            </div>
          </div>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-[#12151d] border border-amber-500/20 rounded-3xl p-6 space-y-5 shadow-xl shadow-black/50 sticky top-24 w-full">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <Ticket className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white font-['Cinzel',serif]">Reservation Summary</h3>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-slate-400">Film</span>
              <span className="text-white font-bold text-right truncate max-w-[170px]">{movie.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Screening Date</span>
              <span className="text-white font-mono font-medium">{showDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Showtime</span>
              <span className="text-amber-400 font-bold">{showTime}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-400">Reserved Seats</span>
              <span className="text-white font-bold font-mono text-right">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
            <span className="text-slate-300 font-medium text-xs sm:text-sm">Total Payable</span>
            <span className="text-2xl font-black text-white font-mono tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              ₹{totalAmount}
            </span>
          </div>

          {bookingError && (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{bookingError}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleConfirmBooking}
            disabled={bookingLoading || selectedSeats.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-35 text-slate-950 font-black py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 text-xs sm:text-sm"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            {bookingLoading
              ? 'Securing VIP Reservation...'
              : user
              ? `Confirm Reservation (${selectedSeats.length} ${selectedSeats.length === 1 ? 'Seat' : 'Seats'})`
              : 'Sign In to Reserve'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;