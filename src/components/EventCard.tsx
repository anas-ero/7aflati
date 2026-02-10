import React from 'react';
import type { Event } from '../types';
import { Calendar, MapPin } from './Icons';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  onViewDetails: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegister, onViewDetails }) => {
  const isLowSpots = event.spots < 50;

  return (
    <div className="group flex flex-col h-full bg-brand-card rounded-2xl border border-slate-700/50 hover:border-brand-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/10 overflow-hidden">
      <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => onViewDetails(event)}>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-90" />
        
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-white">
          {event.category}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-brand-accent transition-colors">{event.title}</h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-slate-400 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-brand-accent shrink-0" />
            <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} • {event.time}</span>
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-brand-accent shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-lg">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </div>
            <div className={`text-xs font-medium ${isLowSpots ? 'text-amber-500' : 'text-slate-500'}`}>
              {event.spots} spots left
            </div>
          </div>
          <button 
            onClick={() => onRegister(event)}
            className="px-4 py-2 bg-slate-100 text-brand-dark font-semibold rounded-lg hover:bg-brand-accent hover:text-white transition-all duration-200 shadow-sm"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};