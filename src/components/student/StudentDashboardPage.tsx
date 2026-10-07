import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../common/StatsCard';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  Award, 
  ArrowRight, 
  Clock, 
  Video, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  Building2,
  Bookmark
} from 'lucide-react';

export const StudentDashboardPage: React.FC = () => {
  const { 
    studentProfile, 
    applications, 
    drives, 
    announcements, 
    checkEligibility, 
    navigate,
    toggleSaveDrive,
    isDriveSaved 
  } = useApp();

  const myApplications = applications.filter(a => a.studentId === studentProfile.userId);
  const scheduledInterviews = myApplications.filter(a => a.status === 'interview_scheduled');
  const offersReceived = myApplications.filter(a => a.status === 'selected');
  const shortlistedCount = myApplications.filter(a => ['shortlisted', 'interview_scheduled'].includes(a.status)).length;

  // Profile completion calculation
  const completionPercent = 85;

  // Recommended drives (eligible + active)
  const recommendedDrives = drives
    .filter(d => checkEligibility(d, studentProfile).isEligible && d.status === 'ongoing')
    .slice(0, 3);

  // Closing soon deadlines
  const closingSoon = [...drives]
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 4.2.1 Welcome header with profile completion progress bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Hi, {studentProfile.fullName} 👋
            </h1>
            {studentProfile.isPlaced ? (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Placed at {studentProfile.placedCompany} ({studentProfile.placedPackage})
              </span>
            ) : (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                2026 Batch · {studentProfile.department.split(' ')[0]}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Roll No: <strong>{studentProfile.rollNo}</strong> · CGPA: <strong>{studentProfile.cgpa}</strong> · Active Backlogs: <strong>{studentProfile.activeBacklogs}</strong>
          </p>

          {/* Profile Completion Bar */}
          <div className="pt-2 max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Profile Completeness: <strong className="text-blue-600 dark:text-blue-400">{completionPercent}%</strong>
              </span>
              <button
                onClick={() => navigate('/student/profile')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-[11px]"
              >
                Complete profile →
              </button>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={() => navigate('/student/resume')}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            Update Resume
          </button>
          <button
            onClick={() => navigate('/student/drives')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            Browse Drives
          </button>
        </div>
      </div>

      {/* Stat cards row: Applied Drives | Shortlisted | Interviews Scheduled | Offers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Applied Drives"
          value={myApplications.length}
          subtitle="Submitted applications"
          icon={Briefcase}
          colorScheme="blue"
        />
        <StatsCard
          title="Shortlisted"
          value={shortlistedCount}
          subtitle="Cleared initial assessment"
          icon={FileText}
          colorScheme="violet"
        />
        <StatsCard
          title="Interviews Scheduled"
          value={scheduledInterviews.length}
          subtitle="Rounds upcoming"
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

      {/* Two-Column Section: Left (Wider) & Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Recommended Drives + Recent Applications */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Recommended Drives */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Recommended for Your Profile</span>
                </h2>
                <p className="text-[11px] text-slate-400">Based on your {studentProfile.department} criteria & {studentProfile.cgpa} CGPA</p>
              </div>

              <button
                onClick={() => navigate('/student/drives')}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                View all ({drives.length})
              </button>
            </div>

            <div className="space-y-3">
              {recommendedDrives.map(drive => (
                <div
                  key={drive.id}
                  className="p-4 rounded-2xl bg-slate-50/70 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A] hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                      <img src={drive.companyLogo} alt={drive.companyName} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{drive.roleTitle}</h4>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                        {drive.companyName} · CTC: <strong className="text-emerald-600 font-bold">{drive.ctc}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => toggleSaveDrive(drive.id)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-[#24304A] text-slate-400 hover:text-blue-600"
                      title="Bookmark Drive"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isDriveSaved(drive.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                    </button>
                    <button
                      onClick={() => navigate('/student/drives')}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications (Compact Table) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-600" />
                <span>Recent Applications</span>
              </h2>

              <button
                onClick={() => navigate('/student/applications')}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Track all ({myApplications.length})
              </button>
            </div>

            {myApplications.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No submitted applications yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#141f36] text-slate-500 font-semibold border-b border-slate-100 dark:border-[#24304A]">
                    <tr>
                      <th className="py-2.5 px-3">Company & Role</th>
                      <th className="py-2.5 px-3">Applied Date</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#24304A]">
                    {myApplications.slice(0, 4).map(app => (
                      <tr key={app.id}>
                        <td className="py-2.5 px-3">
                          <strong className="block text-slate-900 dark:text-white">{app.roleTitle}</strong>
                          <span className="text-[11px] text-slate-400">{app.companyName}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{app.appliedAt}</td>
                        <td className="py-2.5 px-3">
                          <StatusBadge status={app.status} size="sm" />
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => navigate('/student/applications')}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                          >
                            Track →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (5 cols): Upcoming Interviews, Announcements, Deadlines */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upcoming Interviews */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Upcoming Interviews</span>
              </h3>
              <button
                onClick={() => navigate('/student/interviews')}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Calendar
              </button>
            </div>

            {scheduledInterviews.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No interviews scheduled today.</p>
            ) : (
              <div className="space-y-2.5">
                {scheduledInterviews.map(app => (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/60 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-bold text-sky-950 dark:text-sky-200">
                      <span>{app.companyName}</span>
                      <span className="text-[10px] bg-sky-200 dark:bg-sky-900 px-2 py-0.5 rounded-full">Confirmed</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white">{app.interviewSchedule?.roundName}</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-600" />
                      <span>{app.interviewSchedule?.dateTime}</span>
                    </p>
                    {app.interviewSchedule?.locationOrLink && (
                      <a
                        href={app.interviewSchedule.locationOrLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline pt-1"
                      >
                        <Video className="w-3 h-3" />
                        <span>Join Meeting Room</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Placement Bulletins / Announcements */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Official Circulars</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="pb-2 border-b border-slate-100 dark:border-[#24304A] last:border-none last:pb-0">
                  <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{ann.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Drives Closing Soon */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" />
              <span>Closing Soon Deadlines</span>
            </h3>

            <div className="space-y-2 text-xs">
              {closingSoon.map(drive => (
                <div key={drive.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#141f36]">
                  <div>
                    <strong className="block text-slate-900 dark:text-white">{drive.companyName}</strong>
                    <span className="text-[11px] text-slate-400">{drive.roleTitle}</span>
                  </div>
                  <span className="text-[11px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                    {drive.deadline}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
