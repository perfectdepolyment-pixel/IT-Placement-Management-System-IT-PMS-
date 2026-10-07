import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../common/StatsCard';
import { StatusBadge } from '../common/StatusBadge';
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Building2, 
  Clock, 
  Video, 
  Sparkles,
  Award
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    studentProfile, 
    applications, 
    drives, 
    checkEligibility, 
    announcements, 
    setActiveTab 
  } = useApp();

  const myApplications = applications.filter(a => a.studentId === studentProfile.userId);
  const eligibleDrivesCount = drives.filter(d => checkEligibility(d, studentProfile).isEligible).length;
  const scheduledInterviews = myApplications.filter(a => a.status === 'interview_scheduled');
  const offersReceived = myApplications.filter(a => a.status === 'selected');

  const upcomingInterview = scheduledInterviews[0]?.interviewSchedule;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Student Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.fullName}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Welcome back, {studentProfile.fullName}!
              </h2>
              {studentProfile.isPlaced ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 border border-emerald-300/40">
                  <Award className="w-3.5 h-3.5" /> Placed at {studentProfile.placedCompany}
                </span>
              ) : (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-blue-100 backdrop-blur-xs">
                  Active Placement Season 2026
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Roll No: <strong>{studentProfile.rollNo}</strong> · {studentProfile.department} · CGPA: <strong>{studentProfile.cgpa}</strong> (0 Backlogs)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('drives')}
            className="px-4 py-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold shadow-sm transition-all"
          >
            Explore Drives ({eligibleDrivesCount} Eligible)
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="px-4 py-2 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white text-xs font-bold border border-white/20 transition-colors"
          >
            Edit Resume
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Eligible Drives"
          value={eligibleDrivesCount}
          subtitle={`Out of ${drives.length} active campus drives`}
          icon={Briefcase}
          colorScheme="blue"
        />
        <StatsCard
          title="Applications Sent"
          value={myApplications.length}
          subtitle="Submitted to recruiters"
          icon={FileText}
          colorScheme="violet"
        />
        <StatsCard
          title="Interviews Slotted"
          value={scheduledInterviews.length}
          subtitle="Technical & HR rounds"
          icon={Calendar}
          colorScheme="sky"
        />
        <StatsCard
          title="Offers Claimed"
          value={offersReceived.length}
          subtitle={offersReceived.length > 0 ? `${offersReceived[0].companyName}` : 'Under evaluation'}
          icon={Award}
          colorScheme="emerald"
        />
      </div>

      {/* Grid: Active Applications & Next Interview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Applications */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Active Applications Tracker</span>
            </h3>
            <button
              onClick={() => setActiveTab('applications')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {myApplications.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-[#111A2E] rounded-2xl border border-slate-200 dark:border-[#24304A]">
                <p className="text-xs text-slate-500">You haven’t applied to any drives yet.</p>
              </div>
            ) : (
              myApplications.map(app => (
                <div
                  key={app.id}
                  onClick={() => setActiveTab('applications')}
                  className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] hover:border-blue-400 dark:hover:border-blue-600 shadow-xs cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                      <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {app.roleTitle}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {app.companyName} · Applied {app.appliedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <StatusBadge status={app.status} size="sm" />
                    <span className="text-slate-400">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 1 Col: Scheduled Interview & Notices */}
        <div className="space-y-6">
          
          {/* Upcoming Interview Card */}
          {upcomingInterview ? (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-[#111A2E] dark:to-[#17253d] border border-sky-200 dark:border-sky-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" /> Next Scheduled Round
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200 font-bold">
                  Confirmed
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {upcomingInterview.roundName}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-600" /> {upcomingInterview.dateTime}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {upcomingInterview.mode}
                </p>
              </div>

              {upcomingInterview.locationOrLink && (
                <a
                  href={upcomingInterview.locationOrLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Meeting Link</span>
                </a>
              )}
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] text-center text-xs text-slate-500">
              <Calendar className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No pending interviews today</p>
              <p className="mt-1">Keep an eye on active applications for updates.</p>
            </div>
          )}

          {/* Announcements Glance */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Placement Bulletins
              </h4>
              <button
                onClick={() => setActiveTab('announcements')}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                All Notices
              </button>
            </div>

            <div className="space-y-2.5">
              {announcements.slice(0, 2).map(ann => (
                <div key={ann.id} className="text-xs border-b border-slate-100 dark:border-[#24304A] pb-2 last:border-none last:pb-0">
                  <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {ann.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
