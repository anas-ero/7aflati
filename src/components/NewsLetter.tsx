import { Check } from "lucide-react";
const NewsletterSection = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-brand-accent/5"></div>
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl"></div>
    
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay in the Loop</h2>
      <p className="text-slate-400 mb-8 max-w-lg mx-auto">
        Get weekly updates on the hottest tech summits, music festivals, and exclusive gatherings directly to your inbox.
      </p>
      
      <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="flex-1 bg-brand-card border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
        />
        <button className="bg-brand-accent text-brand-dark font-bold px-8 py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
          Subscribe <Check className="w-5 h-5" />
        </button>
      </form>
    </div>
  </section>
);

export default NewsletterSection;