import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, Ticket, LogOut, User, Crown, Globe, Building, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocationContext } from '../context/LocationContext';
import LocationPickerModal from './LocationPickerModal';
import MovieSearchBar from './MovieSearchBar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { country, state, city, activeCountry } = useLocationContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0d1016]/95 backdrop-blur-md border-b border-amber-500/15">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Film className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-['Cinzel',serif]">
              i<span className="text-amber-400">Movies</span>
              <span className="text-[10px] uppercase font-['Plus_Jakarta_Sans',sans-serif] tracking-[0.2em] text-amber-500/80 ml-1.5 font-semibold hidden md:inline">
                Worldwide
              </span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs sm:text-sm font-medium">
            <Link
              to="/"
              className={`whitespace-nowrap transition-colors relative py-1 ${
                isActive('/') ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Movies
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
              )}
            </Link>

            <Link
              to="/cinemas"
              className={`whitespace-nowrap flex items-center gap-1.5 transition-colors relative py-1 ${
                isActive('/cinemas') ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-amber-400/90" />
              <span>Cinemas</span>
              {isActive('/cinemas') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
              )}
            </Link>

            {user && (
              <Link
                to="/bookings"
                className={`whitespace-nowrap flex items-center gap-1.5 transition-colors relative py-1 ${
                  isActive('/bookings') ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
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

          {/* Universal Movie Search Bar (Desktop / Tablet) */}
          <div className="hidden sm:block flex-1 max-w-xs md:max-w-sm lg:max-w-md mx-2 lg:mx-4">
            <MovieSearchBar />
          </div>

          {/* Right Section: Mobile Search Toggle + Location Selector & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setShowMobileSearch((prev) => !prev)}
              aria-label="Toggle movie search bar"
              className={`sm:hidden w-8 h-8 rounded-xl flex items-center justify-center transition-colors border ${
                showMobileSearch
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-[#141822] text-amber-400 border-amber-500/25 hover:bg-[#1d2332]'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Worldwide Location Selector Pill */}
            <button
              type="button"
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1.5 text-xs text-slate-200 bg-[#141822] hover:bg-[#1c2230] border border-amber-500/25 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all shadow-sm cursor-pointer"
              title={`Change Country, State & City (${city}, ${state || ''}, ${activeCountry?.name || ''})`}
            >
              <Globe className="w-3.5 h-3.5 text-[#00F2FE]" aria-hidden="true" />
              <span className="font-semibold text-white max-w-[80px] sm:max-w-[100px] truncate">
                {city}
              </span>
              <span className="text-[10px] font-mono text-amber-400 font-bold hidden xs:inline">
                ({activeCountry?.currency})
              </span>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-200 bg-[#161a23] hover:bg-[#1f2431] border border-amber-500/20 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-sm transition-colors"
                >
                  {user.role === 'admin' ? (
                    <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span className="font-semibold text-white truncate max-w-[70px] sm:max-w-[110px]">
                    {user.username}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Sign out of account"
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-amber-400 hover:bg-[#161a23] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-2 py-1.5 transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm font-semibold bg-[#FF007A] hover:bg-[#e90070] text-slate-950 px-3 sm:px-4 py-1.5 rounded-xl transition-all whitespace-nowrap"
                >
                  Join VIP
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {showMobileSearch && (
          <div className="sm:hidden px-3 py-2.5 bg-[#0a0d13] border-t border-amber-500/20 shadow-xl">
            <MovieSearchBar onSearchSubmit={() => setShowMobileSearch(false)} />
          </div>
        )}
      </header>

      {/* Worldwide Region Modal */}
      <LocationPickerModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />
    </>
  );
};

export default Navbar;