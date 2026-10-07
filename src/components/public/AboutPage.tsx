import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, 
  Target, 
  Eye, 
  Users2, 
  Mail, 
  Phone, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { TEAM_MEMBERS, MILESTONES } from '../../data/mockData';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-16 animate-in fade-in">
      {/* 4.1.2 Page Banner with title and breadcrumb */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400 font-semibold">About Us</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          About Training & Placement Cell
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Bridging the gap between academic excellence and global technology careers through institutional corporate relations, automated recruitment management, and student grooming.
        </p>
      </section>

      {/* Mission and Vision (two cards) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To provide 100% career opportunity access to every graduating engineering student by fostering strong industry-academia partnerships, establishing transparent recruitment standards, and offering comprehensive pre-placement training.
          </p>
          <ul className="space-y-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Equal opportunity and transparent meritocracy</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Industry-aligned skills certification and coding mentorship</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To be recognized nationally as a premier center of career development where students evolve into industry-ready leaders, and top-tier multinational recruiters discover future-ready innovators in computer science, IT, and emerging engineering streams.
          </p>
          <ul className="space-y-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-600" />
              <span>Zero-friction campus drive execution via IT-PMS</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-600" />
              <span>International career mobility and dream compensations</span>
            </li>
          </ul>
        </div>
      </section>

      {/* About the placement cell (text and image) */}
      <section className="p-8 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Institutional Excellence</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              A Decade of Campus Recruitment Success
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              The Training & Placement Cell functions as the nodal hub facilitating interactions between recruiters and graduates. Equipped with air-conditioned interview suites, dedicated virtual assessment auditoriums, and fiber-optic networking, our infrastructure supports high-volume hiring drives with ease.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              With the deployment of the IT-PMS portal, we have eliminated traditional paper-based notice boards and spreadsheet tracking, ensuring 100% data integrity, automated eligibility checks, and real-time candidate notifications.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141f36]">
                <strong className="block text-base font-extrabold text-slate-900 dark:text-white">180+ Recruiters</strong>
                <span className="text-slate-500">Conducting campus drives annually</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141f36]">
                <strong className="block text-base font-extrabold text-emerald-600">52.0 LPA</strong>
                <span className="text-slate-500">Highest package recorded</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
              alt="Placement Cell Auditorium"
              className="w-full h-80 object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Placement cell team (member cards) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Dedicated Officers</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Placement Cell Team</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Meet our career advisors and corporate outreach leaders.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map(member => (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs text-center space-y-3"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-2xl mx-auto object-cover ring-2 ring-slate-100 dark:ring-slate-800 shadow-sm"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{member.role}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{member.department}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-[#24304A] text-xs text-slate-500 space-y-1">
                <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-1.5 hover:text-blue-600">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{member.email}</span>
                </a>
                <div className="flex items-center justify-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{member.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Our Growth Journey</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Milestones Timeline</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Key achievements shaping our university campus recruitment heritage.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {MILESTONES.map((m, idx) => (
            <div
              key={m.year}
              className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-extrabold text-base flex items-center justify-center shrink-0">
                {m.year}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
