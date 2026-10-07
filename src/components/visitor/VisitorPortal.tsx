import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  TrendingUp, 
  Users2, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TESTIMONIALS, INITIAL_COMPANIES } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { DriveDetailModal } from '../student/DriveDetailModal';
import { RecruitmentDrive } from '../../types';

export const VisitorPortal: React.FC<{ onOpenRoleModal: () => void }> = ({ onOpenRoleModal }) => {
  const { drives, setCurrentRole, setActiveTab } = useApp();
  const [selectedDrive, setSelectedDrive] = useState<RecruitmentDrive | null>(null);

  return (
    <div className="space-y-16 pb-16 animate-in fade-in">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        <div className="max-w-5xl mx-auto text-center px-4 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Campus Recruitment Season 2025–2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Institutional Placement <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Management System
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The unified portal connecting students, corporate recruiters, and the institutional placement cell in one place. Automated eligibility checks, transparent interview tracks, and real-time recruitment lifecycle analytics.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentRole('student')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-102"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enter Student Portal</span>
            </button>

            <button
              onClick={() => setCurrentRole('recruiter')}
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-violet-500/20 flex items-center gap-2 transition-all hover:scale-102"
            >
              <Building2 className="w-4 h-4" />
              <span>Recruiter / Post Drive</span>
            </button>

            <button
              onClick={onOpenRoleModal}
              className="px-5 py-3 rounded-xl bg-white dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all"
            >
              <span>Explore All Personas</span>
            </button>
          </div>

          {/* Quick Credibility Stats Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-200/80 dark:border-[#24304A] max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Placement Rate</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">94.2%</p>
              <span className="text-[11px] text-slate-400">Class of 2025–26</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Highest Package</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">52.0 LPA</p>
              <span className="text-[11px] text-slate-400">Dream Tier Offers</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Average CTC</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400 mt-1">14.8 LPA</p>
              <span className="text-[11px] text-slate-400">Engineering Streams</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Recruiter Network</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">180+</p>
              <span className="text-[11px] text-slate-400">Global Tech Leaders</span>
            </div>
          </div>

        </div>
      </section>

      {/* Live Open Drives Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Campus Recruitment Drives
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Currently accepting applications from verified 2026 batch candidates.
            </p>
          </div>

          <button
            onClick={() => setCurrentRole('student')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Log in to apply for all drives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {drives.slice(0, 3).map(drive => (
            <div
              key={drive.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                      <img src={drive.companyLogo} alt={drive.companyName} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {drive.companyName}
                      </h4>
                      <span className="text-[11px] text-slate-400">{drive.jobType}</span>
                    </div>
                  </div>
                  <StatusBadge status={drive.status} size="sm" showDot={false} />
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 line-clamp-1">
                  {drive.roleTitle}
                </h3>

                <div className="space-y-1.5 py-2.5 border-y border-slate-100 dark:border-[#24304A] text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Package (CTC):</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{drive.ctc}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Min. CGPA Cutoff:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{drive.minCgpa} CGPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Application Deadline:</span>
                    <span className="text-slate-600 dark:text-slate-400">{drive.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center gap-2">
                <button
                  onClick={() => setSelectedDrive(drive)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-[#24304A] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-center"
                >
                  View Details
                </button>
                <button
                  onClick={() => setCurrentRole('student')}
                  className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Star Recruiters Showcase */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Our Elite Recruiting Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Global technology leaders that recruit on-campus year after year.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INITIAL_COMPANIES.map(comp => (
            <div
              key={comp.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex flex-col items-center text-center justify-between hover:shadow-md transition-all space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <img src={comp.logo} alt={comp.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {comp.name}
                </h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  Up to {comp.highestPackage}
                </p>
                <span className="text-[10px] text-slate-400">
                  {comp.totalHired} Hires Total
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Student Success Stories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Hear from placed students who navigated their recruitment process through IT-PMS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex flex-col justify-between space-y-4"
            >
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-[#24304A]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {t.role} · <strong className="text-emerald-600 dark:text-emerald-400">{t.package}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Placement Cell Footer Section */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">
              Placement Cell & Corporate Relations
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Are you a corporate recruiter seeking campus interview dates, or a student inquiring about credential verification? Reach out directly to our TPO Directorate.
            </p>
          </div>

          <button
            onClick={() => setCurrentRole('admin')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs self-start md:self-auto shrink-0 transition-colors"
          >
            Access TPO Admin Portal
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-blue-400 shrink-0" />
            <span>TPO Director: +91 94250 88990</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Official Email: tpo.director@college.edu</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Administrative Block, Floor 2, Central Campus</span>
          </div>
        </div>
      </section>

      {/* Drive detail modal */}
      <DriveDetailModal
        drive={selectedDrive}
        isOpen={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
      />
    </div>
  );
};
