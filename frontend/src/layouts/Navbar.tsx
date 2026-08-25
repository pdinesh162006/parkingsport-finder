import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Car, Menu, X, User, LogOut, LayoutDashboard, Shield, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(path) ? 'bg-indigo-500/15 text-indigo-400' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`;

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <Car size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">ParkSpot</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/search" className={linkClass('/search')}>Search</Link>
            <Link to="/map" className={linkClass('/map')}>Map</Link>

            {isAuthenticated && (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
                <Link to="/favorites" className={linkClass('/favorites')}>Favorites</Link>
                <Link to="/bookings" className={linkClass('/bookings')}>Bookings</Link>
              </>
            )}

            {user?.role === 'OWNER' && (
              <Link to="/owner" className={linkClass('/owner')}>
                <span className="flex items-center gap-1"><Building2 size={14} />Owner</span>
              </Link>
            )}

            {user?.role === 'ADMIN' && (
              <Link to="/admin" className={linkClass('/admin')}>
                <span className="flex items-center gap-1"><Shield size={14} />Admin</span>
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* DEV ONLY: Role Switcher */}
            {isAuthenticated && (
              <select
                value={user?.role}
                onChange={(e) => switchRole(e.target.value as 'USER' | 'OWNER' | 'ADMIN')}
                className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-400 focus:outline-none"
                title="DEV: Switch role"
              >
                <option value="USER">👤 User</option>
                <option value="OWNER">🏢 Owner</option>
                <option value="ADMIN">🛡️ Admin</option>
              </select>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="hidden lg:inline">{user?.name}</span>
                </Link>
                <button onClick={logout} className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-slate-300 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            <Link to="/search" className={linkClass('/search') + ' block'} onClick={() => setMobileOpen(false)}>Search</Link>
            <Link to="/map" className={linkClass('/map') + ' block'} onClick={() => setMobileOpen(false)}>Map</Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard') + ' block'} onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link to="/favorites" className={linkClass('/favorites') + ' block'} onClick={() => setMobileOpen(false)}>Favorites</Link>
                <Link to="/bookings" className={linkClass('/bookings') + ' block'} onClick={() => setMobileOpen(false)}>Bookings</Link>
                {user?.role === 'OWNER' && <Link to="/owner" className={linkClass('/owner') + ' block'} onClick={() => setMobileOpen(false)}>Owner Panel</Link>}
                {user?.role === 'ADMIN' && <Link to="/admin" className={linkClass('/admin') + ' block'} onClick={() => setMobileOpen(false)}>Admin Panel</Link>}
              </>
            )}
            <div className="pt-3 border-t border-slate-700/50">
              {isAuthenticated ? (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer">
                  <LogOut size={16} /> Logout
                </button>
              ) : (
                <div className="space-y-1">
                  <Link to="/login" className="block px-3 py-2 text-sm text-slate-300 hover:text-white rounded-lg" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/register" className="block px-3 py-2 text-sm text-indigo-400 font-medium rounded-lg" onClick={() => setMobileOpen(false)}>Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
