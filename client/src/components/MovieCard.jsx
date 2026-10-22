import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Ticket, MapPin, Film, Play, Calendar } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';

const MovieCard = ({ movie, onWatchTrailer }) => {
  const defaultPoster =
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';
  const [posterSrc, setPosterSrc] = useState(movie.posterUrl || defaultPoster);
  const [imgError, setImgError] = useState(false);
  const { formatPrice, selectedCinema } = useLocationContext();

  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];

  const releaseYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '2024';
  const isUpcoming = movie.category === 'upcoming';

  return (
    <div className="group bg-[#12151d] border border-amber-500/15 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-lg shadow-black/40 hover:shadow-amber-500/5">
      {/* Poster Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0c10]">
        {!imgError ? (
          <img
            src={posterSrc}
            alt={movie.title}
            referrerPolicy="no-referrer"
            onError={() => {
              if (posterSrc !== defaultPoster) {
                setPosterSrc(defaultPoster);
                return;
              }
              setImgError(true);
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12151d] via-[#1a1f2b] to-[#0d1017] p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Film className="w-6 h-6 stroke-[1.8]" />
            </div>
            <p className="text-xs font-bold text-slate-200 line-clamp-2">{movie.title}</p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-[#12151d]/25 to-transparent pointer-events-none" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-[#0c0e14]/85 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold text-amber-400 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
          <span className="font-mono tabular-nums">{movie.rating || 8.5}</span>
        </div>

        {/* Industry and Category Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {movie.industry && (
            <span
              className={`text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md shadow-md backdrop-blur-md ${
                movie.industry.toLowerCase() === 'bollywood'
                  ? 'bg-emerald-500/90 text-slate-950 font-bold'
                  : 'bg-amber-500/90 text-slate-950 font-bold'
              }`}
            >
              {movie.industry}
            </span>
          )}
          {isUpcoming && (
            <span className="bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
              Upcoming
            </span>
          )}
        </div>

        {/* Trailer Watch Overlay Button */}
        {movie.trailerKey && onWatchTrailer && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWatchTrailer(movie);
            }}
            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/20 hover:border-amber-400 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-xl backdrop-blur-sm transform scale-90 group-hover:scale-100"
            title="Watch 4K Trailer"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
        )}

        {/* Theater Tag */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[11px] font-medium text-amber-400/95 flex items-center gap-1.5 drop-shadow">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{selectedCinema?.name || movie.theater || 'iMovies IMAX Laser'}</span>
          </p>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>

          {/* Unboxed Metadata Line */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1.5 flex-wrap">
            <span>{genres.slice(0, 2).join(', ')}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              <span className="font-mono tabular-nums">{movie.duration || 120} min</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-slate-400">{releaseYear}</span>
          </div>

          <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
            {movie.description || 'Experience this feature presentation in premium auditorium seating with Dolby Atmos.'}
          </p>
        </div>

        <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">
              Reserved from
            </span>
            <span className="text-base font-extrabold text-white font-mono tabular-nums">
              {formatPrice(movie.ticketPrice || 250)}
            </span>
          </div>

          <Link
            to={`/movies/${movie._id}`}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-amber-500/10 transition-all duration-200"
          >
            <Ticket className="w-3.5 h-3.5" />
            Select Seats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;