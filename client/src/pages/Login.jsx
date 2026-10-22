import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, Mail, Lock, AlertCircle, ArrowRight, KeyRound, CheckCircle2, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, forgotPassword, resetPassword, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot / Reset Password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState(1); // 1: Request token, 2: Reset password
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  // Return path from location state or default to '/'
  const returnUrl = location.state?.from?.pathname
    ? `${location.state.from.pathname}${location.state.from.search || ''}`
    : '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate(returnUrl, { replace: true });
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Incorrect email or password. Please verify your credentials and try again.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Network/server connection error. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const defaultEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : 'google.patron@imovies.com';
      await googleLogin({
        email: defaultEmail,
        name: 'VIP Google Guest',
        googleId: 'g_' + Date.now()
      });
      navigate(returnUrl, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  const handleRequestResetToken = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');
    try {
      setForgotLoading(true);
      const data = await forgotPassword(forgotEmail);
      if (data.resetToken) {
        setResetToken(data.resetToken);
        setForgotMessage(`Reset token generated: ${data.resetToken}`);
        setForgotStep(2);
      } else {
        setForgotMessage(data.message || 'Reset instructions sent.');
      }
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Failed to process reset request.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleConfirmResetPassword = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');
    try {
      setForgotLoading(true);
      const data = await resetPassword(resetToken, newPassword);
      setSuccess(data.message || 'Password successfully updated! Please sign in with your new password.');
      setShowForgotModal(false);
      setPassword('');
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-[#12151d] border border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6 cinema-vignette relative">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <Film className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-extrabold text-white font-['Cinzel',serif]">VIP Lounge Sign In</h2>
          <p className="text-xs text-slate-400">Access your reserved seats and digital booking passes</p>
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

        {/* Google Quick Sign-In */}
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
          <span>Sign In with Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-slate-800" />
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Or email & password</span>
          <div className="h-[1px] flex-1 bg-slate-800" />
        </div>

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
                className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none shadow-inner transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotStep(1);
                  setForgotError('');
                  setForgotMessage('');
                  setShowForgotModal(true);
                }}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Lounge'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Quick Seeded Demo Accounts */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <p className="text-[11px] text-slate-400 text-center font-semibold uppercase tracking-wider">
            One-Click Demo Credentials:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoCredentials('user@imovies.com', 'user123')}
              className="text-xs bg-[#161a24] hover:bg-[#1f2432] border border-amber-500/20 text-slate-200 py-2 rounded-lg transition-colors font-medium cursor-pointer"
            >
              Customer Account
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('admin@imovies.com', 'admin123')}
              className="text-xs bg-[#161a24] hover:bg-[#1f2432] border border-amber-500/30 text-amber-400 py-2 rounded-lg transition-colors font-medium cursor-pointer"
            >
              Admin Manager
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          New to iMovies?{' '}
          <Link
            to="/register"
            state={{ from: location.state?.from }}
            className="text-amber-400 hover:text-amber-300 font-bold"
          >
            Create VIP account
          </Link>
        </p>

        {/* Forgot / Reset Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-sm bg-[#12151d] border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4 relative">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Reset VIP Password</h3>
                  <p className="text-[11px] text-slate-400">
                    {forgotStep === 1 ? 'Enter your email for reset instructions' : 'Set your new secure password'}
                  </p>
                </div>
              </div>

              {forgotError && (
                <div className="text-[11px] bg-rose-500/10 border border-rose-500/30 text-rose-400 p-2.5 rounded-lg flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{forgotError}</span>
                </div>
              )}

              {forgotMessage && (
                <div className="text-[11px] bg-amber-500/10 border border-amber-500/30 text-amber-300 p-2.5 rounded-lg break-all">
                  {forgotMessage}
                </div>
              )}

              {forgotStep === 1 ? (
                <form onSubmit={handleRequestResetToken} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Registered Email</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="user@imovies.com"
                      className="w-full bg-[#0a0c10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    {forgotLoading ? 'Processing...' : 'Get Reset Token'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleConfirmResetPassword} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Reset Token</label>
                    <input
                      type="text"
                      required
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      placeholder="Token from step 1"
                      className="w-full bg-[#0a0c10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">New Password (6+ chars)</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0a0c10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    {forgotLoading ? 'Saving...' : 'Set New Password'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;