import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0b0f19] border-t border-gray-800/80 text-gray-400 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <Link to="/" className="text-xl font-extrabold text-blue-500 tracking-wider">
            Eventura
          </Link>
          <p className="text-xs text-gray-500 leading-relaxed">
            The next-generation event discovery and management platform. Explore, book, and experience live events seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Explore</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/events" className="hover:text-white transition-colors">Browse Events</Link></li>
            <li><Link to="/my-tickets" className="hover:text-white transition-colors">My Tickets</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
          </ul>
        </div>

        {/* Host Section */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Host</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/create-event" className="hover:text-white transition-colors">Create Event</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition-colors">Manage Events</Link></li>
          </ul>
        </div>

        {/* Status / Info */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">System Status</h4>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All Systems Operational
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Eventura. Built with precision and care.</p>
        <p className="mt-2 sm:mt-0">Secure Platform • Zero Fees</p>
      </div>
    </footer>
  );
};

export default Footer;