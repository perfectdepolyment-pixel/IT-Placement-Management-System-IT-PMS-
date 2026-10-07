import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  X, 
  Clock, 
  Video, 
  Award, 
  ChevronRight, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const StudentApplicationsPage: React.FC = () => {
  const { applications, studentProfile, withdrawApplication, acceptOffer, navigate } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [trackedApp, setTrackedApp] = useState<Application | null>(null);

  const studentApps = applications.filter(a => a.studentId === studentProfile.userId);

  const filteredApps = studentApps.filter(app => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'applied') return app.status === 'applied';
    if (statusFilter === 'shortlisted') return app.status === 'shortlisted';
    if (statusFilter === 'interview') return app.status === 'interview_scheduled';
    if (statusFilter === 'selected') return app.status === 'selected';
    if (statusFilter === 'rejected') return app.status === 'rejected';
    return true;
  });

  const stagesList = [
    { title: 'Application Submitted', desc: 'Profile and resume submitted to recruiter', date: 'Day 1' },
    { title: 'Screening & Shortlist', desc: 'Academic cutoff & profile verification cleared', date: 'Day 3' },
    { title: 'Online Assessment / Test', desc: 'Coding & aptitude challenge evaluated', date: 'Day 5' },
    { title: 'Technical & HR Interviews', desc: 'Virtual or in-person rounds scheduled', date: 'Day 8' },
    { title: 'Official Employment Offer', desc: 'Offer letter issued with compensation package', date: 'Day 12' },
  ];

  const getStageIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied': return 0;
      case 'under_review': return 1;
      case 'shortlisted': return 2;
      case 'interview_scheduled': return 3;
      case 'selected': return 4;
      case 'rejected': return -1;
      case 'withdrawn': return -2;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 4.2.6 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            My Applications Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track recruitment progress stage-by-stage, review examiner feedback, and accept offer letters.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/drives')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
        >
          Browse Open Drives
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#141f36] rounded-2xl w-fit text-xs font-semibold overflow-x-auto">
        {[
          { id: 'all', label: `All (${studentApps.length})` },
          { id: 'applied', label: 'Applied' },
          { id: 'shortlisted', label: 'Shortlisted' },
          { id: 'interview', label: 'Interview Scheduled' },
          { id: 'selected', label: 'Selected / Offers' },
          { id: 'rejected', label: 'Archived / Rejected' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              statusFilter === tab.id
                ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Applications Table / Cards List */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#111A2E] rounded-3xl border border-slate-200 dark:border-[#24304A] space-y-2">
          <p className="text-base font-bold text-slate-800 dark:text-slate-200">No applications found in this section</p>
          <p className="text-xs text-slate-400">Apply to campus drives to track your hiring stages here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map(app => {
            const isOfferReady = app.status === 'selected' && app.offerDetails;

            return (
              <div
                key={app.id}
                className={`p-6 rounded-3xl bg-white dark:bg-[#111A2E] border shadow-xs transition-all space-y-4 ${
                  isOfferReady ? 'border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-500/20' : 'border-slate-200/80 dark:border-[#24304A]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                      <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{app.roleTitle}</h3>
                        <StatusBadge status={app.status} size="sm" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {app.companyName} · Applied on {app.appliedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {app.status !== 'withdrawn' && app.status !== 'selected' && (
                      <button
                        onClick={() => {
                          if (confirm(`Withdraw application from ${app.companyName}?`)) {
                            withdrawApplication(app.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#24304A] text-slate-500 hover:text-rose-600 text-xs font-semibold transition-colors"
                      >
                        Withdraw
                      </button>
                    )}

                    <button
                      onClick={() => setTrackedApp(app)}
                      className="px-4 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1"
                    >
                      <span>Track Progress</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Offer Letter Box if Selected */}
                {isOfferReady && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <strong className="text-emerald-900 dark:text-emerald-200 text-sm block font-extrabold">
                        Official Employment Offer Letter Extended
                      </strong>
                      <p className="text-emerald-800 dark:text-emerald-300">
                        Package: <strong className="font-bold">{app.offerDetails?.ctc}</strong> · Joining: <strong>{app.offerDetails?.joiningDate}</strong> ({app.offerDetails?.location})
                      </p>
                    </div>

                    {!app.offerDetails?.accepted ? (
                      <button
                        onClick={() => acceptOffer(app.id)}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
                      >
                        Accept Offer Letter
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Accepted on {app.offerDetails.acceptedAt}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 4.2.6 Track Drawer / Timeline Modal */}
      {trackedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#111A2E] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-100 dark:border-[#24304A] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{trackedApp.roleTitle}</h3>
                <p className="text-xs text-slate-500">{trackedApp.companyName} · Applied {trackedApp.appliedAt}</p>
              </div>
              <button onClick={() => setTrackedApp(null)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vertical timeline of stages */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">Hiring Stage Progression</h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {stagesList.map((st, idx) => {
                  const stageIndex = getStageIndex(trackedApp.status);
                  const isDone = stageIndex >= idx;
                  const isCurrent = stageIndex === idx;

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className={`absolute -left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isDone
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : isCurrent
                            ? 'bg-white border-blue-600 ring-2 ring-blue-500/20'
                            : 'bg-slate-100 border-slate-300'
                      }`}>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-0.5">
                        <strong className={`block text-xs ${isDone || isCurrent ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400'}`}>
                          {st.title}
                        </strong>
                        <p className="text-[11px] text-slate-500">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Round feedback */}
              {trackedApp.roundHistory.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-[#24304A] space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">Rounds Feedback & Remarks</h4>
                  {trackedApp.roundHistory.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A]">
                      <div className="flex justify-between font-semibold">
                        <span>{r.roundName}</span>
                        <span className="capitalize text-blue-600 font-bold">{r.status}</span>
                      </div>
                      {r.feedback && <p className="text-slate-500 mt-1 italic">"{r.feedback}"</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-[#24304A] flex justify-end">
              <button
                onClick={() => setTrackedApp(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] font-semibold text-xs"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
