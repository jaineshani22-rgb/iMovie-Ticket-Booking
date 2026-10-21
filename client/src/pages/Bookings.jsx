import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Film,
  CheckCircle,
  X,
  Sparkles,
  Printer,
  Ban,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import API from '../services/api';
import { useLocationContext } from '../context/LocationContext';

const Bookings = () => {
  const location = useLocation();
  const { formatPrice } = useLocationContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(Boolean(location.state?.newBooking));

  // Cancellation modal state
  const [cancelModal, setCancelModal] = useState({ isOpen: false, bookingId: null, movieTitle: '' });
  const [cancelling, setCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/bookings/user');
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePrint = (bookingRef) => {
    window.print();
  };

  const handleConfirmCancel = async () => {
    if (!cancelModal.bookingId) return;
    try {
      setCancelling(true);
      await API.post(`/bookings/${cancelModal.bookingId}/cancel`);
      setCancelMessage('Your reservation has been cancelled. Simulated refund issued.');
      fetchBookings();
      setTimeout(() => {
        setCancelModal({ isOpen: false, bookingId: null, movieTitle: '' });
        setCancelMessage('');
      }, 1500);
    } catch (err) {
      setCancelMessage(err.response?.data?.message || 'Failed to cancel reservation');
    } finally {
      setCancelling(false);
    }
  };

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
                  <>
                    Your seats for{' '}
                    <span className="text-amber-400 font-semibold">{location.state.movieTitle}</span> (
                    {Array.isArray(location.state.seats)
                      ? location.state.seats.join(', ')
                      : location.state.seats}
                    ) have been issued below.
                  </>
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
            You do not currently have any active movie reservations. Explore the worldwide showcase, test the interactive seat map, and confirm your seats.
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
            const isCancelled = booking.status === 'cancelled';
            const bookingRef =
              booking.bookingRef || `IMV-${(booking._id || '').slice(-6).toUpperCase()}`;

            return (
              <div
                key={booking._id}
                className={`relative bg-gradient-to-r from-[#12151d] via-[#151923] to-[#12151d] border rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/70 transition-all ${
                  isCancelled
                    ? 'border-slate-800 opacity-60'
                    : 'border-amber-500/25 hover:border-amber-500/45'
                }`}
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
                    <div className="flex items-center gap-2">
                      {isCancelled ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 rounded-md">
                          <Ban className="w-3 h-3" />
                          Reservation Cancelled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-md">
                          <CheckCircle className="w-3 h-3 text-amber-400" />
                          Confirmed VIP Admission
                        </span>
                      )}

                      <span className="text-[10px] text-slate-400 font-mono">
                        Ref: <strong>{bookingRef}</strong>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                      {movie.title || 'Feature Film Presentation'}
                    </h3>

                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">
                        {booking.cinema || movie.theater || 'iMovies VIP Cinema'}
                      </span>
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-mono">
                          {booking.showDate || new Date(booking.bookingDate).toLocaleDateString()}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-amber-300">
                          {booking.showTime || '06:30 PM'}
                        </span>
                      </span>
                    </div>

                    {/* Actions: Print and Cancel */}
                    <div className="flex items-center gap-3 pt-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handlePrint(bookingRef)}
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Pass</span>
                      </button>

                      {!isCancelled && (
                        <button
                          type="button"
                          onClick={() =>
                            setCancelModal({
                              isOpen: true,
                              bookingId: booking._id,
                              movieTitle: movie.title || 'Movie'
                            })
                          }
                          className="inline-flex items-center gap-1.5 text-rose-400/80 hover:text-rose-300 transition-colors"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Cancel Pass</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Perforated Stub Divider (Dashed with notches) */}
                <div className="relative border-t md:border-t-0 md:border-l border-dashed border-amber-500/30 bg-[#0c0e14]/90 p-5 sm:p-6 flex flex-row md:flex-col justify-between items-center md:items-end min-w-[220px]">
                  {/* Decorative notch cutouts on desktop */}
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
                      {isCancelled ? 'Refund Status' : 'Amount Paid'}
                    </span>
                    <span className="text-xl font-extrabold text-white font-mono tabular-nums block">
                      {isCancelled
                        ? 'Refunded'
                        : `${booking.currency || '₹'} ${booking.totalPrice}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 md:pt-4">
                    <div className="bg-[#F1F5F9] p-1 rounded-md">
                      <QrCode className="w-7 h-7 text-slate-950" />
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 block">
                        Scan at Gate
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        #{bookingRef.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancelModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#12151d] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-['Cinzel',serif]">
                  Cancel Reservation?
                </h3>
                <p className="text-xs text-slate-400">
                  Are you sure you want to cancel your passes for <strong>{cancelModal.movieTitle}</strong>?
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 bg-[#0b0e14] border border-slate-800 p-3 rounded-xl leading-relaxed">
              Your reserved seats will immediately be released back into auditorium inventory, and a simulated full refund will be processed to your original test payment method.
            </p>

            {cancelMessage && (
              <p className="text-xs font-bold text-amber-400 text-center">{cancelMessage}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelModal({ isOpen: false, bookingId: null, movieTitle: '' })}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Keep Reservation
              </button>
              <button
                type="button"
                disabled={cancelling}
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md"
              >
                {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;