import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Bookmark, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RecruitmentDrive } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

export const JobDrivesPage: React.FC = () => {
  const { 
    drives, 
    studentProfile, 
    checkEligibility, 
    navigate, 
    setActiveDriveId, 
    toggleSaveDrive, 
    isDriveSaved 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleType, setSelectedRoleType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSort, setSelectedSort] = useState<'latest' | 'deadline' | 'package'>('latest');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filter & Sort
  const filteredDrives = useMemo(() => {
    let result = drives.filter(drive => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = drive.roleTitle.toLowerCase().includes(q) ||
          drive.companyName.toLowerCase().includes(q) ||
          drive.locations.some(l => l.toLowerCase().includes(q));
        if (!match) return false;
      }

      if (selectedRoleType !== 'all' && drive.jobType !== selectedRoleType) {
        return false;
      }

      if (selectedLocation !== 'all' && !drive.locations.some(l => l.toLowerCase().includes(selectedLocation.toLowerCase()))) {
        return false;
      }

      if (onlyEligible) {
        const elig = checkEligibility(drive, studentProfile);
        if (!elig.isEligible) return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (selectedSort === 'deadline') {
        return a.deadline.localeCompare(b.deadline);
      } else if (selectedSort === 'package') {
        return b.ctcValueLpa - a.ctcValueLpa;
      }
      return b.createdAt.localeCompare(a.createdAt);
    });

    return result;
  }, [drives, searchQuery, selectedRoleType, selectedLocation, selectedSort, onlyEligible, checkEligibility, studentProfile]);

  const totalPages = Math.ceil(filteredDrives.length / pageSize) || 1;
  const paginatedDrives = filteredDrives.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleOpenDrive = (driveId: string) => {
    setActiveDriveId(driveId);
    navigate(`/student/drives/${driveId}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 4.2.4 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Campus Recruitment Drives
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse corporate drives, evaluate eligibility cutoffs, and submit applications.
          </p>
        </div>

        {/* View toggle (grid / list) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-100 dark:bg-[#141f36] p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${viewMode === 'grid' ? 'bg-white dark:bg-[#1f2c48] text-blue-600 shadow-xs' : 'text-slate-500'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${viewMode === 'list' ? 'bg-white dark:bg-[#1f2c48] text-blue-600 shadow-xs' : 'text-slate-500'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar & Sort Controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search role or company..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          {/* Role Type */}
          <div>
            <select
              value={selectedRoleType}
              onChange={e => { setSelectedRoleType(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Employment Types</option>
              <option value="Full-Time">Full-Time (FTE)</option>
              <option value="Internship">Internship Only</option>
              <option value="Intern + Full-Time">Intern + FTE</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <select
              value={selectedLocation}
              onChange={e => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Locations</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Noida">Noida</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={selectedSort}
              onChange={e => setSelectedSort(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white font-medium"
            >
              <option value="latest">Sort: Latest Added</option>
              <option value="deadline">Sort: Deadline Closing Soon</option>
              <option value="package">Sort: Highest Package (CTC)</option>
            </select>
          </div>
        </div>

        {/* Eligibility Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-[#24304A] text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={onlyEligible}
              onChange={e => { setOnlyEligible(e.target.checked); setCurrentPage(1); }}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Show Only Drives Matching My Academic Eligibility (CGPA: {studentProfile.cgpa})</span>
          </label>

          <span className="text-slate-500">
            Showing <strong>{filteredDrives.length}</strong> available drives
          </span>
        </div>
      </div>

      {/* Drives Grid or List */}
      {paginatedDrives.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#111A2E] rounded-3xl border border-slate-200 dark:border-[#24304A] space-y-2">
          <p className="text-base font-bold text-slate-800 dark:text-slate-200">No recruitment drives found matching criteria</p>
          <p className="text-xs text-slate-400">Try loosening your search query or unchecking the eligibility toggle.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedDrives.map(drive => {
            const elig = checkEligibility(drive, studentProfile);
            const saved = isDriveSaved(drive.id);

            return (
              <div
                key={drive.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                        <img src={drive.companyLogo} alt={drive.companyName} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1">{drive.companyName}</h4>
                        <span className="text-[11px] text-slate-400">{drive.jobType}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveDrive(drive.id)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-[#24304A] text-slate-400 hover:text-blue-600"
                      title={saved ? 'Remove Bookmark' : 'Bookmark Drive'}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-600 text-blue-600' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-3 line-clamp-1">{drive.roleTitle}</h3>

                  <div className="space-y-1.5 py-3 border-y border-slate-100 dark:border-[#24304A] text-xs mt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Package (CTC):</span>
                      <strong className="text-emerald-600 font-bold">{drive.ctc}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Locations:</span>
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{drive.locations.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Deadline:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{drive.deadline}</strong>
                    </div>
                  </div>

                  {/* Eligibility Badge */}
                  <div className="mt-3 flex items-center justify-between text-xs">
                    {elig.isEligible ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Eligible ({drive.minCgpa}+ CGPA)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3.5 h-3.5" /> Ineligible
                      </span>
                    )}

                    <span className="text-[11px] text-slate-400">{drive.rounds.length} Rounds</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDrive(drive.id)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleOpenDrive(drive.id)}
                    disabled={!elig.isEligible}
                    className={`py-2 px-4 rounded-xl text-xs font-semibold ${
                      elig.isEligible
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode */
        <div className="space-y-3">
          {paginatedDrives.map(drive => {
            const elig = checkEligibility(drive, studentProfile);

            return (
              <div
                key={drive.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <img src={drive.companyLogo} alt={drive.companyName} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{drive.roleTitle}</h3>
                    <p className="text-slate-500 mt-0.5">{drive.companyName} · {drive.locations.join(', ')} · CTC: <strong className="text-emerald-600 font-bold">{drive.ctc}</strong></p>
                    <p className="text-[11px] text-slate-400 mt-1">Deadline: {drive.deadline} · Cutoff: {drive.minCgpa} CGPA</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                  {elig.isEligible ? (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">Eligible</span>
                  ) : (
                    <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">Ineligible</span>
                  )}
                  <button
                    onClick={() => handleOpenDrive(drive.id)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#24304A] text-xs font-semibold disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#24304A] text-xs font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};
