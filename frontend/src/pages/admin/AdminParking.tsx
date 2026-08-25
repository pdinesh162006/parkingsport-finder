import { Trash2, Edit, MapPin, Car } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { mockParkingSpots } from '../../utils/mockData';

export default function AdminParking() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Parking Management</h1>
        <p className="mt-2 text-slate-400">Manage all parking spots on the platform</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400">
                <th className="text-left py-3 px-3 font-medium">Spot</th>
                <th className="text-left py-3 px-3 font-medium">Owner</th>
                <th className="text-right py-3 px-3 font-medium">Price</th>
                <th className="text-right py-3 px-3 font-medium">Slots</th>
                <th className="text-right py-3 px-3 font-medium">Rating</th>
                <th className="text-right py-3 px-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockParkingSpots.map(spot => (
                <tr key={spot.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center shrink-0"><Car size={18} className="text-slate-400" /></div>
                      <div>
                        <div className="text-white font-medium">{spot.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} /> {spot.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{spot.ownerName}</td>
                  <td className="py-3 px-3 text-right text-indigo-400 font-medium">${spot.pricePerHour}/hr</td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant={spot.availableSlots > 0 ? 'success' : 'danger'}>{spot.availableSlots}/{spot.totalSlots}</Badge>
                  </td>
                  <td className="py-3 px-3 text-right text-amber-400">⭐ {spot.rating}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm"><Edit size={14} /></Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300"><Trash2 size={14} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
