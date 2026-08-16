import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    event_date: '',
    location: '',
    available_seats: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(),
      ...formData,
      price: Number(formData.price) || 0,
      image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop'
    };

    const existingEvents = JSON.parse(localStorage.getItem('created_events') || '[]');
    localStorage.setItem('created_events', JSON.stringify([newEvent, ...existingEvents]));

    navigate('/events');
  };

  return (
    <div className="min-h-[85vh] bg-[#0b0f19] text-white px-6 py-10 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#111827] border border-gray-800/80 rounded-2xl p-8 shadow-xl">
        
        <div className="flex items-center gap-3 mb-6">
          <span className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl text-xl font-bold">+</span>
          <div>
            <h1 className="text-2xl font-bold text-white">Host a New Event</h1>
            <p className="text-xs text-gray-400 mt-0.5">Fill in details below to publish your event on Eventura.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. AI & Full-Stack Summit"
              className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700/70 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Category & Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700/70 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="Technology" className="bg-[#0f172a] text-white py-2">Technology</option>
                <option value="Music" className="bg-[#0f172a] text-white py-2">Music</option>
                <option value="Workshop" className="bg-[#0f172a] text-white py-2">Workshop</option>
                <option value="Seminar" className="bg-[#0f172a] text-white py-2">Seminar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Event Date
              </label>
              <input
                type="date"
                name="event_date"
                required
                value={formData.event_date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700/70 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Convention Center, Tech Hub"
              className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700/70 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Seats & Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Available Seats
              </label>
              <input
                type="number"
                name="available_seats"
                min="1"
                required
                value={formData.available_seats}
                onChange={handleChange}
                placeholder="50"
                className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700/70 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                min="0"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="0 for Free"
                className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700/70 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all text-sm mt-4"
          >
            Publish Event
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateEvent;