import { CalendarDays, Check, X } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { mockBookings } from '../../utils/mockData';

export default function OwnerBookings() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Incoming Bookings</h1>
        <p className="mt-2 text-slate-400">Manage bookings made for your parking spots</p>
      </div>

      <div className="space-y-4">
        {mockBookings.map(b => (
          <Card key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                <CalendarDays size={22} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-white font-semibold">{b.spotName}</div>
                <div className="text-xs text-slate-400 mt-0.5">Booked by User #{b.userId} • {new Date(b.startTime).toLocaleDateString()}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={b.status === 'CONFIRMED' ? 'success' : b.status === 'PENDING' ? 'warning' : b.status === 'CANCELLED' ? 'danger' : 'default'}>{b.status}</Badge>
              <span className="text-white font-bold">${b.totalPrice}</span>
              {b.status === 'PENDING' && (
                <div className="flex gap-2">
                  <Button size="sm" variant="primary"><Check size={16} /></Button>
                  <Button size="sm" variant="danger"><X size={16} /></Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
