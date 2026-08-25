import { Link } from 'react-router-dom';
import { MapPin, Heart, Car } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import EmptyState from '../components/EmptyState';
import { mockFavorites } from '../utils/mockData';

export default function Favorites() {
  const favorites = mockFavorites;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Favorites</h1>
        <p className="mt-2 text-slate-400">Parking spots you've saved for later</p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart size={48} />}
          title="No favorites yet"
          message="Save parking spots you like to find them quickly later."
          action={<Link to="/search"><Button>Browse Parking</Button></Link>}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(fav => (
            <Card key={fav.id} hover>
              <div className="h-36 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 mb-4 flex items-center justify-center relative">
                <Car size={36} className="text-slate-500" />
                <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-slate-900/60 flex items-center justify-center cursor-pointer hover:bg-red-500/20 transition-colors">
                  <Heart size={16} className="fill-red-500 text-red-500" />
                </button>
              </div>
              <Link to={`/parking/${fav.spot.id}`}>
                <h3 className="text-white font-semibold hover:text-indigo-400 transition-colors">{fav.spot.name}</h3>
              </Link>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><MapPin size={12} /> {fav.spot.address}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/50">
                <div className="flex items-center gap-1">
                  <StarRating rating={fav.spot.rating} size={14} />
                  <span className="text-xs text-slate-400">({fav.spot.reviewCount})</span>
                </div>
                <span className="text-indigo-400 font-bold text-sm">${fav.spot.pricePerHour}/hr</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
