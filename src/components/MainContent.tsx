import { EventCard } from "./EventCard";
import SearchBar from "./SearchBar";
import { Search } from "lucide-react";
import type { Event } from "../types";

interface MainContentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredEvents: Event[];
  handleRegister: (event: Event) => void;
  handleViewDetails: (event: Event) => void;
}

const MainContent = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  filteredEvents,
  handleRegister,
  handleViewDetails,
}: MainContentProps) => {
  return (
    <section id="events" className="py-24 bg-brand-dark/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Upcoming Schedule
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Browse through our hand-picked selection of events happening around
            the globe. Filter by category or search to find exactly what moves
            you.
          </p>
        </div>

        {/* Controls */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-slate-800 rounded-3xl bg-brand-card/30">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 mb-6">
              <Search className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No events found
            </h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              We couldn't find any events matching your criteria. Try adjusting
              your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-8 py-3 bg-brand-accent text-brand-dark font-bold rounded-xl hover:bg-white transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainContent;
