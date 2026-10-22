import React, { useEffect, useState } from 'react';
import { X, Play, Film, ExternalLink, RefreshCw, AlertTriangle, Clock } from 'lucide-react';

const extractYouTubeId = (keyOrUrl) => {
  if (!keyOrUrl) return '';
  const trimmed = String(keyOrUrl).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) return match[1];
  return '';
};

const TrailerModal = ({ isOpen, onClose, trailerKey, title, isComingSoon }) => {
  const [hasPlaybackIssue, setHasPlaybackIssue] = useState(false);
  const [embedAttempt, setEmbedAttempt] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setHasPlaybackIssue(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const videoId = extractYouTubeId(trailerKey);
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    (title || 'Movie') + ' official trailer'
  )}`;
  const youtubeWatchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : searchUrl;

  // Use YouTube standard privacy-enhanced embed URL
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(
        typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
      )}`
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} Trailer`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-[#10131a] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-[#141822]">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white tracking-wide truncate">
                {title} {videoId ? '— Official 4K Trailer' : '— Trailer Preview'}
              </h3>
              <p className="text-[11px] text-amber-400/90 font-medium flex items-center gap-2">
                <span>Auditorium Preview</span>
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                <span className="text-slate-400">
                  {videoId ? 'Verified Studio Embed' : 'Official Release Info'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct YouTube Link Button */}
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#cc0000]/20 hover:bg-[#cc0000]/30 border border-[#cc0000]/40 text-red-300 hover:text-white text-xs font-semibold transition-colors"
              title="Open directly in YouTube app or new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {videoId ? 'Watch on YouTube' : 'Search Trailer on YouTube'}
              </span>
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close Trailer"
              aria-label="Close trailer player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player or Fallback View */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {videoId && !hasPlaybackIssue ? (
            <div className="w-full h-full relative">
              <iframe
                key={`yt-${videoId}-${embedAttempt}`}
                src={embedUrl}
                title={`${title} Official Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                onError={() => setHasPlaybackIssue(true)}
              />
            </div>
          ) : !videoId ? (
            /* Dedicated State: Official Trailer Coming Soon */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center space-y-4 bg-gradient-to-b from-[#141824] via-[#0f121a] to-black">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
                <Clock className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <p className="text-white font-extrabold text-lg tracking-tight">
                  Official Trailer Coming Soon
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The studio has not released the embeddable official full trailer for{' '}
                  <strong className="text-slate-200">{title}</strong> yet. We never display incorrect
                  or unrelated movies. You can search YouTube for verified teasers and production
                  updates.
                </p>
              </div>
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#e60000] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-red-900/30 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Search for Official "{title}" Teaser on YouTube
              </a>
            </div>
          ) : (
            /* Fallback State: Third-Party Playback Error or Video Unavailable */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center space-y-4 bg-gradient-to-b from-[#161a26] via-[#10131d] to-black">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <p className="text-white font-extrabold text-lg">
                  Trailer Unavailable in Embedded Player
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Studio distribution policies sometimes restrict in-app playback for this title. You
                  can watch the verified 4K official trailer directly on YouTube without interruption.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#e60000] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Watch Directly on YouTube
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setHasPlaybackIssue(false);
                    setEmbedAttempt((p) => p + 1);
                  }}
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry Embedded Player
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div className="px-5 py-2.5 bg-[#12151d] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            iMovies Verified Theatrical Showcase
          </span>
          <div className="flex items-center gap-3">
            {videoId && (
              <button
                type="button"
                onClick={() => {
                  setHasPlaybackIssue(false);
                  setEmbedAttempt((prev) => prev + 1);
                }}
                className="hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
                title="Reload Trailer Player"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reload</span>
              </button>
            )}
            <span className="text-slate-600">|</span>
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              YouTube Link <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
