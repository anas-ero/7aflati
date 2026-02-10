const StatsSection = () => (
  <div className="w-full bg-slate-900/50 border-y border-white/5 backdrop-blur-sm relative z-20 -mt-10 mb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
        <div className="text-center px-4">
          <div className="text-3xl md:text-4xl font-bold text-white mb-1">50k+</div>
          <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Attendees</div>
        </div>
        <div className="text-center px-4">
          <div className="text-3xl md:text-4xl font-bold text-white mb-1">100+</div>
          <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Global Events</div>
        </div>
        <div className="text-center px-4">
          <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
          <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Speakers</div>
        </div>
        <div className="text-center px-4">
          <div className="text-3xl md:text-4xl font-bold text-white mb-1">4.9/5</div>
          <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Avg Rating</div>
        </div>
      </div>
    </div>
  </div>
);   
export default StatsSection;