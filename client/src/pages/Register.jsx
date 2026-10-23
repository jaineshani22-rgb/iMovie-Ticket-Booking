import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, User, Mail, Lock, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Check, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocationContext } from '../context/LocationContext';

const Register = () => {
  const { register, googleLogin } = useAuth();
  const { country, city } = useLocationContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Return path from location state or default to '/'
  const returnUrl = location.state?.from?.pathname
    ? `${location.state.from.pathname}${location.state.from.search || ''}`
    : '/';

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-teal-400', text: 'text-teal-400' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-400', text: 'text-emerald-400' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim()) {
      setError('Please provide your full member name.');
      return;
    }

    // Strict email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address (e.g. name@example.com).');
      return;
    }

    if (password.length < 6) {
      setError('Password is too weak. It must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your confirm password field.');
      return;
    }

    try {
      setLoading(true);
      await register(username.trim(), email.trim(), password, { country, city });
      setSuccess('VIP Account successfully created! Redirecting...');
      setTimeout(() => {
        navigate(returnUrl, { replace: true });
      }, 700);
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.message?.toLowerCase().includes('already exists')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Network/server connection error. Please verify your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      // Standard Google OAuth simulated payload for direct preview access
      const defaultEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : 'google.patron@imovies.com';
      const defaultName = username.trim() || 'Google VIP Patron';
      await googleLogin({
        email: defaultEmail,
        name: defaultName,
        googleId: 'g_' + Date.now()
      });
      navigate(returnUrl, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-[#12151d] border border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6 cinema-vignette">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <Film className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-extrabold text-white font-['Cinzel',serif]">Join VIP Membership</h2>
          <p className="text-xs text-slate-400">Unlock luxury seat reservations and instant digital passes</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3.5 rounded-xl animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3.5 rounded-xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Google Quick Sign-Up */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-[#161a24] hover:bg-[#1e2330] border border-slate-700/80 text-white font-semibold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2.5 shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-slate-800" />
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Or email registration</span>
          <div className="h-[1px] flex-1 bg-slate-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name / Member Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tanishq Pardeshi"
                className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none shadow-inner transition-colors"
              />
            </div>
          </div>

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
                className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none shadow-inner transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              {password && (
                <span className={`text-[10px] font-bold ${strength.text}`}>
                  {strength.label}
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-xl pl-10 pr-10 py-2 text-xs sm:text-sm text-white focus:outline-none shadow-inner transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Visual Strength Meter */}
            {password && (
              <div className="mt-1.5 space-y-1">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span className={`flex items-center gap-1 ${password.length >= 6 ? 'text-emerald-400' : ''}`}>
                    <Check className="w-2.5 h-2.5" /> 6+ chars
                  </span>
                  <span className={`flex items-center gap-1 ${/[0-9]/.test(password) ? 'text-emerald-400' : ''}`}>
                    <Check className="w-2.5 h-2.5" /> Numbers
                  </span>
                  <span className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-emerald-400' : ''}`}>
                    <Check className="w-2.5 h-2.5" /> Special
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confirm Password</label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full bg-[#0a0c10] border rounded-xl pl-10 pr-10 py-2 text-xs sm:text-sm text-white focus:outline-none shadow-inner transition-colors ${
                  confirmPassword && confirmPassword !== password
                    ? 'border-rose-500'
                    : confirmPassword && confirmPassword === password
                    ? 'border-emerald-500'
                    : 'border-slate-700/80 focus:border-amber-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p className="text-[11px] text-rose-400 mt-1">Passwords do not match.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link
            to="/login"
            state={{ from: location.state?.from }}
            className="text-amber-400 hover:text-amber-300 font-bold"
          >
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;