import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, ShieldAlert, RotateCcw, Home, Wrench, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-5 animate-in fade-in">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-3xl">
        404
      </div>
      <div className="space-y-1.5 max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Page Not Found</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          The requested placement resource, drive URL, or candidate record does not exist or has been archived.
        </p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Back to Home</span>
      </button>
    </div>
  );
};

export const ForbiddenPage: React.FC = () => {
  const { navigate, currentRole } = useApp();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-5 animate-in fade-in">
      <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-3xl">
        <ShieldAlert className="w-10 h-10" />
      </div>
      <div className="space-y-1.5 max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Access Forbidden (403)</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          You don’t have institutional authorization to access this area with your current permissions ({currentRole}).
        </p>
      </div>

      <button
        onClick={() => {
          if (currentRole === 'student') navigate('/student/dashboard');
          else if (currentRole === 'recruiter') navigate('/recruiter/dashboard');
          else if (currentRole === 'admin') navigate('/admin/dashboard');
          else navigate('/');
        }}
        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
      >
        <span>Go to Authorized Dashboard</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ServerErrorPage: React.FC = () => {
  const { showToast } = useApp();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-5 animate-in fade-in">
      <div className="w-20 h-20 rounded-3xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-3xl">
        <AlertCircle className="w-10 h-10" />
      </div>
      <div className="space-y-1.5 max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Internal Server Issue (500)</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Something went wrong while synchronizing candidate verification records. Our server telemetry has flagged this event.
        </p>
      </div>

      <button
        onClick={() => {
          showToast({ type: 'info', title: 'Reconnected', message: 'Services re-synchronized successfully.' });
          window.location.reload();
        }}
        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Retry Connection</span>
      </button>
    </div>
  );
};

export const MaintenancePage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-5 animate-in fade-in">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-3xl">
        <Wrench className="w-10 h-10" />
      </div>
      <div className="space-y-1.5 max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Scheduled Maintenance Window</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          The Placement Cell database is undergoing routine audit backups. Services will resume at 06:00 AM IST.
        </p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-[#24304A] font-semibold text-xs transition-colors"
      >
        Return to Visitor Portal
      </button>
    </div>
  );
};
