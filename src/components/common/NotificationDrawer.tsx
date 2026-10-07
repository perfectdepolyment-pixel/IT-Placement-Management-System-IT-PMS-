import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCheck, Bell, Briefcase, Calendar, Award, Info } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadNotifCount, 
    markNotificationRead, 
    markAllNotificationsRead,
    setActiveTab,
    currentRole 
  } = useApp();

  if (!isOpen) return null;

  const handleAction = (id: string, actionUrl?: string) => {
    markNotificationRead(id);
    if (actionUrl) {
      if (actionUrl === 'drives') {
        setActiveTab('drives');
      } else if (actionUrl === 'applications') {
        setActiveTab('applications');
      } else if (actionUrl === 'interviews') {
        setActiveTab('interviews');
      }
    }
    onClose();
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'drive':
        return <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'interview':
        return <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'offer':
        return <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#111A2E] shadow-2xl border-l border-slate-200 dark:border-[#24304A] flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-[#24304A] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Notifications
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {unreadNotifCount > 0 ? `${unreadNotifCount} unread update${unreadNotifCount > 1 ? 's' : ''}` : 'All caught up'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadNotifCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="p-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-md transition-colors flex items-center gap-1"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Mark all</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-slate-400 dark:text-slate-500">
                <Bell className="w-10 h-10 mx-auto stroke-1 mb-2 opacity-50" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleAction(item.id, item.actionUrl)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                    !item.read 
                      ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-xs' 
                      : 'bg-white dark:bg-[#141f36] border-slate-100 dark:border-[#24304A] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                      {getNotifIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {item.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{item.timestamp}</span>
                        {item.actionUrl && (
                          <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                            View details →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 border-t border-slate-100 dark:border-[#24304A] bg-slate-50/70 dark:bg-[#0e1627] text-center text-xs text-slate-500">
            Current Role: <span className="font-semibold capitalize text-slate-700 dark:text-slate-300">{currentRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
