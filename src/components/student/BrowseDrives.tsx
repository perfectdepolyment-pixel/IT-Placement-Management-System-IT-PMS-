import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { RecruitmentDrive } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { DriveDetailModal } from './DriveDetailModal';
import { EmptyState } from '../common/EmptyState';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Check, 
  Clock, 
  SlidersHorizontal,
  Building2,
  ExternalLink,
  Briefcase
} from 'lucide-react';

export const BrowseDrives: React.FC = () => {
  const { drives, studentProfile, checkEligibility, applications, applyToDrive } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState<RecruitmentDrive | null>(null);

  // Filtered drives
  const filteredDrives = useMemo(() => {
    return drives.filter(drive => {
      // Search
      const matchSearch = 
        drive.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drive.locations.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchSearch) return false;

      // Job Type
      if (selectedJobType !== 'all' && drive.jobType !== selectedJobType) return false;

      // Branch
      if (selectedBranch !== 'all') {
        const matchesBranch = drive.eligibleBranches.some(b => 
          b.toLowerCase().includes(selectedBranch.toLowerCase())
        );
        if (!matchesBranch) return false;
      }

      // Eligibility toggle
      if (onlyEligible) {
        const elig = checkEligibility(drive, studentProfile);
        if (!elig.isEligible) return false;
      }

      return true;
    });
  }, [drives, searchQuery, selectedBranch, selectedJobType, onlyEligible, checkEligibility, studentProfile]);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Campus Recruitment Drives
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse verified opportunities, review eligibility criteria, and submit direct applications.
          </p>
        </div>

        {/* Quick summary pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
            {filteredDrives.length} Open Drives Found
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Job Type Select */}
          <div>
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="all">All Employment Types</option>
              <option value="Full-Time">Full-Time (FTE)</option>
              <option value="Internship">Internship Only</option>
              <option value="Intern + Full-Time">Intern + FTE</option>
            </select>
          </div>

          {/* Branch Select */}
          <div>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence">AI & Data Science</option>
              <option value="Electronics">Electronics & Comm</option>
            </select>
          </div>
        </div>

        {/* Bottom Filter Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-[#24304A]/60 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={onlyEligible}
              onChange={(e) => setOnlyEligible(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600"
            />
            <span>Show Only Drives Matching My Eligibility (CGPA: {studentProfile.cgpa})</span>
          </label>

          {(searchQuery || selectedJobType !== 'all' || selectedBranch !== 'all' || onlyEligible) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedJobType('all');
                setSelectedBranch('all');
                setOnlyEligible(false);
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-xs"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Drives Grid */}
      {filteredDrives.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No Placement Drives Match Your Criteria"
          description="Try adjusting your search terms, selecting different departments, or unchecking the strict eligibility filter."
          actionLabel="Reset All Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedBranch('all');
            setSelectedJobType('all');
            setOnlyEligible(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDrives.map(drive => {
            const eligibility = checkEligibility(drive, studentProfile);
            const application = applications.find(
              a => a.driveId === drive.id && a.studentId === studentProfile.userId
            );
            const isApplied = !!application;

            return (
              <div
                key={drive.id}
                className="group relative p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Company & Status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center shrink-0">
                        <img
                          src={drive.companyLogo}
                          alt={drive.companyName}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                          {drive.companyName}
                        </h4>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {drive.jobType}
                        </span>
                      </div>
                    </div>

                    {isApplied ? (
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        Applied
                      </span>
                    ) : (
                      <StatusBadge status={drive.status} size="sm" showDot={false} />
                    )}
                  </div>

                  {/* Role Title */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {drive.roleTitle}
                  </h3>

                  {/* CTC and Location */}
                  <div className="space-y-1.5 py-2.5 border-y border-slate-100 dark:border-[#24304A]/60 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Package:
                      </span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {drive.ctc}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Location:
                      </span>
                      <span className="text-slate-700 dark:text-slate-200 truncate max-w-[140px]" title={drive.locations.join(', ')}>
                        {drive.locations.join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Deadline:
                      </span>
                      <span className="text-slate-700 dark:text-slate-200 font-medium">
                        {drive.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Eligibility Indicator */}
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      {eligibility.isEligible ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Eligible (Min {drive.minCgpa} CGPA)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3" /> Not Eligible (Needs {drive.minCgpa}+ CGPA)
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {drive.rounds.length} Rounds
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#24304A] flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDrive(drive)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-[#24304A] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center"
                  >
                    View Details & Criteria
                  </button>

                  {!isApplied ? (
                    <button
                      onClick={() => applyToDrive(drive.id)}
                      disabled={!eligibility.isEligible}
                      className={`py-2 px-3.5 rounded-xl text-xs font-semibold shadow-xs transition-all ${
                        eligibility.isEligible
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Apply
                    </button>
                  ) : (
                    <span className="py-2 px-3 text-xs font-medium text-slate-400">
                      Submitted
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      <DriveDetailModal
        drive={selectedDrive}
        isOpen={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
      />
    </div>
  );
};
