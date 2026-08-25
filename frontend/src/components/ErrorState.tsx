import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ title = 'Something went wrong', message = 'An unexpected error occurred. Please try again.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-red-400"><AlertTriangle size={48} /></div>
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">{message}</p>
      {onRetry && (
        <div className="mt-6">
          <Button variant="outline" onClick={onRetry}>Try Again</Button>
        </div>
      )}
    </div>
  );
}
