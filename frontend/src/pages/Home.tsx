import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Shield, Star, ArrowRight, Car } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import StarRating from '../components/StarRating';
import { parkingService } from '../services/parkingService';
import type { ParkingSpot } from '../types';

export default function Home() {
  const [featured, setFeatured] = useState<ParkingSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await parkingService.getAll({ limit: 3 });
        if (res.success) {
          setFeatured(res.data.spots.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to load featured spots:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-slate-950 to-violet-600/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              <Car size={16} /> Smart Parking Made Simple
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Find Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Parking Spot
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Discover nearby parking spaces with real-time availability, competitive pricing, and instant booking — all from your phone.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/search">
                <Button size="lg"><Search size={18} /> Find Parking Now</Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="lg"><MapPin size={18} /> Explore Map</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Parking Spots', value: '2,500+' },
              { label: 'Cities Covered', value: '120+' },
              { label: 'Happy Users', value: '50K+' },
              { label: 'Bookings Made', value: '200K+' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Why Choose ParkSpot?</h2>
          <p className="mt-3 text-slate-400">Everything you need for hassle-free parking</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <MapPin size={24} />, title: 'Nearby Search', desc: 'Find parking spots closest to your destination using GPS.' },
            { icon: <Clock size={24} />, title: 'Real-Time Availability', desc: 'See live slot counts before you even drive there.' },
            { icon: <Shield size={24} />, title: 'Secure Booking', desc: 'Reserve your spot in seconds with guaranteed pricing.' },
            { icon: <Star size={24} />, title: 'Ratings & Reviews', desc: 'Make informed decisions with community feedback.' },
          ].map(f => (
            <Card key={f.title} hover className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Parking */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Parking</h2>
            <p className="mt-2 text-slate-400">Top-rated spots near you</p>
          </div>
          <Link to="/search" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(spot => (
            <Link to={`/parking/${spot.id}`} key={spot.id}>
              <Card hover>
                <div className="h-40 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 mb-4 flex items-center justify-center">
                  <Car size={40} className="text-slate-500" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold">{spot.name}</h3>
                  <span className="text-indigo-400 font-bold text-sm">${spot.pricePerHour}/hr</span>
                </div>
                <p className="text-sm text-slate-400 flex items-center gap-1 mb-3">
                  <MapPin size={14} /> {spot.address}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={spot.rating} size={14} />
                    <span className="text-xs text-slate-400">({spot.reviewCount})</span>
                  </div>
                  <span className={`text-xs font-medium ${spot.availableSlots > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {spot.availableSlots > 0 ? `${spot.availableSlots} spots left` : 'Full'}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
