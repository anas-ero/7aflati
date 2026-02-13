import React from "react";
import type { Event } from "../types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { X, Calendar, MapPin} from "./Icons";
import { Link } from "react-router";
interface RegistrationModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !event) return null;

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
            src={event.image_url}
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
          <div className="grid w-full max-w-md items-start gap-4">
            <Alert className="bg-brand-card/50 border-white">
              <CheckCircle2Icon color="white" />
              <AlertTitle className="text-white">
                To register to this event
              </AlertTitle>
              <AlertDescription className="text-slate-300">
                Please sign up or log in to your account to complete the
                registration process.
              </AlertDescription>
            </Alert>
            <Button variant="outline" className="w-full text-black">
              <Link to="/signup">Sign in here</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
