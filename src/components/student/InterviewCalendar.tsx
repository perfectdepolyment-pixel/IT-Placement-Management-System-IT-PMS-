import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  User, 
  BookOpen, 
  Laptop
} from 'lucide-react';

export const InterviewCalendar: React.FC = () => {
  const { applications, studentProfile } = useApp();

  const studentApps = applications.filter(a => a.studentId === studentProfile.userId);
  const scheduledInterviews = studentApps.filter(
    a => a.status === 'interview_scheduled' && a.interviewSchedule
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Interview Schedules & Preparation
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Stay on top of upcoming interview rounds, Google Meet links, and placement guidelines.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Scheduled Interviews */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Upcoming Interview Slots</span>
          </h3>

          {scheduledInterviews.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-[#111A2E] rounded-2xl border border-slate-200 dark:border-[#24304A]">
              <Calendar className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No active interview slots scheduled
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                When recruiters advance your candidacy to technical or HR rounds, meeting dates and links appear here.
              </p>
            </div>
          ) : (
            scheduledInterviews.map(app => {
              const schedule = app.interviewSchedule!;
              return (
                <div
                  key={app.id}
                  className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-blue-200 dark:border-blue-900/60 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            {app.companyName}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                            Confirmed Slot
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                          {schedule.roundName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Role: {app.roleTitle}
                        </p>
                      </div>
                    </div>

                    {schedule.locationOrLink && (
                      <a
                        href={schedule.locationOrLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shrink-0 self-start sm:self-auto transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Meeting</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>

                  {/* Details Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A] text-xs">
                    <div>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> Time & Date
                      </span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        {schedule.dateTime}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-500" /> Mode / Location
                      </span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        {schedule.mode}
                      </p>
                    </div>

                    {schedule.interviewerName && (
                      <div className="sm:col-span-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                        <span className="text-slate-400 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-emerald-500" /> Interviewer
                        </span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                          {schedule.interviewerName}
                        </p>
                      </div>
                    )}

                    {schedule.notes && (
                      <div className="sm:col-span-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                        <span className="text-slate-400 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Round Instructions
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 mt-0.5 italic">
                          "{schedule.notes}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Placement Cell Guidelines & Checklist */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Interview Protocols & Checklist</span>
          </h3>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-3.5 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Join 10 Minutes Early</strong>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Verify high-speed network, microphone audio, and video clarity prior to joining.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Strict Formal Attire</strong>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Campus recruitment committee enforces formal dress code for all virtual and offline rounds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Portfolio & Resume Ready</strong>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Have your GitHub projects, live hosted demo links, and college ID card open in separate tabs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Laptop className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">IDE & Scratchpad</strong>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Keep a code editor ready for live technical problem-solving and whiteboarding.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#24304A] text-slate-500 dark:text-slate-400 text-[11px]">
              Need technical assistance during an interview? Call Placement Cell Helpdesk: <strong>+91 94250 88990</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
