import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Car, MapPin } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { mockParkingSpots } from '../../utils/mockData';

export default function MyParking() {
  const mySpots = mockParkingSpots.filter(s => s.ownerId === '2');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Parking Spots</h1>
          <p className="mt-2 text-slate-400">Manage and update your parking listings</p>
        </div>
        <Link to="/owner/parking/new">
          <Button><Plus size={18} /> Add New Spot</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {mySpots.map(spot => (
          <Card key={spot.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shrink-0">
                <Car size={24} className="text-slate-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{spot.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><MapPin size={12} /> {spot.address}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant={spot.availableSlots > 0 ? 'success' : 'danger'}>{spot.availableSlots}/{spot.totalSlots} slots</Badge>
                  <span className="text-indigo-400 text-sm font-bold">${spot.pricePerHour}/hr</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/owner/parking/${spot.id}/edit`}>
                <Button variant="secondary" size="sm"><Edit size={16} /> Edit</Button>
              </Link>
              <Button variant="danger" size="sm"><Trash2 size={16} /> Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
