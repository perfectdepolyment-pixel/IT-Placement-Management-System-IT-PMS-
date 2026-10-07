import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, ArrowLeft, LogIn, Lock } from 'lucide-react';

interface UnauthorizedPageProps {
  type?: '403' | 'expired';
}

export const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({ type = '403' }) => {
  const { navigate, setCurrentRole } = useApp();

  const isExpired = type === 'expired';

  return (
    <div
      role="alert"
      className="min-h-[60vh] flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="w-full max-w-md bg-white dark:bg-[#111A2E] rounded-3xl p-8 border border-slate-200/80 dark:border-[#24304A] shadow-xl text-center space-y-5">
        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
          isExpired
            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40'
            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40'
        }`}>
          {isExpired ? <Lock className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {isExpired ? 'Session Security' : 'HTTP 403 Forbidden'}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isExpired ? 'Session Has Expired' : 'Access Restricted'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {isExpired
              ? 'Your security authentication token has expired. Please log in again to re-verify your identity.'
              : 'You do not have administrative credentials or permission to access this secure zone.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <LogIn className="w-4 h-4" />
            <span>Go to Login</span>
          </button>
          <button
            onClick={() => {
              setCurrentRole('visitor');
              navigate('/');
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
