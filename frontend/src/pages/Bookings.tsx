import { Link } from 'react-router-dom';
import { CalendarDays, Car } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import { mockBookings } from '../utils/mockData';

export default function Bookings() {
  const bookings = mockBookings;

  const statusVariant = (s: string) => {
    switch (s) { case 'CONFIRMED': return 'success'; case 'PENDING': return 'warning'; case 'CANCELLED': return 'danger'; case 'COMPLETED': return 'default'; default: return 'default'; }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Bookings</h1>
        <p className="mt-2 text-slate-400">Track and manage your parking reservations</p>
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          icon={<CalendarDays size={48} />}
          title="No bookings yet"
          message="You haven't made any parking reservations."
          action={<Link to="/search"><Button>Find Parking</Button></Link>}
        />
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <Link to={`/bookings/${b.id}`} key={b.id}>
              <Card hover className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 !p-5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Car size={22} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{b.spotName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{b.spotAddress}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(b.startTime).toLocaleDateString()} • {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:text-right">
                  <Badge variant={statusVariant(b.status)}>{b.status}</Badge>
                  <span className="text-white font-bold">${b.totalPrice}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
