import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../common/StatsCard';
import { StatusBadge } from '../common/StatusBadge';
import { PostDriveModal } from '../recruiter/PostDriveModal';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Users2, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Bell, 
  CheckCircle2, 
  FileSpreadsheet,
  BarChart3
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser, drives, applications, setActiveTab, announcements } = useApp();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Statistics
  const totalDrives = drives.length;
  const totalApps = applications.length;
  const placedCount = applications.filter(a => a.status === 'selected').length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white shadow-lg shadow-emerald-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
            alt="TPO Director"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {currentUser?.name || 'Dr. V. K. Raman'}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100">
                TPO Directorate
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Head of Placement & Corporate Relations · Campus Recruitment Season 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Institutional Drive</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className="px-4 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 text-white text-xs font-bold border border-white/20 transition-colors"
          >
            View Analytics
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Placement Success"
          value="86.7%"
          subtitle="538 of 620 students placed"
          icon={TrendingUp}
          colorScheme="emerald"
        />
        <StatsCard
          title="Average Package"
          value="14.8 LPA"
          subtitle="Median: 11.2 LPA"
          icon={Award}
          colorScheme="violet"
        />
        <StatsCard
          title="Active Drives"
          value={totalDrives}
          subtitle="Ongoing campus drives"
          icon={Briefcase}
          colorScheme="blue"
        />
        <StatsCard
          title="Partner Companies"
          value="118+"
          subtitle="Tier-1, Dream & Mass"
          icon={Building2}
          colorScheme="amber"
        />
      </div>

      {/* Central 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Drive Management Quick Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Campus Recruitment Drives In Progress</span>
            </h3>

            <button
              onClick={() => setActiveTab('drives')}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Manage All ({drives.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {drives.slice(0, 4).map(drive => (
              <div
                key={drive.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] hover:border-emerald-500 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <img src={drive.companyLogo} alt={drive.companyName} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {drive.roleTitle}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                      {drive.companyName} · CTC: <strong className="text-emerald-600 dark:text-emerald-400">{drive.ctc}</strong> · Cutoff: {drive.minCgpa} CGPA
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <StatusBadge status={drive.status} size="sm" />
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {drive.applicantCount} applied
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Links & Recent Notices */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              TPO Officer Quick Actions
            </h4>

            <div className="space-y-2">
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="w-full p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold text-left flex items-center justify-between hover:bg-emerald-100 transition-colors"
              >
                <span>Add Recruitment Drive</span>
                <Plus className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#141f36] text-slate-700 dark:text-slate-300 font-semibold text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Student Roster & Verification</span>
                <GraduationCap className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#141f36] text-slate-700 dark:text-slate-300 font-semibold text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Placement Statistical Charts</span>
                <BarChart3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('announcements')}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#141f36] text-slate-700 dark:text-slate-300 font-semibold text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Publish Official Notice</span>
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Notices Glance */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Live Circulars Board
            </h4>

            <div className="space-y-2">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="pb-2 border-b border-slate-100 dark:border-[#24304A] last:border-none last:pb-0">
                  <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {ann.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {ann.createdAt}
                  </p>
                </div>
              ))}
            </div>
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
