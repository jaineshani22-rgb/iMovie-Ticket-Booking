import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Bookings from './pages/Bookings';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0b0d11] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
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
            </Routes>
          </main>
          <footer className="border-t border-amber-500/10 py-8 bg-[#090b0e] text-xs text-slate-500 text-center">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-['Cinzel',serif] tracking-wider text-slate-400">
                i<span className="text-amber-400">Movies</span> VIP Cinema Experience
              </p>
              <p>© {new Date().getFullYear()} iMovies. 4K IMAX Laser · Dolby Atmos · Reserve Suites.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;