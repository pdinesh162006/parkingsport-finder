import { MapPin, Navigation } from 'lucide-react';
import Card from '../components/Card';
import { mockParkingSpots } from '../utils/mockData';

export default function ParkingMap() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Parking Map</h1>
        <p className="mt-2 text-slate-400">Explore parking spots on the interactive map</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map placeholder */}
        <div className="lg:col-span-2">
          <div className="h-[500px] lg:h-[600px] rounded-2xl border border-slate-700/50 bg-slate-800/50 flex flex-col items-center justify-center gap-4">
            <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <MapPin size={32} className="text-indigo-400" />
            </div>
            <div className="text-center">
              <h3 className="text-white font-semibold">Interactive Map</h3>
              <p className="text-sm text-slate-400 mt-1">Map provider will be connected in Phase 7</p>
              <p className="text-xs text-slate-500 mt-2">Google Maps or Mapbox — configured via MAP_API_KEY</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-xl text-sm font-medium hover:bg-indigo-500/20 transition-colors cursor-pointer">
              <Navigation size={16} /> Use My Location
            </button>
          </div>
        </div>

        {/* Sidebar listing */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          <h3 className="text-sm font-semibold text-slate-300 sticky top-0 bg-slate-950 py-2">Nearby Spots ({mockParkingSpots.length})</h3>
          {mockParkingSpots.map(spot => (
            <Card key={spot.id} hover className="!p-4">
              <h4 className="text-white font-medium text-sm">{spot.name}</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><MapPin size={12} /> {spot.address}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-indigo-400 text-sm font-bold">${spot.pricePerHour}/hr</span>
                <span className={`text-xs font-medium ${spot.availableSlots > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {spot.availableSlots > 0 ? `${spot.availableSlots} spots` : 'Full'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
