import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Building, Ticket, User, Settings, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      label: 'Movies',
      path: '/',
      icon: Film
    },
    {
      label: 'Cinemas',
      path: '/cinemas',
      icon: Building
    },
    {
      label: 'My Passes',
      path: '/bookings',
      icon: Ticket
    },
    {
      label: user ? 'Profile' : 'Sign In',
      path: user ? '/profile' : '/login',
      icon: User,
      highlight: !user
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: Settings
    }
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE2D5] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const IconComponent = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer relative min-w-[56px] ${
                active
                  ? 'text-[#E63946]'
                  : 'text-[#6B7280] hover:text-[#2B2B2B]'
              }`}
            >
              <div className="relative">
                <IconComponent
                  className={`w-5 h-5 transition-transform ${
                    active ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
                {item.highlight && !user && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  active ? 'font-bold text-[#E63946]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#E63946] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
