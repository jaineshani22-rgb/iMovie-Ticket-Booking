import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Film,
  User,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  X,
  Sparkles,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocationContext } from '../context/LocationContext';

const AuthCard = ({ initialMode = 'login' }) => {
  const { user, login, register, forgotPassword, resetPassword, googleLogin, logout } = useAuth();
  const { country, city } = useLocationContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState(initialMode); // 'login' or 'register'

  // Form Fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Feedback
  const [error, setError] = useState('');
  const [errorAction, setErrorAction] = useState(null); // { label: string, action: () => void }
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState(1);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  // Return path from location state or default to '/'
  const returnUrl = location.state?.from?.pathname
    ? `${location.state.from.pathname}${location.state.from.search || ''}`
    : '/';

  // Sync mode if initialMode prop changes (e.g. navigating between /login and /register)
  useEffect(() => {
    setMode(initialMode);
    setError('');
    setErrorAction(null);
    setSuccess('');
  }, [initialMode]);

  // Password strength calculation for register
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-[#EAE2D5]' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-teal-500', text: 'text-teal-600' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strength = getPasswordStrength(password);

  const switchMode = (newMode, prefilledEmail = '') => {
    setMode(newMode);
    setError('');
    setErrorAction(null);
    setSuccess('');
    if (prefilledEmail) {
      setEmail(prefilledEmail);
    }
  };

  // ----------------------------------------------------
  // Sign In Handler
  // ----------------------------------------------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorAction(null);
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
      await login(email.trim(), password);
      setSuccess('Welcome back! Redirecting...');
      setTimeout(() => {
        navigate(returnUrl, { replace: true });
      }, 500);
    } catch (err) {
      const msg = err.response?.data?.message || '';
      const isNotFound = err.response?.data?.userNotFound || msg.toLowerCase().includes('not found');

      if (isNotFound) {
        setError(`No account found with ${email.trim()}. Would you like to create a new VIP account?`);
        setErrorAction({
          label: '👉 Create an Account with this email',
          action: () => switchMode('register', email.trim())
        });
      } else if (err.response?.status === 401) {
        setError('Incorrect password. Please verify your credentials or use the demo buttons below.');
      } else if (msg) {
        setError(msg);
      } else {
        setError('Network/server connection issue. Please verify connectivity.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // Sign Up / Register Handler
  // ----------------------------------------------------
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorAction(null);
    setSuccess('');

    if (!username.trim()) {
      setError('Please provide your full member name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address (e.g. name@example.com).');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your confirm password field.');
      return;
    }

    try {
      setLoading(true);
      await register(username.trim(), email.trim(), password, { country, city });
      setSuccess('VIP Account successfully created! Welcome to iMovies. Redirecting...');
      setTimeout(() => {
        navigate(returnUrl, { replace: true });
      }, 600);
    } catch (err) {
      const resData = err.response?.data || {};
      const msg = resData.message || '';
      const isAlreadyExists =
        resData.emailExists ||
        msg.toLowerCase().includes('already exists') ||
        msg.toLowerCase().includes('already registered');

      if (isAlreadyExists) {
        setError(`An account with ${email.trim()} is already registered.`);
        setErrorAction({
          label: `👉 Sign In as ${email.trim()}`,
          action: () => switchMode('login', email.trim())
        });
      } else if (msg) {
        setError(msg);
      } else {
        setError('Unable to complete registration. Please check your network and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // 1-Click Demo Fill / Sign In
  // ----------------------------------------------------
  const fillDemoCredentials = async (demoEmail, demoPass, autoSubmit = false) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    setErrorAction(null);
    if (autoSubmit) {
      try {
        setLoading(true);
        await login(demoEmail, demoPass);
        navigate(returnUrl, { replace: true });
      } catch (err) {
        setError(err.response?.data?.message || 'Demo login failed');
      } finally {
        setLoading(false);
      }
    }
  };

  // 1-Click Sample New User Data for Registration Testing
  const fillSampleNewUser = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setUsername(`VIP Member ${randomSuffix}`);
    setEmail(`patron.${randomSuffix}@imovies-patron.com`);
    setPassword(`VIP@Pass_${randomSuffix}`);
    setConfirmPassword(`VIP@Pass_${randomSuffix}`);
    setError('');
    setErrorAction(null);
  };

  // ----------------------------------------------------
  // Google Single Sign-On Simulation
  // ----------------------------------------------------
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      setErrorAction(null);
      const defaultEmail =
        email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
          ? email.trim()
          : 'jaineshani22@gmail.com';
      const defaultName = username.trim() || 'Eshani Jain';

      await googleLogin({
        email: defaultEmail,
        name: defaultName,
        googleId: 'g_' + Date.now()
      });
      navigate(returnUrl, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Google sign-in encountered an error');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // Password Reset Handlers
  // ----------------------------------------------------
  const handleRequestResetToken = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      setForgotError('Please enter a valid registered email.');
      return;
    }
    try {
      setForgotLoading(true);
      const res = await forgotPassword(forgotEmail.trim());
      setForgotMessage(res.message || 'Reset token generated! Copy the token below to set a new password.');
      if (res.resetToken) {
        setResetToken(res.resetToken);
        setForgotStep(2);
      }
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Error generating reset token');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleConfirmResetPassword = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');
    if (!resetToken.trim()) {
      setForgotError('Please enter the token from Step 1.');
      return;
    }
    if (newPassword.length < 6) {
      setForgotError('New password must be at least 6 characters.');
      return;
    }
    try {
      setForgotLoading(true);
      const res = await resetPassword(resetToken.trim(), newPassword);
      setSuccess(res.message || 'Password successfully updated! You can now sign in.');
      setShowForgotModal(false);
      setPassword(newPassword);
      switchMode('login', forgotEmail);
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Error resetting password');
    } finally {
      setForgotLoading(false);
    }
  };

  // ====================================================
  // Render: Already Logged In State
  // ====================================================
  if (user) {
    return (
      <div className="w-full max-w-md mx-auto bg-white border border-[#EAE2D5] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF6DC] border border-[#FFC93C] text-[#E5B129] flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-7 h-7 text-[#E5B129]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] tracking-tight">
            Signed In to iMovies
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            You are currently logged in as{' '}
            <strong className="text-[#2B2B2B]">{user.username}</strong> ({user.email})
          </p>
        </div>

        <div className="bg-[#FFF9F0] border border-[#EAE2D5] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <span>Account Role:</span>
            <span className="font-bold uppercase tracking-wider text-[#E63946] bg-[#FDECEC] px-2 py-0.5 rounded-md border border-[#FCD7D7]">
              {user.role === 'admin' ? 'Cinema Admin' : 'VIP Member'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <span>Preferred City:</span>
            <span className="font-bold text-[#2B2B2B]">
              {user.preferredCity || city}, {user.preferredCountry || country}
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => navigate(returnUrl)}
            className="w-full bg-[#E63946] hover:bg-[#D62839] text-white font-bold py-3 rounded-xl shadow-xs transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Movies & Theatres</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-full bg-white hover:bg-[#FFF6DC] border border-[#EAE2D5] text-[#2B2B2B] font-bold py-2.5 rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <User className="w-4 h-4 text-[#E63946]" />
            <span>View My Passes & Profile</span>
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              setMode('login');
            }}
            className="w-full text-xs text-[#6B7280] hover:text-[#B81D2D] py-2 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign In with a different account</span>
          </button>
        </div>
      </div>
    );
  }

  // ====================================================
  // Render: Sign In / Sign Up Form
  // ====================================================
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-[#EAE2D5] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-1.5">
        <div className="w-12 h-12 rounded-2xl bg-[#FDECEC] border border-[#FCD7D7] text-[#E63946] flex items-center justify-center mx-auto shadow-xs">
          <Film className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B] tracking-tight">
          {mode === 'login' ? 'VIP Lounge Sign In' : 'Join VIP Membership'}
        </h2>
        <p className="text-xs text-[#6B7280]">
          {mode === 'login'
            ? 'Access your confirmed digital passes and real-time seat locks'
            : 'Unlock 4K IMAX reservations, reserved recliners, and pass barcodes'}
        </p>
      </div>

      {/* Tab Switcher: Sign In vs Sign Up */}
      <div className="grid grid-cols-2 p-1 bg-[#FFF9F0] border border-[#EAE2D5] rounded-2xl">
        <button
          type="button"
          onClick={() => switchMode('login')}
          className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === 'login'
              ? 'bg-white text-[#E63946] shadow-xs border border-[#EAE2D5]'
              : 'text-[#6B7280] hover:text-[#2B2B2B]'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </button>
        <button
          type="button"
          onClick={() => switchMode('register')}
          className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === 'register'
              ? 'bg-[#E63946] text-white shadow-xs'
              : 'text-[#6B7280] hover:text-[#2B2B2B]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Create Account</span>
        </button>
      </div>

      {/* Error & Success Feedback Banners */}
      {error && (
        <div className="bg-[#FDECEC] border border-[#FCD7D7] rounded-2xl p-3.5 space-y-2 animate-in fade-in">
          <div className="flex items-start gap-2 text-xs text-[#B81D2D]">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#E63946] mt-0.5" />
            <span className="font-semibold">{error}</span>
          </div>
          {errorAction && (
            <button
              type="button"
              onClick={errorAction.action}
              className="w-full text-xs bg-white hover:bg-[#FFF6DC] border border-[#FCD7D7] text-[#E63946] font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>{errorAction.label}</span>
            </button>
          )}
        </div>
      )}

      {success && (
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-3 flex items-center gap-2 text-xs text-[#065F46] font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#059669]" />
          <span>{success}</span>
        </div>
      )}

      {/* Single-Click Google Continue */}
      <button
        type="button"
        disabled={loading}
        onClick={handleGoogleSignIn}
        className="w-full bg-[#FFF9F0] hover:bg-[#FFF6DC] border border-[#DCD3C5] hover:border-[#FFC93C] text-[#2B2B2B] text-xs sm:text-sm font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer disabled:opacity-50"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
        <span>Continue with Google VIP Access</span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-[1px] flex-1 bg-[#EAE2D5]" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6B7280] font-bold">
          {mode === 'login' ? 'Or sign in with email' : 'Or register with email'}
        </span>
        <div className="h-[1px] flex-1 bg-[#EAE2D5]" />
      </div>

      {/* Form Content */}
      {mode === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Helper for new users in Login form */}
          <div className="bg-[#FFFDF9] border border-[#EAE2D5] rounded-2xl p-2.5 flex items-center justify-between gap-3 text-xs">
            <span className="text-[#6B7280]">New to iMovies?</span>
            <button
              type="button"
              onClick={() => switchMode('register', email)}
              className="font-bold text-[#E63946] hover:text-[#D62839] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Create an Account</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#FFF9F0] border border-[#DCD3C5] focus:border-[#E63946] focus:bg-white focus:ring-2 focus:ring-[#FFC93C]/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#2B2B2B] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#2B2B2B]">Password</label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setShowForgotModal(true);
                }}
                className="text-[11px] text-[#E63946] hover:underline font-semibold cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FFF9F0] border border-[#DCD3C5] focus:border-[#E63946] focus:bg-white focus:ring-2 focus:ring-[#FFC93C]/30 rounded-xl pl-10 pr-10 py-2 text-xs sm:text-sm text-[#2B2B2B] focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2B2B2B] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E63946] hover:bg-[#D62839] disabled:opacity-40 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Lounge'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {/* Quick Switch to Sign In for Existing Users */}
          <div className="bg-[#FFF6DC] border border-[#FFEDB0] rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#7A5B14] min-w-0">
              <User className="w-4 h-4 text-[#E63946] shrink-0" />
              <span className="font-semibold truncate">Already have an account?</span>
            </div>
            <button
              type="button"
              onClick={() => switchMode('login', email)}
              className="font-bold text-[#E63946] hover:text-[#D62839] hover:underline cursor-pointer shrink-0 inline-flex items-center gap-1"
            >
              <span>Sign In here</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1.5">
              Full Name / Member Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                autoComplete="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Eshani Jain"
                className="w-full bg-[#FFF9F0] border border-[#DCD3C5] focus:border-[#E63946] focus:bg-white focus:ring-2 focus:ring-[#FFC93C]/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#2B2B2B] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#FFF9F0] border border-[#DCD3C5] focus:border-[#E63946] focus:bg-white focus:ring-2 focus:ring-[#FFC93C]/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#2B2B2B] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#2B2B2B]">Password</label>
              {password && (
                <span className={`text-[10px] font-bold ${strength.text}`}>
                  {strength.label}
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#FFF9F0] border border-[#DCD3C5] focus:border-[#E63946] focus:bg-white focus:ring-2 focus:ring-[#FFC93C]/30 rounded-xl pl-10 pr-10 py-2 text-xs sm:text-sm text-[#2B2B2B] focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2B2B2B] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Visual Strength Meter */}
            {password && (
              <div className="mt-1.5 space-y-1">
                <div className="w-full h-1.5 bg-[#EAE2D5] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
                  <span className={`flex items-center gap-1 ${password.length >= 6 ? 'text-[#047857] font-semibold' : ''}`}>
                    <Check className="w-2.5 h-2.5" /> 6+ chars
                  </span>
                  <span className={`flex items-center gap-1 ${/[0-9]/.test(password) ? 'text-[#047857] font-semibold' : ''}`}>
                    <Check className="w-2.5 h-2.5" /> Numbers
                  </span>
                  <span className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-[#047857] font-semibold' : ''}`}>
                    <Check className="w-2.5 h-2.5" /> Special
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1.5">Confirm Password</label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full bg-[#FFF9F0] border rounded-xl pl-10 pr-10 py-2 text-xs sm:text-sm text-[#2B2B2B] focus:outline-none transition-all ${
                  confirmPassword && confirmPassword !== password
                    ? 'border-[#B81D2D]'
                    : confirmPassword && confirmPassword === password
                    ? 'border-[#047857]'
                    : 'border-[#DCD3C5] focus:border-[#E63946] focus:bg-white focus:ring-2 focus:ring-[#FFC93C]/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2B2B2B] transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p className="text-[11px] text-[#B81D2D] mt-1 font-semibold">Passwords do not match.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E63946] hover:bg-[#D62839] disabled:opacity-40 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Creating VIP Account...' : 'Create VIP Account'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      )}

      {/* Quick Test / Demo Accounts Section */}
      <div className="pt-4 border-t border-[#EAE2D5] space-y-2.5">
        <p className="text-[11px] text-[#6B7280] text-center font-bold uppercase tracking-wider">
          {mode === 'login' ? 'One-Click Sign-In (Instant Access):' : 'Instant Testing Helpers:'}
        </p>

        {mode === 'login' ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => fillDemoCredentials('jaineshani22@gmail.com', 'user123', true)}
                className="text-xs bg-[#FFF9F0] hover:bg-[#FFF6DC] border border-[#EAE2D5] text-[#2B2B2B] py-2 px-2.5 rounded-xl transition-all font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:border-[#E63946]/40"
                title="Click to sign in immediately as Eshani Jain"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">Eshani Jain (VIP)</span>
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => fillDemoCredentials('admin@imovies.com', 'admin123', true)}
                className="text-xs bg-[#FFF6DC] hover:bg-[#FFEDB0] border border-[#FFC93C] text-[#7A5B14] py-2 px-2.5 rounded-xl transition-all font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:border-[#E63946]/40"
                title="Click to sign in immediately as Admin Manager"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="truncate">Admin Manager</span>
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => fillDemoCredentials('user@imovies.com', 'user123', false)}
                className="text-[11px] text-[#6B7280] hover:text-[#E63946] underline cursor-pointer"
              >
                Or fill default user@imovies.com credentials
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={fillSampleNewUser}
              className="w-full text-xs bg-[#FFF9F0] hover:bg-[#FFF6DC] border border-[#EAE2D5] text-[#2B2B2B] py-2 px-3 rounded-xl transition-all font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:border-[#E63946]/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5B129]" />
              <span>Fill Sample VIP Member Details (1-Click)</span>
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="text-[11px] text-[#6B7280] hover:text-[#E63946] underline cursor-pointer"
              >
                Already have an account? Sign in with existing credentials
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Switch Link */}
      <p className="text-center text-xs text-[#6B7280]">
        {mode === 'login' ? (
          <>
            New to iMovies?{' '}
            <button
              type="button"
              onClick={() => switchMode('register')}
              className="text-[#E63946] hover:underline font-bold cursor-pointer"
            >
              Create an account
            </button>
          </>
        ) : (
          <>
            Already registered?{' '}
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="text-[#E63946] hover:underline font-bold cursor-pointer"
            >
              Sign In here
            </button>
          </>
        )}
      </p>

      {/* Forgot / Reset Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white border border-[#EAE2D5] rounded-3xl p-6 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-[#6B7280] hover:text-[#2B2B2B] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FDECEC] border border-[#FCD7D7] text-[#E63946] flex items-center justify-center">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2B2B2B]">Reset VIP Password</h3>
                <p className="text-[11px] text-[#6B7280]">
                  {forgotStep === 1
                    ? 'Enter your email for reset instructions'
                    : 'Set your new secure password'}
                </p>
              </div>
            </div>

            {forgotError && (
              <div className="text-[11px] bg-[#FDECEC] border border-[#FCD7D7] text-[#B81D2D] p-2.5 rounded-xl flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#E63946]" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotMessage && (
              <div className="text-[11px] bg-[#FFF6DC] border border-[#FFEDB0] text-[#7A5B14] p-2.5 rounded-xl break-all">
                {forgotMessage}
              </div>
            )}

            {forgotStep === 1 ? (
              <form onSubmit={handleRequestResetToken} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#2B2B2B] mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#FFF9F0] border border-[#DCD3C5] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#E63946] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-[#E63946] hover:bg-[#D62839] text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {forgotLoading ? 'Processing...' : 'Get Reset Token'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleConfirmResetPassword} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#2B2B2B] mb-1">Reset Token</label>
                  <input
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Token from step 1"
                    className="w-full bg-[#FFF9F0] border border-[#DCD3C5] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#E63946] focus:bg-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#2B2B2B] mb-1">
                    New Password (6+ chars)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FFF9F0] border border-[#DCD3C5] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#E63946] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-[#E63946] hover:bg-[#D62839] text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {forgotLoading ? 'Saving...' : 'Set New Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthCard;
