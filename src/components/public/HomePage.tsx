import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Users2, 
  Calendar, 
  Bell, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  DollarSign, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { INITIAL_COMPANIES, TESTIMONIALS } from '../../data/mockData';
import { DriveDetailModal } from '../student/DriveDetailModal';
import { RecruitmentDrive } from '../../types';

export const HomePage: React.FC = () => {
  const { drives, navigate, setCurrentRole } = useApp();
  const [selectedDrive, setSelectedDrive] = useState<RecruitmentDrive | null>(null);

  const upcomingDrives = drives.slice(0, 3);

  const steps = [
    {
      number: '01',
      title: 'Register Account',
      description: 'Sign up with your university roll number and verified institutional email credentials.',
      icon: Users2,
    },
    {
      number: '02',
      title: 'Build Verified Profile',
      description: 'Add your CGPA, semester scores, technical skills, and generate an ATS-ready resume.',
      icon: FileText,
    },
    {
      number: '03',
      title: 'Apply to Drives',
      description: 'Find matching drives with automated institutional eligibility verification.',
      icon: Briefcase,
    },
    {
      number: '04',
      title: 'Get Placed',
      description: 'Attend scheduled virtual or offline interviews, track progress, and accept your dream offer.',
      icon: Award,
    },
  ];

  const features = [
    {
      title: 'Profile and Resume Builder',
      description: 'Create an ATS-compliant CV with academic records, projects, and skills with single-click PDF export.',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400',
    },
    {
      title: 'Smart Job Matching & Eligibility',
      description: 'Real-time validation against recruiter criteria (CGPA cutoff, branch eligibility, and backlogs limit).',
      icon: Sparkles,
      color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/60 dark:text-violet-400',
    },
    {
      title: 'Interview Scheduling & Calendar',
      description: 'Integrated Google Meet & on-campus room scheduling with round timelines and instructions.',
      icon: Calendar,
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-400',
    },
    {
      title: 'Instant Bulletins & Notifications',
      description: 'Never miss an assessment deadline or interview slot with real-time alerts and circulars.',
      icon: Bell,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400',
    },
    {
      title: 'Comprehensive Analytics',
      description: 'TPO department-wise insights, package compensation brackets, and multi-year trajectory reports.',
      icon: BarChart3,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      title: 'Secure Multi-Role Access',
      description: 'Role-based access control protecting student credentials, company privacy, and official TPO approvals.',
      icon: ShieldCheck,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400',
    },
  ];

  return (
    <div className="space-y-20 animate-in fade-in">
      
      {/* 4.1.1 Hero section (two columns, 60/40) */}
      <section className="pt-6 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (60% ~ 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Campus Recruitment Season 2025–2026 Live</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Your Career Starts <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Here</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Connect students, premier recruiting companies, and the placement directorate in one unified platform. Automated eligibility checks, transparent interview stages, and real-time offer management.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-102"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Register</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#141f36] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
              >
                <Building2 className="w-4 h-4 inline mr-2 text-violet-600" />
                <span>Recruiter Login</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Verified College Credentials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>1-Click Eligibility Check</span>
              </div>
            </div>
          </div>

          {/* Right Column (40% ~ 5 cols) - Illustration / Hero Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-violet-600/10 p-6 border border-slate-200/80 dark:border-[#24304A] shadow-xl overflow-hidden">
              {/* Decorative graphic card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] shadow-md border border-slate-100 dark:border-[#24304A] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#24304A]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      MS
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Software Development Engineer</h4>
                      <p className="text-[11px] text-slate-400">Microsoft IDC · Hyderabad Campus</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    44.8 LPA
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Eligibility Status:</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Eligible (8.84 CGPA)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Current Phase:</span>
                    <span className="font-semibold text-sky-600">Technical Round 2 (Scheduled)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Virtual Interview Room Ready</span>
                  </div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Oct 12</span>
                </div>
              </div>

              {/* Second floating mini-badge */}
              <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-[#111A2E] shadow-md border border-slate-100 dark:border-[#24304A] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Dream Offer Secured</strong>
                    <span className="text-[11px] text-slate-400">Google India University Grad (52.0 LPA)</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600">Accepted</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats strip (4 stat cards with numbers) */}
      <section className="py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs text-center space-y-1 hover:shadow-md transition-shadow">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Students Placed</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">538+</h3>
            <span className="text-[11px] text-slate-400">Out of 620 Eligible</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs text-center space-y-1 hover:shadow-md transition-shadow">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Recruiting Companies</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-violet-600 dark:text-violet-400">118+</h3>
            <span className="text-[11px] text-slate-400">Tier-1 & Dream Recruiters</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs text-center space-y-1 hover:shadow-md transition-shadow">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Highest Package</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">52.0 LPA</h3>
            <span className="text-[11px] text-slate-400">International Tech Hub</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs text-center space-y-1 hover:shadow-md transition-shadow">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Placement Rate</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">94.2%</h3>
            <span className="text-[11px] text-slate-400">Engineering Streams</span>
          </div>
        </div>
      </section>

      {/* How It Works (4 steps) */}
      <section className="space-y-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Simple 4-Step Process</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">How It Works</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">From verified university registration to your first corporate offer letter.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
                <span className="text-2xl font-black text-slate-200 dark:text-slate-800 absolute top-4 right-4">{step.number}</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid (3x2 cards) */}
      <section className="space-y-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Built for Modern Campus Hiring</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Platform Capabilities</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Everything needed to eradicate spreadsheets and manual notice board confusion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Recruiters Grid */}
      <section className="space-y-6 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Corporate Partners</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Top Recruiting Companies</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Organizations offering Dream and Tier-1 engineering opportunities.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INITIAL_COMPANIES.map(company => (
            <div
              key={company.id}
              onClick={() => navigate('/companies')}
              className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-center space-y-3 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="text-center">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{company.name}</h4>
                <span className="text-[11px] text-emerald-600 font-semibold">{company.highestPackage}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Drives (3 drive cards) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Campus Drives</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Upcoming Recruitment Drives</h2>
          </div>

          <button
            onClick={() => navigate('/companies')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all companies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingDrives.map(drive => (
            <div
              key={drive.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                      <img src={drive.companyLogo} alt={drive.companyName} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{drive.companyName}</h4>
                      <span className="text-[11px] text-slate-400">{drive.jobType}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {drive.ctc}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">{drive.roleTitle}</h3>
                
                <div className="space-y-1.5 py-2.5 border-y border-slate-100 dark:border-[#24304A] text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Deadline:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{drive.deadline}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Cutoff:</span>
                    <strong className="text-slate-800 dark:text-slate-200">Min. {drive.minCgpa} CGPA</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center gap-2">
                <button
                  onClick={() => setSelectedDrive(drive)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Placed Student Feedback</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Testimonials</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Real experiences from students placed through the IT-PMS campus recruitment portal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    {t.role} · <strong className="text-emerald-600">{t.package}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner: Ready to get hired? */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ready to get hired?</h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Create your student profile today, verify your academic scorecards, and start applying directly to active placement drives.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-102"
          >
            Register as Student
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-3 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold border border-white/20 transition-colors"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* Modal */}
      <DriveDetailModal
        drive={selectedDrive}
        isOpen={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
      />
    </div>
  );
};
