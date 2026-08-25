import { Link } from 'react-router-dom';
import { Car, Heart, CalendarDays, Star, ArrowRight, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { useAuth } from '../contexts/AuthContext';
import { mockBookings, mockFavorites } from '../utils/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const recentBookings = mockBookings.slice(0, 3);

  const statusVariant = (s: string) => {
    switch (s) { case 'CONFIRMED': return 'success'; case 'PENDING': return 'warning'; case 'CANCELLED': return 'danger'; default: return 'default'; }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name} 👋</h1>
        <p className="mt-2 text-slate-400">Here's what's happening with your parking activity</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <CalendarDays size={20} />, label: 'Total Bookings', value: mockBookings.length, color: 'text-indigo-400 bg-indigo-500/10' },
          { icon: <Car size={20} />, label: 'Active Bookings', value: mockBookings.filter(b => b.status === 'CONFIRMED').length, color: 'text-emerald-400 bg-emerald-500/10' },
          { icon: <Heart size={20} />, label: 'Favorites', value: mockFavorites.length, color: 'text-rose-400 bg-rose-500/10' },
          { icon: <TrendingUp size={20} />, label: 'Total Spent', value: `$${mockBookings.reduce((a, b) => a + b.totalPrice, 0)}`, color: 'text-amber-400 bg-amber-500/10' },
        ].map(stat => (
          <Card key={stat.label}>
            <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${stat.color} mb-3`}>{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-slate-400 mt-0.5">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
          <Link to="/bookings" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentBookings.map(b => (
            <Link to={`/bookings/${b.id}`} key={b.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center"><Car size={18} className="text-indigo-400" /></div>
                <div>
                  <div className="text-sm font-medium text-white">{b.spotName}</div>
                  <div className="text-xs text-slate-400">{new Date(b.startTime).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={statusVariant(b.status)}>{b.status}</Badge>
                <div className="text-sm text-white font-medium mt-1">${b.totalPrice}</div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
