import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin, SlidersHorizontal, Car, X } from 'lucide-react';
import Input from '../components/Input';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StarRating from '../components/StarRating';
import Button from '../components/Button';
import { mockParkingSpots } from '../utils/mockData';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [minRating, setMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = mockParkingSpots.filter(s => {
    if (query && !s.name.toLowerCase().includes(query.toLowerCase()) && !s.address.toLowerCase().includes(query.toLowerCase())) return false;
    if (s.pricePerHour < priceRange[0] || s.pricePerHour > priceRange[1]) return false;
    if (s.rating < minRating) return false;
    if (availableOnly && s.availableSlots === 0) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Search Parking</h1>
        <p className="mt-2 text-slate-400">Find the perfect spot for your vehicle</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search by name or location..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            icon={<SearchIcon size={18} />}
          />
        </div>
        <Button variant={showFilters ? 'primary' : 'secondary'} onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={18} /> Filters
        </Button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Filters</h3>
            <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Max Price ($/hr)</label>
              <input
                type="range" min="0" max="50" value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-indigo-500"
              />
              <div className="text-sm text-slate-400 mt-1">Up to ${priceRange[1]}/hr</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Min Rating</label>
              <StarRating rating={minRating} interactive onChange={setMinRating} size={24} />
              <div className="text-sm text-slate-400 mt-1">{minRating > 0 ? `${minRating}+ stars` : 'Any rating'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Availability</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="accent-indigo-500 h-4 w-4" />
                <span className="text-sm text-slate-300">Available spots only</span>
              </label>
            </div>
          </div>
        </Card>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-slate-400">{filtered.length} parking spot{filtered.length !== 1 ? 's' : ''} found</div>

      {/* Results grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(spot => (
          <Link to={`/parking/${spot.id}`} key={spot.id}>
            <Card hover className="h-full">
              <div className="h-36 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 mb-4 flex items-center justify-center">
                <Car size={36} className="text-slate-500" />
              </div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-white font-semibold text-sm">{spot.name}</h3>
                <Badge variant={spot.availableSlots > 0 ? 'success' : 'danger'}>
                  {spot.availableSlots > 0 ? `${spot.availableSlots} open` : 'Full'}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mb-3"><MapPin size={12} /> {spot.address}</p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                <div className="flex items-center gap-1">
                  <StarRating rating={spot.rating} size={14} />
                  <span className="text-xs text-slate-400">({spot.reviewCount})</span>
                </div>
                <span className="text-indigo-400 font-bold text-sm">${spot.pricePerHour}/hr</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Car size={48} className="mx-auto text-slate-600 mb-4" />
          <h3 className="text-lg font-semibold text-slate-300">No parking spots found</h3>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
