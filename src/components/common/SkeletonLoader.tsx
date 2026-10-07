import React from 'react';

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2" />
            </div>
          </div>
          <div className="space-y-2 py-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
          </div>
          <div className="pt-2 flex justify-between items-center">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 5,
}) => {
  return (
    <div className="w-full bg-white dark:bg-[#111A2E] rounded-2xl border border-slate-200/80 dark:border-[#24304A] overflow-hidden animate-pulse">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex gap-4">
        {Array.from({ length: columns }).map((_, idx) => (
          <div key={idx} className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md flex-1" />
        ))}
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="p-4 flex gap-4 items-center">
            {Array.from({ length: columns }).map((_, cIdx) => (
              <div key={cIdx} className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-md flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ButtonSpinner: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        className="animate-spin h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && <span>{text}</span>}
    </span>
  );
};
