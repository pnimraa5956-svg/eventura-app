import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    try {
      const savedTickets = JSON.parse(localStorage.getItem('myTickets') || localStorage.getItem('tickets') || '[]');
      setTickets(Array.isArray(savedTickets) ? savedTickets : []);
    } catch (e) {
      setTickets([]);
    }
  }, []);

  const totalSpent = tickets.reduce((acc, t) => acc + (parseFloat(t.totalPrice) || 0), 0);
  const totalTicketsBooked = tickets.reduce((acc, t) => acc + (parseInt(t.ticketCount) || 1), 0);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gray-900/60 border border-gray-800 p-6 rounded-2xl">
          <div>
            <span className="text-blue-400 font-semibold text-xs uppercase tracking-wider">User Overview</span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Event Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Track your bookings, activity summary, and upcoming highlights.</p>
          </div>
          <Link 
            to="/events" 
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20"
          >
            Explore More Events →
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Active Bookings</span>
            <div className="text-3xl font-extrabold text-blue-400">{tickets.length}</div>
            <p className="text-xs text-gray-500">Events currently reserved in your itinerary</p>
          </div>

          <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Tickets</span>
            <div className="text-3xl font-extrabold text-white">{totalTicketsBooked}</div>
            <p className="text-xs text-gray-500">Seats secured across all events</p>
          </div>

          <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl space-y-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Invested</span>
            <div className="text-3xl font-extrabold text-emerald-400">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-gray-500">Total value of booked reservations</p>
          </div>
        </div>

        {/* Quick Highlights / Recent Activity */}
        <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>⚡</span> Quick Itinerary Preview
          </h2>

          {tickets.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              No recent bookings found. Book an event to see your itinerary highlights here!
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.slice(0, 3).map((ticket, idx) => (
                <div key={ticket.id || idx} className="flex items-center justify-between p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <img src={ticket.image_url} alt="" className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{ticket.title}</h4>
                      <p className="text-xs text-gray-400">📅 {ticket.date} • 📍 {ticket.location}</p>
                    </div>
                  </div>
                  <span className="text-blue-400 font-semibold text-sm">${ticket.totalPrice}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;