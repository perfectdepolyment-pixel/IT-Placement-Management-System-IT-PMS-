import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SelectionRound } from '../../types';
import { X, Plus, Trash2, Building2, DollarSign, Calendar, MapPin, Briefcase } from 'lucide-react';

interface PostDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostDriveModal: React.FC<PostDriveModalProps> = ({ isOpen, onClose }) => {
  const { addDrive, currentUser } = useApp();

  const [companyName, setCompanyName] = useState(currentUser?.companyName || 'Microsoft Corporation');
  const [roleTitle, setRoleTitle] = useState('');
  const [jobType, setJobType] = useState<'Full-Time' | 'Internship' | 'Intern + Full-Time'>('Full-Time');
  const [locations, setLocations] = useState('Bengaluru, Hyderabad');
  const [ctc, setCtc] = useState('18.0 LPA');
  const [stipend, setStipend] = useState('');
  const [ctcValueLpa, setCtcValueLpa] = useState(18.0);
  const [minCgpa, setMinCgpa] = useState(7.0);
  const [maxBacklogsAllowed, setMaxBacklogsAllowed] = useState(0);
  const [minTenthPercent, setMinTenthPercent] = useState(70);
  const [minTwelfthPercent, setMinTwelfthPercent] = useState(70);
  const [deadline, setDeadline] = useState('2026-11-15');
  const [driveDate, setDriveDate] = useState('2026-11-20');
  const [totalVacancies, setTotalVacancies] = useState(15);
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState('Deep understanding of Data Structures & Algorithms\nSolid foundation in Object-Oriented Programming and System Design\nFamiliarity with cloud microservices, REST APIs, and modern databases');
  const [responsibilitiesText, setResponsibilitiesText] = useState('Design and develop highly available software modules\nParticipate in sprint code reviews and automated testing\nCollaborate across multi-functional engineering teams');
  
  const [eligibleBranches, setEligibleBranches] = useState<string[]>([
    'Computer Science and Engineering',
    'Information Technology',
    'Artificial Intelligence & Data Science',
  ]);

  const [rounds, setRounds] = useState<SelectionRound[]>([
    { id: '1', roundNumber: 1, name: 'Online Coding Assessment', type: 'Coding Assessment', description: 'Algorithmic problem-solving assessment' },
    { id: '2', roundNumber: 2, name: 'Technical Round 1', type: 'Technical Round 1', description: 'DSA, problem solving and live coding' },
    { id: '3', roundNumber: 3, name: 'HR & Values Interview', type: 'HR Round', description: 'Behavioral and team culture fit' },
  ]);

  if (!isOpen) return null;

  const handleBranchToggle = (branch: string) => {
    if (eligibleBranches.includes(branch)) {
      setEligibleBranches(eligibleBranches.filter(b => b !== branch));
    } else {
      setEligibleBranches([...eligibleBranches, branch]);
    }
  };

  const handleAddRound = () => {
    const nextNum = rounds.length + 1;
    setRounds([
      ...rounds,
      {
        id: String(Date.now()),
        roundNumber: nextNum,
        name: `Technical Round ${nextNum - 1}`,
        type: 'Technical Round 2',
        description: 'System design and architecture discussion',
      },
    ]);
  };

