import React from 'react';
import { useApp } from '../../context/AppContext';
import { RecruitmentDrive } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Clock, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DriveDetailModalProps {
  drive: RecruitmentDrive | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DriveDetailModal: React.FC<DriveDetailModalProps> = ({ drive, isOpen, onClose }) => {
  const { 
    studentProfile, 
    checkEligibility, 
    applyToDrive, 
    applications, 
    currentRole,
    setCurrentRole 
  } = useApp();

  if (!isOpen || !drive) return null;

  const eligibility = checkEligibility(drive, studentProfile);
  const application = applications.find(
    a => a.driveId === drive.id && a.studentId === studentProfile.userId
  );
  const isApplied = !!application;

  const handleApply = () => {
    if (currentRole !== 'student') {
      setCurrentRole('student');
    }
    const success = applyToDrive(drive.id);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#111A2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#24304A] bg-slate-50/50 dark:bg-[#141f36]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center shrink-0">
                <img
                  src={drive.companyLogo}
                  alt={drive.companyName}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Fallback to building icon
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {drive.roleTitle}
                  </h3>
                  <StatusBadge status={drive.status} size="sm" />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-1">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {drive.companyName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-xs">{drive.jobType}</span>
                  {drive.companyWebsite && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a
                        href={drive.companyWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Visit Site <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-200/60 dark:border-[#24304A]">
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#111A2E] border border-slate-100 dark:border-[#24304A]">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Package / CTC
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {drive.ctc}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#111A2E] border border-slate-100 dark:border-[#24304A]">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Locations
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate" title={drive.locations.join(', ')}>
                {drive.locations.join(', ')}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#111A2E] border border-slate-100 dark:border-[#24304A]">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Deadline
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {drive.deadline}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#111A2E] border border-slate-100 dark:border-[#24304A]">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" /> Vacancies
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {drive.totalVacancies} Positions
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Eligibility Evaluation Banner */}
          <div className={`p-4 rounded-xl border ${
            eligibility.isEligible 
              ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' 
              : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
          }`}>
            <div className="flex items-start gap-3">
              {eligibility.isEligible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {eligibility.isEligible 
                      ? 'You are Eligible to apply for this drive!' 
                      : 'You do not meet one or more institutional eligibility rules'}
                  </h4>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    Candidate CGPA: {studentProfile.cgpa}
                  </span>
                </div>
                
                {/* Detailed criteria checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 text-xs">
                  <div className="flex items-center gap-2">
                    {eligibility.criteria.cgpa.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    )}
                    <span>CGPA: Min {drive.minCgpa} (Yours: {studentProfile.cgpa})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {eligibility.criteria.branch.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    )}
                    <span className="truncate" title={studentProfile.department}>
                      Branch: {studentProfile.department}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {eligibility.criteria.backlogs.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    )}
                    <span>Active Backlogs: Max {drive.maxBacklogsAllowed} (Yours: {studentProfile.activeBacklogs})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {eligibility.criteria.tenth.passed && eligibility.criteria.twelfth.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    )}
                    <span>10th / 12th: Min {drive.minTenthPercent}% / {drive.minTwelfthPercent}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Role Description
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
              {drive.description}
            </p>
          </div>

          {/* Key Requirements & Responsibilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Requirements & Skills
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                {drive.requirements.map((req, i) => (
                  <li key={i} className="leading-relaxed">{req}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Responsibilities
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                {drive.responsibilities.map((resp, i) => (
                  <li key={i} className="leading-relaxed">{resp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Selection Rounds Pipeline */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">
              Recruitment Process & Rounds
            </h4>
            <div className="space-y-2.5">
              {drive.rounds.map((round) => (
                <div 
                  key={round.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-[#24304A] bg-slate-50/50 dark:bg-[#141f36] flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {round.roundNumber}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white text-xs">
                        {round.name}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {round.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {round.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-100 dark:border-[#24304A] flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {isApplied ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Application submitted on {application.appliedAt}
              </span>
            ) : (
              <span>Drive date: <strong>{drive.driveDate}</strong></span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#24304A] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            {isApplied ? (
              <button
                disabled
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              >
                Already Applied ({application.status.toUpperCase()})
              </button>
            ) : (
              <button
                onClick={handleApply}
                disabled={!eligibility.isEligible}
                className={`px-5 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all ${
                  eligibility.isEligible
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>One-Click Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
