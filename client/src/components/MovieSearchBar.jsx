import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, Star, Film, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import API from '../services/api';

const TRENDING_SUGGESTIONS = [
  { title: 'Laapataa Ladies', genre: 'Mystery / Drama', industry: 'Bollywood' },
  { title: 'Ratatouille', genre: 'Animation', industry: 'Hollywood' },
  { title: 'Drishyam', genre: 'Mystery / Crime', industry: 'Bollywood' },
  { title: 'Shutter Island', genre: 'Mystery / Thriller', industry: 'Hollywood' },
  { title: 'Inside Out 2', genre: 'Animation', industry: 'Hollywood' },
  { title: 'Titanic', genre: 'Romance / Drama', industry: 'Hollywood' }
];

const MovieSearchBar = ({ className = '', onSearchSubmit }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Global keyboard shortcut ('/' or 'Ctrl+K') to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync query with current URL if on Home page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam !== null) {
      setQuery(searchParam);
    }
  }, [location.search]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions when query changes (debounced)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/movies', {
          params: { search: trimmed, limit: 6 }
        });
        setSuggestions(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        console.error('Failed to fetch search suggestions:', err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const targetQuery = query.trim();
    setIsOpen(false);
    setIsMobileExpanded(false);

    if (onSearchSubmit) {
      onSearchSubmit(targetQuery);
    }

    if (location.pathname === '/') {
      const params = new URLSearchParams(location.search);
      if (targetQuery) {
        params.set('search', targetQuery);
      } else {
        params.delete('search');
      }
      navigate(`/?${params.toString()}`);
    } else {
      navigate(`/?search=${encodeURIComponent(targetQuery)}`);
    }
  };

  const handleSelectMovie = (movie) => {
    setIsOpen(false);
    setIsMobileExpanded(false);
    navigate(`/movies/${movie._id}`);
  };

  const handleSelectSuggestionQuery = (term) => {
    setQuery(term);
    setIsOpen(false);
    setIsMobileExpanded(false);
    if (onSearchSubmit) {
      onSearchSubmit(term);
    }
    navigate(`/?search=${encodeURIComponent(term)}`);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectMovie(suggestions[selectedIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Container */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies, cast, genres (e.g. Lapata Ladies, Ratatouille)..."
            className="w-full bg-[#11141c] hover:bg-[#141824] focus:bg-[#151926] text-white text-xs sm:text-sm pl-10 pr-16 py-2 rounded-xl border border-amber-500/25 focus:border-amber-400 focus:outline-none transition-all placeholder:text-slate-500 shadow-inner"
          />

          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {loading && (
              <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin mr-1" />
            )}

            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSuggestions([]);
                  inputRef.current?.focus();
                  if (location.pathname === '/') {
                    const params = new URLSearchParams(location.search);
                    params.delete('search');
                    navigate(`/?${params.toString()}`);
                  }
                }}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800/80 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="hidden sm:inline-block text-[10px] font-mono font-medium text-slate-500 bg-slate-800/60 border border-slate-700/60 px-1.5 py-0.5 rounded">
                /
              </span>
            )}
          </div>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#0e121a] border border-amber-500/30 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden z-50 backdrop-blur-xl animate-in fade-in duration-150 max-h-[420px] overflow-y-auto">
          {/* If user is typing and has matching suggestions */}
          {query.trim() && suggestions.length > 0 && (
            <div>
              <div className="px-3.5 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 flex items-center justify-between">
                <span>Matching Movies ({suggestions.length})</span>
                <span className="text-[10px] text-amber-400/80 lowercase">click or press enter</span>
              </div>
              <div className="p-1.5 divide-y divide-slate-800/40">
                {suggestions.map((movie, idx) => (
                  <button
                    key={movie._id}
                    type="button"
                    onClick={() => handleSelectMovie(movie)}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                      selectedIndex === idx
                        ? 'bg-amber-500/15 text-white'
                        : 'hover:bg-[#161b26] text-slate-200'
                    }`}
                  >
                    {/* Poster Thumbnail */}
                    <div className="w-10 h-14 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700/60 relative">
                      {movie.posterUrl ? (
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&auto=format&fit=crop&q=80';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <Film className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-white truncate">
                          {movie.title}
                        </span>
                        {movie.industry && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 ${
                              movie.industry === 'Bollywood'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {movie.industry}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 truncate">
                        <span>
                          {movie.releaseDate
                            ? new Date(movie.releaseDate).getFullYear()
                            : '2024'}
                        </span>
                        <span>•</span>
                        <span>{movie.duration}m</span>
                        <span>•</span>
                        <span className="truncate">
                          {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    {movie.rating && (
                      <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/25 px-2 py-1 rounded-lg text-amber-400 font-bold text-xs shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{Number(movie.rating).toFixed(1)}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* View all results link */}
              <div className="p-2 border-t border-slate-800 bg-[#0a0d13]">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View all results for &quot;{query}&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* If user is typing and no suggestions found */}
          {query.trim() && !loading && suggestions.length === 0 && (
            <div className="p-6 text-center space-y-2">
              <Film className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-white">
                No movies found for &quot;{query}&quot;
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Try searching by title (e.g. Lapata Ladies, Titanic), genre (Animation, Mystery), or actors.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                {TRENDING_SUGGESTIONS.slice(0, 3).map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelectSuggestionQuery(item.title)}
                    className="text-[11px] bg-[#141822] hover:bg-[#1d2332] text-amber-300 border border-amber-500/20 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* When query is empty, show Quick Discovery / Trending */}
          {!query.trim() && (
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trending & Quick Searches</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {TRENDING_SUGGESTIONS.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelectSuggestionQuery(item.title)}
                    className="text-left p-2 rounded-xl bg-[#131722] hover:bg-[#1c2230] border border-slate-800 hover:border-amber-500/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.genre}</div>
                    </div>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                        item.industry === 'Bollywood'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-blue-500/15 text-blue-400'
                      }`}
                    >
                      {item.industry}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearchBar;
