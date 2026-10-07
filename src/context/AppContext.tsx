import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, 
  UserRole, 
  StudentProfile, 
  RecruitmentDrive, 
  Application, 
  Announcement, 
  NotificationItem, 
  Company, 
  ApplicationStatus 
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_DRIVES, 
  INITIAL_APPLICATIONS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_COMPANIES 
} from '../data/mockData';

export interface EligibilityResult {
  isEligible: boolean;
  criteria: {
    cgpa: { passed: boolean; message: string; required: number; actual: number };
    branch: { passed: boolean; message: string; eligibleBranches: string[]; studentBranch: string };
    backlogs: { passed: boolean; message: string; maxAllowed: number; actual: number };
    tenth: { passed: boolean; message: string; required: number; actual: number };
    twelfth: { passed: boolean; message: string; required: number; actual: number };
  };
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setCurrentRole: (role: UserRole) => void;
  loginAs: (userId: string) => void;
  logout: () => void;
  
  // Student Profile
  studentProfile: StudentProfile;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  
  // Drives
  drives: RecruitmentDrive[];
  addDrive: (drive: Omit<RecruitmentDrive, 'id' | 'createdAt' | 'applicantCount'>) => void;
  updateDrive: (id: string, updates: Partial<RecruitmentDrive>) => void;
  deleteDrive: (id: string) => void;
  
