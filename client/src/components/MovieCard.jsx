import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Ticket, MapPin, Film } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const [imgError, setImgError] = useState(false);
  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];

  const defaultPoster =
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';

  return (
    <div className="group bg-[#12151d] border border-amber-500/15 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-lg shadow-black/40 hover:shadow-amber-500/5">
      {/* Poster Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0c10]">
        {!imgError ? (
          <img
            src={movie.posterUrl || defaultPoster}
            alt={movie.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-[#12151d]/20 to-transparent pointer-events-none" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-[#0c0e14]/85 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold text-amber-400 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
          <span className="font-mono tabular-nums">{movie.rating || 8.5}</span>
        </div>

        {/* Theater Tag */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[11px] font-medium text-amber-400/90 flex items-center gap-1.5 drop-shadow">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{movie.theater || 'iMovies IMAX Laser'}</span>
          </p>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>

          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1.5 flex-wrap">
            <span>{genres.slice(0, 2).join(', ')}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              <span className="font-mono tabular-nums">{movie.duration || 120} min</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
            {movie.description || 'Experience this feature presentation in premium auditorium seating with Dolby Atmos.'}
          </p>
        </div>

        <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Reserved from</span>
            <span className="text-base font-extrabold text-white font-mono tabular-nums">
              ₹{movie.ticketPrice || 250}
            </span>
          </div>

          <Link
            to={`/movies/${movie._id}`}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-lg shadow-md shadow-amber-500/10 transition-all duration-200"
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