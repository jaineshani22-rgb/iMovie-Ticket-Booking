import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
            <Film className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Sign in to book seats and manage your tickets</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-rose-600/25 transition text-sm"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* One-Click Demo Login Helper */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <p className="text-[11px] text-slate-400 text-center font-medium">Quick Seeded Demo Accounts:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoCredentials('user@imovies.com', 'user123')}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 py-1.5 rounded-lg transition"
            >
              Fill Customer Login
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('admin@imovies.com', 'admin123')}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-amber-400 py-1.5 rounded-lg transition"
            >
              Fill Admin Login
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-rose-400 hover:text-rose-300 font-semibold">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;