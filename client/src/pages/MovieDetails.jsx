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
  MoveHorizontal,
  Play,
  Building,
  User,
  ShieldCheck,
  Compass
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLocationContext } from '../context/LocationContext';
import TrailerModal from '../components/TrailerModal';
import CheckoutModal from '../components/CheckoutModal';
import MovieReviews from '../components/MovieReviews';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { city, activeCountry, cinemas, selectedCinema, setSelectedCinema, formatPrice, getRawPrice } =
    useLocationContext();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Screening Date (generate today + next 6 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { dateStr, dayName, monthDay };
  });

  const [showDate, setShowDate] = useState(availableDates[0].dateStr);
  const [showTime, setShowTime] = useState('06:30 PM');

  // Seats & Reservation
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingError, setBookingError] = useState('');
  const [holdLoading, setHoldLoading] = useState(false);

  // Modals
  const [showTrailer, setShowTrailer] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentHoldId, setCurrentHoldId] = useState(null);

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

  const handleStartCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (selectedSeats.length === 0) {
      setBookingError('Please select at least one seat on the auditorium map.');
      return;
    }

    try {
      setHoldLoading(true);
      setBookingError('');

      // Call backend to lock temporary hold for 8 minutes
      const { data } = await API.post('/bookings/hold', {
        movie: movie._id,
        seats: selectedSeats,
        showDate,
        showTime
      });

      setCurrentHoldId(data.holdId);
      setShowCheckout(true);
    } catch (err) {
      setBookingError(
        err.response?.data?.message || 'One or more seats were just held by another guest. Please reselect.'
      );
      // Refresh occupied seats
      const { data } = await API.get('/bookings/occupied', {
        params: { movieId: id, showDate, showTime }
      });
      setOccupiedSeats(data.occupiedSeats || []);
    } finally {
      setHoldLoading(false);
    }
  };

  const handleBookingSuccess = (confirmedBooking) => {
    setShowCheckout(false);
    navigate('/bookings', {
      state: {
        newBooking: true,
        movieTitle: movie.title,
        seats: confirmedBooking.seats || selectedSeats,
        totalPrice: confirmedBooking.totalPrice,
        showDate,
        showTime
      }
    });
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
        <button onClick={() => navigate('/')} className="text-xs text-amber-400 hover:underline">
          Return to All Movies
        </button>
      </div>
    );
  }

  const basePriceVal = movie.ticketPrice || 250;
  const rawUnitPrice = getRawPrice(basePriceVal);
  const formattedUnitPrice = formatPrice(basePriceVal);
  const totalAmountFormatted = formatPrice(basePriceVal * (selectedSeats.length || 1));

  const showtimesList =
    movie.showtimes && movie.showtimes.length > 0
      ? movie.showtimes
      : ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM'];

  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
  const activeCinema = selectedCinema || cinemas[0] || { name: movie.theater || 'iMovies VIP Cinema' };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Worldwide Discoveries
      </button>

      {/* Movie Presentation Overview Header */}
      <div className="bg-[#12151d] border border-amber-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-2xl shadow-black/70 relative overflow-hidden cinema-vignette">
        {movie.backdropUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none mix-blend-luminosity filter blur-[1px]"
            style={{ backgroundImage: `url(${movie.backdropUrl})` }}
          />
        )}

        {/* Poster with Trailer Trigger */}
        <div className="relative w-44 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mx-auto md:mx-0 border border-amber-500/25 shrink-0 group">
          <img
            src={
              movie.posterUrl ||
              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80'
            }
            alt={movie.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {movie.trailerKey && (
            <button
              type="button"
              onClick={() => setShowTrailer(true)}
              className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/70 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/20 flex items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-sm"
              title="Watch Trailer"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </button>
          )}
        </div>

        <div className="relative z-10 flex-1 space-y-4">
          {/* Metadata line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-amber-400 font-bold tracking-wide uppercase">
              {movie.language || 'English'}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{genres.join(', ')}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => document.getElementById('audience-reviews')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-amber-400 font-bold hover:text-amber-300 transition-colors cursor-pointer group"
              title="Jump to verified audience reviews"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
              <span className="font-mono tabular-nums">{movie.rating || 8.5} / 10</span>
              <span className="text-[10px] text-slate-400 font-normal underline decoration-amber-500/40 group-hover:text-amber-300">Reviews</span>
            </button>
            {movie.director && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Dir. {movie.director}</span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            {movie.title}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {movie.description}
          </p>

          {/* Cast list if available */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                Starring
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {movie.cast.slice(0, 4).map((actor, idx) => (
                  <span
                    key={idx}
                    className="bg-[#171b26] border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[11px]"
                  >
                    <strong>{actor.name}</strong> {actor.character ? `(${actor.character})` : ''}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="font-mono tabular-nums">{movie.duration || 120}</span> mins
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              {activeCinema?.name || movie.theater}
            </span>
            <span className="text-amber-400 font-bold bg-[#1a1d26] border border-amber-500/20 px-3 py-1 rounded-md font-mono tabular-nums">
              {formattedUnitPrice} per recliner
            </span>
          </div>

          {/* Cinema & Date Selector Module */}
          <div className="pt-4 border-t border-slate-800/80 space-y-4">
            {/* Preferred Cinema Selector in city */}
            {cinemas && cinemas.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  Select Cinema Location in {city}
                </label>
                <div className="flex flex-wrap gap-2">
                  {cinemas.map((cin) => {
                    const isSelected = activeCinema?._id === cin._id;
                    return (
                      <button
                        key={cin._id}
                        type="button"
                        onClick={() => setSelectedCinema(cin)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-[#0d1017] border border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {cin.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Screening Date Cards */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Screening Date
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {availableDates.map((item) => {
                  const isSelected = showDate === item.dateStr;
                  return (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => setShowDate(item.dateStr)}
                      className={`px-3.5 py-2 rounded-xl text-center min-w-[72px] transition-all shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25'
                          : 'bg-[#0b0d11] text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold block">{item.dayName}</span>
                      <span className="text-xs font-bold font-mono block mt-0.5">{item.monthDay}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Showtime Selection */}
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
        <div id="auditorium-seat-map" className="lg:col-span-2 bg-[#12151d] border border-amber-500/20 rounded-3xl p-4 sm:p-8 space-y-6 sm:space-y-8 shadow-xl shadow-black/50">
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
                            title={
                              isOccupied
                                ? `Seat ${seatId} Booked`
                                : `Seat ${seatId} ${isVipRow ? '(VIP Recliner)' : '(Standard)'}`
                            }
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
            <h3 className="text-base font-bold text-white font-['Cinzel',serif]">
              Reservation Summary
            </h3>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-slate-400">Film</span>
              <span className="text-white font-bold text-right truncate max-w-[170px]">
                {movie.title}
              </span>
            </div>
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-slate-400">Theatre</span>
              <span className="text-amber-400/90 font-medium text-right truncate max-w-[170px]">
                {activeCinema?.name || movie.theater}
              </span>
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
            <span className="text-slate-300 font-medium text-xs sm:text-sm">Estimated Total</span>
            <span className="text-2xl font-black text-white font-mono tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              {totalAmountFormatted}
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
            onClick={handleStartCheckout}
            disabled={holdLoading || selectedSeats.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-35 text-slate-950 font-black py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 text-xs sm:text-sm"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            {holdLoading
              ? 'Locking Recliner Hold...'
              : user
              ? `Proceed to Checkout (${selectedSeats.length} ${
                  selectedSeats.length === 1 ? 'Seat' : 'Seats'
                })`
              : 'Sign In to Reserve'}
          </button>
        </div>
      </div>

      {/* Verified Audience Reviews & Ratings Section */}
      <MovieReviews
        movieId={movie._id}
        movieTitle={movie.title}
        onScrollToBooking={() => {
          const el = document.getElementById('auditorium-seat-map');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 350, behavior: 'smooth' });
          }
        }}
      />

      {/* 4K Trailer Modal */}
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerKey={movie.trailerKey}
        title={movie.title}
      />

      {/* 4-Step Checkout & Simulated Payment Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        movie={movie}
        cinema={activeCinema}
        showDate={showDate}
        showTime={showTime}
        selectedSeats={selectedSeats}
        unitPrice={rawUnitPrice}
        formattedUnitPrice={formattedUnitPrice}
        currencySymbol={activeCountry.symbol}
        currencyCode={activeCountry.currency}
        user={user}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default MovieDetails;