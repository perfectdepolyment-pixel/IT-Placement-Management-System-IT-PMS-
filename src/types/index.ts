export type UserRole = 'visitor' | 'student' | 'recruiter' | 'admin';

export type ApplicationStatus = 
  | 'applied' 
  | 'under_review' 
  | 'shortlisted' 
  | 'interview_scheduled' 
  | 'selected' 
  | 'rejected' 
  | 'withdrawn';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  rollNo?: string;
  department?: string;
  batch?: string;
  companyName?: string;
  companyId?: string;
  designation?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
  score: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'Internship' | 'Full-Time' | 'Part-Time' | 'Research';
  duration: string;
  description: string;
}

export interface SemesterScore {
  semester: number;
  sgpa: number;
  credits: number;
  passed: boolean;
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  rollNo: string;
  department: string;
  course: string;
  batch: string;
  passingYear: number;
  cgpa: number;
  activeBacklogs: number;
  historyOfBacklogs: number;
  tenthPercent: number;
  twelfthPercent: number;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  summary: string;
  skills: {
    programming: string[];
    frameworks: string[];
    tools: string[];
    core: string[];
  };
  semesterScores: SemesterScore[];
  projects: Project[];
  experiences: Experience[];
  certifications: string[];
  preferredLocations: string[];
  resumeLastUpdated: string;
  resumeTemplate: 'modern' | 'classic' | 'minimalist';
  savedDriveIds: string[];
  isPlaced: boolean;
  placedCompany?: string;
  placedPackage?: string;
}

export interface SelectionRound {
  id: string;
  roundNumber: number;
  name: string;
  type: 'Aptitude Test' | 'Coding Assessment' | 'Technical Round 1' | 'Technical Round 2' | 'Managerial Round' | 'HR Round';
  description: string;
}

export interface RecruitmentDrive {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyWebsite: string;
  roleTitle: string;
  jobType: 'Full-Time' | 'Internship' | 'Intern + Full-Time';
  locations: string[];
  ctc: string; // e.g. "18.5 LPA"
  stipend?: string; // e.g. "60,000 / month"
  ctcValueLpa: number; // For sorting and analytics
  minCgpa: number;
  eligibleBranches: string[];
  maxBacklogsAllowed: number;
  minTenthPercent: number;
  minTwelfthPercent: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
  rounds: SelectionRound[];
  deadline: string; // ISO date or YYYY-MM-DD
  driveDate: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  totalVacancies: number;
  applicantCount: number;
  createdAt: string;
}

export interface RoundStatus {
  roundName: string;
  roundIndex: number;
  status: 'cleared' | 'failed' | 'scheduled' | 'pending';
  feedback?: string;
  interviewDate?: string;
  meetLink?: string;
}

export interface OfferDetails {
  ctc: string;
  roleTitle: string;
  joiningDate: string;
  location: string;
  offerLetterRef: string;
  accepted: boolean;
  acceptedAt?: string;
  status?: 'Pending' | 'Accepted' | 'Declined';
}

export interface Application {
  id: string;
  driveId: string;
  studentId: string;
  studentName: string;
  studentRollNo: string;
  studentDept: string;
  studentCgpa: number;
  studentAvatar?: string;
  studentEmail: string;
  studentPhone?: string;
  companyName: string;
  roleTitle: string;
  appliedAt: string;
  status: ApplicationStatus;
  currentRoundIndex: number;
  roundHistory: RoundStatus[];
  interviewSchedule?: {
    roundName: string;
    dateTime: string;
    mode: 'Online (Google Meet)' | 'In-Person (Placement Hall)' | 'Campus Lab';
    locationOrLink: string;
    interviewerName?: string;
    notes?: string;
  };
  offerDetails?: OfferDetails;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'urgent' | 'drive_update' | 'general' | 'result';
  targetAudience: 'all' | 'students' | 'recruiters' | 'Computer Science' | 'Information Technology';
  createdAt: string;
  authorName: string;
  authorRole: string;
  pinned: boolean;
  relatedDriveId?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'drive' | 'application' | 'interview' | 'offer' | 'system';
  timestamp: string;
  dateGroup?: 'Today' | 'Earlier';
  read: boolean;
  actionUrl?: string;
}

export interface CompanyPastHiring {
  year: string;
  count: number;
  avgPackage: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
  location: string;
  description: string;
  activeDrives: number;
  totalHired: number;
  highestPackage: string;
  tier: 'Dream' | 'Tier-1' | 'Tier-2' | 'Mass';
  aboutLong?: string;
  rolesOffered?: string[];
  pastHiringStats?: CompanyPastHiring[];
  hrContact?: {
    name: string;
    email: string;
    phone: string;
  };
  status?: 'Pending' | 'Approved' | 'Blocked';
}

export interface PlacementStat {
  academicYear: string;
  totalEligible: number;
  totalPlaced: number;
  percentagePlaced: number;
  highestCtcLpa: number;
  averageCtcLpa: number;
  medianCtcLpa: number;
  totalOffers: number;
  totalCompanies: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  photo: string;
  department: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Students' | 'Recruiters' | 'Policies' | 'General';
}

export interface PendingApproval {
  id: string;
  type: 'student' | 'recruiter' | 'drive';
  title: string;
  subtitle: string;
  details: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
