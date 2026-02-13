import React, { useState, useMemo } from "react";
import type { Event, UserRegistration } from "./types";
import { RegistrationModal } from "./components/RegistrationModal";
// import { supabase } from "./lib/supabase";
// import { signUp, signIn, signOut } from "./auth";
// import { Routes, Route, Link } from "react-router-dom";
import StatsSection from "./components/StatsSection";
import NewsletterSection from "./components/NewsLetter";
import FeaturedEvent from "./components/FeatureCard";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import { supabase } from "./lib/supabase";
import { useEffect } from "react";
const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<Event | null>(null);
  const [showMagicModal, setShowMagicModal] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);
  // Select the first event as the featured one
  const featuredEvent = events[0];

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  }
  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setEvents(data || []);
      setLoading(false);
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 font-sans selection:bg-brand-accent selection:text-brand-dark">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedEvent event={featuredEvent} onRegister={handleRegister} />
      <MainContent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filteredEvents={filteredEvents}
        handleRegister={handleRegister}
        handleViewDetails={handleViewDetails}
      />
      <NewsletterSection />
      <Footer />

      <RegistrationModal
        event={selectedEvent}
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}

      />
    </div>
  );
};

export default App;
