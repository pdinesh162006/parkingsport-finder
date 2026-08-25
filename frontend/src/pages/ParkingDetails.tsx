import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Car, Heart, Navigation, Star } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StarRating from '../components/StarRating';
import { mockParkingSpots, mockReviews } from '../utils/mockData';
import { useState } from 'react';

export default function ParkingDetails() {
  const { id } = useParams();
  const spot = mockParkingSpots.find(s => s.id === id) || mockParkingSpots[0];
  const reviews = mockReviews.filter(r => r.spotId === spot.id);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-400 mb-6">
        <Link to="/search" className="hover:text-indigo-400 transition-colors">Search</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{spot.name}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image placeholder */}
          <div className="h-64 lg:h-80 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <Car size={64} className="text-slate-500" />
          </div>

          {/* Title & actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{spot.name}</h1>
              <p className="text-slate-400 flex items-center gap-1.5 mt-2"><MapPin size={16} /> {spot.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
              <Button variant="secondary"><Navigation size={18} /> Directions</Button>
            </div>
          </div>

          {/* Description */}
          <Card>
            <h2 className="text-lg font-semibold text-white mb-3">About This Parking</h2>
            <p className="text-slate-300 leading-relaxed">{spot.description}</p>
          </Card>

          {/* Reviews */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Reviews ({reviews.length})</h2>
              <Button size="sm">Write a Review</Button>
            </div>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-t border-slate-700/50 pt-4 first:border-0 first:pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs text-white font-bold">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white">{review.userName}</span>
                          <p className="text-xs text-slate-500">{review.createdAt}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size={14} />
                    </div>
                    <p className="text-sm text-slate-300 ml-10">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No reviews yet. Be the first to review!</p>
            )}
          </Card>
        </div>

        {/* Sidebar — booking widget & info */}
        <div className="space-y-6">
          {/* Pricing card */}
          <Card className="sticky top-24">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-white">${spot.pricePerHour}</div>
              <div className="text-sm text-slate-400">per hour</div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Availability</span>
                <Badge variant={spot.availableSlots > 0 ? 'success' : 'danger'}>
                  {spot.availableSlots}/{spot.totalSlots} spots
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Rating</span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-white font-medium">{spot.rating}</span>
                  <span className="text-slate-500">({spot.reviewCount})</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Hours</span>
                <span className="text-white flex items-center gap-1"><Clock size={14} /> 24/7</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Owner</span>
                <span className="text-white">{spot.ownerName}</span>
              </div>
            </div>

            <Link to={`/bookings/new?spotId=${spot.id}`}>
              <Button className="w-full" size="lg" disabled={spot.availableSlots === 0}>
                {spot.availableSlots > 0 ? 'Book This Spot' : 'No Spots Available'}
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
