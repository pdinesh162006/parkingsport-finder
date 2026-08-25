import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-900/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
                <Car size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">ParkSpot</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">Find and book parking spots near you with real-time availability and competitive prices.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/search" className="hover:text-indigo-400 transition-colors">Search Parking</Link></li>
              <li><Link to="/map" className="hover:text-indigo-400 transition-colors">Parking Map</Link></li>
              <li><Link to="/bookings" className="hover:text-indigo-400 transition-colors">My Bookings</Link></li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">For Owners</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/owner" className="hover:text-indigo-400 transition-colors">Owner Dashboard</Link></li>
              <li><Link to="/owner/parking" className="hover:text-indigo-400 transition-colors">List Your Parking</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ParkSpot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
