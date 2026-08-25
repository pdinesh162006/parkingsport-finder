import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Car, CalendarDays } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { mockBookings } from '../utils/mockData';

export default function BookingDetails() {
  const { id } = useParams();
  const booking = mockBookings.find(b => b.id === id) || mockBookings[0];

  const statusVariant = (s: string) => {
    switch (s) { case 'CONFIRMED': return 'success'; case 'PENDING': return 'warning'; case 'CANCELLED': return 'danger'; default: return 'default'; }
  };

  const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED';

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm text-slate-400 mb-6">
        <Link to="/bookings" className="hover:text-indigo-400 transition-colors">Bookings</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">Booking #{booking.id}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Booking Details</h1>
        <Badge variant={statusVariant(booking.status)} className="text-sm">{booking.status}</Badge>
      </div>

      <div className="space-y-6">
        {/* Parking Info */}
        <Card>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Car size={20} /> Parking Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Parking Spot</span>
              <Link to={`/parking/${booking.spotId}`} className="text-indigo-400 hover:text-indigo-300 font-medium">{booking.spotName}</Link>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Address</span>
              <span className="text-slate-200 flex items-center gap-1"><MapPin size={14} /> {booking.spotAddress}</span>
            </div>
          </div>
        </Card>

        {/* Time & Price */}
        <Card>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Clock size={20} /> Schedule & Pricing</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Date</span>
              <span className="text-slate-200">{new Date(booking.startTime).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Start Time</span>
              <span className="text-slate-200">{new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">End Time</span>
              <span className="text-slate-200">{new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-slate-700/50">
              <span className="text-slate-400 font-medium">Total Price</span>
              <span className="text-white text-lg font-bold">${booking.totalPrice}</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        {canCancel && (
          <div className="flex justify-end">
            <Button variant="danger">Cancel Booking</Button>
          </div>
        )}
      </div>
    </div>
  );
}
