import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EmptyState({ title = 'Nothing here yet', message = 'There are no items to display.', icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-slate-500">{icon || <Inbox size={48} />}</div>
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
