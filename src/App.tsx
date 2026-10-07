import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Public Pages
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { CompaniesPage } from './components/public/CompaniesPage';
import { StatisticsPage } from './components/public/StatisticsPage';
import { ContactPage } from './components/public/ContactPage';
import { LoginPage } from './components/public/LoginPage';
import { RegisterPage } from './components/public/RegisterPage';
import { ForgotPasswordPage } from './components/public/ForgotPasswordPage';
import { PublicFooter } from './components/public/PublicFooter';
import { UnauthorizedPage } from './components/common/UnauthorizedPage';

// Student
import { StudentDashboard } from './components/student/StudentDashboard';
import { BrowseDrives } from './components/student/BrowseDrives';
import { MyApplications } from './components/student/MyApplications';
import { InterviewCalendar } from './components/student/InterviewCalendar';
import { ResumeBuilder } from './components/student/ResumeBuilder';

// Recruiter
import { RecruiterDashboard } from './components/recruiter/RecruiterDashboard';
import { ApplicantPipeline } from './components/recruiter/ApplicantPipeline';
import { PostDriveModal } from './components/recruiter/PostDriveModal';

// Admin
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentRoster } from './components/admin/StudentRoster';
import { AnalyticsView } from './components/admin/AnalyticsView';
import { AnnouncementManager } from './components/admin/AnnouncementManager';

const AppContent: React.FC = () => {
  const { currentRole, currentRoute, activeTab, setActiveTab } = useApp();
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [postDriveModalOpen, setPostDriveModalOpen] = useState(false);

  // Check explicit public route overrides first
  const renderDashboardView = () => {
    // Standalone public pages available to anyone
    if (currentRoute === '/login' || activeTab === 'login') {
      return <LoginPage />;
    }
    if (currentRoute === '/register' || activeTab === 'register') {
      return <RegisterPage />;
    }
    if (
      currentRoute === '/forgot-password' || 
      currentRoute === '/reset-password' || 
      activeTab === 'forgot-password'
    ) {
      return <ForgotPasswordPage />;
    }
    if (currentRoute === '/about' || activeTab === 'about') {
      return <AboutPage />;
    }
    if (currentRoute === '/companies' || activeTab === 'companies') {
      return <CompaniesPage />;
    }
    if (currentRoute === '/statistics' || activeTab === 'statistics' || activeTab === 'stats') {
      return <StatisticsPage />;
    }
    if (currentRoute === '/contact' || activeTab === 'contact') {
      return <ContactPage />;
    }
    if (currentRoute === '/403') {
      return <UnauthorizedPage type="403" />;
    }
    if (currentRoute === '/session-expired') {
      return <UnauthorizedPage type="expired" />;
    }

    // Role-specific authenticated dashboards
    if (currentRole === 'student') {
      switch (activeTab) {
        case 'overview':
        case 'dashboard':
          return <StudentDashboard />;
        case 'drives':
          return <BrowseDrives />;
        case 'applications':
          return <MyApplications />;
        case 'interviews':
          return <InterviewCalendar />;
        case 'profile':
          return <ResumeBuilder />;
        case 'announcements':
          return <AnnouncementManager />;
        default:
          return <StudentDashboard />;
      }
    }

    if (currentRole === 'recruiter') {
      switch (activeTab) {
        case 'overview':
        case 'dashboard':
          return <RecruiterDashboard />;
        case 'applicants':
          return <ApplicantPipeline />;
        case 'drives':
          return <BrowseDrives />;
        case 'schedule':
          return <ApplicantPipeline />;
        case 'post-drive':
          return <RecruiterDashboard />;
        default:
          return <RecruiterDashboard />;
      }
    }

    if (currentRole === 'admin') {
      switch (activeTab) {
        case 'overview':
        case 'dashboard':
          return <AdminDashboard />;
        case 'drives':
          return <BrowseDrives />;
        case 'students':
          return <StudentRoster />;
        case 'analytics':
          return <AnalyticsView />;
        case 'announcements':
          return <AnnouncementManager />;
        case 'companies':
          return <CompaniesPage />;
        default:
          return <AdminDashboard />;
      }
    }

    // Default Visitor mode
    switch (activeTab) {
      case 'drives':
        return (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Active Placement Drives</h1>
              <p className="text-slate-500 text-sm">Explore eligibility cutoffs, CTC compensation, and selection rounds.</p>
            </div>
            <BrowseDrives />
          </div>
        );
      case 'announcements':
        return <AnnouncementManager />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  const isPublicView = 
    currentRole === 'visitor' || 
    ['/login', '/register', '/forgot-password', '/reset-password', '/about', '/companies', '/statistics', '/contact', '/'].includes(currentRoute) ||
    ['login', 'register', 'forgot-password', 'about', 'companies', 'statistics', 'stats', 'contact'].includes(activeTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenRoleSwitcher={() => setRoleModalOpen(true)}
        onOpenNotifications={() => setNotifDrawerOpen(true)}
      />

      {/* Main Layout */}
      <div className="flex-1 flex w-full">
        {/* Sidebar for Authenticated Dashboards */}
        {currentRole !== 'visitor' && !['/login', '/register', '/forgot-password'].includes(currentRoute) && (
          <Sidebar />
        )}

        {/* Content Area */}
        <main className={`flex-1 transition-all ${
          currentRole === 'visitor' || isPublicView
            ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full' 
            : 'p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto'
        }`}>
          {renderDashboardView()}
        </main>
      </div>

      {/* Footer for Public Views */}
      {isPublicView && <PublicFooter />}

      {/* Global Modals & Notifications */}
      <RoleSwitcherModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
      />

      <NotificationDrawer
        isOpen={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
      />

      <PostDriveModal
        isOpen={postDriveModalOpen}
        onClose={() => setPostDriveModalOpen(false)}
      />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
