import { useState } from 'react';
import { User, Mail, Shield } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

      <div className="space-y-6">
        {/* Avatar & role */}
        <Card className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl text-white font-bold shadow-lg shadow-indigo-500/25">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name}</h2>
            <p className="text-slate-400 text-sm">{user?.email}</p>
            <Badge variant="info" className="mt-2"><Shield size={12} /> {user?.role}</Badge>
          </div>
        </Card>

        {/* Edit form */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Edit Profile</h3>
          <form className="space-y-5">
            <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} icon={<User size={18} />} />
            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail size={18} />} />
            <div className="pt-2">
              <Button type="button">Save Changes</Button>
            </div>
          </form>
        </Card>

        {/* Change password */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
          <form className="space-y-5">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
            <div className="pt-2">
              <Button type="button">Update Password</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
