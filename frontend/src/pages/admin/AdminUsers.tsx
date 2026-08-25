import { Ban, CheckCircle, Shield } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { mockUsers } from '../../utils/mockData';

export default function AdminUsers() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="mt-2 text-slate-400">View and manage all platform users</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400">
                <th className="text-left py-3 px-3 font-medium">User</th>
                <th className="text-left py-3 px-3 font-medium">Email</th>
                <th className="text-left py-3 px-3 font-medium">Role</th>
                <th className="text-left py-3 px-3 font-medium">Joined</th>
                <th className="text-right py-3 px-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(u => (
                <tr key={u.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs text-white font-bold">{u.name.charAt(0)}</div>
                      <span className="text-white font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{u.email}</td>
                  <td className="py-3 px-3">
                    <Badge variant={u.role === 'ADMIN' ? 'danger' : u.role === 'OWNER' ? 'warning' : 'info'}>
                      {u.role === 'ADMIN' && <Shield size={12} />} {u.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{u.createdAt}</td>
                  <td className="py-3 px-3 text-right">
                    {u.role !== 'ADMIN' && (
                      <Button variant="ghost" size="sm"><Ban size={14} /> Suspend</Button>
                    )}
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
