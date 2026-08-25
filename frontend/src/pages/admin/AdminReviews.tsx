import { Trash2, Star } from 'lucide-react';
import Card from '../../components/Card';
import StarRating from '../../components/StarRating';
import Button from '../../components/Button';
import { mockReviews } from '../../utils/mockData';

export default function AdminReviews() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Review Management</h1>
        <p className="mt-2 text-slate-400">Moderate user reviews across the platform</p>
      </div>

      <div className="space-y-4">
        {mockReviews.map(review => (
          <Card key={review.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm text-white font-bold shrink-0">
                {review.userName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{review.userName}</span>
                  <StarRating rating={review.rating} size={14} />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Spot #{review.spotId} • {review.createdAt}</p>
                <p className="text-sm text-slate-300 mt-2">{review.comment}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 shrink-0">
              <Trash2 size={14} /> Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
