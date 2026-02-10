import { Calendar, MapPin, Sparkles } from "lucide-react";
import type { Event } from "../types";

const FeaturedEvent = ({
  event,
  onRegister,
}: {
  event: Event;
  onRegister: (e: Event) => void;
}) => {
  if (!event) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="relative rounded-3xl overflow-hidden bg-brand-card border border-slate-700/50 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto min-h-[400px]">
            <img
              src={event.image}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-card via-brand-card/20 to-transparent md:bg-gradient-to-t md:from-brand-card md:via-transparent md:to-transparent"></div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 text-brand-accent font-semibold tracking-wider text-sm uppercase mb-4">
              <Sparkles className="w-4 h-4" /> Featured Event
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {event.title}
            </h2>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-6 text-slate-300 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-accent" />
                {new Date(event.date).toLocaleDateString(undefined, {
                  dateStyle: "long",
                })}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-accent" />
                {event.location}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onRegister(event)}
                className="px-8 py-4 bg-white text-brand-dark font-bold rounded-xl hover:bg-brand-accent hover:text-white transition-all shadow-lg shadow-white/5"
              >
                Secure Your Spot
              </button>
              <div className="text-sm text-slate-500">
                Starting from{" "}
                <span className="text-white font-bold text-lg">
                  ${event.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedEvent;
