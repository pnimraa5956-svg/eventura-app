import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch event details');
        }
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching event details:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <Link to="/events" className="text-blue-400 hover:underline">
          ← Back to Events
        </Link>
      </div>
    );
  }

  const numericPrice = typeof event.price === 'number' ? event.price : parseFloat(event.price) || 0;
  const totalPrice = (numericPrice * ticketCount).toFixed(2);

  const handleConfirmBooking = () => {
    const existingTickets = JSON.parse(localStorage.getItem('myTickets') || localStorage.getItem('tickets') || '[]');
    const newTicket = {
      id: Date.now(),
      eventId: event._id || event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      image_url: event.image_url,
      ticketCount: ticketCount,
      totalPrice: totalPrice,
      bookedAt: new Date().toISOString()
    };
    
    const updatedTickets = [...existingTickets, newTicket];
    localStorage.setItem('myTickets', JSON.stringify(updatedTickets));
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

    setBookingSuccess(true);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* BACK BUTTON & PROFESSIONAL NOTIFICATION BANNER */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 relative">
          <Link to="/events" className="text-gray-400 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-1">
            ← Back to Events
          </Link>

          {bookingSuccess && (
            <div className="relative inline-flex items-center gap-3 bg-gray-900/90 border border-blue-500/30 px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md transition-all">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              
              <div 
                className="flex items-center gap-2 text-sm text-gray-200 cursor-pointer group"
                onClick={() => navigate('/my-tickets')}
              >
                <span className="font-medium">Booking confirmed successfully!</span>
                <span className="text-blue-400 font-semibold group-hover:underline inline-flex items-center gap-1">
                  View in My Tickets →
                </span>
              </div>

              <button 
                onClick={() => setBookingSuccess(false)}
                className="ml-2 text-gray-400 hover:text-white text-xs cursor-pointer bg-gray-800/80 hover:bg-gray-700 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: EVENT DETAILS & BANNER */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/60 border border-gray-800/80 rounded-2xl overflow-hidden">
              <div className="h-80 sm:h-96 w-full relative bg-gray-800">
                <img
                  src={event.image_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'}
                  alt={event.title || 'Event Image'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              
              <div className="p-6">
                <span className="px-3 py-1 bg-blue-900/60 border border-blue-700/50 text-blue-400 text-xs font-semibold rounded-md">
                  {event.category || 'Event'}
                </span>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-2">
                  {event.title || 'Event Title'}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 my-4 border-y border-gray-800/80 py-3">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{event.date || 'Upcoming Date'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.location || 'Venue Location'}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-200 mb-2">About This Event</h3>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                    {event.description || 'Join us for an incredible live experience featuring top performances, great atmosphere, and memorable moments.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: TICKET BOOKING CARD */}
          <div className="lg:col-span-1">
            <div className="bg-[#111827] border border-gray-800/90 rounded-2xl p-6 sticky top-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  TICKET PRICE
                </span>
                <span className="text-3xl font-extrabold text-white">
                  ${numericPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">
                    SELECT TICKETS
                  </label>
                  <select
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Number(e.target.value))}
                    className="w-full bg-[#1a2333] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Ticket' : 'Tickets'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full mt-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all text-sm cursor-pointer"
                >
                  Get Tickets (${totalPrice})
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOOKING MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Confirm Ticket Order</h3>
              <p className="text-sm text-gray-400 mt-1">Review your selection before booking.</p>
            </div>

            <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800 space-y-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Event</span>
                <span className="font-semibold text-white">{event.title}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tickets</span>
                <span className="font-semibold text-white">{ticketCount}</span>
              </div>
              <div className="flex justify-between text-gray-300 border-t border-gray-800 pt-2 font-bold">
                <span>Total Amount</span>
                <span className="text-blue-400">${totalPrice}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                Confirm & Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;