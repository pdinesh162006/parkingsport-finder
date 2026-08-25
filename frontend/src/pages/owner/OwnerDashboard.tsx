import { Link } from 'react-router-dom';
import { Car, CalendarDays, DollarSign, Star, ArrowRight, Plus } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { mockParkingSpots, mockBookings } from '../../utils/mockData';

export default function OwnerDashboard() {
  const mySpots = mockParkingSpots.filter(s => s.ownerId === '2');
  const myBookings = mockBookings.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Owner Dashboard</h1>
          <p className="mt-2 text-slate-400">Manage your parking business</p>
        </div>
        <Link to="/owner/parking/new">
          <Button><Plus size={18} /> Add Parking</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Car size={20} />, label: 'My Spots', value: mySpots.length, color: 'text-indigo-400 bg-indigo-500/10' },
          { icon: <CalendarDays size={20} />, label: 'Total Bookings', value: 47, color: 'text-emerald-400 bg-emerald-500/10' },
          { icon: <DollarSign size={20} />, label: 'Revenue', value: '$2,340', color: 'text-amber-400 bg-amber-500/10' },
          { icon: <Star size={20} />, label: 'Avg Rating', value: '4.5', color: 'text-violet-400 bg-violet-500/10' },
        ].map(stat => (
          <Card key={stat.label}>
            <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${stat.color} mb-3`}>{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-slate-400 mt-0.5">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* My Spots */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">My Parking Spots</h2>
          <Link to="/owner/parking" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
            Manage All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mySpots.map(spot => (
            <div key={spot.id} className="p-4 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
              <h3 className="text-white font-medium text-sm">{spot.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{spot.address}</p>
              <div className="flex items-center justify-between mt-3">
                <Badge variant={spot.availableSlots > 0 ? 'success' : 'danger'}>{spot.availableSlots}/{spot.totalSlots}</Badge>
                <span className="text-indigo-400 text-sm font-bold">${spot.pricePerHour}/hr</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
          <Link to="/owner/bookings" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="space-y-3">
          {myBookings.map(b => (
            <div key={b.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-700/30 transition-colors">
              <div>
                <div className="text-sm font-medium text-white">{b.spotName}</div>
                <div className="text-xs text-slate-400">{new Date(b.startTime).toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <Badge variant={b.status === 'CONFIRMED' ? 'success' : b.status === 'PENDING' ? 'warning' : 'default'}>{b.status}</Badge>
                <div className="text-sm text-white font-medium mt-1">${b.totalPrice}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
