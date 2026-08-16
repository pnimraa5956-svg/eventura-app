import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Custom modal state to replace window.confirm
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, eventId: null, eventTitle: '' });

  const defaultEvents = [
    {
      id: '1',
      title: 'Tech Innovations Summit 2026',
      category: 'Technology',
      event_date: '2026-09-15',
      location: 'Convention Center, Tech Hub',
      price: 150,
      description: 'Explore cutting-edge advancements in AI, full-stack engineering, and cloud architecture with top industry leaders.',
      image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Acoustic Indie Nights',
      category: 'Music',
      event_date: '2026-09-20',
      location: 'Grand Amphitheater, Downtown',
      price: 25,
      description: 'An intimate evening featuring live acoustic performances from indie bands and solo songwriters.',
      image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Full-Stack Web Dev Workshop',
      category: 'Workshop',
      event_date: '2026-10-05',
      location: 'Innovation Lab, Room 302',
      price: 0,
      description: 'Hands-on practical session building scalable MERN / MySQL applications from scratch.',
      image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop'
    }
  ];

  useEffect(() => {
    // Attempt backend fetch or load fallback + local custom events
    fetch('http://localhost:5000/api/events')
      .then((res) => {
        if (!res.ok) throw new Error('Backend offline');
        return res.json();
      })
      .then((data) => {
        const localCustomEvents = JSON.parse(localStorage.getItem('created_events') || '[]');
        setEvents([...localCustomEvents, ...data]);
        setLoading(false);
      })
      .catch(() => {
        const localCustomEvents = JSON.parse(localStorage.getItem('created_events') || '[]');
        setEvents([...localCustomEvents, ...defaultEvents]);
        setLoading(false);
      });
  }, []);

  // Open professional custom modal instead of window.confirm
  const promptDeleteEvent = (e, eventId, eventTitle) => {
    e.preventDefault();
    setDeleteModal({ isOpen: true, eventId, eventTitle });
  };

  // Confirm and execute event deletion
  const confirmDeleteEvent = async () => {
    const { eventId } = deleteModal;
    try {
      await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      // Backend error ignored for local/fallback state resilience
    }

    // Remove from localStorage if it's a locally created event
    const localCustomEvents = JSON.parse(localStorage.getItem('created_events') || '[]');
    const updatedLocal = localCustomEvents.filter(ev => ev.id !== eventId);
    localStorage.setItem('created_events', JSON.stringify(updatedLocal));

    // Update state & close modal
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' });
  };

  const categories = ['All', 'Technology', 'Music', 'Workshop'];

  // Safe search filtering logic
  const filteredEvents = events.filter((evt) => {
    const title = (evt.title || '').toLowerCase();
    const location = (evt.location || '').toLowerCase();
    const category = (evt.category || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesQuery = title.includes(query) || location.includes(query) || category.includes(query);
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-[85vh] bg-[#0b0f19] text-white px-6 py-10 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Explore Events</h1>
            <p className="text-gray-400 text-sm mt-1">Discover, filter, and book upcoming events near you</p>
          </div>

          {/* Smooth Real-Time Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location..."
              className="w-full pl-10 pr-9 py-3 bg-gray-900/90 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white px-1.5 py-0.5 rounded bg-gray-800"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-gray-900/80 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <p className="text-gray-400 text-sm">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-12 text-center space-y-3">
            <span className="text-3xl block">🔍</span>
            <h3 className="text-lg font-bold text-white">No Events Found</h3>
            <p className="text-gray-400 text-sm">Try typing a different title, location, or clear the search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700/80 transition-all flex flex-col justify-between shadow-lg backdrop-blur-sm group"
              >
                {evt.image_url && (
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={evt.image_url}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 bg-blue-600/20 text-blue-400 text-xs font-semibold rounded-lg border border-blue-500/20">
                      {evt.category || 'General'}
                    </span>
                    <h3 className="text-xl font-bold text-white pt-1">{evt.title}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 pt-1">
                      <span>📅</span> {evt.event_date || evt.date}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <span>📍</span> {evt.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <span className="text-lg font-bold text-white">
                      {evt.price === 0 ? 'Free' : `$${evt.price}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => promptDeleteEvent(e, evt.id, evt.title)}
                        className="px-3 py-2 bg-gray-800 hover:bg-red-600/20 hover:text-red-400 text-gray-400 text-xs font-semibold rounded-lg transition-colors border border-gray-700 cursor-pointer"
                        title="Delete Event"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/events/${evt.id}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl transition-all shadow-md shadow-blue-600/20"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Professional Custom Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111827] border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 text-left transform transition-all">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-xl shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Event</h3>
                <p className="text-xs text-gray-400 mt-0.5">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
              Are you sure you want to delete <strong className="text-white">"{deleteModal.eventTitle}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' })}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors border border-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteEvent}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 transition-all cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Events;