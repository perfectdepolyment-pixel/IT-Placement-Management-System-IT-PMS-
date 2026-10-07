import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  RotateCcw, 
  X, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentRole, setCurrentRole, resetToDefaultData, currentUser } = useApp();

  if (!isOpen) return null;

  const rolesList: {
    role: UserRole;
    title: string;
    description: string;
    persona: string;
    details: string;
    icon: typeof Users;
    badgeColor: string;
    primaryAction: string;
  }[] = [
    {
      role: 'student',
      title: 'Student Portal',
      description: 'Job seeker experience with eligibility check, 1-click apply, application tracking & resume builder.',
      persona: 'Aryan Sharma (CSE · 8.84 CGPA)',
      details: 'Active Applications: 3 · Next Interview: Microsoft (Oct 12)',
      icon: GraduationCap,
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
      primaryAction: 'Launch Student Dashboard',
    },
    {
      role: 'recruiter',
      title: 'Recruiter / Company',
      description: 'Post drives, filter applicants, evaluate candidate resumes, schedule interviews, and issue offer letters.',
      persona: 'Priya Nair (Microsoft Talent Lead)',
      details: 'Active Drive: SDE-1 (142 Applicants) · 4 Rounds Pipeline',
      icon: Building2,
      badgeColor: 'bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300',
      primaryAction: 'Launch Recruiter Dashboard',
    },
    {
      role: 'admin',
      title: 'Admin / Placement Cell (TPO)',
      description: 'Institutional management: approve drives, student verification, announcements, and deep placement analytics.',
      persona: 'Dr. V. K. Raman (Head of Placement)',
      details: '620 Eligible Students · 86.7% Placed · 118 Recruiters Visited',
      icon: ShieldCheck,
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
      primaryAction: 'Launch TPO Control Center',
    },
    {
      role: 'visitor',
      title: 'Public Visitor',
      description: 'Browse campus placement records, star recruiters, top packages, upcoming drive schedules, and portal FAQ.',
      persona: 'Guest / Prospective Student / Recruiter',
      details: 'Read-only access to institution recruitment metrics & companies',
      icon: Users,
      badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      primaryAction: 'View Public Portal',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111A2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-[#24304A]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Switch Role & Persona
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Experience IT-PMS from each institutional stakeholder’s perspective
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {rolesList.map(item => {
            const isSelected = currentRole === item.role;
            const Icon = item.icon;

            return (
              <div
                key={item.role}
                onClick={() => {
                  setCurrentRole(item.role);
                  onClose();
                }}
                className={`group relative p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm ring-1 ring-blue-600/30'
                    : 'border-slate-200 dark:border-[#24304A] hover:border-blue-300 dark:hover:border-blue-800 hover:bg-slate-50/70 dark:hover:bg-[#17223b]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl shrink-0 ${item.badgeColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3" /> Active Now
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-700 dark:text-slate-200">
                          Demo Account: {item.persona}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.details}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`shrink-0 p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950'
                    }`}
                  >
                    <span>{isSelected ? 'Active' : 'Switch'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with Reset */}
        <div className="p-4 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-100 dark:border-[#24304A] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>Currently logged in:</span>
            <span className="font-medium text-slate-900 dark:text-slate-200">
              {currentUser ? `${currentUser.name} (${currentUser.role})` : 'Public Visitor'}
            </span>
          </div>

          <button
            onClick={() => {
              resetToDefaultData();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
            title="Reset all mutated sample data to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
