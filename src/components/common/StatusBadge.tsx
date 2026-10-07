import React from 'react';
import { ApplicationStatus } from '../../types';

interface StatusBadgeProps {
  status: ApplicationStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  showDot = true 
}) => {
  const normalized = status.toLowerCase().replace(/\s+/g, '_');

  let config = {
    label: 'Applied',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-600 dark:bg-blue-400',
  };

  switch (normalized) {
    case 'applied':
      config = {
        label: 'Applied',
        bg: 'bg-blue-50 dark:bg-blue-950/40',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
        dot: 'bg-blue-600 dark:bg-blue-400',
      };
      break;
    case 'under_review':
      config = {
        label: 'Under Review',
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-800',
        dot: 'bg-amber-600 dark:bg-amber-400',
      };
      break;
    case 'shortlisted':
      config = {
        label: 'Shortlisted',
        bg: 'bg-violet-50 dark:bg-violet-950/40',
        text: 'text-violet-700 dark:text-violet-300',
        border: 'border-violet-200 dark:border-violet-800',
        dot: 'bg-violet-600 dark:bg-violet-400',
      };
      break;
    case 'interview_scheduled':
    case 'interview':
      config = {
        label: 'Interview Scheduled',
        bg: 'bg-sky-50 dark:bg-sky-950/40',
        text: 'text-sky-700 dark:text-sky-300',
        border: 'border-sky-200 dark:border-sky-800',
        dot: 'bg-sky-600 dark:bg-sky-400',
      };
      break;
    case 'selected':
    case 'offered':
      config = {
        label: 'Selected / Offered',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-800',
        dot: 'bg-emerald-600 dark:bg-emerald-400',
      };
      break;
    case 'rejected':
      config = {
        label: 'Rejected',
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-700 dark:text-rose-300',
        border: 'border-rose-200 dark:border-rose-800',
        dot: 'bg-rose-600 dark:bg-rose-400',
      };
      break;
    case 'withdrawn':
      config = {
        label: 'Withdrawn',
        bg: 'bg-slate-100 dark:bg-slate-800',
        text: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-200 dark:border-slate-700',
        dot: 'bg-slate-400 dark:bg-slate-500',
      };
      break;
    case 'upcoming':
      config = {
        label: 'Upcoming Drive',
        bg: 'bg-indigo-50 dark:bg-indigo-950/40',
        text: 'text-indigo-700 dark:text-indigo-300',
        border: 'border-indigo-200 dark:border-indigo-800',
        dot: 'bg-indigo-600 dark:bg-indigo-400',
      };
      break;
    case 'ongoing':
      config = {
        label: 'Active Drive',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-800',
        dot: 'bg-emerald-600 dark:bg-emerald-400',
      };
      break;
    case 'completed':
      config = {
        label: 'Completed',
        bg: 'bg-slate-100 dark:bg-slate-800',
        text: 'text-slate-700 dark:text-slate-300',
        border: 'border-slate-200 dark:border-slate-700',
        dot: 'bg-slate-500',
      };
      break;
    default:
      config.label = status;
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      )}
      <span>{config.label}</span>
    </span>
  );
};
