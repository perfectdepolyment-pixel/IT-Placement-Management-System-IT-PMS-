import React, { useEffect, useRef } from 'react';
import { AlertTriangle, AlertCircle, X, HelpCircle, LogOut, Trash2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  type?: 'delete' | 'reject' | 'withdraw' | 'logout' | 'generic';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
  type = 'generic',
  onConfirm,
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Autofocus confirm button
    setTimeout(() => {
      confirmButtonRef.current?.focus();
    }, 50);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'logout':
        return <LogOut className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />;
      case 'delete':
        return <Trash2 className="w-6 h-6 text-rose-600 dark:text-rose-400" aria-hidden="true" />;
      case 'reject':
      case 'withdraw':
        return <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" aria-hidden="true" />;
      default:
        return <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />;
    }
  };

  const getIconContainerClass = () => {
    if (isDestructive) {
      return 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/40 text-rose-600';
    }
    if (type === 'logout') {
      return 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/40 text-amber-600';
    }
    return 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/40 text-blue-600';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
    >
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onCancel} aria-hidden="true" />

      {/* Modal card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white dark:bg-[#111A2E] rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-[#24304A] space-y-5 z-10 animate-in fade-in zoom-in-95 duration-200 focus:outline-hidden"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getIconContainerClass()}`}>
              {getIcon()}
            </div>
            <div>
              <h3
                id="confirmation-modal-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Action confirmation required
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p
          id="confirmation-modal-description"
          className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
        >
          {message}
        </p>

        {/* Buttons: Destructive actions are visually secondary or clear, confirmed with modal */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-[#24304A]/60">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition-colors ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-500'
                : 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
