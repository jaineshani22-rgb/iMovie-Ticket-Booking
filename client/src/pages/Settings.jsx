import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Lock,
  Globe,
  Building,
  ShieldCheck,
  Check,
  Save,
  AlertCircle,
  Eye,
  EyeOff,
  Bell,
  Sparkles,
  ArrowLeft,
  Crown,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocationContext, COUNTRIES } from '../context/LocationContext';
import API from '../services/api';

const Settings = () => {
  const { user, updateProfile, logout } = useAuth();
  const { country: currentContextCountry, city: currentContextCity, cinemas } = useLocationContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredCountry, setPreferredCountry] = useState('US');
  const [preferredCity, setPreferredCity] = useState('New York');
  const [preferredCinema, setPreferredCinema] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Notifications
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(true);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setPreferredCountry(user.preferredCountry || currentContextCountry || 'US');
      setPreferredCity(user.preferredCity || currentContextCity || 'New York');
      setPreferredCinema(user.preferredCinema || '');
    }
  }, [user, currentContextCountry, currentContextCity]);

  // Load latest profile from API
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data } = await API.get('/auth/profile');
        if (data) {
          if (data.username) setUsername(data.username);
          if (data.email) setEmail(data.email);
          if (data.phone) setPhone(data.phone);
          if (data.preferredCountry) setPreferredCountry(data.preferredCountry);
          if (data.preferredCity) setPreferredCity(data.preferredCity);
          if (data.preferredCinema) setPreferredCinema(data.preferredCinema);
        }
      } catch (err) {
        console.error('Error fetching profile for settings:', err);
      }
    };
    if (user) {
      fetchLatest();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4 px-4">
        <p className="text-white font-bold text-lg">Please sign in to access your Account Settings</p>
        <Link
          to="/login"
          className="inline-block px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const selectedCountryObj = COUNTRIES.find((c) => c.code === preferredCountry) || COUNTRIES[0];
  const availableCities = selectedCountryObj?.cities || ['New York', 'Los Angeles'];

  const handleCountryChange = (code) => {
    setPreferredCountry(code);
    const countryData = COUNTRIES.find((c) => c.code === code);
    if (countryData && countryData.cities && countryData.cities.length > 0) {
      setPreferredCity(countryData.cities[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('Full name cannot be empty.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        setErrorMsg('New password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMsg('New passwords do not match. Please re-enter.');
        return;
      }
      if (!currentPassword) {
        setErrorMsg('Please enter your current password to confirm password change.');
        return;
      }
    }

    try {
      setLoading(true);
      await updateProfile({
        username: username.trim(),
        email: email.trim(),
        phone: phone.trim(),
        preferredCountry,
        preferredCity,
        preferredCinema,
        currentPassword: newPassword ? currentPassword : undefined,
        newPassword: newPassword ? newPassword : undefined
      });

      setSuccessMsg('Account details and settings successfully updated!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update account details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/profile" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Profile</span>
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Account Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Account Settings</span>
            {user.role === 'admin' ? (
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Admin
              </span>
            ) : (
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Verified Patron
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal profile, contact information, default theater, and security credentials.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link
            to="/profile"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#141824] hover:bg-[#1c2232] border border-amber-500/30 text-amber-400 hover:text-white text-xs font-semibold transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span>View Profile</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 border border-rose-500/30 hover:border-rose-500/60 text-rose-400 hover:text-rose-200 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            title="Log Out of your iMovies Account"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-lg animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-lg animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Personal Details */}
        <div className="bg-[#12151d] border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <User className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Personal Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span>Full Name / Display Name</span>
                <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span>Email Address</span>
                <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Phone Number (for SMS Passes & Instant Seat Hold Alerts)</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-1234 or +91 98765 43210"
                  className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Your phone number is used solely to deliver booking confirmation barcodes and auditorium gate passes.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Preferred Theaters & Location */}
        <div className="bg-[#12151d] border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <Globe className="w-4 h-4 text-[#00F2FE]" />
            <h2 className="text-base font-bold text-white tracking-wide">Theatrical Location Preferences</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Default Country</label>
              <select
                value={preferredCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.currency})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Default City / Metro</label>
              <select
                value={preferredCity}
                onChange={(e) => setPreferredCity(e.target.value)}
                className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
              >
                {availableCities.map((ct) => (
                  <option key={ct} value={ct}>
                    {ct}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>Preferred Home Theatre</span>
              </label>
              <input
                type="text"
                value={preferredCinema}
                onChange={(e) => setPreferredCinema(e.target.value)}
                placeholder="e.g. iMovies Lincoln Square IMAX Laser or PVR ICON Lower Parel"
                className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Security & Password Update */}
        <div className="bg-[#12151d] border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <Lock className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Security & Password (Optional)</h2>
          </div>
          <p className="text-xs text-slate-400">
            Leave these fields blank if you do not wish to change your existing password.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password to verify identity"
                  className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl px-4 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl px-4 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-[#0a0d14] border border-slate-700/80 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Notification Preferences */}
        <div className="bg-[#12151d] border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Pass Delivery & Alerts</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0a0d14] border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-colors">
              <div>
                <p className="text-xs font-bold text-white">Instant SMS Boarding Pass Link</p>
                <p className="text-[11px] text-slate-400">Receive direct QR passes on mobile prior to movie showtime</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0a0d14] border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-colors">
              <div>
                <p className="text-xs font-bold text-white">Email Tax Invoices & Calendar Reminders</p>
                <p className="text-[11px] text-slate-400">PDF receipts and automatic .ics calendar sync</p>
              </div>
              <input
                type="checkbox"
                checked={emailReceipts}
                onChange={(e) => setEmailReceipts(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Section 5: Account Session & Sign Out */}
        <div className="bg-[#12151d] border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl shadow-black/40">
          <div className="flex items-center justify-between gap-3 border-b border-rose-500/20 pb-3">
            <div className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4 text-rose-400" />
              <h2 className="text-base font-bold text-white tracking-wide">Account Session & Security</h2>
            </div>
            <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 rounded-lg">
              Active Session
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                Logged in as <span className="text-white font-bold">{user.username}</span>{' '}
                <span className="text-slate-400">({user.email})</span>
              </p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                Need to switch accounts or secure this device? Signing out will safely invalidate your active browser session tokens and return you to the login screen.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/50 hover:border-rose-400 text-rose-300 hover:text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-950/40 transition-all cursor-pointer whitespace-nowrap shrink-0 group"
            >
              <LogOut className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
              <span>Log Out of iMovies</span>
            </button>
          </div>
        </div>

        {/* Submit Button Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/profile"
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-7 py-3 rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Changes...' : 'Save Account Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
