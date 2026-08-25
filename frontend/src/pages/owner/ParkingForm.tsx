import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, DollarSign, Car, Hash, FileText } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { mockParkingSpots } from '../../utils/mockData';

export default function ParkingForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const existingSpot = isEditing ? mockParkingSpots.find(s => s.id === id) : null;
  const navigate = useNavigate();

  const [name, setName] = useState(existingSpot?.name || '');
  const [description, setDescription] = useState(existingSpot?.description || '');
  const [address, setAddress] = useState(existingSpot?.address || '');
  const [pricePerHour, setPricePerHour] = useState(existingSpot?.pricePerHour?.toString() || '');
  const [totalSlots, setTotalSlots] = useState(existingSpot?.totalSlots?.toString() || '');
  const [lat, setLat] = useState(existingSpot?.lat?.toString() || '');
  const [lng, setLng] = useState(existingSpot?.lng?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will wire to API in Phase 6
    navigate('/owner/parking');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">{isEditing ? 'Edit Parking Spot' : 'Add New Parking Spot'}</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Parking Name" placeholder="e.g. Downtown Central Parking" value={name} onChange={e => setName(e.target.value)} icon={<Car size={18} />} />
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea
              value={description} onChange={e => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none min-h-[100px] resize-y"
              placeholder="Describe your parking spot..."
            />
          </div>

          <Input label="Address" placeholder="123 Main St, City" value={address} onChange={e => setAddress(e.target.value)} icon={<MapPin size={18} />} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Latitude" type="number" placeholder="40.7128" value={lat} onChange={e => setLat(e.target.value)} />
            <Input label="Longitude" type="number" placeholder="-74.006" value={lng} onChange={e => setLng(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Price per Hour ($)" type="number" placeholder="5.00" value={pricePerHour} onChange={e => setPricePerHour(e.target.value)} icon={<DollarSign size={18} />} />
            <Input label="Total Slots" type="number" placeholder="100" value={totalSlots} onChange={e => setTotalSlots(e.target.value)} icon={<Hash size={18} />} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Images</label>
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
              <FileText size={24} className="mx-auto text-slate-500 mb-2" />
              <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button type="submit">{isEditing ? 'Update Spot' : 'Create Spot'}</Button>
            <Button variant="ghost" type="button" onClick={() => navigate('/owner/parking')}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
