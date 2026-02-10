import React, { useState, useEffect, useMemo } from "react";
import { MOCK_EVENTS } from "./constants";
import type { Event, UserRegistration } from "./types";
import { RegistrationModal } from "./components/RegistrationModal";
import { supabase } from "./lib/supabase";
import { signUp, signIn, signOut } from "./auth";
import { Routes, Route, Link } from "react-router-dom";
import StatsSection from "./components/StatsSection";
import NewsletterSection from "./components/NewsLetter";
import FeaturedEvent from "./components/FeatureCard";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Select the first event as the featured one
  const featuredEvent = MOCK_EVENTS[0];

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  const handleRegistrationSubmit = (data: UserRegistration) => {
    console.log("Registration Data Submitted:", data);
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };
  

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 font-sans selection:bg-brand-accent selection:text-brand-dark">
      <Navbar/> 
      <HeroSection  />
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

      {/* Global Components
      <AIChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} /> */}

      <RegistrationModal
        event={selectedEvent}
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  );
};

export default App;
