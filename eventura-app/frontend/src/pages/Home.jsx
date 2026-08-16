import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search filter and notification banner state for a real-world SaaS feel
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bannerVisible, setBannerVisible] = useState(true);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 30 });

  // Custom modal state to replace window.confirm
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, eventId: null, eventTitle: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => {
        const localCustomEvents = JSON.parse(localStorage.getItem('created_events') || '[]');
        setFeaturedEvents([...localCustomEvents, ...data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load events:', err);
        const localCustomEvents = JSON.parse(localStorage.getItem('created_events') || '[]');
        setFeaturedEvents(localCustomEvents);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
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
      // Backend error ignored for local state resilience
    }

    // Remove from localStorage if it's a locally created event
    const localCustomEvents = JSON.parse(localStorage.getItem('created_events') || '[]');
    const updatedLocal = localCustomEvents.filter(ev => ev.id !== eventId);
    localStorage.setItem('created_events', JSON.stringify(updatedLocal));

    // Update state & close modal
    setFeaturedEvents(prev => prev.filter(event => event.id !== eventId));
    setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' });
  };

  const categoriesList = [
    { name: 'All', icon: '✨' },
    { name: 'Technology', icon: '💻' },
    { name: 'Music', icon: '🎙️' },
    { name: 'Workshop', icon: '🚀' },
    { name: 'Business', icon: '📊' }
  ];

  // Filter events based on search input & category selection like a real production app
  const filteredEvents = featuredEvents.filter((event) => {
    const matchesSearch = event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white w-full relative overflow-hidden font-sans">
      
      {/* Top Production Announcement Bar */}
      {bannerVisible && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-xs sm:text-sm text-center py-2.5 px-4 font-medium relative z-30 shadow-md flex items-center justify-center gap-3">
          <span>🎉 <strong>Eventura v2.0 is live!</strong> Book your early-bird tickets now with zero platform fees.</span>
          <button 
            onClick={() => setBannerVisible(false)}
            className="text-white/80 hover:text-white font-bold ml-2 text-base leading-none focus:outline-none"
            aria-label="Close banner"
          >
            &times;
          </button>
        </div>
      )}

      {/* Background ambient decorative glow circles */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. HERO SECTION WITH REAL-WORLD SEARCH BAR */}
        <section className="relative pt-16 pb-14 text-center w-full">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/50 rounded-full shadow-lg shadow-blue-900/20">
            ✨ THE NEXT-GEN EVENT PLATFORM
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Discover, Book & Experience <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Unforgettable Events
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Join thousands of attendees discovering live tech summits, intimate music nights, and hands-on workshops in real-time.
          </p>

          {/* Real-World Interactive Search Input Box */}
          <div className="max-w-xl mx-auto mb-8 bg-gray-900/90 border border-gray-700/80 p-2 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-3 px-3 w-full">
              <span className="text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search events by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-white placeholder-gray-500 text-sm focus:outline-none w-full py-2"
              />
            </div>
            <Link
              to="/events"
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-all shadow-md text-center whitespace-nowrap"
            >
              Search
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <Link
              to="/events"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              Explore All Events →
            </Link>
            <Link
              to="/create-event"
              className="px-8 py-3.5 bg-gray-800/80 hover:bg-gray-800 border border-gray-700 text-gray-200 font-medium rounded-xl transition-all hover:scale-105"
            >
              + Host an Event
            </Link>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-3 max-w-2xl mx-auto py-6 border-y border-gray-800/80 bg-gray-900/30 rounded-2xl backdrop-blur-sm shadow-xl">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-400">500+</p>
              <p className="text-xs text-gray-400 mt-1">Events Hosted</p>
            </div>
            <div className="border-x border-gray-800/80">
              <p className="text-2xl sm:text-3xl font-bold text-indigo-400">10k+</p>
              <p className="text-xs text-gray-400 mt-1">Tickets Booked</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-purple-400">4.9 ★</p>
              <p className="text-xs text-gray-400 mt-1">User Satisfaction</p>
            </div>
          </div>
        </section>

        {/* Live Countdown Highlight Widget */}
        <div className="my-6 bg-gradient-to-r from-gray-900/90 via-blue-950/40 to-gray-900/90 border border-blue-900/40 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs text-blue-400 uppercase tracking-widest font-bold">Featured Mega Event</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Global Tech & Innovation Summit 2026</h3>
            <p className="text-gray-400 text-sm">Secure your seat before the countdown hits zero!</p>
          </div>

          {/* Countdown boxes */}
          <div className="flex items-center gap-3">
            <div className="bg-gray-800/80 border border-gray-700/80 px-4 py-3 rounded-2xl text-center min-w-[70px] shadow-inner">
              <div className="text-xl md:text-2xl font-extrabold text-blue-400">{timeLeft.days}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Days</div>
            </div>
            <span className="text-gray-600 font-bold">:</span>
            <div className="bg-gray-800/80 border border-gray-700/80 px-4 py-3 rounded-2xl text-center min-w-[70px] shadow-inner">
              <div className="text-xl md:text-2xl font-extrabold text-white">{timeLeft.hours}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Hours</div>
            </div>
            <span className="text-gray-600 font-bold">:</span>
            <div className="bg-gray-800/80 border border-gray-700/80 px-4 py-3 rounded-2xl text-center min-w-[70px] shadow-inner">
              <div className="text-xl md:text-2xl font-extrabold text-white">{timeLeft.minutes}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Mins</div>
            </div>
            <span className="text-gray-600 font-bold">:</span>
            <div className="bg-gray-800/80 border border-gray-700/80 px-4 py-3 rounded-2xl text-center min-w-[70px] shadow-inner">
              <div className="text-xl md:text-2xl font-extrabold text-blue-400">{timeLeft.seconds}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Secs</div>
            </div>
          </div>
        </div>

        {/* 2. BROWSE BY CATEGORY WITH INTERACTIVE FILTERING */}
        <section className="py-12 w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {categoriesList.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat.name)}
                className={`p-5 rounded-2xl text-left transition-all shadow-lg border cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-blue-600/20 border-blue-500 shadow-blue-500/10'
                    : 'bg-gray-900/50 border-gray-800/80 hover:border-gray-700 hover:bg-gray-800/50'
                }`}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-200 text-sm sm:text-base">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {cat.name === 'All' ? 'Explore all' : 'Active Events'}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* 3. FEATURED EVENTS */}
        <section className="py-12 w-full">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">Featured Events</h2>
              <p className="text-gray-400 text-sm mt-1">
                {selectedCategory === 'All' ? "Hand-picked experiences you shouldn't miss" : `Filtered by: ${selectedCategory}`}
              </p>
            </div>
            <Link to="/events" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="text-gray-500 text-center py-12">Loading featured events...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-gray-400 text-center py-12 bg-gray-900/30 border border-gray-800 rounded-2xl">
              No events found matching your search or category. Try clearing filters!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all flex flex-col shadow-xl group"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs px-2.5 py-1 rounded-md font-medium backdrop-blur-sm">
                      {event.category || 'Event'}
                    </span>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white line-clamp-1">{event.title}</h3>
                      <p className="text-gray-400 text-xs mt-2 line-clamp-2">{event.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm font-bold text-blue-400">${event.price || 0}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => promptDeleteEvent(e, event.id, event.title)}
                          className="px-3 py-2 bg-gray-800 hover:bg-red-600/20 hover:text-red-400 text-gray-400 text-xs font-semibold rounded-lg transition-colors border border-gray-700 cursor-pointer"
                          title="Delete Event"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/events/${event.id}`}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-md"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. WHY EVENTURA SECTION */}
        <section className="py-16 w-full border-t border-gray-800/60">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Why Choose Eventura?</h2>
            <p className="text-gray-400 text-sm mt-2">Built for seamless event discovery and ticket management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900/40 border border-gray-800/80 rounded-2xl shadow-lg">
              <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-400 font-bold mb-4 shadow-inner">
                ⚡
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Ticket Generation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get unique digital ticket codes instantly upon booking. View and manage all your tickets in one place.
              </p>
            </div>

            <div className="p-6 bg-gray-900/40 border border-gray-800/80 rounded-2xl shadow-lg">
              <div className="w-10 h-10 bg-indigo-900/50 rounded-lg flex items-center justify-center text-indigo-400 font-bold mb-4 shadow-inner">
                🎟️
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Seat Tracking</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Live seat counts update instantly as tickets are booked, ensuring full transparency for every event.
              </p>
            </div>

            <div className="p-6 bg-gray-900/40 border border-gray-800/80 rounded-2xl shadow-lg">
              <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center text-purple-400 font-bold mb-4 shadow-inner">
                ✨
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Event Hosting</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create and publish your own events in under 2 minutes with custom pricing, categories, and seat counts.
              </p>
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION BANNER */}
        <section className="py-16 w-full text-center">
          <div className="p-10 bg-gradient-to-r from-blue-950 via-gray-900 to-indigo-950 border border-blue-800/40 rounded-3xl relative overflow-hidden shadow-2xl">
            <h2 className="text-3xl font-bold mb-3">Ready to Host Your Own Event?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-6 text-sm sm:text-base">
              Reach thousands of attendees and manage ticket sales effortlessly with Eventura.
            </p>
            <Link
              to="/create-event"
              className="inline-block px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              Create Event Now
            </Link>
          </div>
        </section>
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

export default Home;