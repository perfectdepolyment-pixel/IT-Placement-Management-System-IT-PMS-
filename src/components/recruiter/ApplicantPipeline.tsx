import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { 
  Users2, 
  Search, 
  Filter, 
  Calendar, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Video, 
  Clock, 
  Building2, 
  GraduationCap, 
  ChevronRight, 
  Kanban, 
  Table, 
  X,
  Send,
  FileCheck
} from 'lucide-react';

export const ApplicantPipeline: React.FC = () => {
  const { 
    applications, 
    drives, 
    updateApplicationStatus, 
    scheduleInterview, 
    issueOffer 
  } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('table');
  const [selectedDriveFilter, setSelectedDriveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [minCgpaFilter, setMinCgpaFilter] = useState<number>(0);

  // Modals state
  const [reviewCandidate, setReviewCandidate] = useState<Application | null>(null);
  const [scheduleModalApp, setScheduleModalApp] = useState<Application | null>(null);
  const [offerModalApp, setOfferModalApp] = useState<Application | null>(null);
  const [rejectCandidateApp, setRejectCandidateApp] = useState<Application | null>(null);

  // Schedule Interview form state
  const [interviewRoundName, setInterviewRoundName] = useState('Technical Round 1');
  const [interviewDateTime, setInterviewDateTime] = useState('2026-10-15 at 03:00 PM IST');
  const [interviewMode, setInterviewMode] = useState<'Online (Google Meet)' | 'In-Person (Placement Hall)' | 'Campus Lab'>('Online (Google Meet)');
  const [interviewLink, setInterviewLink] = useState('https://meet.google.com/pms-interview-room');
  const [interviewerName, setInterviewerName] = useState('Engineering Team Lead');
  const [interviewNotes, setInterviewNotes] = useState('Please prepare to discuss past projects and live coding algorithms.');

  // Offer form state
  const [offerCtc, setOfferCtc] = useState('24.0 LPA');
  const [offerJoiningDate, setOfferJoiningDate] = useState('2026-07-01');
  const [offerLocation, setOfferLocation] = useState('Bengaluru Campus');

  // Filter applications
  const filteredApps = applications.filter(app => {
    if (selectedDriveFilter !== 'all' && app.driveId !== selectedDriveFilter) return false;
    if (app.studentCgpa < minCgpaFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = app.studentName.toLowerCase().includes(q) ||
        app.studentRollNo.toLowerCase().includes(q) ||
        app.studentDept.toLowerCase().includes(q) ||
        app.companyName.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const columns: { status: ApplicationStatus; title: string; count: number }[] = [
    { status: 'applied', title: 'New Applied', count: filteredApps.filter(a => a.status === 'applied').length },
    { status: 'under_review', title: 'Under Review', count: filteredApps.filter(a => a.status === 'under_review').length },
    { status: 'shortlisted', title: 'Shortlisted', count: filteredApps.filter(a => a.status === 'shortlisted').length },
    { status: 'interview_scheduled', title: 'Interview Scheduled', count: filteredApps.filter(a => a.status === 'interview_scheduled').length },
    { status: 'selected', title: 'Selected / Offered', count: filteredApps.filter(a => a.status === 'selected').length },
  ];

  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModalApp) return;

    scheduleInterview(scheduleModalApp.id, {
      roundName: interviewRoundName,
      dateTime: interviewDateTime,
      mode: interviewMode,
      locationOrLink: interviewLink,
      interviewerName,
      notes: interviewNotes,
    });

    setScheduleModalApp(null);
  };

  const handleConfirmOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerModalApp) return;

    issueOffer(offerModalApp.id, offerCtc, offerJoiningDate, offerLocation);
    setOfferModalApp(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Candidate Pipeline & Evaluation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review student resumes, shortlist profiles, coordinate interview slots, and generate employment offers.
          </p>
        </div>

        {/* View Switcher: Table vs Kanban */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-100 dark:bg-[#141f36] p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, roll number, or department..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          {/* Drive Select */}
          <div>
            <select
              value={selectedDriveFilter}
              onChange={e => setSelectedDriveFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Placement Drives</option>
              {drives.map(d => (
                <option key={d.id} value={d.id}>
                  {d.companyName} - {d.roleTitle}
                </option>
              ))}
            </select>
          </div>

          {/* CGPA Filter */}
          <div>
            <select
              value={minCgpaFilter}
              onChange={e => setMinCgpaFilter(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="0">All CGPA Scores</option>
              <option value="7.0">CGPA ≥ 7.0</option>
              <option value="8.0">CGPA ≥ 8.0</option>
              <option value="8.5">CGPA ≥ 8.5</option>
              <option value="9.0">CGPA ≥ 9.0 (Top Tier)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Displaying <strong>{filteredApps.length}</strong> candidate applications</span>
          {(searchQuery || selectedDriveFilter !== 'all' || minCgpaFilter > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDriveFilter('all');
                setMinCgpaFilter(0);
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* View 1: Data Table */}
      {viewMode === 'table' ? (
        <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-[#141f36] border-b border-slate-100 dark:border-[#24304A] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Drive & Role</th>
                  <th className="py-3.5 px-4">Branch</th>
                  <th className="py-3.5 px-4">CGPA</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#24304A]">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No candidates match the specified filters.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map(app => (
                    <tr 
                      key={app.id} 
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Candidate Name & Roll */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                            alt={app.studentName}
                            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                          />
                          <div>
                            <button
                              onClick={() => setReviewCandidate(app)}
                              className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-left transition-colors"
                            >
                              {app.studentName}
                            </button>
                            <p className="text-[11px] text-slate-400">
                              {app.studentRollNo}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Drive & Company */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {app.companyName}
                        </span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                          {app.roleTitle}
                        </p>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {app.studentDept}
                      </td>

                      {/* CGPA */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                          {app.studentCgpa}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <StatusBadge status={app.status} size="sm" />
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setReviewCandidate(app)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors"
                            title="Quick View Resume"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {app.status === 'applied' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                              className="px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-[11px] transition-colors"
                            >
                              Shortlist
                            </button>
                          )}

                          {app.status === 'shortlisted' && (
                            <button
                              onClick={() => {
                                setScheduleModalApp(app);
                                setInterviewRoundName('Technical Round 1');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <Video className="w-3 h-3" />
                              <span>Schedule</span>
                            </button>
                          )}

                          {app.status === 'interview_scheduled' && (
                            <button
                              onClick={() => {
                                setOfferModalApp(app);
                                setOfferCtc('24.0 LPA');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <Award className="w-3 h-3" />
                              <span>Issue Offer</span>
                            </button>
                          )}

                          {app.status !== 'rejected' && app.status !== 'selected' && (
                            <button
                              onClick={() => setRejectCandidateApp(app)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                              title="Reject Application"
                              aria-label="Reject candidate application"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* View 2: Kanban Pipeline */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map(col => {
            const appsInCol = filteredApps.filter(a => a.status === col.status);

            return (
              <div
                key={col.status}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141f36] border border-slate-200/80 dark:border-[#24304A] flex flex-col min-w-[240px]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#24304A] mb-3">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {col.title}
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {appsInCol.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px]">
                  {appsInCol.map(app => (
                    <div
                      key={app.id}
                      className="p-3 rounded-xl bg-white dark:bg-[#111A2E] border border-slate-200/70 dark:border-[#24304A] shadow-2xs hover:shadow-md transition-all space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white">
                            {app.studentName}
                          </h5>
                          <p className="text-[11px] text-slate-400">
                            {app.studentRollNo} · {app.studentDept.split(' ')[0]}
                          </p>
                        </div>
                        <span className="font-bold text-[11px] text-blue-600 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                          {app.studentCgpa}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                        {app.companyName}
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-[#24304A] flex items-center justify-between">
                        <button
                          onClick={() => setReviewCandidate(app)}
                          className="text-[11px] text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                        >
                          View Bio
                        </button>

                        {col.status === 'applied' && (
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                            className="text-[10px] font-bold px-2 py-1 rounded bg-violet-600 text-white"
                          >
                            Shortlist →
                          </button>
                        )}

                        {col.status === 'shortlisted' && (
                          <button
                            onClick={() => {
                              setScheduleModalApp(app);
                              setInterviewRoundName('Technical Round 1');
                            }}
                            className="text-[10px] font-bold px-2 py-1 rounded bg-sky-600 text-white"
                          >
                            Schedule →
                          </button>
                        )}

                        {col.status === 'interview_scheduled' && (
                          <button
                            onClick={() => {
                              setOfferModalApp(app);
                              setOfferCtc('24.0 LPA');
                            }}
                            className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-600 text-white"
                          >
                            Offer →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Candidate Profile Quick View Modal */}
      {reviewCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#111A2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 dark:border-[#24304A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={reviewCandidate.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={reviewCandidate.studentName}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {reviewCandidate.studentName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {reviewCandidate.studentRollNo} · {reviewCandidate.studentDept}
                  </p>
                </div>
              </div>
              <button onClick={() => setReviewCandidate(null)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-[#141f36] rounded-xl text-center">
                <div>
                  <span className="text-slate-400 text-[11px]">Academic CGPA</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{reviewCandidate.studentCgpa}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Drive Target</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">{reviewCandidate.companyName}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Current Status</span>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5 uppercase">{reviewCandidate.status.replace('_', ' ')}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">Contact Coordinates</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Email: {reviewCandidate.studentEmail} {reviewCandidate.studentPhone ? `· Phone: ${reviewCandidate.studentPhone}` : ''}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Round Progression</h4>
                <div className="space-y-1.5">
                  {reviewCandidate.roundHistory.map((r, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{r.roundName}</span>
                      <span className="capitalize text-slate-500 font-medium">{r.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-[#24304A] flex justify-end gap-2">
              <button
                onClick={() => setReviewCandidate(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {scheduleModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#111A2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-[#24304A] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Schedule Interview Slot
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong>{scheduleModalApp.studentName}</strong> ({scheduleModalApp.companyName})
                  </p>
                </div>
              </div>
              <button onClick={() => setScheduleModalApp(null)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmSchedule} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Interview Round Name
                </label>
                <input
                  type="text"
                  required
                  value={interviewRoundName}
                  onChange={e => setInterviewRoundName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date & Time Slot
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026-10-18 at 02:30 PM IST"
                  value={interviewDateTime}
                  onChange={e => setInterviewDateTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mode
                </label>
                <select
                  value={interviewMode}
                  onChange={e => setInterviewMode(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="Online (Google Meet)">Online (Google Meet)</option>
                  <option value="In-Person (Placement Hall)">In-Person (Placement Hall)</option>
                  <option value="Campus Lab">Campus Computer Lab</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Meeting Link or Venue Room
                </label>
                <input
                  type="text"
                  required
                  value={interviewLink}
                  onChange={e => setInterviewLink(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Interviewer Name & Notes
                </label>
                <input
                  type="text"
                  value={interviewerName}
                  onChange={e => setInterviewerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white mb-2"
                />
                <textarea
                  rows={2}
                  value={interviewNotes}
                  onChange={e => setInterviewNotes(e.target.value)}
                  placeholder="Instructions for the candidate..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#24304A] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalApp(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold"
                >
                  Confirm & Notify Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Job Offer Modal */}
      {offerModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#111A2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-[#24304A] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Generate Campus Placement Offer
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong>{offerModalApp.studentName}</strong>
                  </p>
                </div>
              </div>
              <button onClick={() => setOfferModalApp(null)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmOffer} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Offered Package / Annual CTC
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 24.5 LPA"
                  value={offerCtc}
                  onChange={e => setOfferCtc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Expected Joining Date
                </label>
                <input
                  type="date"
                  required
                  value={offerJoiningDate}
                  onChange={e => setOfferJoiningDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Location / Headquarters
                </label>
                <input
                  type="text"
                  required
                  value={offerLocation}
                  onChange={e => setOfferLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#24304A] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOfferModalApp(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Issue Official Offer Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Candidate Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!rejectCandidateApp}
        onConfirm={() => {
          if (rejectCandidateApp) {
            updateApplicationStatus(rejectCandidateApp.id, 'rejected');
            setRejectCandidateApp(null);
          }
        }}
        onCancel={() => setRejectCandidateApp(null)}
        title="Reject Candidate Application"
        message={`Are you sure you want to mark ${rejectCandidateApp?.studentName}'s application for ${rejectCandidateApp?.roleTitle} as Rejected? This action cannot be undone.`}
        confirmLabel="Confirm Rejection"
        cancelLabel="Keep in Pipeline"
        isDestructive={true}
        type="reject"
      />
    </div>
  );
};
