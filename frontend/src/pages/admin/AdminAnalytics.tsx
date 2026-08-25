import { TrendingUp, Users, Car, CalendarDays, DollarSign, BarChart3 } from 'lucide-react';
import Card from '../../components/Card';

export default function AdminAnalytics() {
  const monthlyData = [
    { month: 'Jan', bookings: 320, revenue: '$3,200' },
    { month: 'Feb', bookings: 410, revenue: '$4,100' },
    { month: 'Mar', bookings: 520, revenue: '$5,200' },
    { month: 'Apr', bookings: 480, revenue: '$4,800' },
    { month: 'May', bookings: 610, revenue: '$6,100' },
    { month: 'Jun', bookings: 590, revenue: '$5,900' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Platform Analytics</h1>
        <p className="mt-2 text-slate-400">Comprehensive overview of platform performance</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Users size={20} />, label: 'Active Users', value: '843', change: '+15%', color: 'text-indigo-400 bg-indigo-500/10' },
          { icon: <Car size={20} />, label: 'Active Spots', value: '285', change: '+6%', color: 'text-emerald-400 bg-emerald-500/10' },
          { icon: <CalendarDays size={20} />, label: 'Monthly Bookings', value: '590', change: '-3%', color: 'text-amber-400 bg-amber-500/10' },
          { icon: <DollarSign size={20} />, label: 'Monthly Revenue', value: '$5,900', change: '+18%', color: 'text-violet-400 bg-violet-500/10' },
        ].map(s => (
          <Card key={s.label}>
            <div className="flex items-center justify-between mb-3">
              <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${s.color}`}>{s.icon}</div>
              <span className={`text-xs font-medium ${s.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</span>
            </div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-sm text-slate-400 mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Chart placeholder + Monthly data */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp size={20} /> Booking Trends</h2>
          <div className="h-64 rounded-xl bg-slate-900/50 border border-slate-700/30 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={40} className="text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Chart visualization coming soon</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 text-slate-400">
                  <th className="text-left py-2 px-2 font-medium">Month</th>
                  <th className="text-right py-2 px-2 font-medium">Bookings</th>
                  <th className="text-right py-2 px-2 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map(row => (
                  <tr key={row.month} className="border-b border-slate-800">
                    <td className="py-2 px-2 text-white">{row.month}</td>
                    <td className="py-2 px-2 text-right text-slate-300">{row.bookings}</td>
                    <td className="py-2 px-2 text-right text-emerald-400 font-medium">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
