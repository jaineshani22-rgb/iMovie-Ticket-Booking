import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, Ticket, LogOut, User, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0d1016]/95 backdrop-blur-md border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
        {/* Zone 1: Wordmark Brand */}
        <Link to="/" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <Film className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-['Cinzel',serif]">
            i<span className="text-amber-400">Movies</span>
            <span className="text-[10px] uppercase font-['Plus_Jakarta_Sans',sans-serif] tracking-[0.2em] text-amber-500/80 ml-1.5 font-semibold hidden md:inline">
              VIP Cinema
            </span>
          </span>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium">
          <Link
            to="/"
            className={`whitespace-nowrap transition-colors relative py-1 ${
              isActive('/')
                ? 'text-amber-400 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Now Showing
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
            )}
          </Link>

          {user && (
            <Link
              to="/bookings"
              className={`whitespace-nowrap flex items-center gap-1.5 transition-colors relative py-1 ${
                isActive('/bookings')
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400/90" />
              <span>Passes</span>
              {isActive('/bookings') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
              )}
            </Link>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action / User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-200 bg-[#161a23] border border-amber-500/20 px-2.5 sm:px-3 py-1.5 rounded-lg shadow-sm">
                {user.role === 'admin' ? (
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                ) : (
                  <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span className="font-semibold text-white truncate max-w-[70px] sm:max-w-[120px]">
                  {user.username}
                </span>
                {user.role === 'admin' && (
                  <span className="text-[9px] uppercase font-bold tracking-wider text-amber-300 border-l border-amber-500/30 pl-1.5 hidden xs:inline">
                    Admin
                  </span>
                )}
              </div>

              <button
                onClick={handleLogout}
                title="Sign out of account"
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-amber-400 hover:bg-[#161a23] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-2 sm:px-3 py-2 transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-3 sm:px-4 py-2 rounded-lg shadow-md shadow-amber-500/15 transition-all whitespace-nowrap"
              >
                VIP Member
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;