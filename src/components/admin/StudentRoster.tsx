import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileSpreadsheet, 
  Building2,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';
import { CountUp } from '../common/CountUp';
import { EmptyState } from '../common/EmptyState';

interface StudentRosterItem {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  batch: string;
  cgpa: number;
  activeBacklogs: number;
  tenthPercent: number;
  twelfthPercent: number;
  placementStatus: 'Placed' | 'In Process' | 'Unplaced';
  company?: string;
  package?: string;
  applicationsCount: number;
}

export const StudentRoster: React.FC = () => {
  const { studentProfile, applications, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Realistic sample cohort for the admin roster
  const sampleStudents: StudentRosterItem[] = [
    {
      id: 's-1',
      name: studentProfile.fullName,
      rollNo: studentProfile.rollNo,
      department: studentProfile.department,
      batch: studentProfile.batch,
      cgpa: studentProfile.cgpa,
      activeBacklogs: studentProfile.activeBacklogs,
      tenthPercent: studentProfile.tenthPercent,
      twelfthPercent: studentProfile.twelfthPercent,
      placementStatus: studentProfile.isPlaced ? 'Placed' : 'In Process',
      company: studentProfile.placedCompany || 'Microsoft (Interviewing)',
      package: studentProfile.placedPackage || '44.8 LPA',
      applicationsCount: applications.filter(a => a.studentId === studentProfile.userId).length,
    },
    {
      id: 's-2',
      name: 'Sneha Kulkarni',
      rollNo: '22IT1024',
      department: 'Information Technology',
      batch: '2022 - 2026',
      cgpa: 9.21,
      activeBacklogs: 0,
      tenthPercent: 96.2,
      twelfthPercent: 94.8,
      placementStatus: 'Placed',
      company: 'Microsoft Corporation',
      package: '44.8 LPA',
      applicationsCount: 4,
    },
    {
      id: 's-3',
      name: 'Rohan Mehra',
      rollNo: '22CS1089',
      department: 'Computer Science and Engineering',
      batch: '2022 - 2026',
      cgpa: 8.42,
      activeBacklogs: 0,
      tenthPercent: 88.5,
      twelfthPercent: 86.4,
      placementStatus: 'In Process',
      company: 'Google India (Round 2)',
      package: '52.0 LPA',
      applicationsCount: 5,
    },
    {
      id: 's-4',
      name: 'Tanvi Joshi',
      rollNo: '22AI1012',
      department: 'Artificial Intelligence & Data Science',
      batch: '2022 - 2026',
      cgpa: 7.95,
      activeBacklogs: 0,
      tenthPercent: 84.0,
      twelfthPercent: 82.0,
      placementStatus: 'In Process',
      company: 'Atlassian',
      package: '42.5 LPA',
      applicationsCount: 3,
    },
    {
      id: 's-5',
      name: 'Aditya Varma',
      rollNo: '22EC1033',
      department: 'Electronics & Communication Engineering',
      batch: '2022 - 2026',
      cgpa: 8.12,
      activeBacklogs: 0,
      tenthPercent: 91.0,
      twelfthPercent: 89.2,
      placementStatus: 'Placed',
      company: 'Cisco Systems',
      package: '24.0 LPA',
      applicationsCount: 4,
    },
    {
      id: 's-6',
      name: 'Meera Iyer',
      rollNo: '22CS1015',
      department: 'Computer Science and Engineering',
      batch: '2022 - 2026',
      cgpa: 9.45,
      activeBacklogs: 0,
      tenthPercent: 97.4,
      twelfthPercent: 96.0,
      placementStatus: 'Placed',
      company: 'Amazon Web Services',
      package: '38.0 LPA',
      applicationsCount: 2,
    },
    {
      id: 's-7',
      name: 'Harsh Vardhan',
      rollNo: '22ME1045',
      department: 'Mechanical Engineering',
      batch: '2022 - 2026',
      cgpa: 7.20,
      activeBacklogs: 1,
      tenthPercent: 78.0,
      twelfthPercent: 75.0,
      placementStatus: 'Unplaced',
      applicationsCount: 2,
    },
  ];

  const filteredStudents = sampleStudents.filter(s => {
    if (departmentFilter !== 'all' && !s.department.toLowerCase().includes(departmentFilter.toLowerCase())) return false;
    if (statusFilter !== 'all' && s.placementStatus !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = s.name.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = 'Roll No,Name,Department,CGPA,10th %,12th %,Backlogs,Status,Company,Package\n';
    const rows = filteredStudents.map(s => 
      `"${s.rollNo}","${s.name}","${s.department}",${s.cgpa},${s.tenthPercent},${s.twelfthPercent},${s.activeBacklogs},"${s.placementStatus}","${s.company || '-'}","${s.package || '-'}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Campus_Placement_Roster_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast({ type: 'success', title: 'Roster Exported', message: 'CSV report downloaded successfully.' });
  };

  const totalStudents = sampleStudents.length;
  const placedStudents = sampleStudents.filter(s => s.placementStatus === 'Placed').length;
  const inProcessStudents = sampleStudents.filter(s => s.placementStatus === 'In Process').length;
  const placementRate = ((placedStudents / totalStudents) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* 5.3 Page title and primary action sit at the top */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Institutional Student Roster
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Verified academic database, backlog verification, and live placement statuses across departments.
          </p>
        </div>

        {/* Primary CTA on the right side of the header */}
        <button
          onClick={handleExportCSV}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Master CSV</span>
        </button>
      </div>

      {/* 5.3 Summary numbers come before detailed tables */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Cohort</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            <CountUp value={totalStudents} />
          </p>
          <span className="text-[11px] text-slate-400">Graduating Batch 2026</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Placed Candidates</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            <CountUp value={placedStudents} />
          </p>
          <span className="text-[11px] text-emerald-600/80 font-medium">Verified Job Offers</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">In Process</span>
          <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
            <CountUp value={inProcessStudents} />
          </p>
          <span className="text-[11px] text-sky-600/80 font-medium">Interviewing</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Placement Rate</span>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            <CountUp value={`${placementRate}%`} />
          </p>
          <span className="text-[11px] text-blue-600/80 font-medium">Institutional Target: 90%+</span>
        </div>
      </div>

      {/* 5.3 Filters sit above lists, never below */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, roll number, or department..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence">AI & Data Science</option>
              <option value="Electronics">Electronics & Comm</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Placement Statuses</option>
              <option value="Placed">Placed Candidates</option>
              <option value="In Process">In Active Process</option>
              <option value="Unplaced">Unplaced</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Found <strong>{filteredStudents.length}</strong> student records</span>
          {(searchQuery || departmentFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDepartmentFilter('all');
                setStatusFilter('all');
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        /* Empty State */
        <EmptyState
          icon={GraduationCap}
          title="No Students Match Current Filters"
          description="We couldn't find any student matching your query. Try resetting filters to view the full institutional roster."
          actionLabel="Reset All Filters"
          onAction={() => {
            setSearchQuery('');
            setDepartmentFilter('all');
            setStatusFilter('all');
          }}
        />
      ) : (
        <>
          {/* 5.5 Table Rules: Sticky header, row hover highlight. On mobile, tables convert to stacked cards. */}
          {/* Mobile view: Stacked Cards (visible < md) */}
          <div className="md:hidden space-y-3">
            {filteredStudents.map(student => (
              <div
                key={student.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                      {student.name}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {student.rollNo} · {student.department}
                    </span>
                  </div>
                  {student.placementStatus === 'Placed' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" /> Placed
                    </span>
                  ) : student.placementStatus === 'In Process' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                      <Clock className="w-3 h-3" /> In Process
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      Unplaced
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs py-2 border-y border-slate-100 dark:border-[#24304A]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">CGPA</span>
                    <strong className="text-slate-900 dark:text-white">{student.cgpa}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Backlogs</span>
                    <span className={student.activeBacklogs === 0 ? 'text-emerald-600 font-medium' : 'text-rose-600 font-bold'}>
                      {student.activeBacklogs}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">10th / 12th</span>
                    <span className="text-slate-600 dark:text-slate-300">{student.tenthPercent}% / {student.twelfthPercent}%</span>
                  </div>
                </div>

                {student.company && (
                  <div className="text-xs flex items-center justify-between">
                    <span className="text-slate-500">Offer / Pipeline:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {student.company} {student.package && <span className="text-emerald-600">({student.package})</span>}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table: Sticky header, max 7 columns, row hover highlight */}
          <div className="hidden md:block rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 z-10 bg-slate-50/95 dark:bg-[#141f36]/95 backdrop-blur-xs">
                  <tr className="border-b border-slate-200 dark:border-[#24304A] text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Roll No</th>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">CGPA</th>
                    <th className="py-3.5 px-4">Backlogs</th>
                    <th className="py-3.5 px-4">Placement Status</th>
                    <th className="py-3.5 px-4">Company / Offer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#24304A]">
                  {filteredStudents.map(student => (
                    <tr 
                      key={student.id} 
                      className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {student.rollNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {student.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          10th: {student.tenthPercent}% · 12th: {student.twelfthPercent}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {student.department}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                          {student.cgpa}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {student.activeBacklogs === 0 ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">0 Clear</span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 font-bold">{student.activeBacklogs} Active</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {student.placementStatus === 'Placed' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" /> Placed
                          </span>
                        ) : student.placementStatus === 'In Process' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                            <Clock className="w-3 h-3" /> In Process
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                            Unplaced
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {student.company ? (
                          <div>
                            <strong className="text-slate-900 dark:text-white block font-semibold">
                              {student.company}
                            </strong>
                            {student.package && (
                              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                {student.package}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
