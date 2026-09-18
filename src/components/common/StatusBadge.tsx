import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: string | undefined;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, size = 'md' }) => {
  const norm = (status || '').toUpperCase();

  let label = norm;
  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Clock;

  if (norm === 'APPROVED' || norm === 'SUPERVISOR_APPROVED') {
    label = 'SUPERVISOR APPROVED';
    bg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    Icon = CheckCircle2;
  } else if (norm === 'POC_APPROVED' || norm === 'WAITING_FOR_SUPERVISOR_REVIEW') {
    label = 'POC APPROVED';
    bg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    Icon = ShieldCheck;
  } else if (norm === 'REJECTED' || norm === 'POC_REJECTED' || norm === 'SUPERVISOR_REJECTED') {
    label = 'REJECTED';
    bg = 'bg-rose-50 text-rose-700 border-rose-200';
    Icon = XCircle;
  } else if (norm === 'EXPIRED') {
    label = 'EXPIRED';
    bg = 'bg-amber-50 text-amber-700 border-amber-200';
    Icon = AlertTriangle;
  } else if (norm === 'PENDING') {
    label = 'PENDING APPROVAL';
    bg = 'bg-amber-50 text-amber-700 border-amber-200';
    Icon = Clock;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  }[size];

  return (
    <span className={cn('inline-flex items-center rounded-full border shadow-2xs transition-colors', sizeClasses, bg, className)}>
      <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{label}</span>
    </span>
  );
};
