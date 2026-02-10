import React, { useState } from "react";
import type { Event } from "../types";
import type { UserRegistration } from "../types";
import { X, Calendar, MapPin, Check } from "./Icons";

interface RegistrationModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserRegistration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ticketType: "General" as "General" | "VIP",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onSubmit({ ...formData, eventId: event.id });
        setSuccess(false);
        setFormData({ name: "", email: "", ticketType: "General" }); // Reset
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-brand-card w-full max-w-md rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative h-32">
          <img
            src={event.image}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6">
            <h3 className="text-xl font-bold text-white shadow-black drop-shadow-md">
              {event.title}
            </h3>
            <div className="flex items-center text-slate-300 text-xs mt-1">
              <Calendar className="w-3 h-3 mr-1" />{" "}
              {new Date(event.date).toLocaleDateString()}
              <span className="mx-2">•</span>
              <MapPin className="w-3 h-3 mr-1" /> {event.location}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">You're In!</h4>
              <p className="text-slate-400">
                Registration confirmed for {event.title}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Ticket Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, ticketType: "General" })
                    }
                    className={`px-4 py-3 rounded-lg border text-sm font-semibold transition-all ${
                      formData.ticketType === "General"
                        ? "bg-brand-accent/10 border-brand-accent text-brand-accent"
                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    General
                    <div className="text-xs font-normal opacity-70 mt-0.5">
                      ${event.price}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, ticketType: "VIP" })
                    }
                    className={`px-4 py-3 rounded-lg border text-sm font-semibold transition-all ${
                      formData.ticketType === "VIP"
                        ? "bg-brand-accent/10 border-brand-accent text-brand-accent"
                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    VIP
                    <div className="text-xs font-normal opacity-70 mt-0.5">
                      ${event.price + 50}
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-accent hover:text-white transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin"></span>
                  ) : (
                    "Confirm Registration"
                  )}
                </button>
                <p className="text-center text-xs text-slate-500 mt-3">
                  By registering, you agree to our Terms of Service.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
