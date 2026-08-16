import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Nimraa');
  
  // State for the interactive user dropdown card
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateUserName = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.name) {
            setUserName(parsedUser.name);
            return;
          }
        } catch (e) {
          // fallback if not json
        }
      }
      const registeredName = localStorage.getItem('registered_user_name');
      if (registeredName) {
        setUserName(registeredName);
      }
    };

    updateUserName();
    window.addEventListener('storage', updateUserName);
    return () => window.removeEventListener('storage', updateUserName);
  }, []);

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    localStorage.removeItem('registered_user_name');
    setUserName('Nirva');
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-[#111827] border-b border-gray-800 px-6 py-4 flex items-center justify-between text-white transition-colors duration-200 relative z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="font-extrabold text-lg tracking-wider text-blue-500">
          Eventura
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/events" className="hover:text-white transition-colors">Explore Events</Link>
          <Link to="/my-tickets" className="hover:text-white transition-colors">My Tickets</Link>
          <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        
        {/* INTERACTIVE USERNAME BUTTON WITH NO ARROW MARK AND HIGHLIGHTED NAME */}
        <div className="relative hidden sm:block" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center px-4 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 rounded-full text-xs font-semibold border border-blue-500/40 transition-all cursor-pointer shadow-sm focus:outline-none"
          >
            <span className="text-blue-400 font-bold tracking-wide">{userName}</span>
          </button>

          {/* Professional Modern Dropdown Card */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-gradient-to-b from-[#111827] to-[#0f172a] border border-gray-800/90 rounded-2xl shadow-2xl shadow-black/80 py-2 z-50 backdrop-blur-xl animate-fadeIn text-left">
              
              {/* User Header Info */}
              <div className="px-4 py-3 border-b border-gray-800/80">
                <p className="text-[11px] text-gray-400 font-medium">Signed in as</p>
                <p className="text-sm font-bold text-white truncate mt-0.5">{userName}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-semibold text-blue-400">
                  ✨ Active Member
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="py-1 border-b border-gray-800/80 text-xs font-medium">
                <Link
                  to="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
                >
                  <span>📊</span> Dashboard
                </Link>
                <Link
                  to="/my-tickets"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
                >
                  <span>🎟️</span> My Tickets
                </Link>
                <Link
                  to="/create-event"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
                >
                  <span>➕</span> Host New Event
                </Link>
              </div>

              {/* Logout Action with Clean Symbol */}
              <div className="pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-xs font-semibold text-left cursor-pointer"
                >
                  <span>⏻</span> Log Out
                </button>
              </div>

            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
        >
          Log Out
        </button>

        <Link
          to="/login"
          className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-semibold border border-gray-700 transition-colors"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-semibold border border-gray-700 transition-colors"
        >
          Register
        </Link>

        <Link
          to="/create-event"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/25 transition-all"
        >
          + Create Event
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;