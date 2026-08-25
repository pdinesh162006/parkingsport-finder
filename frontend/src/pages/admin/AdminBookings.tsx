import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { mockBookings } from '../../utils/mockData';

export default function AdminBookings() {
  const statusVariant = (s: string) => {
    switch (s) { case 'CONFIRMED': return 'success'; case 'PENDING': return 'warning'; case 'CANCELLED': return 'danger'; default: return 'default'; }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Booking Management</h1>
        <p className="mt-2 text-slate-400">View and manage all bookings across the platform</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400">
                <th className="text-left py-3 px-3 font-medium">Booking ID</th>
                <th className="text-left py-3 px-3 font-medium">Spot</th>
                <th className="text-left py-3 px-3 font-medium">User</th>
                <th className="text-left py-3 px-3 font-medium">Date</th>
                <th className="text-right py-3 px-3 font-medium">Amount</th>
                <th className="text-right py-3 px-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map(b => (
                <tr key={b.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 text-white font-mono">#{b.id}</td>
                  <td className="py-3 px-3 text-white">{b.spotName}</td>
                  <td className="py-3 px-3 text-slate-300">User #{b.userId}</td>
                  <td className="py-3 px-3 text-slate-400">{new Date(b.startTime).toLocaleDateString()}</td>
                  <td className="py-3 px-3 text-right text-white font-medium">${b.totalPrice}</td>
                  <td className="py-3 px-3 text-right"><Badge variant={statusVariant(b.status)}>{b.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
