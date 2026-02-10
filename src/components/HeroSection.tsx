const HeroSection = () => {
  return (
<section className="relative pt-32 pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            Live Event Discovery
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Curated{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-500">
              Memories
            </span>
            <br />
            Wait For You.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            The premier platform for discovering tech summits, music festivals,
            and art galas. Join over 50,000 attendees finding their next
            passion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <a
              href="#events"
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-brand-dark font-bold rounded-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-brand-accent/20"
            >
              Explore Events
            </a>
          </div>
        </div>
      </section>
    )}
export default HeroSection;