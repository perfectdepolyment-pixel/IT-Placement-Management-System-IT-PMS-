import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../common/StatsCard';
import { StatusBadge } from '../common/StatusBadge';
import { PostDriveModal } from './PostDriveModal';
import { 
  Building2, 
  Users2, 
  Briefcase, 
  Award, 
  Plus, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  DollarSign,
  TrendingUp
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const { currentUser, drives, applications, setActiveTab } = useApp();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Recruiter stats
  const totalPostings = drives.length;
  const totalApplicants = applications.length;
  const shortlistedCount = applications.filter(a => ['shortlisted', 'interview_scheduled'].includes(a.status)).length;
  const offersCount = applications.filter(a => a.status === 'selected').length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 text-white shadow-lg shadow-violet-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
            alt="Recruiter"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {currentUser?.name || 'Priya Nair'}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-violet-100">
                {currentUser?.companyName || 'Microsoft Corporation'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-violet-100 mt-1">
              {currentUser?.designation || 'University Talent Acquisition Lead'} · Season 2026 Campus Hiring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-white text-violet-800 hover:bg-violet-50 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post New Drive</span>
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className="px-4 py-2 rounded-xl bg-violet-900/80 hover:bg-violet-900 text-white text-xs font-bold border border-white/20 transition-colors"
          >
            Review Pipeline
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Drives"
          value={totalPostings}
          subtitle="Campus postings"
          icon={Briefcase}
          colorScheme="violet"
        />
        <StatsCard
          title="Total Candidates"
          value={totalApplicants}
          subtitle="Across all departments"
          icon={Users2}
          colorScheme="blue"
        />
        <StatsCard
          title="In Interview Pipeline"
          value={shortlistedCount}
          subtitle="Tests & evaluations"
          icon={Calendar}
          colorScheme="sky"
        />
        <StatsCard
          title="Offers Extended"
          value={offersCount}
          subtitle="Accepted & pending offers"
          icon={Award}
          colorScheme="emerald"
        />
      </div>

      {/* Main Grid: Live Drives & Candidate Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Posted Drives Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span>Campus Recruitment Drives</span>
            </h3>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Job Drive</span>
            </button>
          </div>

          <div className="space-y-3">
            {drives.map(drive => {
              const driveApplicants = applications.filter(a => a.driveId === drive.id).length;

              return (
                <div
                  key={drive.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] hover:border-violet-400 dark:hover:border-violet-600 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center">
                      <img
                        src={drive.companyLogo}
                        alt={drive.companyName}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {drive.roleTitle}
                        </h4>
                        <StatusBadge status={drive.status} size="sm" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {drive.companyName} · {drive.jobType} · CTC: <strong>{drive.ctc}</strong>
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                        <span>Min CGPA: {drive.minCgpa}</span>
                        <span aria-hidden="true">·</span>
                        <span>Deadline: {drive.deadline}</span>
                        <span aria-hidden="true">·</span>
                        <span>{drive.rounds.length} Selection Rounds</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {driveApplicants}
                      </span>
                      <p className="text-[10px] text-slate-400">Applicants</p>
                    </div>

                    <button
                      onClick={() => setActiveTab('applicants')}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-violet-950 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-violet-600 transition-colors flex items-center gap-1"
                    >
                      <span>Pipeline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Pipeline Summary */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Recruitment Quick Links
            </h4>

            <div className="space-y-2">
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="w-full p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 text-violet-700 dark:text-violet-300 font-semibold text-xs text-left flex items-center justify-between transition-colors"
              >
                <span>Create Campus Drive</span>
                <Plus className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('applicants')}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs text-left flex items-center justify-between transition-colors"
              >
                <span>Candidate Evaluation Board</span>
                <Users2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs text-left flex items-center justify-between transition-colors"
              >
                <span>Interview Slots Calendar</span>
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-[#141f36] dark:to-[#1a2948] border border-violet-200 dark:border-violet-900/60 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white">
              Placement Cell Guidelines for Recruiters
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Recruiters are requested to confirm round outcomes within 48 hours to streamline candidate slots. For auditorium bookings or lab setups, contact Dr. Raman (+91 94250 88990).
            </p>
          </div>
        </div>

      </div>

      <PostDriveModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
};
