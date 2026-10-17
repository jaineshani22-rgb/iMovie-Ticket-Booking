import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Bookings from './pages/Bookings';
import Cinemas from './pages/Cinemas';
import Profile from './pages/Profile';

const App = () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <div className="min-h-screen bg-[#0b0d11] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cinemas" element={<Cinemas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute>
                      <Bookings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <footer className="border-t border-amber-500/10 py-8 bg-[#090b0e] text-xs text-slate-500 text-center">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-['Cinzel',serif] tracking-wider text-slate-400">
                  i<span className="text-amber-400">Movies</span> Worldwide Real-Time Movie Ticket Booking
                </p>
                <p>© {new Date().getFullYear()} iMovies. 4K IMAX Laser · Dolby Atmos · Reserve Suites · Sandbox Verified.</p>
              </div>
            </footer>
          </div>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
};

export default App;