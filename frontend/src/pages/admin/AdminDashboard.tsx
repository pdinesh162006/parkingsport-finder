import { Link } from 'react-router-dom';
import { Users, Car, CalendarDays, DollarSign, ArrowRight, TrendingUp, Shield } from 'lucide-react';
import Card from '../../components/Card';

export default function AdminDashboard() {
  const stats = [
    { icon: <Users size={20} />, label: 'Total Users', value: '1,245', change: '+12%', color: 'text-indigo-400 bg-indigo-500/10' },
    { icon: <Car size={20} />, label: 'Parking Spots', value: '328', change: '+8%', color: 'text-emerald-400 bg-emerald-500/10' },
    { icon: <CalendarDays size={20} />, label: 'Total Bookings', value: '5,672', change: '+23%', color: 'text-amber-400 bg-amber-500/10' },
    { icon: <DollarSign size={20} />, label: 'Revenue', value: '$45,230', change: '+18%', color: 'text-violet-400 bg-violet-500/10' },
  ];

  const quickLinks = [
    { label: 'Users', desc: 'Manage users & owners', to: '/admin/users', icon: <Users size={20} /> },
    { label: 'Parking', desc: 'Manage all parking spots', to: '/admin/parking', icon: <Car size={20} /> },
    { label: 'Bookings', desc: 'View all bookings', to: '/admin/bookings', icon: <CalendarDays size={20} /> },
    { label: 'Analytics', desc: 'Platform statistics', to: '/admin/analytics', icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <Shield size={20} className="text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-1 text-slate-400">Platform overview and management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <Card key={s.label}>
            <div className="flex items-center justify-between mb-3">
              <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${s.color}`}>{s.icon}</div>
              <span className="text-xs text-emerald-400 font-medium">{s.change}</span>
            </div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-sm text-slate-400 mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Quick links grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map(link => (
          <Link to={link.to} key={link.label}>
            <Card hover className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-slate-300 shrink-0">{link.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm">{link.label}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
              </div>
              <ArrowRight size={16} className="text-slate-500 shrink-0" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
