import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, Ticket, LogOut, User, Crown, Globe, Building, Search, Compass, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocationContext } from '../context/LocationContext';
import LocationPickerModal from './LocationPickerModal';
import MovieSearchBar from './MovieSearchBar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { country, state, city, activeCountry, detectCurrentLocation, detectingLocation } = useLocationContext();
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE2D5] shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group whitespace-nowrap shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#E63946] to-[#D62839] text-white flex items-center justify-center shadow-md shadow-[#E63946]/20 group-hover:scale-105 transition-transform duration-200">
              <Film className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] text-[#FFC93C]" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#2B2B2B]">
              i<span className="text-[#E63946]">Movies</span>
              <span className="text-[10px] uppercase font-['Plus_Jakarta_Sans',sans-serif] tracking-[0.2em] bg-[#FFF6DC] text-[#7A5B14] border border-[#FFEDB0] px-1.5 py-0.5 rounded-md ml-1.5 font-bold hidden md:inline">
                Worldwide
              </span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs sm:text-sm font-semibold">
            <Link
              to="/"
              className={`whitespace-nowrap transition-colors relative py-1 ${
                isActive('/') ? 'text-[#E63946] font-bold' : 'text-[#6B7280] hover:text-[#E63946]'
              }`}
            >
              Movies
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E63946] rounded-full" />
              )}
            </Link>

            <Link
              to="/cinemas"
              className={`whitespace-nowrap flex items-center gap-1.5 transition-colors relative py-1 ${
                isActive('/cinemas') ? 'text-[#E63946] font-bold' : 'text-[#6B7280] hover:text-[#E63946]'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-[#E63946]" />
              <span>Cinemas</span>
              {isActive('/cinemas') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E63946] rounded-full" />
              )}
            </Link>

            {user && (
              <Link
                to="/bookings"
                className={`whitespace-nowrap flex items-center gap-1.5 transition-colors relative py-1 ${
                  isActive('/bookings') ? 'text-[#E63946] font-bold' : 'text-[#6B7280] hover:text-[#E63946]'
                }`}
              >
                <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E63946]" />
                <span>Passes</span>
                {isActive('/bookings') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E63946] rounded-full" />
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
                  ? 'bg-[#E63946] text-white border-[#E63946]'
                  : 'bg-white text-[#E63946] border-[#EAE2D5] hover:bg-[#FFF6DC]'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Live Location Button */}
            <button
              type="button"
              onClick={async () => {
                try {
                  await detectCurrentLocation();
                } catch (e) {
                  console.error(e);
                }
              }}
              disabled={detectingLocation}
              title="Fetch live location automatically"
              className="w-8 h-8 rounded-xl bg-white hover:bg-[#FFF6DC] border border-[#EAE2D5] text-[#E63946] flex items-center justify-center transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Compass className={`w-3.5 h-3.5 ${detectingLocation ? 'animate-spin' : ''}`} />
            </button>

            {/* Worldwide Location Selector Pill */}
            <button
              type="button"
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1.5 text-xs text-[#2B2B2B] bg-[#FFF9F0] hover:bg-[#FFF6DC] border border-[#EAE2D5] px-2.5 sm:px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
              title={`Change Country, State & City (${city}, ${state || ''}, ${activeCountry?.name || ''})`}
            >
              <Globe className="w-3.5 h-3.5 text-[#E63946]" aria-hidden="true" />
              <span className="font-bold text-[#2B2B2B] max-w-[80px] sm:max-w-[100px] truncate">
                {city}
              </span>
              <span className="text-[10px] font-mono text-[#D62839] font-bold hidden xs:inline">
                ({activeCountry?.currency})
              </span>
            </button>

            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#2B2B2B] bg-white hover:bg-[#FFF6DC] border border-[#EAE2D5] px-2.5 sm:px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                  title="View Profile"
                >
                  {user.role === 'admin' ? (
                    <Crown className="w-3.5 h-3.5 text-[#E5B129] shrink-0" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[#E63946] shrink-0" />
                  )}
                  <span className="font-bold text-[#2B2B2B] truncate max-w-[70px] sm:max-w-[110px]">
                    {user.username}
                  </span>
                </Link>

                <Link
                  to="/settings"
                  title="Account Settings"
                  aria-label="Account Settings"
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-[#6B7280] hover:text-[#E63946] bg-white hover:bg-[#FFF6DC] border border-[#EAE2D5] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-bold text-[#2B2B2B] hover:text-[#E63946] bg-white hover:bg-[#FFF6DC] border border-[#EAE2D5] px-3 sm:px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shadow-xs"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm font-bold bg-[#E63946] hover:bg-[#D62839] text-white px-3 sm:px-4 py-1.5 rounded-xl shadow-sm shadow-[#E63946]/20 transition-all whitespace-nowrap"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {showMobileSearch && (
          <div className="sm:hidden px-3 py-2.5 bg-[#FFF9F0] border-t border-[#EAE2D5] shadow-md">
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