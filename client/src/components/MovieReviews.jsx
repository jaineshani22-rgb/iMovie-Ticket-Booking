import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Ticket,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit3,
  Loader2,
  ArrowUpRight,
  Filter,
  UserCheck
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const RATING_LABELS = {
  1: 'Poor — Disappointing watch',
  2: 'Fair — Has some good moments',
  3: 'Good — Solid entertainment',
  4: 'Very Good — Highly recommended',
  5: 'Masterpiece — Unmissable big-screen cinema!'
};

const MovieReviews = ({ movieId, movieTitle, onScrollToBooking }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [hasBooked, setHasBooked] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Filter & Sort
  const [starFilter, setStarFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [likedReviews, setLikedReviews] = useState(new Set());

  // Fetch reviews for the movie
  const fetchReviews = async () => {
    if (!movieId) return;
    try {
      setLoading(true);
      const { data } = await API.get(`/movies/${movieId}/reviews`);
      setReviews(data.reviews || []);
      setStats(
        data.stats || {
          totalReviews: 0,
          averageRating: 0,
          ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        }
      );
      setHasBooked(!!data.hasBooked);
      if (data.userReview) {
        setUserReview(data.userReview);
        setRating(data.userReview.rating || 5);
        setComment(data.userReview.comment || '');
      } else {
        setUserReview(null);
        setRating(5);
        setComment('');
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!hasBooked) {
      setFormError('You can only review movies you have previously booked.');
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      setFormError('Please select a star rating between 1 and 5.');
      return;
    }

    if (!comment.trim() || comment.trim().length < 3) {
      setFormError('Please write a short comment of at least 3 characters.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');
      setFormSuccess('');

      const { data } = await API.post(`/movies/${movieId}/reviews`, {
        rating,
        comment: comment.trim()
      });

      setFormSuccess(data.message || 'Review published successfully!');
      setIsEditing(false);
      await fetchReviews();
      setTimeout(() => setFormSuccess(''), 5000);
    } catch (err) {
      setFormError(
        err.response?.data?.message || 'Failed to submit your review. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to remove your review?')) return;
    try {
      setDeleting(true);
      setFormError('');
      await API.delete(`/movies/${movieId}/reviews`);
      setUserReview(null);
      setRating(5);
      setComment('');
      setIsEditing(false);
      setFormSuccess('Your review has been removed.');
      await fetchReviews();
      setTimeout(() => setFormSuccess(''), 4000);
    } catch (err) {
      setFormError('Failed to remove review');
    } finally {
      setDeleting(false);
    }
  };

  const handleLike = async (reviewId) => {
    if (likedReviews.has(reviewId)) return;
    try {
      setLikedReviews((prev) => new Set([...prev, reviewId]));
      // Optimistic update
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, likes: (r.likes || 0) + 1 } : r))
      );
      await API.post(`/movies/${movieId}/reviews/${reviewId}/like`);
    } catch (e) {
      // Ignore like error
    }
  };

  // Filter & Sort reviews
  const filteredReviews = reviews
    .filter((r) => {
      if (starFilter === 'all') return true;
      return Math.round(Number(r.rating)) === Number(starFilter);
    })
    .sort((a, b) => {
      if (sortBy === 'highest') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'helpful') return (b.likes || 0) - (a.likes || 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const totalCount = stats.totalReviews || 0;
  const activeRating = hoverRating || rating;

  return (
    <div id="audience-reviews" className="bg-[#12151d] border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl shadow-black/60 relative overflow-hidden">
      {/* Glow decorative blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Audience Reviews</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Ratings & Thoughts for <span className="text-amber-400 font-['Cinzel',serif]">{movieTitle}</span>
          </h2>
          <p className="text-xs text-slate-400">
            Ratings and comments are exclusively submitted by ticket-verified guests who booked this screening.
          </p>
        </div>

        {/* Aggregate Score Badge */}
        <div className="flex items-center gap-3 bg-[#0c0e14] border border-amber-500/25 px-5 py-3 rounded-2xl self-start md:self-auto shadow-inner">
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono leading-none">
              {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '—'}
              <span className="text-xs font-normal text-slate-400"> / 5.0</span>
            </div>
            <div className="text-[11px] text-amber-400/90 font-medium">
              {totalCount} {totalCount === 1 ? 'Verified Rating' : 'Verified Ratings'}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pl-2 border-l border-slate-800">
            <div className="flex items-center text-amber-400">
              {[1, 2, 3, 4, 5].map((starVal) => {
                const isFilled = (stats.averageRating || 0) >= starVal - 0.25;
                return (
                  <Star
                    key={starVal}
                    className={`w-4 h-4 ${
                      isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> 100% Booked Guests
            </span>
          </div>
        </div>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0a0d14]/70 border border-slate-800/80 rounded-2xl p-4 sm:p-6">
        {/* Left: Star Distribution Bars */}
        <div className="md:col-span-2 space-y-2">
          <span className="text-xs font-bold text-slate-300 block mb-2 uppercase tracking-wider">
            Rating Distribution
          </span>
          {[5, 4, 3, 2, 1].map((starLevel) => {
            const count = stats.ratingDistribution?.[starLevel] || 0;
            const percent = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
            const isSelected = starFilter === String(starLevel);

            return (
              <button
                key={starLevel}
                type="button"
                onClick={() => setStarFilter(isSelected ? 'all' : String(starLevel))}
                className={`w-full flex items-center gap-3 text-xs py-1 px-2 rounded-lg transition-colors group ${
                  isSelected ? 'bg-amber-500/15' : 'hover:bg-slate-800/40'
                }`}
                title={`Filter by ${starLevel} star reviews`}
              >
                <span className="w-12 text-left font-mono font-bold text-slate-300 flex items-center gap-1">
                  <span>{starLevel}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-14 text-right font-mono text-[11px] text-slate-400 group-hover:text-amber-400">
                  {count} <span className="text-[10px] text-slate-500">({percent}%)</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Verified Policy Info Card */}
        <div className="flex flex-col justify-between p-4 bg-[#12151f] rounded-xl border border-amber-500/20 text-xs text-slate-300 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Ticketing Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Unlike generic review sites, iMovies requires a confirmed theater booking before any user can publish a rating or comment.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Your Booking Status:</span>
            {hasBooked ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Booked
              </span>
            ) : user ? (
              <span className="text-amber-400 font-medium">No prior booking</span>
            ) : (
              <span className="text-slate-500 font-medium">Not Signed In</span>
            )}
          </div>
        </div>
      </div>

      {/* Review Submission Card / Gatekeeper Callout */}
      <div className="bg-[#0e1118] border border-amber-500/25 rounded-2xl p-5 sm:p-7 relative shadow-lg">
        {/* Scenario 1: User is logged in and HAS booked this movie */}
        {user && hasBooked ? (
          <div>
            {userReview && !isEditing ? (
              // Display existing review with edit option
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Your Review ({userReview.username || user.username})
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Ticket Holder
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      Edit Review
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleting}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {deleting ? 'Removing...' : 'Delete'}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <Star
                          key={starVal}
                          className={`w-4 h-4 ${
                            userReview.rating >= starVal
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {userReview.rating} / 5 Stars
                    </span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="text-xs text-slate-400 font-medium">
                      {RATING_LABELS[userReview.rating] || ''}
                    </span>
                  </div>

                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed bg-[#141722] p-4 rounded-xl border border-slate-800">
                    "{userReview.comment}"
                  </p>
                </div>
              </div>
            ) : (
              // Form for submitting or editing
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {userReview ? 'Update Your Review' : `Rate & Review ${movieTitle}`}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ticket Booking Verified
                  </span>
                </div>

                {/* Star Rating Picker */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Select Rating (1–5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 p-2 bg-[#141824] rounded-xl border border-slate-800">
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isHovered = hoverRating >= starVal;
                        const isSelected = !hoverRating && rating >= starVal;
                        const active = isHovered || isSelected;

                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setRating(starVal)}
                            onMouseEnter={() => setHoverRating(starVal)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 hover:scale-125 transition-transform duration-150 focus:outline-none"
                            title={`${starVal} Star${starVal > 1 ? 's' : ''}`}
                          >
                            <Star
                              className={`w-6 h-6 transition-colors ${
                                active
                                  ? 'fill-amber-400 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]'
                                  : 'text-slate-700 hover:text-slate-500'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-semibold text-amber-300 pl-2">
                      {RATING_LABELS[activeRating] || `${activeRating} Stars`}
                    </span>
                  </div>
                </div>

                {/* Text Comment Area */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                    <label htmlFor="review-comment">Short Review Comment</label>
                    <span
                      className={`font-mono text-[11px] ${
                        comment.length > 500 ? 'text-rose-400' : 'text-slate-400'
                      }`}
                    >
                      {comment.length} / 500
                    </span>
                  </div>
                  <textarea
                    id="review-comment"
                    rows="3"
                    value={comment}
                    maxLength={500}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience: screen immersion, screenplay, performances, sound design..."
                    className="w-full bg-[#131620] border border-slate-800 focus:border-amber-400 text-white rounded-xl p-3 text-xs sm:text-sm placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all resize-y min-h-[80px]"
                  />
                </div>

                {/* Error / Success alerts */}
                {formError && (
                  <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
                {formSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{formSuccess}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={submitting || !comment.trim()}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-xs transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving Review...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        {userReview ? 'Save Updated Review' : 'Publish Verified Review'}
                      </>
                    )}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setRating(userReview?.rating || 5);
                        setComment(userReview?.comment || '');
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        ) : user && !hasBooked ? (
          // Scenario 2: User is logged in BUT has NOT booked this movie yet
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>Verified Booking Required</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Book tickets for {movieTitle} to unlock audience reviews
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reviews on iMovies are reserved exclusively for guests who have booked tickets for this movie. Once you reserve your recliner seats above, you can share your 1–5 star rating and comment!
              </p>
            </div>

            <button
              type="button"
              onClick={onScrollToBooking}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-amber-500/20 shrink-0 transition-all"
            >
              <Ticket className="w-4 h-4" />
              <span>Select Seats & Reserve</span>
            </button>
          </div>
        ) : (
          // Scenario 3: User is not logged in
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
                <UserCheck className="w-4 h-4" />
                <span>Audience Review Portal</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Have you booked or watched {movieTitle}?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sign in to verify your ticket booking and submit your 1–5 star rating and thoughts for other moviegoers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-amber-500/20 shrink-0 transition-all"
            >
              <span>Sign In to Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Reviews Filter & Feed Controls */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setStarFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                starFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'bg-[#0d1017] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Reviews ({totalCount})
            </button>
            {[5, 4, 3, 2, 1].map((s) => {
              const count = stats.ratingDistribution?.[s] || 0;
              if (count === 0 && starFilter !== String(s)) return null;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStarFilter(String(s))}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    starFilter === String(s)
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                      : 'bg-[#0d1017] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{s}</span>
                  <Star className="w-3 h-3 fill-current" />
                  <span className="font-mono text-[10px] opacity-80">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0e1118] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="newest">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : filteredReviews.length > 0 ? (
          <div className="space-y-3.5">
            {filteredReviews.map((rev) => {
              const isUserAuthor =
                user &&
                ((rev.user && (rev.user._id === user._id || rev.user === user._id)) ||
                  rev.username === user.username);
              const isLiked = likedReviews.has(rev._id);

              return (
                <div
                  key={rev._id}
                  className="bg-[#0b0e15] border border-slate-800/90 hover:border-slate-700/80 rounded-2xl p-5 space-y-3 transition-colors shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-xs uppercase shadow-inner">
                        {rev.username ? rev.username.charAt(0) : 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {rev.username || 'Verified Guest'}
                          </span>
                          {isUserAuthor && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-semibold border border-amber-500/30">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified Ticket Holder</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-400">
                            {rev.createdAt
                              ? new Date(rev.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })
                              : 'Recent'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating Badge */}
                    <div className="flex items-center gap-1.5 bg-[#141824] border border-amber-500/20 px-3 py-1.5 rounded-xl">
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <Star
                            key={starVal}
                            className={`w-3.5 h-3.5 ${
                              rev.rating >= starVal
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-mono font-bold text-white">
                        {rev.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-1 pt-1">
                    {rev.comment}
                  </p>

                  {/* Review Footer / Helpful Vote */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                    <button
                      type="button"
                      onClick={() => handleLike(rev._id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        isLiked
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span>Helpful ({rev.likes || 0})</span>
                    </button>

                    {rev.updatedAt && rev.updatedAt !== rev.createdAt && (
                      <span className="text-[10px] text-slate-500 italic">
                        Edited
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 px-4 text-center rounded-2xl bg-[#0a0d14] border border-slate-800/60 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">
                {starFilter !== 'all'
                  ? `No ${starFilter}-star reviews found`
                  : 'No reviews yet for this movie'}
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {starFilter !== 'all'
                  ? 'Try selecting a different star filter or view all reviews.'
                  : 'Be among the first verified ticket holders to share your thoughts and rating!'}
              </p>
            </div>
            {starFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setStarFilter('all')}
                className="text-xs text-amber-400 font-semibold hover:underline"
              >
                Clear filter & show all reviews
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