  // Applications
  applications: Application[];
  applyToDrive: (driveId: string) => boolean;
  withdrawApplication: (applicationId: string) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, feedback?: string) => void;
  scheduleInterview: (
    applicationId: string, 
    details: {
      roundName: string;
      dateTime: string;
      mode: 'Online (Google Meet)' | 'In-Person (Placement Hall)' | 'Campus Lab';
      locationOrLink: string;
      interviewerName?: string;
      notes?: string;
    }
  ) => void;
  issueOffer: (applicationId: string, ctc: string, joiningDate: string, location: string) => void;
  acceptOffer: (applicationId: string) => void;
  
  // Eligibility
  checkEligibility: (drive: RecruitmentDrive, profile?: StudentProfile) => EligibilityResult;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
  deleteAnnouncement: (id: string) => void;
  togglePinAnnouncement: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;

  // Companies
  companies: Company[];

  // Active view routing inside dashboard
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Global Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Reset Data
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'it_pms_user',
  ROLE: 'it_pms_role',
  DARK_MODE: 'it_pms_theme_dark',
  PROFILE: 'it_pms_profile',
  DRIVES: 'it_pms_drives',
  APPLICATIONS: 'it_pms_applications',
  ANNOUNCEMENTS: 'it_pms_announcements',
  NOTIFICATIONS: 'it_pms_notifications',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // User & Role State
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'visitor';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
    if (savedRole === 'visitor') return null;
    const match = INITIAL_USERS.find(u => u.role === savedRole);
    return match || null;
  });

  // Profile State
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
  });

  // Drives State
  const [drives, setDrives] = useState<RecruitmentDrive[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DRIVES);
    return saved ? JSON.parse(saved) : INITIAL_DRIVES;
  });

  // Applications State
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Announcements State
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Companies (Static or pre-loaded)
  const [companies] = useState<Company[]>(INITIAL_COMPANIES);

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
  }, [drives]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Role switching
  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (role === 'visitor') {
      setCurrentUser(null);
      setActiveTab('home');
      showToast({ type: 'info', title: 'Browsing as Visitor', message: 'You are now viewing the public campus recruitment portal.' });
    } else {
      const matched = INITIAL_USERS.find(u => u.role === role);
      setCurrentUser(matched || null);
      setActiveTab('overview');
      showToast({ 
        type: 'success', 
        title: `Switched to ${role.toUpperCase()} View`, 
        message: matched ? `Logged in as ${matched.name}` : undefined 
      });
    }
  };

  const loginAs = (userId: string) => {
    const user = INITIAL_USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setCurrentRoleState(user.role);
      setActiveTab('overview');
      showToast({ type: 'success', title: `Welcome back, ${user.name}!`, message: `Logged in as ${user.role}` });
    }
  };

  const logout = () => {
    setCurrentRoleState('visitor');
    setCurrentUser(null);
    setActiveTab('home');
    showToast({ type: 'info', title: 'Logged out', message: 'Returned to visitor portal.' });
  };

  // Profile operations
  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudentProfile(prev => ({
      ...prev,
      ...updates,
      resumeLastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast({ type: 'success', title: 'Profile Updated', message: 'Your student details and resume are saved.' });
  };

  // Drives operations
  const addDrive = (newDriveData: Omit<RecruitmentDrive, 'id' | 'createdAt' | 'applicantCount'>) => {
    const newDrive: RecruitmentDrive = {
      ...newDriveData,
      id: `drive-${Date.now()}`,
      applicantCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDrives(prev => [newDrive, ...prev]);

    // Also auto-post an announcement from Placement Cell
    addAnnouncement({
      title: `New Campus Placement Drive: ${newDrive.companyName}`,
      content: `${newDrive.companyName} is hiring for ${newDrive.roleTitle} with an attractive package of ${newDrive.ctc}. Eligible students can apply before ${newDrive.deadline}.`,
      type: 'drive_update',
      targetAudience: 'students',
      authorName: currentUser?.name || 'Placement Cell Secretariat',
      authorRole: 'TPO Coordinator',
      pinned: false,
      relatedDriveId: newDrive.id,
    });

    // Notify students
    addNotification({
      title: `New Drive: ${newDrive.companyName}`,
      message: `${newDrive.roleTitle} (${newDrive.ctc}) has opened registrations.`,
      type: 'drive',
      actionUrl: 'drives',
    });

    showToast({ type: 'success', title: 'Drive Created', message: `${newDrive.companyName} drive is now active for students.` });
  };

  const updateDrive = (id: string, updates: Partial<RecruitmentDrive>) => {
    setDrives(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    showToast({ type: 'success', title: 'Drive Updated', message: 'Recruitment drive details modified successfully.' });
  };

  const deleteDrive = (id: string) => {
    setDrives(prev => prev.filter(d => d.id !== id));
    showToast({ type: 'info', title: 'Drive Removed', message: 'The drive has been deleted.' });
  };

  // Eligibility check logic
  const checkEligibility = (drive: RecruitmentDrive, profile: StudentProfile = studentProfile): EligibilityResult => {
    const cgpaPassed = profile.cgpa >= drive.minCgpa;
    const branchPassed = drive.eligibleBranches.some(b => 
      b.toLowerCase() === profile.department.toLowerCase() || 
      b.toLowerCase().includes('all') ||
      profile.department.toLowerCase().includes(b.toLowerCase())
    );
    const backlogsPassed = profile.activeBacklogs <= drive.maxBacklogsAllowed;
    const tenthPassed = profile.tenthPercent >= drive.minTenthPercent;
    const twelfthPassed = profile.twelfthPercent >= drive.minTwelfthPercent;

    const isEligible = cgpaPassed && branchPassed && backlogsPassed && tenthPassed && twelfthPassed;

    return {
      isEligible,
      criteria: {
        cgpa: {
          passed: cgpaPassed,
          message: cgpaPassed ? `Meets cutoff (${profile.cgpa} >= ${drive.minCgpa})` : `Below minimum CGPA (${profile.cgpa} < ${drive.minCgpa})`,
          required: drive.minCgpa,
          actual: profile.cgpa,
        },
        branch: {
          passed: branchPassed,
          message: branchPassed ? `Department eligible (${profile.department})` : `Branch '${profile.department}' not listed in eligible branches`,
          eligibleBranches: drive.eligibleBranches,
          studentBranch: profile.department,
        },
        backlogs: {
          passed: backlogsPassed,
          message: backlogsPassed ? `Backlogs within limit (${profile.activeBacklogs} <= ${drive.maxBacklogsAllowed})` : `Active backlogs exceed limit (${profile.activeBacklogs} > ${drive.maxBacklogsAllowed})`,
          maxAllowed: drive.maxBacklogsAllowed,
          actual: profile.activeBacklogs,
        },
        tenth: {
          passed: tenthPassed,
          message: tenthPassed ? `Meets 10th standard cutoff (${profile.tenthPercent}% >= ${drive.minTenthPercent}%)` : `Below 10th cutoff (${profile.tenthPercent}% < ${drive.minTenthPercent}%)`,
          required: drive.minTenthPercent,
          actual: profile.tenthPercent,
        },
        twelfth: {
          passed: twelfthPassed,
          message: twelfthPassed ? `Meets 12th standard cutoff (${profile.twelfthPercent}% >= ${drive.minTwelfthPercent}%)` : `Below 12th cutoff (${profile.twelfthPercent}% < ${drive.minTwelfthPercent}%)`,
          required: drive.minTwelfthPercent,
          actual: profile.twelfthPercent,
        },
      },
    };
  };

  // Apply to drive
  const applyToDrive = (driveId: string): boolean => {
    const drive = drives.find(d => d.id === driveId);
    if (!drive) return false;

    // Check existing
    const alreadyApplied = applications.some(a => a.driveId === driveId && a.studentId === studentProfile.userId);
    if (alreadyApplied) {
      showToast({ type: 'warning', title: 'Already Applied', message: `You have already applied for ${drive.companyName}.` });
      return false;
    }

    // Eligibility check
    const eligibility = checkEligibility(drive, studentProfile);
    if (!eligibility.isEligible) {
      showToast({ 
        type: 'error', 
        title: 'Not Eligible', 
        message: 'You do not meet the institutional eligibility criteria for this drive.' 
      });
      return false;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      driveId: drive.id,
      studentId: studentProfile.userId,
      studentName: studentProfile.fullName,
      studentRollNo: studentProfile.rollNo,
      studentDept: studentProfile.department,
      studentCgpa: studentProfile.cgpa,
      studentAvatar: studentProfile.avatar,
      studentEmail: studentProfile.email,
      studentPhone: studentProfile.phone,
      companyName: drive.companyName,
      roleTitle: drive.roleTitle,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'applied',
      currentRoundIndex: 0,
      roundHistory: drive.rounds.map((r, idx) => ({
        roundName: r.name,
        roundIndex: idx,
        status: idx === 0 ? 'pending' : 'pending',
      })),
    };

    setApplications(prev => [newApp, ...prev]);
    setDrives(prev => prev.map(d => d.id === driveId ? { ...d, applicantCount: d.applicantCount + 1 } : d));

    // Celebrate with confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#7C3AED', '#10B981'],
      });
    } catch {
      // ignore
    }

    addNotification({
      title: `Applied to ${drive.companyName}`,
      message: `Your application for ${drive.roleTitle} has been submitted to recruiter.`,
      type: 'application',
      actionUrl: 'applications',
    });

    showToast({ 
      type: 'success', 
      title: 'Application Submitted!', 
      message: `Successfully applied to ${drive.companyName} for ${drive.roleTitle}.` 
    });

    return true;
  };

  const withdrawApplication = (applicationId: string) => {
    setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, status: 'withdrawn' } : a));
    showToast({ type: 'info', title: 'Application Withdrawn', message: 'You have withdrawn your candidacy.' });
  };

  const updateApplicationStatus = (applicationId: string, newStatus: ApplicationStatus, feedback?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;

      const updatedHistory = [...app.roundHistory];
      if (newStatus === 'shortlisted' && updatedHistory[0]) {
        updatedHistory[0] = { ...updatedHistory[0], status: 'cleared', feedback: feedback || 'Shortlisted for next round.' };
      }

      return {
        ...app,
        status: newStatus,
        roundHistory: updatedHistory,
      };
    }));

    showToast({ type: 'success', title: 'Candidate Status Updated', message: `Status changed to ${newStatus.replace('_', ' ').toUpperCase()}` });
  };

  const scheduleInterview = (
    applicationId: string, 
    details: {
      roundName: string;
      dateTime: string;
      mode: 'Online (Google Meet)' | 'In-Person (Placement Hall)' | 'Campus Lab';
      locationOrLink: string;
      interviewerName?: string;
      notes?: string;
    }
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;
      
      const updatedHistory = app.roundHistory.map(r => 
        r.roundName === details.roundName ? { ...r, status: 'scheduled' as const, interviewDate: details.dateTime, meetLink: details.locationOrLink } : r
      );

      return {
        ...app,
        status: 'interview_scheduled',
        roundHistory: updatedHistory,
        interviewSchedule: details,
      };
    }));

    addNotification({
      title: 'Interview Scheduled',
      message: `Interview for ${details.roundName} scheduled on ${details.dateTime}.`,
      type: 'interview',
      actionUrl: 'interviews',
    });

    showToast({ type: 'success', title: 'Interview Scheduled', message: `Time slot booked for candidate.` });
  };

  const issueOffer = (applicationId: string, ctc: string, joiningDate: string, location: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;
      return {
        ...app,
        status: 'selected',
        offerDetails: {
          ctc,
          roleTitle: app.roleTitle,
          joiningDate,
          location,
          offerLetterRef: `OFFER-${Math.floor(100000 + Math.random() * 900000)}`,
          accepted: false,
        },
      };
    }));

    addNotification({
      title: 'Congratulations! Official Offer Received',
      message: `You have received an employment offer with CTC ${ctc}!`,
      type: 'offer',
      actionUrl: 'applications',
    });

    showToast({ type: 'success', title: 'Offer Letter Issued', message: `Job offer generated and sent to candidate.` });
  };

  const acceptOffer = (applicationId: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId || !app.offerDetails) return app;
      return {
        ...app,
        offerDetails: {
          ...app.offerDetails,
          accepted: true,
          acceptedAt: new Date().toISOString().split('T')[0],
        },
      };
    }));

    // Update student profile as placed
    const app = applications.find(a => a.id === applicationId);
    if (app && app.offerDetails) {
      setStudentProfile(prev => ({
        ...prev,
        isPlaced: true,
        placedCompany: app.companyName,
        placedPackage: app.offerDetails?.ctc,
      }));
    }

    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    showToast({ type: 'success', title: 'Offer Accepted!', message: 'Congratulations on securing your placement offer!' });
  };

  // Announcement operations
  const addAnnouncement = (newAnn: Omit<Announcement, 'id' | 'createdAt'>) => {
    const item: Announcement = {
      ...newAnn,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setAnnouncements(prev => [item, ...prev]);
    showToast({ type: 'success', title: 'Announcement Published', message: 'Live on student & recruiter boards.' });
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    showToast({ type: 'info', title: 'Announcement Deleted' });
  };

  const togglePinAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));
  };

  // Notification operations
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast({ type: 'info', title: 'All notifications marked as read' });
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newItem, ...prev]);
  };

  // Reset to default data
  const resetToDefaultData = () => {
    localStorage.clear();
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setDrives(INITIAL_DRIVES);
    setApplications(INITIAL_APPLICATIONS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentRoleState('student');
    setCurrentUser(INITIAL_USERS[0]);
    setActiveTab('overview');
    showToast({ type: 'info', title: 'Demo Data Reset', message: 'All drives, applications, and profiles restored to initial sample state.' });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        isDarkMode,
        toggleDarkMode,
        setCurrentRole,
        loginAs,
        logout,
        studentProfile,
        updateStudentProfile,
        drives,
        addDrive,
        updateDrive,
        deleteDrive,
        applications,
        applyToDrive,
        withdrawApplication,
        updateApplicationStatus,
        scheduleInterview,
        issueOffer,
        acceptOffer,
        checkEligibility,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        togglePinAnnouncement,
        notifications,
        unreadNotifCount,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        companies,
        activeTab,
        setActiveTab,
        toasts,
        showToast,
        removeToast,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
