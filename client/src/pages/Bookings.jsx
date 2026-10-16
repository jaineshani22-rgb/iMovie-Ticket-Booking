import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, Clock, MapPin, QrCode, Film } from 'lucide-react';
import API from '../services/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Ticket className="w-7 h-7 text-rose-500" />
            My Confirmed Tickets
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Show your digital booking pass at the auditorium entrance
          </p>
        </div>
        <Link
          to="/"
          className="text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl transition"
        >
          + Book Another Movie
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <Film className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No bookings yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You haven't reserved any movie seats yet. Pick a movie from the home screen and test the interactive seat map!
          </p>
          <Link
            to="/"
            className="inline-block bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const movie = booking.movie || {};
            return (
              <div
                key={booking._id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden flex flex-col sm:flex-row justify-between shadow-xl hover:border-slate-700 transition"
              >
                <div className="flex gap-4 p-5 flex-1">
                  <img
                    src={
                      movie.posterUrl ||
                      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80'
                    }
                    alt={movie.title || 'Movie'}
                    className="w-20 h-28 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      Confirmed Pass
                    </span>
                    <h3 className="text-lg font-extrabold text-white">
                      {movie.title || 'iMovies Feature Presentation'}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {movie.theater || 'iMovies IMAX Laser - Screen 1'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-rose-500" />
                        {booking.showDate || new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        {booking.showTime || '06:30 PM'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Perforated Ticket Stub */}
                <div className="border-t sm:border-t-0 sm:border-l border-dashed border-slate-800 bg-slate-950/60 p-5 flex sm:flex-col justify-between items-center sm:items-end min-w-[210px]">
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 block">Seats Reserved</span>
                    <span className="text-sm font-extrabold text-rose-400">
                      {Array.isArray(booking.seats) ? booking.seats.join(', ') : booking.seats}
                    </span>
                    <span className="text-xs text-slate-400 block mt-2">Total Paid</span>
                    <span className="text-lg font-black text-white">₹{booking.totalPrice}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
                    <QrCode className="w-5 h-5 text-slate-400" />
                    <span>ID: #{booking._id.slice(-6).toUpperCase()}</span>
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