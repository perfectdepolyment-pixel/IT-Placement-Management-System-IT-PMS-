import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  ChevronRight, 
  Users, 
  Clock, 
  FileText, 
  Sparkles,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { RecruitmentDrive } from '../../types';

export const DriveDetailsPage: React.FC<{ driveId?: string }> = ({ driveId }) => {
  const { 
    drives, 
    activeDriveId, 
    studentProfile, 
    checkEligibility, 
    applyToDrive, 
    applications, 
    navigate,
    toggleSaveDrive,
    isDriveSaved 
  } = useApp();

  const currentId = driveId || activeDriveId || drives[0]?.id;
  const drive = drives.find(d => d.id === currentId) || drives[0];

  const [activeTab, setActiveTab] = useState<'desc' | 'requirements' | 'process' | 'company'>('desc');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'minimalist'>('modern');
  const [coverNote, setCoverNote] = useState('');

  if (!drive) return <div>No drive selected.</div>;

  const elig = checkEligibility(drive, studentProfile);
  const existingApp = applications.find(a => a.driveId === drive.id && a.studentId === studentProfile.userId);
  const isApplied = !!existingApp;
  const isSaved = isDriveSaved(drive.id);

  // Similar drives
  const similarDrives = drives.filter(d => d.id !== drive.id).slice(0, 2);

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyToDrive(drive.id, coverNote);
    if (success) {
      setIsApplyModalOpen(false);
      setCoverNote('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      
      {/* 4.2.5 Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigate('/student/drives')} className="hover:text-blue-600 transition-colors">
          Job Drives
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">{drive.companyName}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 dark:text-blue-400 font-bold">{drive.roleTitle}</span>
      </nav>

      {/* Header Card with sticky Apply Now */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
            <img src={drive.companyLogo} alt={drive.companyName} className="max-h-full max-w-full object-contain" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{drive.roleTitle}</h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {drive.jobType}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-200">{drive.companyName}</strong> · Locations: {drive.locations.join(', ')}
            </p>
            <div className="flex items-center gap-4 text-xs font-bold pt-1">
              <span className="text-emerald-600 dark:text-emerald-400">Package: {drive.ctc}</span>
              <span aria-hidden="true">·</span>
              <span className="text-rose-600">Deadline: {drive.deadline}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{drive.totalVacancies} Openings</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => toggleSaveDrive(drive.id)}
            className="p-3 rounded-xl border border-slate-200 dark:border-[#24304A] text-slate-500 hover:text-blue-600"
            title="Save Drive"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
          </button>

          {isApplied ? (
            <span className="px-5 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Applied ({existingApp.status.toUpperCase()})</span>
            </span>
          ) : (
            <button
              onClick={() => setIsApplyModalOpen(true)}
              disabled={!elig.isEligible}
              className={`px-6 py-3 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 ${
                elig.isEligible
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Eligibility Checker Card with green ticks or red crosses */}
      <div className={`p-6 rounded-3xl border shadow-xs ${
        elig.isEligible 
          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' 
          : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
      }`}>
        <div className="flex items-start gap-4">
          {elig.isEligible ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {elig.isEligible
                  ? 'Institutional Eligibility Verified — You Qualify for this Drive'
                  : 'You do not meet one or more criteria set by the recruiting organization'}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                Your CGPA: {studentProfile.cgpa}
              </span>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                {elig.criteria.cgpa.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                <span>CGPA: Min {drive.minCgpa} (Yours: {studentProfile.cgpa})</span>
              </div>

              <div className="flex items-center gap-2">
                {elig.criteria.branch.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                <span>Branch: {studentProfile.department.split(' ')[0]}</span>
              </div>

              <div className="flex items-center gap-2">
                {elig.criteria.backlogs.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                <span>Backlogs: Max {drive.maxBacklogsAllowed} (Yours: {studentProfile.activeBacklogs})</span>
              </div>

              <div className="flex items-center gap-2">
                {elig.criteria.tenth.passed && elig.criteria.twelfth.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                <span>10th / 12th: Min {drive.minTenthPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Tabs Content Left + Important Dates Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Tabs (Job Description, Requirements, Selection Process, About Company) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-[#141f36] rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${activeTab === 'desc' ? 'bg-white dark:bg-[#1f2c48] text-blue-600 shadow-xs' : 'text-slate-500'}`}
            >
              Job Description
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${activeTab === 'requirements' ? 'bg-white dark:bg-[#1f2c48] text-blue-600 shadow-xs' : 'text-slate-500'}`}
            >
              Requirements & Skills
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${activeTab === 'process' ? 'bg-white dark:bg-[#1f2c48] text-blue-600 shadow-xs' : 'text-slate-500'}`}
            >
              Selection Process Timeline
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${activeTab === 'company' ? 'bg-white dark:bg-[#1f2c48] text-blue-600 shadow-xs' : 'text-slate-500'}`}
            >
              About Company
            </button>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs text-xs sm:text-sm">
            {activeTab === 'desc' && (
              <div className="space-y-4 leading-relaxed animate-in fade-in">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Role Scope & Mission</h3>
                <p className="text-slate-600 dark:text-slate-300">{drive.description}</p>
                <div className="pt-3 border-t border-slate-100 dark:border-[#24304A]">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Key Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {drive.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Technical Prerequisites</h3>
                <ul className="list-disc list-inside space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {drive.requirements.map((req, i) => <li key={i} className="leading-relaxed">{req}</li>)}
                </ul>

                <div className="pt-4 border-t border-slate-100 dark:border-[#24304A]">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Eligible Engineering Branches</h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {drive.eligibleBranches.map((b, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Selection Process & Rounds Timeline</h3>
                <div className="space-y-3">
                  {drive.rounds.map((round, idx) => (
                    <div key={round.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A] flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {round.roundNumber}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 dark:text-white text-xs">{round.name}</strong>
                          <span className="text-[10px] text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border">
                            {round.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{round.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'company' && (
              <div className="space-y-4 animate-in fade-in text-xs leading-relaxed">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">About {drive.companyName}</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {drive.companyName} is an elite corporate partner visiting our university annually. Headquartered globally with prominent research labs across Indian tech hubs.
                </p>
                {drive.companyWebsite && (
                  <a
                    href={drive.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:underline"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Important Dates Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Drive Milestones & Dates</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36]">
                <span className="text-slate-400 text-[11px] block">Application Closes</span>
                <strong className="text-rose-600 font-bold text-sm">{drive.deadline}</strong>
                <span className="text-[10px] text-slate-400 block">Strict deadline at 11:59 PM</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36]">
                <span className="text-slate-400 text-[11px] block">Drive Commencement</span>
                <strong className="text-slate-900 dark:text-white font-bold text-sm">{drive.driveDate}</strong>
                <span className="text-[10px] text-slate-400 block">Auditorium PPT & Coding Test</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36]">
                <span className="text-slate-400 text-[11px] block">Estimated Joining</span>
                <strong className="text-emerald-600 font-bold text-sm">July 2026</strong>
                <span className="text-[10px] text-slate-400 block">Upon final degree completion</span>
              </div>
            </div>
          </div>

          {/* Similar Drives Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Similar Open Drives</h3>
            <div className="space-y-2.5">
              {similarDrives.map(s => (
                <div
                  key={s.id}
                  onClick={() => navigate(`/student/drives/${s.id}`)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer transition-colors text-xs space-y-1"
                >
                  <strong className="block text-slate-900 dark:text-white">{s.roleTitle}</strong>
                  <p className="text-slate-500">{s.companyName} · <span className="text-emerald-600 font-semibold">{s.ctc}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 4.2.5 Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#111A2E] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#24304A] space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Submit Drive Application</h3>
              <p className="text-xs text-slate-500">Applying to <strong>{drive.companyName}</strong> for {drive.roleTitle}.</p>
            </div>

            <form onSubmit={handleConfirmApply} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Resume Template for Recruiter
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['modern', 'classic', 'minimalist'] as const).map(tpl => (
                    <button
                      key={tpl}
                      type="button"
                      onClick={() => setSelectedTemplate(tpl)}
                      className={`py-2 px-3 rounded-xl border text-center capitalize font-semibold ${
                        selectedTemplate === tpl
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600'
                      }`}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Optional Cover Note / Candidate Statement
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a brief 1-2 sentence note highlighting relevant projects or skills..."
                  value={coverNote}
                  onChange={e => setCoverNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] text-[11px] text-slate-500">
                Verified Roll No: <strong>{studentProfile.rollNo}</strong> · CGPA: <strong>{studentProfile.cgpa}</strong> · Passing Year: <strong>{studentProfile.passingYear || 2026}</strong>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-[#24304A]">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Confirm & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
