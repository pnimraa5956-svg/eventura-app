import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col h-full">
      {event.image_url && (
        <img 
          src={event.image_url} 
          alt={event.title} 
          className="w-full h-48 object-cover" 
        />
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <span className="self-start text-xs font-semibold text-blue-400 bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-800/50 mb-3">
          {event.category}
        </span>
        
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{event.description}</p>
        
        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>📍 {event.location}</span>
          
          {/* 👇 This Link connects directly to the View Details page */}
          <Link 
            to={`/events/${event.id}`} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;