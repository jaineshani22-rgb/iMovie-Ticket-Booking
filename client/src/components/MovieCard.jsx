import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Calendar, Ticket } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : '2026';

  return (
    <div className="group bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col shadow-xl">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={
            movie.posterUrl ||
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80'
          }
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/70 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          {movie.rating || 8.5}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {genres.slice(0, 3).map((g, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold bg-rose-600/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm"
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            {movie.description || 'Experience this blockbuster in stunning IMAX laser projection and Dolby Atmos sound.'}
          </p>

          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              {movie.duration || 120} min
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              {releaseYear}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Tickets from</span>
            <span className="text-base font-extrabold text-white">
              ₹{movie.ticketPrice || 250}
            </span>
          </div>

          <Link
            to={`/movies/${movie._id}`}
            className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-rose-600/20 transition"
          >
            <Ticket className="w-3.5 h-3.5" />
            Book Seats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;