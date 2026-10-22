import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Building,
  Star,
  Film,
  Clock,
  Calendar,
  CheckCircle,
  Navigation,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Ticket,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';
import {
  LOCATION_HIERARCHY,
  CITY_COORDINATES,
  calculateDistanceKm,
  findClosestLocation
} from '../data/locations';
import API from '../services/api';

const NearbyCinemaFinder = ({ className = '', defaultExpandedCinema = true }) => {
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
    setSelectedCinema,
    formatPrice
  } = useLocationContext();

  const [locating, setLocating] = useState(false);
  const [geoStatus, setGeoStatus] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [cinemaSearch, setCinemaSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Showtimes cache keyed by cinemaId
  const [cinemaSchedules, setCinemaSchedules] = useState({});
  const [loadingSchedules, setLoadingSchedules] = useState({});
  const [expandedCinemas, setExpandedCinemas] = useState({});

  // 7 available days starting from today
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { dateStr, label, formatted };
  });

  // Browser Geolocation API call with India preselection and reverse geocoding
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus({
        type: 'error',
        message: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    setLocating(true);
    setGeoStatus({
      type: 'info',
      message: 'Accessing GPS coordinates to find your nearest cinema theatres...'
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserCoords({ lat, lng });

        let best = findClosestLocation(lat, lng);

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);
          if (res.ok) {
            const geoData = await res.json();
            const addr = geoData.address || {};
            const code = (addr.country_code || '').toUpperCase();
            const revCity = addr.city || addr.town || addr.village || addr.suburb || best.city;
            const revState = addr.state || best.state;

            if (code === 'IN') {
              best.country = 'IN';
              if (revState) best.state = revState;
              if (revCity) best.city = revCity;
            } else if (code) {
              const matched = LOCATION_HIERARCHY.find((c) => c.code === code);
              if (matched) {
                best.country = code;
                if (revState) best.state = revState;
                if (revCity) best.city = revCity;
              }
            }
          }
        } catch {
          // mathematical fallback
        }

        setCountry(best.country);
        if (best.state) setState(best.state);
        if (best.city) setCity(best.city);
        setLocating(false);

        setGeoStatus({
          type: 'success',
          message: `Location verified! Nearest cinema cluster found in ${best.city}, ${best.state} (${best.country}).`
        });
      },
      (error) => {
        setLocating(false);
        let errorMsg = 'Unable to retrieve your location.';
        if (error.code === 1) {
          errorMsg = 'Location permission denied. Please choose your country, state, and city from the selectors below.';
        } else if (error.code === 2) {
          errorMsg = 'Location information is currently unavailable.';
        } else if (error.code === 3) {
          errorMsg = 'Location request timed out. Please try again.';
        }
        setGeoStatus({ type: 'error', message: errorMsg });
      },
      { timeout: 9000, enableHighAccuracy: false, maximumAge: 300000 }
    );
  };

  // Fetch showtimes for a cinema
  const fetchSchedule = async (cinemaId) => {
    if (cinemaSchedules[cinemaId] || loadingSchedules[cinemaId]) return;
    try {
      setLoadingSchedules((prev) => ({ ...prev, [cinemaId]: true }));
      const { data } = await API.get(`/cinemas/${cinemaId}/showtimes`);
      setCinemaSchedules((prev) => ({ ...prev, [cinemaId]: data.schedule || [] }));
    } catch (err) {
      console.error(`Failed to load showtimes for cinema ${cinemaId}:`, err);
    } finally {
      setLoadingSchedules((prev) => ({ ...prev, [cinemaId]: false }));
    }
  };

  // Preload schedule for first cinema
  useEffect(() => {
    if (cinemas && cinemas.length > 0) {
      cinemas.slice(0, 2).forEach((c) => {
        fetchSchedule(c._id);
        if (defaultExpandedCinema) {
          setExpandedCinemas((prev) => ({ ...prev, [c._id]: true }));
        }
      });
    }
  }, [cinemas]);

  const toggleExpand = (cinemaId) => {
    setExpandedCinemas((prev) => {
      const nextState = !prev[cinemaId];
      if (nextState) {
        fetchSchedule(cinemaId);
      }
      return { ...prev, [cinemaId]: nextState };
    });
  };

  // Distance calculator helper
  const getCinemaDistanceKm = (cin) => {
    if (!userCoords) return null;
    const cityCoord = CITY_COORDINATES[cin.city];
    if (!cityCoord) return null;
    return calculateDistanceKm(userCoords.lat, userCoords.lng, cityCoord.lat, cityCoord.lng);
  };

  // Filter cinemas by search and format
  const filteredCinemas = cinemas.filter((c) => {
    const matchesSearch =
      !cinemaSearch ||
      c.name.toLowerCase().includes(cinemaSearch.toLowerCase()) ||
      c.address.toLowerCase().includes(cinemaSearch.toLowerCase());

    const matchesFormat =
      selectedFormat === 'All' ||
      (c.formats && c.formats.some((f) => f.toLowerCase().includes(selectedFormat.toLowerCase())));

    return matchesSearch && matchesFormat;
  });

  const handleSelectShowtime = (movie, cinema, time) => {
    setSelectedCinema(cinema);
    navigate(`/movies/${movie._id}?showDate=${selectedDate}&showTime=${encodeURIComponent(time)}`);
  };

  const statesList = activeCountry?.states || [];
  const citiesList = currentState?.cities || [];

  return (
    <div className={`bg-[#0d111a] border border-amber-500/20 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl shadow-black/80 ${className}`}>
      {/* Top Header Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-md">
            <Compass className="w-3.5 h-3.5" />
            <span>Real-Time Proximity Radar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Cinzel',serif] tracking-tight">
            Find Nearby Cinemas & Live Showtimes
          </h2>
          <p className="text-xs text-slate-400">
            Select Country → State → City or use your device location to find nearby luxury auditoriums and tickets.
          </p>
        </div>

        {/* Location Controls: Use Current Location Button & Hierarchical Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={locating}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500/25 via-cyan-500/20 to-amber-500/20 hover:from-teal-500/35 hover:to-amber-500/30 border border-[#00F2FE]/40 text-[#00F2FE] hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? 'Locating...' : 'Use Current Location'}</span>
          </button>

          {/* Hierarchical Country, State, and City Selectors */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#141822] border border-slate-700/80 p-1.5 rounded-xl text-xs">
            {/* Country Selector */}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold px-1.5 py-1 focus:outline-none cursor-pointer"
              title="Select Country"
            >
              {LOCATION_HIERARCHY.map((c) => (
                <option key={c.code} value={c.code} className="bg-[#12151d] text-white">
                  {c.flag} {c.name} ({c.currency})
                </option>
              ))}
            </select>

            <span className="text-slate-600">/</span>

            {/* State / Province Selector */}
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-transparent text-slate-300 font-medium px-1.5 py-1 focus:outline-none cursor-pointer max-w-[120px] truncate"
              title="Select State / Province"
            >
              {statesList.map((st) => (
                <option key={st.name} value={st.name} className="bg-[#12151d] text-white">
                  {st.name}
                </option>
              ))}
            </select>

            <span className="text-slate-600">/</span>

            {/* City Selector */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent text-amber-400 font-bold px-1.5 py-1 focus:outline-none cursor-pointer max-w-[120px] truncate"
              title="Select City"
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

      {/* Geolocation Status Feedback Banner */}
      {geoStatus && (
        <div
          className={`flex items-start sm:items-center gap-2.5 p-3 rounded-xl text-xs animate-in fade-in duration-200 ${
            geoStatus.type === 'success'
              ? 'bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE]'
              : geoStatus.type === 'error'
              ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
              : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
          }`}
        >
          {geoStatus.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-[#00F2FE]" />
          ) : geoStatus.type === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          ) : (
            <Compass className="w-4 h-4 shrink-0 animate-spin text-amber-400" />
          )}
          <span className="font-medium">{geoStatus.message}</span>
        </div>
      )}

      {/* Date & Search Bar Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Date Selector Pills */}
        <div className="md:col-span-8 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {availableDates.map((d) => {
            const isSelected = selectedDate === d.dateStr;
            return (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => setSelectedDate(d.dateStr)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-[#141822] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>{d.label}</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                  ({d.formatted})
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Input */}
        <div className="md:col-span-4 relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter theatres by name or street..."
            value={cinemaSearch}
            onChange={(e) => setCinemaSearch(e.target.value)}
            className="w-full bg-[#141822] border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Cinema Listings with Live Showtimes */}
      {loadingCinemas ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 bg-[#141824] rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : filteredCinemas.length === 0 ? (
        <div className="bg-[#12151f] border border-slate-800 rounded-2xl p-8 text-center space-y-2">
          <Building className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">No Cinema Theatres Found in {city}</p>
          <p className="text-xs text-slate-400">
            Try switching cities or click "Use Current Location" to discover auditoriums near your coordinates.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCinemas.map((cinema) => {
            const isExpanded = Boolean(expandedCinemas[cinema._id]);
            const schedule = cinemaSchedules[cinema._id] || [];
            const isScheduleLoading = Boolean(loadingSchedules[cinema._id]);
            const distance = getCinemaDistanceKm(cinema);

            return (
              <div
                key={cinema._id}
                className="bg-[#121622] border border-slate-800/90 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-200"
              >
                {/* Cinema Summary Header */}
                <div
                  onClick={() => toggleExpand(cinema._id)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#161b2a] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-extrabold text-white tracking-wide flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-amber-400" />
                        {cinema.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#00F2FE] bg-[#00F2FE]/10 border border-[#00F2FE]/25 px-2 py-0.5 rounded-md">
                        {cinema.chain}
                      </span>
                      {distance !== null && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-md">
                          📍 ~{distance} km away
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{cinema.address}</span>
                      <span className="text-slate-600">·</span>
                      <span className="font-mono text-slate-300">{cinema.screens} Screens</span>
                    </p>
                  </div>

                  {/* Rating, Price & Expand Button */}
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-[#0d1017] border border-amber-500/25 px-2.5 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                      <span>{cinema.rating || 4.9}</span>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-500 block uppercase font-semibold">Tickets</span>
                      <span className="text-xs font-bold text-white font-mono">
                        {cinema.currencySymbol}{cinema.basePrice}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Formats and Amenities Pill Bar */}
                <div className="px-4 sm:px-5 py-2.5 bg-[#0e121c] border-t border-b border-slate-800/60 flex flex-wrap items-center gap-1.5">
                  {(cinema.formats || []).map((fmt) => (
                    <span
                      key={fmt}
                      className="text-[10px] font-semibold text-slate-300 bg-[#171c28] border border-slate-700/60 px-2 py-0.5 rounded-md"
                    >
                      {fmt}
                    </span>
                  ))}
                  <span className="text-slate-600 text-xs">|</span>
                  {(cinema.amenities || []).slice(0, 3).map((am) => (
                    <span key={am} className="text-[10px] text-slate-400 flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 text-amber-400" />
                      <span>{am}</span>
                    </span>
                  ))}
                </div>

                {/* Expanded Section: Movies & Interactive Showtimes */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-[#0f131d] space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-amber-400" />
                        Today's Showtimes at {cinema.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Date: <span className="text-amber-400 font-semibold">{selectedDate}</span>
                      </span>
                    </div>

                    {isScheduleLoading ? (
                      <div className="py-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        <span>Loading verified showtimes...</span>
                      </div>
                    ) : schedule.length === 0 ? (
                      <p className="text-xs text-slate-500 py-3 text-center">
                        No movie screenings scheduled for the selected date. Please pick another day.
                      </p>
                    ) : (
                      <div className="divide-y divide-slate-800/80">
                        {schedule.map(({ movie, showtimes, price }) => (
                          <div
                            key={movie._id}
                            className="py-3.5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3"
                          >
                            {/* Movie Info */}
                            <div className="flex items-center gap-3">
                              <img
                                src={movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200'}
                                alt={movie.title}
                                referrerPolicy="no-referrer"
                                className="w-12 h-16 object-cover rounded-lg shrink-0 border border-slate-800"
                              />
                              <div className="space-y-1">
                                <h4 className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                                  {movie.title}
                                </h4>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                  <span>{movie.duration}m</span>
                                  <span>·</span>
                                  <span className="text-amber-400/90 font-medium">
                                    {Array.isArray(movie.genre) ? movie.genre.slice(0, 2).join(', ') : movie.genre}
                                  </span>
                                  <span>·</span>
                                  <span className="text-amber-400 font-mono flex items-center gap-1 font-bold">
                                    ★ {movie.rating || 8.5}
                                    {movie.votes && (
                                      <span className="text-[10px] text-slate-400 font-normal">
                                        ({movie.votes >= 1000 ? `${(movie.votes / 1000).toFixed(1)}k` : movie.votes})
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Showtime Buttons */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {(showtimes || ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM']).map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => handleSelectShowtime(movie, cinema, time)}
                                  className="group flex flex-col items-center bg-[#171c28] hover:bg-amber-500 hover:text-slate-950 border border-slate-700/80 hover:border-amber-400 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm text-center"
                                  title={`Book ${movie.title} at ${time}`}
                                >
                                  <span className="text-xs font-bold text-white group-hover:text-slate-950 font-mono">
                                    {time}
                                  </span>
                                  <span className="text-[9px] text-slate-400 group-hover:text-slate-900 font-medium">
                                    4K Laser
                                  </span>
                                </button>
                              ))}

                              <button
                                type="button"
                                onClick={() => handleSelectShowtime(movie, cinema, showtimes[0] || '06:30 PM')}
                                className="inline-flex items-center gap-1 bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all ml-1 cursor-pointer"
                              >
                                <Ticket className="w-3 h-3" />
                                <span>Book Seats</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NearbyCinemaFinder;
