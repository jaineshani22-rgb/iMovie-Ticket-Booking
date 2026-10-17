import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, Calendar, Clock, MapPin, QrCode, Film, CheckCircle, X, Sparkles } from 'lucide-react';
import API from '../services/api';

const Bookings = () => {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(Boolean(location.state?.newBooking));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/bookings/user');
        setBookings(data);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Newly Confirmed VIP Reservation Banner */}
      {showToast && (
        <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 shadow-xl shadow-amber-500/5 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                VIP Reservation Confirmed!
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                {location.state?.movieTitle ? (
                  <>Your seats for <span className="text-amber-400 font-semibold">{location.state.movieTitle}</span> ({Array.isArray(location.state.seats) ? location.state.seats.join(', ') : location.state.seats}) have been issued below.</>
                ) : (
                  'Your digital boarding pass has been secured and issued below.'
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/15 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3 font-['Cinzel',serif]">
            <Ticket className="w-7 h-7 text-amber-400" />
            Confirmed Digital Passes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
            Present this authentic digital boarding pass upon arrival at the auditorium suite
          </p>
        </div>
        <Link
          to="/"
          className="text-xs font-bold bg-[#141822] hover:bg-[#1c2230] border border-amber-500/25 text-amber-400 px-4 py-2.5 rounded-xl transition-colors self-start sm:self-auto shadow-sm"
        >
          + Reserve Another Film
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-[#12151d]/70 border border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xl">
          <Film className="w-12 h-12 text-amber-500/40 mx-auto" />
          <h3 className="text-lg font-bold text-white font-['Cinzel',serif]">No Passes Reserved Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            You do not currently have any active movie reservations. Explore the showcase, test the interactive seat map, and confirm your seats.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-md shadow-amber-500/15"
            >
              Browse Now Showing
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const movie = booking.movie || {};
            const seatsList = Array.isArray(booking.seats) ? booking.seats.join(', ') : booking.seats;
            const passCode = (booking._id || '').slice(-6).toUpperCase();

            return (
              <div
                key={booking._id}
                className="relative bg-gradient-to-r from-[#12151d] via-[#151923] to-[#12151d] border border-amber-500/25 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/70 hover:border-amber-500/45 transition-colors"
              >
                {/* Main Pass Section */}
                <div className="flex flex-col sm:flex-row gap-5 p-5 sm:p-6 flex-1 items-start sm:items-center">
                  <img
                    src={
                      movie.posterUrl ||
                      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80'
                    }
                    alt={movie.title || 'Movie'}
                    referrerPolicy="no-referrer"
                    className="w-20 sm:w-28 aspect-[3/4] rounded-xl object-cover border border-amber-500/30 shadow-lg shrink-0"
                  />

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-md">
                      <CheckCircle className="w-3 h-3 text-amber-400" />
                      Confirmed VIP Admission
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                      {movie.title || 'Feature Film Presentation'}
                    </h3>

                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{movie.theater || 'iMovies IMAX Laser - Screen 1'}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-mono">{booking.showDate || new Date(booking.bookingDate).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-amber-300">{booking.showTime || '06:30 PM'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Perforated Stub Divider (Dashed with notches) */}
                <div className="relative border-t md:border-t-0 md:border-l border-dashed border-amber-500/30 bg-[#0c0e14]/90 p-5 sm:p-6 flex flex-row md:flex-col justify-between items-center md:items-end min-w-[220px]">
                  {/* Top & Bottom decorative notch cutouts on desktop */}
                  <div className="hidden md:block absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#0b0d11] border border-amber-500/25" />
                  <div className="hidden md:block absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#0b0d11] border border-amber-500/25" />

                  <div className="text-left md:text-right space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      Reserved Recliners
                    </span>
                    <span className="text-base font-black font-mono text-amber-400 block">
                      {seatsList}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block pt-1">
                      Total Paid
                    </span>
                    <span className="text-xl font-extrabold text-white font-mono tabular-nums block">
                      ₹{booking.totalPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 md:pt-4">
                    <div className="bg-white p-1 rounded-md shadow-md">
                      <QrCode className="w-7 h-7 text-slate-950" />
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Pass Token</span>
                      <span className="text-xs font-mono font-bold text-amber-400">#{passCode}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookings;