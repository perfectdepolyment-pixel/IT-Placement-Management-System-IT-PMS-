import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Calendar, 
  UserCircle, 
  Bell, 
  BarChart3, 
  Users2, 
  Building2, 
  PlusCircle, 
  GraduationCap,
  LucideIcon
} from 'lucide-react';

interface SidebarLink {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const { currentRole, activeTab, setActiveTab, applications, unreadNotifCount } = useApp();

  if (currentRole === 'visitor') return null;

  const studentLinks: SidebarLink[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'drives', label: 'Browse Drives', icon: Briefcase },
    { 
      id: 'applications', 
      label: 'My Applications', 
      icon: FileText,
      badge: applications.filter(a => a.studentId === 'user-student-1').length 
    },
    { id: 'interviews', label: 'My Interviews', icon: Calendar },
    { id: 'profile', label: 'Profile & Resume', icon: UserCircle },
    { 
      id: 'announcements', 
      label: 'Announcements', 
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : undefined 
    },
  ];

  const recruiterLinks: SidebarLink[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'applicants', label: 'Applicant Pipeline', icon: Users2, badge: applications.length },
    { id: 'drives', label: 'My Job Postings', icon: Briefcase },
    { id: 'schedule', label: 'Interview Schedule', icon: Calendar },
    { id: 'post-drive', label: 'Post New Drive', icon: PlusCircle },
  ];

  const adminLinks: SidebarLink[] = [
    { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
    { id: 'drives', label: 'Manage Drives', icon: Briefcase },
    { id: 'students', label: 'Student Roster', icon: GraduationCap },
    { id: 'companies', label: 'Recruiters Directory', icon: Building2 },
    { id: 'analytics', label: 'Placement Analytics', icon: BarChart3 },
    { id: 'announcements', label: 'Notice Board', icon: Bell },
  ];

  const links = currentRole === 'student' 
    ? studentLinks 
    : currentRole === 'recruiter' 
      ? recruiterLinks 
      : adminLinks;

  return (
    <aside className="hidden md:flex flex-col justify-between md:w-20 lg:w-64 shrink-0 border-r border-slate-200/80 dark:border-[#24304A] bg-white dark:bg-[#111A2E] min-h-[calc(100vh-4rem)] p-3 lg:p-4">
      <div className="space-y-6">
        <div>
          <p className="hidden lg:block px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Navigation
          </p>
          <nav className="space-y-1.5 lg:space-y-1">
            {links.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  title={link.label}
                  aria-label={link.label}
                  className={`w-full flex items-center justify-center lg:justify-between p-2.5 lg:px-3.5 lg:py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 lg:w-4 lg:h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
                    <span className="hidden lg:inline">{link.label}</span>
                  </div>

                  {/* Tablet badge dot */}
                  {link.badge !== undefined && link.badge > 0 && (
                    <>
                      <span className="lg:hidden absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-[#111A2E]" />
                      <span
                        className={`hidden lg:inline text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {link.badge}
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom helper card - visible on desktop */}
      <div className="hidden lg:block p-3.5 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-200/60 dark:border-[#24304A] text-xs">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
          <span className="font-semibold text-slate-700 dark:text-slate-200">Campus TPO Cell</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">● Online</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Cycle: 2025–2026 Season. For verification queries, email tpo@college.edu.
        </p>
      </div>

      {/* Tablet bottom indicator */}
      <div className="lg:hidden flex justify-center py-2 text-[10px] text-emerald-500" title="TPO Server Online">
        ●
      </div>
    </aside>
  );
};