  const handleRemoveRound = (idx: number) => {
    setRounds(rounds.filter((_, i) => i !== idx).map((r, i) => ({ ...r, roundNumber: i + 1 })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleTitle.trim()) return;

    addDrive({
      companyId: currentUser?.companyId || 'comp-custom',
      companyName,
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      companyWebsite: 'https://careers.microsoft.com',
      roleTitle,
      jobType,
      locations: locations.split(',').map(s => s.trim()),
      ctc,
      stipend: stipend ? stipend : undefined,
      ctcValueLpa,
      minCgpa,
      eligibleBranches,
      maxBacklogsAllowed,
      minTenthPercent,
      minTwelfthPercent,
      description: description || `Join ${companyName} for the ${roleTitle} role. Excellent opportunity for 2026 passing out batch.`,
      requirements: requirementsText.split('\n').filter(s => s.trim().length > 0),
      responsibilities: responsibilitiesText.split('\n').filter(s => s.trim().length > 0),
      rounds,
      deadline,
      driveDate,
      status: 'upcoming',
      totalVacancies,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#111A2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#24304A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Post New Campus Placement Drive
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure job description, institutional eligibility rules, and selection rounds.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Section 1: Company & Role Information */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider pb-1 border-b border-slate-100 dark:border-[#24304A]">
              1. Company & Role Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="post-company-name" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="post-company-name"
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Registered recruiting corporate entity.</span>
              </div>

              <div>
                <label htmlFor="post-role-title" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Role Title <span className="text-rose-500">*</span>
                </label>
                <input
                  id="post-role-title"
                  type="text"
                  required
                  placeholder="e.g. Cloud Solutions Architect / SDE-1"
                  value={roleTitle}
                  onChange={e => setRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Full designation offered to graduates.</span>
              </div>

              <div>
                <label htmlFor="post-job-type" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Employment Type <span className="text-rose-500">*</span>
                </label>
                <select
                  id="post-job-type"
                  value={jobType}
                  onChange={e => setJobType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="Full-Time">Full-Time (FTE)</option>
                  <option value="Internship">Internship Only</option>
                  <option value="Intern + Full-Time">Intern + Full-Time</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">Nature of campus employment offer.</span>
              </div>

              <div>
                <label htmlFor="post-ctc" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Package / CTC (Annual) <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="post-ctc"
                    type="text"
                    required
                    placeholder="e.g. 21.5 LPA"
                    value={ctc}
                    onChange={e => setCtc(e.target.value)}
                    className="w-2/3 px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                  />
                  <input
                    id="post-ctc-value"
                    type="number"
                    step="0.5"
                    placeholder="Num (LPA)"
                    value={ctcValueLpa}
                    onChange={e => setCtcValueLpa(parseFloat(e.target.value) || 0)}
                    className="w-1/3 px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                    aria-label="Numerical CTC in LPA"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Format: "21.5 LPA", and numeric value for sorting.</span>
              </div>

              <div>
                <label htmlFor="post-locations" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Job Locations (Comma separated)
                </label>
                <input
                  id="post-locations"
                  type="text"
                  placeholder="e.g. Bengaluru, Hyderabad, Pune"
                  value={locations}
                  onChange={e => setLocations(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Office locations or Remote/Hybrid options.</span>
              </div>

              <div>
                <label htmlFor="post-vacancies" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Vacancies
                </label>
                <input
                  id="post-vacancies"
                  type="number"
                  min="1"
                  value={totalVacancies}
                  onChange={e => setTotalVacancies(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Anticipated headcount hires for this drive.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Institutional Eligibility Cutoffs */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider pb-1 border-b border-slate-200/60 dark:border-[#24304A]">
              2. Institutional Eligibility Cutoffs
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label htmlFor="post-min-cgpa" className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Min. CGPA <span className="text-rose-500">*</span>
                </label>
                <input
                  id="post-min-cgpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={minCgpa}
                  onChange={e => setMinCgpa(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Out of 10.0 scale</span>
              </div>

              <div>
                <label htmlFor="post-max-backlogs" className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Max Backlogs <span className="text-rose-500">*</span>
                </label>
                <input
                  id="post-max-backlogs"
                  type="number"
                  min="0"
                  value={maxBacklogsAllowed}
                  onChange={e => setMaxBacklogsAllowed(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">0 = strict clear</span>
              </div>

              <div>
                <label htmlFor="post-tenth-pct" className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Min. 10th % <span className="text-rose-500">*</span>
                </label>
                <input
                  id="post-tenth-pct"
                  type="number"
                  min="0"
                  max="100"
                  value={minTenthPercent}
                  onChange={e => setMinTenthPercent(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Board marks cutoff</span>
              </div>

              <div>
                <label htmlFor="post-twelfth-pct" className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Min. 12th % <span className="text-rose-500">*</span>
                </label>
                <input
                  id="post-twelfth-pct"
                  type="number"
                  min="0"
                  max="100"
                  value={minTwelfthPercent}
                  onChange={e => setMinTwelfthPercent(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Board marks cutoff</span>
              </div>
            </div>

            {/* Eligible Branches Checkboxes */}
            <div className="pt-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Eligible Campus Departments <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Computer Science and Engineering',
                  'Information Technology',
                  'Artificial Intelligence & Data Science',
                  'Electronics & Communication Engineering',
                  'Electrical Engineering',
                  'Mechanical Engineering',
                ].map(branch => (
                  <label key={branch} className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={eligibleBranches.includes(branch)}
                      onChange={() => handleBranchToggle(branch)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>{branch}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Dates */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider pb-1 border-b border-slate-100 dark:border-[#24304A]">
              3. Registration & Schedule Dates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="post-deadline" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Application Deadline <span className="text-rose-500">*</span>
                </label>
                <input
                  id="post-deadline"
                  type="date"
                  required
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Last date for verified students to apply.</span>
              </div>
              <div>
                <label htmlFor="post-drive-date" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Drive Commencement Date <span className="text-rose-500">*</span>
                </label>
                <input
                  id="post-drive-date"
                  type="date"
                  required
                  value={driveDate}
                  onChange={e => setDriveDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Date when online assessment or interviews start.</span>
              </div>
            </div>
          </div>

          {/* Section 4: Selection Rounds */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider pb-1 border-b border-slate-100 dark:border-[#24304A]">
              4. Selection Process & Rounds
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Configure round sequences</span>
              <button
                type="button"
                onClick={handleAddRound}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Round
              </button>
            </div>

            <div className="space-y-2">
              {rounds.map((round, idx) => (
                <div
                  key={round.id}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A]"
                >
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={round.name}
                    onChange={e => {
                      const updated = [...rounds];
                      updated[idx].name = e.target.value;
                      setRounds(updated);
                    }}
                    placeholder="Round name"
                    className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                  <select
                    value={round.type}
                    onChange={e => {
                      const updated = [...rounds];
                      updated[idx].type = e.target.value as any;
                      setRounds(updated);
                    }}
                    className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Coding Assessment">Coding Assessment</option>
                    <option value="Aptitude Test">Aptitude Test</option>
                    <option value="Technical Round 1">Technical 1</option>
                    <option value="Technical Round 2">Technical 2</option>
                    <option value="Managerial Round">Managerial</option>
                    <option value="HR Round">HR Round</option>
                  </select>
                  {rounds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRound(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Job Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Outline role scope, team mission, and expectations..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#24304A] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
            >
              Publish Campus Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
