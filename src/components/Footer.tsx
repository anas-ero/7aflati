const Footer = () => {
  return (
<footer className="bg-brand-card border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-white">7aflati</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Connecting people through unforgettable experiences. The world's
                leading platform for event discovery and management.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Browse Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Organizers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-accent transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-600 text-md">
              &copy; {new Date().getFullYear()} 
            </div>
          </div>
        </div>
      </footer>
    );
}
export default Footer;