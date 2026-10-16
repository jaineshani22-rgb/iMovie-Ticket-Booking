import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, Ticket, LogOut, User, ShieldCheck } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-600/30 group-hover:scale-105 transition">
            <Film className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            i<span className="text-rose-500">Movies</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition ${
              isActive('/') ? 'text-rose-500' : 'text-slate-300 hover:text-white'
            }`}
          >
            Movies
          </Link>

          {user ? (
            <>
              <Link
                to="/bookings"
                className={`flex items-center gap-1.5 text-sm font-medium transition ${
                  isActive('/bookings') ? 'text-rose-500' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Ticket className="w-4 h-4" />
                My Bookings
              </Link>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                <div className="flex items-center gap-2 text-sm text-slate-200 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                  {user.role === 'admin' ? (
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  ) : (
                    <User className="w-4 h-4 text-rose-400" />
                  )}
                  <span className="font-medium">{user.username}</span>
                  {user.role === 'admin' && (
                    <span className="text-[10px] uppercase tracking-wider bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                      Admin
                    </span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg shadow-md shadow-rose-600/20 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;