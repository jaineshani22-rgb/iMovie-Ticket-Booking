import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  MapPin,
  Star,
  Film,
  Sparkles,
  Clock,
  Compass,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useLocationContext, COUNTRIES } from '../context/LocationContext';
import NearbyCinemaFinder from '../components/NearbyCinemaFinder';

const Cinemas = () => {
  const navigate = useNavigate();
  const {
    country,
    state,
    city,
    cinemas,
    loadingCinemas,
    activeCountry,
    currentState,
    setCountry,
    setState,
    setCity,
    formatPrice,
    setSelectedCinema,
    detectCurrentLocation,
    detectingLocation,
    locationStatus
  } = useLocationContext();

  const [activeFormatFilter, setActiveFormatFilter] = useState('All');

  const FORMATS = ['All', 'IMAX Laser', 'Dolby Cinema', 'VIP Recliners', '4DX', 'ScreenX'];

  const filteredCinemas = cinemas.filter((c) => {
    if (activeFormatFilter === 'All') return true;
    return c.formats && c.formats.some((f) => f.toLowerCase().includes(activeFormatFilter.toLowerCase()));
  });

  const statesList = activeCountry?.states || [];
  const citiesList = currentState?.cities || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Geolocation Nearby Cinema Finder & Showtimes */}
      <NearbyCinemaFinder />

      {/* Header for All Theatres Directory */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-500/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Global Luxury Exhibition Network
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Cinzel',serif]">
            Worldwide Cinema Theatres
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Explore world-class auditoriums featuring laser projection, immersive 12-channel Dolby Atmos sound, and motorized leather recliners in {city}, {state ? `${state}, ` : ''}{activeCountry?.name}.
          </p>
        </div>

        {/* Quick Country Switcher & Use Current Location */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-stretch md:self-auto">
          <button
            type="button"
            onClick={async () => {
              try {
                await detectCurrentLocation();
              } catch {
                // handled in status
              }
            }}
            disabled={detectingLocation}
            className="flex items-center justify-center gap-2 bg-[#00F2FE]/15 hover:bg-[#00F2FE]/25 border border-[#00F2FE]/40 text-[#00F2FE] hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
            title="Automatically detect nearby cinema city"
          >
            <Compass className={`w-3.5 h-3.5 ${detectingLocation ? 'animate-spin' : ''}`} />
            <span>{detectingLocation ? 'Locating...' : 'Use My Current Location'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#12151d] border border-slate-800 p-1.5 rounded-2xl text-xs">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-transparent text-white font-semibold px-1.5 py-1 focus:outline-none cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-[#12151d] text-white">
                  {c.code} {c.name}
                </option>
              ))}
            </select>
            <span className="text-slate-600">|</span>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-transparent text-slate-300 font-medium px-1.5 py-1 focus:outline-none cursor-pointer max-w-[110px] truncate"
            >
              {statesList.map((st) => (
                <option key={st.name} value={st.name} className="bg-[#12151d] text-white">
                  {st.name}
                </option>
              ))}
            </select>
            <span className="text-slate-600">|</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent text-amber-400 font-semibold px-1.5 py-1 focus:outline-none cursor-pointer max-w-[110px] truncate"
            >
              {citiesList.map((ct) => (
                <option key={ct} value={ct} className="bg-[#12151d] text-white">
                  {ct}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {locationStatus?.message && (
        <div className="bg-[#00F2FE]/10 border border-[#00F2FE]/25 text-[#00F2FE] text-xs px-4 py-2 rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{locationStatus.message} — displaying nearby cinemas in {city}.</span>
        </div>
      )}

      {/* Format Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {FORMATS.map((fmt) => (
          <button
            key={fmt}
            type="button"
            onClick={() => setActiveFormatFilter(fmt)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFormatFilter === fmt
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-[#10131b] border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Cinema Listings */}
      {loadingCinemas ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-64 rounded-3xl bg-[#12151d] animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : filteredCinemas.length === 0 ? (
        <div className="bg-[#12151d]/70 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Building className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white font-['Cinzel',serif]">No Theatres in Selected Filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try choosing a different format filter or switch to another city in {activeCountry.name}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCinemas.map((cin) => (
            <div
              key={cin._id}
              className="bg-gradient-to-br from-[#12151d] via-[#151924] to-[#10131a] border border-amber-500/20 hover:border-amber-500/40 rounded-3xl p-6 space-y-5 shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-md">
                      {cin.city}, {cin.country}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{cin.screens} Auditoriums</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{cin.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{cin.address}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-[#0d1017] border border-amber-500/30 px-2.5 py-1 rounded-lg shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                  <span className="font-mono">{cin.rating || 4.9}</span>
                </div>
              </div>

              {/* Formats Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cin.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="text-[11px] font-semibold text-slate-200 bg-[#171b26] border border-slate-700/80 px-2.5 py-1 rounded-md"
                  >
                    {fmt}
                  </span>
                ))}
              </div>

              {/* Amenities */}
              <div className="border-t border-slate-800/80 pt-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">
                  Auditorium Features
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {cin.amenities.map((am) => (
                    <div key={am} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Tickets From</span>
                  <span className="text-base font-extrabold text-white font-mono">
                    {cin.currencySymbol}
                    {cin.basePrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-amber-500/15 transition-all"
                >
                  <Film className="w-3.5 h-3.5" />
                  View Screenings Here
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cinemas;
