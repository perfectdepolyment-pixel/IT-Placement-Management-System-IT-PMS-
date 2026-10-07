import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { EmptyState } from '../common/EmptyState';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Award, 
  Clock, 
  Video, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Download, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  ShieldAlert,
  Briefcase
} from 'lucide-react';

export const MyApplications: React.FC = () => {
  const { applications, studentProfile, withdrawApplication, acceptOffer, setActiveTab } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [appToWithdraw, setAppToWithdraw] = useState<Application | null>(null);

  // Student's own applications
  const studentApps = applications.filter(a => a.studentId === studentProfile.userId);

  const filteredApps = studentApps.filter(app => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return ['applied', 'under_review', 'shortlisted', 'interview_scheduled'].includes(app.status);
    if (statusFilter === 'selected') return app.status === 'selected';
    if (statusFilter === 'rejected') return app.status === 'rejected';
    return true;
  });

  const getStepProgress = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied': return 1;
      case 'under_review': return 2;
      case 'shortlisted': return 3;
      case 'interview_scheduled': return 4;
      case 'selected': return 5;
      case 'rejected': return -1;
      case 'withdrawn': return 0;
      default: return 1;
    }
  };

  const stepsList = [
    { title: 'Applied', desc: 'Resume submitted' },
    { title: 'Under Review', desc: 'Screening round' },
    { title: 'Shortlisted', desc: 'Selected for test/interviews' },
    { title: 'Interviews', desc: 'Technical & HR rounds' },
    { title: 'Offer Issued', desc: 'Selected for role' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            My Applications & Offer Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your recruitment stages live, view round feedback, join interviews, and claim offers.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('drives')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          Browse More Drives
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#141f36] rounded-xl self-start w-fit">
        {[
          { id: 'all', label: `All (${studentApps.length})` },
          { id: 'active', label: 'In Progress' },
          { id: 'selected', label: 'Selected / Offers' },
          { id: 'rejected', label: 'Archived' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === tab.id
                ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No applications yet"
          description="You have not submitted applications to any campus recruitment drives yet. Browse open drives and apply with verified eligibility."
          actionLabel="Browse Drives"
          onAction={() => setActiveTab('drives')}
        />
      ) : (
        <div className="space-y-5">
          {filteredApps.map(app => {
            const currentStep = getStepProgress(app.status);
            const isOfferReady = app.status === 'selected' && app.offerDetails;

            return (
              <div
                key={app.id}
                className={`p-6 rounded-2xl bg-white dark:bg-[#111A2E] border shadow-xs transition-all duration-200 ${
                  isOfferReady 
                    ? 'border-emerald-300 dark:border-emerald-800/80 ring-1 ring-emerald-500/20' 
                    : 'border-slate-200/80 dark:border-[#24304A]'
                }`}
              >
                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-[#24304A]">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shrink-0">
                      <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {app.roleTitle}
                        </h3>
                        <StatusBadge status={app.status} size="sm" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {app.companyName}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Applied on {app.appliedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions right */}
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    {app.status !== 'withdrawn' && app.status !== 'selected' && (
                      <button
                        onClick={() => setAppToWithdraw(app)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-[#24304A] transition-colors"
                      >
                        Withdraw
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      {selectedApp?.id === app.id ? 'Hide Timeline' : 'View Full Details'}
                    </button>
                  </div>
                </div>

                {/* Offer Banner if Selected */}
                {isOfferReady && (
                  <div className="mt-5 p-5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                            Congratulations! Official Offer Received
                          </h4>
                          {app.offerDetails?.accepted && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                              Offer Accepted
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
                          Role: <strong>{app.offerDetails?.roleTitle}</strong> · CTC: <strong className="text-emerald-900 dark:text-white font-bold">{app.offerDetails?.ctc}</strong> · Joining: <strong>{app.offerDetails?.joiningDate}</strong> ({app.offerDetails?.location})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      {!app.offerDetails?.accepted ? (
                        <button
                          onClick={() => acceptOffer(app.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-102"
                        >
                          Accept Offer Letter
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-white dark:bg-[#111A2E] px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Offer Accepted on {app.offerDetails?.acceptedAt}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Scheduled Interview Banner if any */}
                {app.interviewSchedule && app.status === 'interview_scheduled' && (
                  <div className="mt-5 p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-sky-600 text-white shrink-0 mt-0.5">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-sky-900 dark:text-sky-200">
                          {app.interviewSchedule.roundName}
                        </h4>
                        <p className="text-xs text-sky-700 dark:text-sky-300 mt-0.5">
                          Time: <strong>{app.interviewSchedule.dateTime}</strong> · Mode: {app.interviewSchedule.mode}
                        </p>
                        {app.interviewSchedule.notes && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                            "{app.interviewSchedule.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    {app.interviewSchedule.locationOrLink && (
                      <a
                        href={app.interviewSchedule.locationOrLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs shrink-0 self-start sm:self-auto"
                      >
                        <span>Join Meeting</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}

                {/* Progress Stepper Bar */}
                <div className="mt-6 pt-2">
                  <div className="grid grid-cols-5 gap-2 relative">
                    {stepsList.map((step, idx) => {
                      const stepNumber = idx + 1;
                      const isCompleted = currentStep > stepNumber;
                      const isCurrent = currentStep === stepNumber;
                      const isFailed = currentStep === -1 && idx >= 2;

                      let circleClass = 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700';
                      let textClass = 'text-slate-400 dark:text-slate-500';

                      if (isCompleted) {
                        circleClass = 'bg-blue-600 text-white border-blue-600';
                        textClass = 'text-slate-800 dark:text-slate-200 font-semibold';
                      } else if (isCurrent) {
                        circleClass = 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-600 ring-2 ring-blue-500/20';
                        textClass = 'text-blue-600 dark:text-blue-400 font-bold';
                      } else if (isFailed) {
                        circleClass = 'bg-rose-50 text-rose-500 border-rose-300';
                        textClass = 'text-rose-500';
                      }

                      return (
                        <div key={idx} className="flex flex-col items-center text-center">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${circleClass}`}>
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stepNumber}
                          </div>
                          <span className={`text-[11px] leading-tight line-clamp-1 ${textClass}`}>
                            {step.title}
                          </span>
                          <span className="text-[10px] text-slate-400 hidden sm:block">
                            {step.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expandable Rounds History */}
                {selectedApp?.id === app.id && (
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#24304A] space-y-3 animate-in fade-in">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Evaluation Rounds History & Feedback
                    </h4>
                    <div className="space-y-2">
                      {app.roundHistory.map((round, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A] flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {rIdx + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">
                                {round.roundName}
                              </p>
                              {round.feedback && (
                                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                                  Notes: "{round.feedback}"
                                </p>
                              )}
                              {round.interviewDate && (
                                <p className="text-sky-600 dark:text-sky-400 mt-0.5 font-medium">
                                  Scheduled: {round.interviewDate}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0">
                            {round.status === 'cleared' && (
                              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                Cleared
                              </span>
                            )}
                            {round.status === 'scheduled' && (
                              <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                                Scheduled
                              </span>
                            )}
                            {round.status === 'pending' && (
                              <span className="text-[11px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                Pending
                              </span>
                            )}
                            {round.status === 'failed' && (
                              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                Not Cleared
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal for application withdrawal */}
      <ConfirmationModal
        isOpen={!!appToWithdraw}
        onConfirm={() => {
          if (appToWithdraw) {
            withdrawApplication(appToWithdraw.id);
            setAppToWithdraw(null);
          }
        }}
        onCancel={() => setAppToWithdraw(null)}
        title="Withdraw Job Application"
        message={`Are you sure you want to withdraw your application for ${appToWithdraw?.roleTitle} at ${appToWithdraw?.companyName}? This action is irreversible and your candidature will be removed.`}
        confirmLabel="Withdraw Application"
        cancelLabel="Keep Application"
        isDestructive={true}
        type="withdraw"
      />
    </div>
  );
};
