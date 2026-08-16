import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [cancelModalId, setCancelModalId] = useState(null);

  useEffect(() => {
    try {
      const savedTickets = JSON.parse(localStorage.getItem('myTickets') || localStorage.getItem('tickets') || '[]');
      setTickets(Array.isArray(savedTickets) ? savedTickets : []);
    } catch (e) {
      setTickets([]);
    }
  }, []);

  const handleConfirmCancel = (ticketId) => {
    const updatedTickets = tickets.filter(t => t.id !== ticketId);
    setTickets(updatedTickets);
    localStorage.setItem('myTickets', JSON.stringify(updatedTickets));
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    setCancelModalId(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 w-full relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Booked Tickets</h1>
        <p className="text-gray-400 mb-6">Manage your upcoming event passes and ticket details</p>
        
        {tickets.length === 0 ? (
          <div className="bg-[#111827]/60 border border-gray-800/80 rounded-2xl p-12 text-center max-w-2xl mx-auto mt-12 shadow-xl">
            <div className="text-4xl mb-4">🎟️</div>
            <h3 className="text-xl font-bold text-white mb-2">No Tickets Booked Yet</h3>
            <p className="text-gray-400 text-sm mb-6">You haven't booked any event tickets yet. Explore upcoming events and reserve your spot!</p>
            <Link to="/events" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
              Explore Events →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <div key={ticket.id || index} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                <div>
                  <img 
                    src={ticket.image_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'} 
                    alt={ticket.title || 'Event'} 
                    className="w-full h-40 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <h3 className="text-xl font-bold">{ticket.title || 'Event Title'}</h3>
                  <p className="text-sm text-gray-400">📅 {ticket.date || 'Upcoming Date'}</p>
                  <p className="text-sm text-gray-400">📍 {ticket.location || 'Location'}</p>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-800 mt-3">
                    <span className="text-gray-300">Tickets: <strong className="text-white">{ticket.ticketCount || 1}</strong></span>
                    <span className="font-bold text-blue-400 text-base">${ticket.totalPrice || '0.00'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCancelModalId(ticket.id)}
                  className="w-full mt-4 py-2 bg-gray-800/80 hover:bg-red-950/40 border border-gray-700 hover:border-red-900/60 text-gray-300 hover:text-red-400 font-medium rounded-lg text-sm transition-all cursor-pointer"
                >
                  Cancel Booking
                </button>

                {/* PROFESSIONAL ELEGANT MODAL WITH SUBTLE RED ACCENTS */}
                {cancelModalId === ticket.id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#111827] border border-gray-800/80 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          Cancel Booking
                        </h3>
                        <p className="text-sm text-gray-400">Are you sure you want to cancel this ticket reservation? This action cannot be undone.</p>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setCancelModalId(null)}
                          className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-xl text-sm transition-colors cursor-pointer"
                        >
                          Keep Booking
                        </button>
                        <button
                          onClick={() => handleConfirmCancel(ticket.id)}
                          className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl text-sm transition-colors shadow-md shadow-red-600/20 cursor-pointer"
                        >
                          Yes, Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;