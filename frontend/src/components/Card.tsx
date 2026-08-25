import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6 ${hover ? 'transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
