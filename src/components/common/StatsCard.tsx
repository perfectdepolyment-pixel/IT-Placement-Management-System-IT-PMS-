import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  colorScheme?: 'blue' | 'violet' | 'emerald' | 'amber' | 'sky';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = 'blue',
}) => {
  const schemeClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      icon: 'text-blue-600 dark:text-blue-400',
      ring: 'border-blue-100 dark:border-blue-900/40',
    },
    violet: {
      bg: 'bg-violet-50 dark:bg-violet-950/40',
      icon: 'text-violet-600 dark:text-violet-400',
      ring: 'border-violet-100 dark:border-violet-900/40',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      icon: 'text-emerald-600 dark:text-emerald-400',
      ring: 'border-emerald-100 dark:border-emerald-900/40',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      icon: 'text-amber-600 dark:text-amber-400',
      ring: 'border-amber-100 dark:border-amber-900/40',
    },
    sky: {
      bg: 'bg-sky-50 dark:bg-sky-950/40',
      icon: 'text-sky-600 dark:text-sky-400',
      ring: 'border-sky-100 dark:border-sky-900/40',
    },
  }[colorScheme];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            {value}
          </h4>
        </div>
        <div className={`p-3 rounded-xl shrink-0 ${schemeClasses.bg} ${schemeClasses.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#24304A]/60 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-slate-500 dark:text-slate-400 truncate">
              {subtitle}
            </span>
          )}
          {trend && (
            <span className={`inline-flex items-center gap-1 font-semibold ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300'}`}>
              {trend.value}
              {trend.label && <span className="font-normal text-slate-400">({trend.label})</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
