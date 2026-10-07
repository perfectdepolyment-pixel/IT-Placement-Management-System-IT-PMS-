import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Visitor
import { VisitorPortal } from './components/visitor/VisitorPortal';

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
  const { currentRole, activeTab, setActiveTab } = useApp();
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [postDriveModalOpen, setPostDriveModalOpen] = useState(false);

  // Render role specific view
  const renderDashboardView = () => {
    if (currentRole === 'student') {
      switch (activeTab) {
        case 'overview':
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
          return <AnalyticsView />;
        default:
          return <AdminDashboard />;
      }
    }

    // Default visitor portal
    switch (activeTab) {
      case 'drives':
        return (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Active Placement Drives</h1>
              <p className="text-slate-500 text-sm">Explore requirements, packages and cutoffs.</p>
            </div>
            <BrowseDrives />
          </div>
        );
      case 'stats':
        return <AnalyticsView />;
      case 'announcements':
        return <AnnouncementManager />;
      case 'companies':
        return <AnalyticsView />;
      case 'home':
      default:
        return <VisitorPortal onOpenRoleModal={() => setRoleModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenRoleSwitcher={() => setRoleModalOpen(true)}
        onOpenNotifications={() => setNotifDrawerOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {/* Sidebar for Authenticated Dashboards */}
        {currentRole !== 'visitor' && <Sidebar />}

        {/* Content Area */}
        <main className={`flex-1 transition-all ${
          currentRole === 'visitor' 
            ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full' 
            : 'p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto'
        }`}>
          {renderDashboardView()}
        </main>
      </div>

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
