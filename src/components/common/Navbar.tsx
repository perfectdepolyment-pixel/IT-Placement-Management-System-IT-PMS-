import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, 
  Sun, 
  Moon, 
  Bell, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building2,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
  Briefcase,
  FileText,
  Calendar,
  UserCircle,
  BarChart3,
  Users2,
  PlusCircle
} from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

interface NavbarProps {
  onOpenRoleSwitcher: () => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenRoleSwitcher, 
  onOpenNotifications 
}) => {
  const { 
    currentRole, 
    currentUser, 
    setCurrentRole, 
    logout, 
    isDarkMode, 
    toggleDarkMode, 
    unreadNotifCount,
    activeTab,
    setActiveTab,
    navigate,
    currentRoute
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Role visual configuration
  const roleDisplayConfig = {
    visitor: {
      label: 'Visitor Mode',
      badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
      icon: Users,
    },
    student: {
      label: 'Student Portal',
      badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      icon: GraduationCap,
    },
    recruiter: {
      label: 'Recruiter Hub',
      badge: 'bg-violet-50 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300 border-violet-200 dark:border-violet-800',
      icon: Building2,
    },
    admin: {
      label: 'TPO / Admin',
      badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      icon: ShieldCheck,
    },
  }[currentRole];

  const CurrentRoleIcon = roleDisplayConfig.icon;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#111A2E]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-[#24304A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              if (currentRole === 'visitor') {
                setActiveTab('home');
              } else {
                setActiveTab('overview');
              }
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  IT-PMS
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  Campus
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Placement Management System
              </p>
            </div>
          </button>
        </div>

        {/* Center / Nav Links for Visitor */}
        {currentRole === 'visitor' && (
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => { setActiveTab('home'); navigate('/'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                (activeTab === 'home' && currentRoute === '/') ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/40' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('about'); navigate('/about'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'about' || currentRoute === '/about' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/40' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              About
            </button>
            <button
              onClick={() => { setActiveTab('companies'); navigate('/companies'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'companies' || currentRoute === '/companies' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/40' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => { setActiveTab('stats'); navigate('/statistics'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'stats' || currentRoute === '/statistics' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/40' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => { setActiveTab('drives'); navigate('/drives'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'drives' || currentRoute === '/drives' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/40' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Drives
            </button>
            <button
              onClick={() => { setActiveTab('contact'); navigate('/contact'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'contact' || currentRoute === '/contact' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/40' : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Contact
            </button>
          </nav>
        )}

        {/* Right Section: Role Switcher, Notifications, Dark Mode, Profile */}
        <div className="flex items-center gap-2.5">
          {/* Switch Role Quick Button */}
          <button
            onClick={onOpenRoleSwitcher}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all shadow-xs hover:scale-102 ${roleDisplayConfig.badge}`}
            title="Click to switch persona (Student, Recruiter, Admin/TPO, Visitor)"
          >
            <CurrentRoleIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline font-semibold">{roleDisplayConfig.label}</span>
            <span className="sm:hidden font-semibold capitalize">{currentRole}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10 dark:bg-white/10 ml-0.5">
              Switch
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white dark:ring-[#111A2E]" />
            )}
          </button>

          {/* User Account / Login State */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div className="hidden lg:block text-left text-xs leading-tight">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize">
                    {currentUser.role}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#141f36] shadow-xl border border-slate-200 dark:border-[#24304A] py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-[#24304A]">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {currentUser.email}
                      </p>
                      {currentUser.department && (
                        <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-1">
                          {currentUser.department}
                        </p>
                      )}
                    </div>

                    <div className="py-1">
                      {currentRole === 'student' && (
                        <button
                          onClick={() => {
                            setActiveTab('profile');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          Profile & Resume Builder
                        </button>
                      )}
                      <button
                        onClick={() => {
                          onOpenRoleSwitcher();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                      >
                        <span>Switch Persona</span>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </button>
                    </div>

                    <div className="border-t border-slate-100 dark:border-[#24304A] pt-1">
                      <button
                        onClick={() => {
                          setLogoutModalOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => { setActiveTab('login'); navigate('/login'); }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => { setActiveTab('register'); navigate('/register'); }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Register</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-[#24304A] bg-white dark:bg-[#111A2E] p-4 space-y-3">
          {currentRole === 'visitor' ? (
            <div className="flex flex-col gap-1 text-sm">
              <button
                onClick={() => { setActiveTab('home'); navigate('/'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Home
              </button>
              <button
                onClick={() => { setActiveTab('about'); navigate('/about'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                About
              </button>
              <button
                onClick={() => { setActiveTab('companies'); navigate('/companies'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Companies
              </button>
              <button
                onClick={() => { setActiveTab('stats'); navigate('/statistics'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Statistics
              </button>
              <button
                onClick={() => { setActiveTab('drives'); navigate('/drives'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Open Drives
              </button>
              <button
                onClick={() => { setActiveTab('contact'); navigate('/contact'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Contact TPO
              </button>
              <div className="pt-2 border-t border-slate-100 dark:border-[#24304A] grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setActiveTab('login'); navigate('/login'); setMobileMenuOpen(false); }}
                  className="py-2 px-3 text-center rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => { setActiveTab('register'); navigate('/register'); setMobileMenuOpen(false); }}
                  className="py-2 px-3 text-center rounded-lg bg-blue-600 text-white text-xs font-semibold"
                >
                  Register
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1 text-sm">
              <div className="px-2 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                {currentRole === 'student' ? 'Student Workspace' : currentRole === 'recruiter' ? 'Recruiter Pipeline' : 'Placement Cell Control'}
              </div>

              {currentRole === 'student' && (
                <>
                  <button
                    onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('drives'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'drives' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Browse Drives</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('applications'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'applications' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>My Applications</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('interviews'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'interviews' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Interview Calendar</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>Profile & Resume</span>
                  </button>
                </>
              )}

              {currentRole === 'recruiter' && (
                <>
                  <button
                    onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'overview' ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Company Overview</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('applicants'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'applicants' ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Users2 className="w-4 h-4" />
                    <span>Applicant Pipeline</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('drives'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'drives' ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Job Postings</span>
                  </button>
                </>
              )}

              {currentRole === 'admin' && (
                <>
                  <button
                    onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Command Center</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('drives'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'drives' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Manage Drives</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('students'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'students' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Student Roster</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold ${activeTab === 'analytics' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Placement Analytics</span>
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  setLogoutModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 mt-2 border-t border-slate-100 dark:border-slate-800 pt-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out ({currentUser?.name})</span>
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenRoleSwitcher();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Switch Portal Role</span>
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={logoutModalOpen}
        onConfirm={logout}
        onCancel={() => setLogoutModalOpen(false)}
        title="Log Out of IT-PMS Session"
        message="Are you sure you want to log out of your current session? You will be safely logged out and returned to the public portal."
        confirmLabel="Log Out"
        cancelLabel="Stay Logged In"
        isDestructive={false}
        type="logout"
      />
    </header>
  );
};
