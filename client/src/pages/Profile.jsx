import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Crown, Ticket, LogOut, Shield, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/auth/profile');
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <p className="text-white font-bold">Please sign in to view your profile</p>
        <Link
          to="/login"
          className="inline-block px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Card Header */}
      <div className="bg-gradient-to-r from-[#12151d] via-[#161a25] to-[#12151d] border border-amber-500/25 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-extrabold text-2xl shadow-xl shadow-amber-500/25 shrink-0">
            {user.username?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{user.username}</h1>
              {user.role === 'admin' ? (
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-400" />
                  Admin Manager
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-400" />
                  VIP Member
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#12151d] border border-slate-800/80 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 block">Total Screenings Booked</span>
          <span className="text-2xl font-black text-amber-400 font-mono">
            {profile?.totalBookings ?? 1}
          </span>
          <p className="text-[11px] text-slate-500">All-time confirmed admissions</p>
        </div>

        <div className="bg-[#12151d] border border-slate-800/80 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 block">VIP Tier Status</span>
          <span className="text-2xl font-black text-white font-mono flex items-center gap-1.5">
            Diamond
          </span>
          <p className="text-[11px] text-slate-500">Free popcorn & 15% lounge discount</p>
        </div>

        <div className="bg-[#12151d] border border-slate-800/80 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 block">Active Boarding Passes</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">
            {profile?.totalBookings ?? 1}
          </span>
          <p className="text-[11px] text-slate-500">Ready for auditorium entry</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-[#12151d] border border-slate-800/80 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white font-['Cinzel',serif] tracking-wider">
          Account Shortcuts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/bookings"
            className="p-4 rounded-2xl bg-[#0e1118] border border-slate-800 hover:border-amber-500/30 text-white flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-xs font-bold">My Confirmed Passes</p>
                <p className="text-[11px] text-slate-400">View barcodes, seat numbers & dates</p>
              </div>
            </div>
          </Link>

          <Link
            to="/cinemas"
            className="p-4 rounded-2xl bg-[#0e1118] border border-slate-800 hover:border-amber-500/30 text-white flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-xs font-bold">Explore Worldwide Theatres</p>
                <p className="text-[11px] text-slate-400">Browse locations in US, UK, India & more</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
