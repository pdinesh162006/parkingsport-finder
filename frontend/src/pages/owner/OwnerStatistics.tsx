import { TrendingUp, DollarSign, Car, Star, BarChart3 } from 'lucide-react';
import Card from '../../components/Card';

export default function OwnerStatistics() {
  const stats = [
    { icon: <Car size={20} />, label: 'Total Spots', value: '3', color: 'text-indigo-400 bg-indigo-500/10' },
    { icon: <TrendingUp size={20} />, label: 'Total Bookings', value: '47', color: 'text-emerald-400 bg-emerald-500/10' },
    { icon: <DollarSign size={20} />, label: 'Total Revenue', value: '$2,340', color: 'text-amber-400 bg-amber-500/10' },
    { icon: <Star size={20} />, label: 'Avg Rating', value: '4.5', color: 'text-violet-400 bg-violet-500/10' },
  ];

  const spotStats = [
    { name: 'Downtown Central Parking', bookings: 23, revenue: '$1,150', occupancy: '66%', rating: 4.5 },
    { name: 'Airport Long-Term Lot', bookings: 15, revenue: '$735', occupancy: '59%', rating: 4.2 },
    { name: 'Harbor View Parking', bookings: 9, revenue: '$455', occupancy: '71%', rating: 4.7 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Statistics</h1>
        <p className="mt-2 text-slate-400">Overview of your parking business performance</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <Card key={s.label}>
            <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${s.color} mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-sm text-slate-400 mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Per-spot table */}
      <Card>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><BarChart3 size={20} /> Per-Spot Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400">
                <th className="text-left py-3 px-2 font-medium">Parking Spot</th>
                <th className="text-right py-3 px-2 font-medium">Bookings</th>
                <th className="text-right py-3 px-2 font-medium">Revenue</th>
                <th className="text-right py-3 px-2 font-medium">Occupancy</th>
                <th className="text-right py-3 px-2 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {spotStats.map(row => (
                <tr key={row.name} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-2 text-white font-medium">{row.name}</td>
                  <td className="py-3 px-2 text-right text-slate-300">{row.bookings}</td>
                  <td className="py-3 px-2 text-right text-emerald-400 font-medium">{row.revenue}</td>
                  <td className="py-3 px-2 text-right text-slate-300">{row.occupancy}</td>
                  <td className="py-3 px-2 text-right text-amber-400">⭐ {row.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
