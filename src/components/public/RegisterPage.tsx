import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  FileCheck,
  Check
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { navigate, showToast } = useApp();

  const [role, setRole] = useState<'student' | 'recruiter'>('student');
  const [studentStep, setStudentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Student Form fields
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rollNo: '',
    department: 'Computer Science and Engineering',
    course: 'B.Tech',
    passingYear: '2026',
    cgpa: '8.5',
    activeBacklogs: '0',
    termsAccepted: false,
  });

  // Recruiter Form fields
  const [recruiterData, setRecruiterData] = useState({
    companyName: '',
    contactPerson: '',
    officialEmail: '',
    phone: '',
    website: '',
    industry: 'Software & Cloud Services',
    password: '',
    termsAccepted: false,
  });

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentStep < 3) {
      setStudentStep(s => s + 1);
      return;
    }

    if (!studentData.termsAccepted) {
      showToast({ type: 'warning', title: 'Terms Required', message: 'Please accept the institutional placement terms.' });
      return;
    }

    setIsSuccess(true);
    showToast({
      type: 'success',
      title: 'Registration Submitted',
      message: 'Student account created and synced to verified directory.',
    });
  };

  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruiterData.termsAccepted) {
      showToast({ type: 'warning', title: 'Terms Required', message: 'Please agree to corporate recruitment regulations.' });
      return;
    }

    setIsSuccess(true);
    showToast({
      type: 'info',
      title: 'Submitted for TPO Verification',
      message: 'Your corporate account has been queued for placement cell approval.',
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-[#111A2E] rounded-3xl shadow-xl border border-slate-200/80 dark:border-[#24304A] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Branded Panel */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-tr from-blue-700 via-indigo-700 to-violet-800 text-white relative">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Join IT Placement Management System
            </h2>
            <p className="text-xs text-blue-100 leading-relaxed">
              Register to participate in campus recruitment drives, verify credentials, and receive interview callouts.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/20 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Direct access to 180+ tech recruiters</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Institutional CGPA & backlogs verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Standardized ATS resume builder included</span>
            </div>
          </div>

          <p className="text-[11px] text-blue-200">
            Official Portal · Directorate of Career Services
          </p>
        </div>

        {/* Right Form Card */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {role === 'student' ? 'Registration Complete!' : 'Registration Queued'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                {role === 'student'
                  ? 'Your student account is now active. You can log in and start browsing eligible campus drives.'
                  : 'Your organization profile has been submitted to the Placement Cell. Once approved by the TPO Directorate, you can post campus drives.'}
              </p>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
              >
                Proceed to Sign In
              </button>
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Create Your Account
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select your registration profile below:
                </p>
              </div>

              {/* Role Toggle (Student | Recruiter) */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-[#141f36] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setRole('student'); setStudentStep(1); }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    role === 'student'
                      ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Registration</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    role === 'recruiter'
                      ? 'bg-white dark:bg-[#1f2c48] text-violet-600 dark:text-violet-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Recruiter Account</span>
                </button>
              </div>

              {/* Student Multi-Step Flow */}
              {role === 'student' ? (
                <div className="space-y-5">
                  {/* Progress Stepper */}
                  <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-[#24304A] pb-3">
                    <span className={`font-semibold ${studentStep >= 1 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                      1. Account Info
                    </span>
                    <span className={`font-semibold ${studentStep >= 2 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                      2. Academic Details
                    </span>
                    <span className={`font-semibold ${studentStep >= 3 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                      3. Review & Submit
                    </span>
                  </div>

                  <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs">
                    {/* Step 1: Account */}
                    {studentStep === 1 && (
                      <div className="space-y-3 animate-in fade-in">
                        <div>
                          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Aryan Sharma"
                            value={studentData.name}
                            onChange={e => setStudentData({ ...studentData, name: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">University Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="student@college.edu"
                            value={studentData.email}
                            onChange={e => setStudentData({ ...studentData, email: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={studentData.phone}
                            onChange={e => setStudentData({ ...studentData, phone: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Password *</label>
                            <input
                              type="password"
                              required
                              value={studentData.password}
                              onChange={e => setStudentData({ ...studentData, password: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm Password *</label>
                            <input
                              type="password"
                              required
                              value={studentData.confirmPassword}
                              onChange={e => setStudentData({ ...studentData, confirmPassword: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-1 mt-4"
                        >
                          <span>Proceed to Academic Step</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Step 2: Academic */}
                    {studentStep === 2 && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Roll / Registration No. *</label>
                            <input
                              type="text"
                              required
                              placeholder="22CS1048"
                              value={studentData.rollNo}
                              onChange={e => setStudentData({ ...studentData, rollNo: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cumulative CGPA *</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={studentData.cgpa}
                              onChange={e => setStudentData({ ...studentData, cgpa: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Department / Branch *</label>
                          <select
                            value={studentData.department}
                            onChange={e => setStudentData({ ...studentData, department: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                          >
                            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                            <option value="Electronics & Communication Engineering">Electronics & Communication</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Passing Batch Year *</label>
                            <input
                              type="text"
                              value={studentData.passingYear}
                              onChange={e => setStudentData({ ...studentData, passingYear: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Active Backlogs *</label>
                            <input
                              type="number"
                              value={studentData.activeBacklogs}
                              onChange={e => setStudentData({ ...studentData, activeBacklogs: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setStudentStep(1)}
                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] font-semibold"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Review & Agreement</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Review & Submit */}
                    {studentStep === 3 && (
                      <div className="space-y-4 animate-in fade-in">
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] space-y-1.5 text-xs">
                          <p><strong>Name:</strong> {studentData.name || 'Aryan Sharma'}</p>
                          <p><strong>Email:</strong> {studentData.email || 'aryan@college.edu'}</p>
                          <p><strong>Roll No:</strong> {studentData.rollNo || '22CS1048'}</p>
                          <p><strong>Department:</strong> {studentData.department}</p>
                          <p><strong>CGPA:</strong> {studentData.cgpa} (Backlogs: {studentData.activeBacklogs})</p>
                        </div>

                        <label className="flex items-start gap-2 cursor-pointer text-slate-700 dark:text-slate-300 pt-1">
                          <input
                            type="checkbox"
                            checked={studentData.termsAccepted}
                            onChange={e => setStudentData({ ...studentData, termsAccepted: e.target.checked })}
                            className="rounded text-blue-600 mt-0.5"
                          />
                          <span>
                            I certify that my academic records and CGPA are authentic. I agree to adhere to the institutional campus placement policies.
                          </span>
                        </label>

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setStudentStep(2)}
                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] font-semibold"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Complete Student Registration</span>
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              ) : (
                /* Recruiter Form */
                <form onSubmit={handleRecruiterSubmit} className="space-y-3.5 text-xs animate-in fade-in">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Organization Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adobe Systems India"
                      value={recruiterData.companyName}
                      onChange={e => setRecruiterData({ ...recruiterData, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Person *</label>
                      <input
                        type="text"
                        required
                        placeholder="HR Lead / Recruiter"
                        value={recruiterData.contactPerson}
                        onChange={e => setRecruiterData({ ...recruiterData, contactPerson: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="hr@company.com"
                        value={recruiterData.officialEmail}
                        onChange={e => setRecruiterData({ ...recruiterData, officialEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98110 00000"
                        value={recruiterData.phone}
                        onChange={e => setRecruiterData({ ...recruiterData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Website *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://company.com"
                        value={recruiterData.website}
                        onChange={e => setRecruiterData({ ...recruiterData, website: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      value={recruiterData.password}
                      onChange={e => setRecruiterData({ ...recruiterData, password: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer text-slate-700 dark:text-slate-300 pt-1">
                    <input
                      type="checkbox"
                      checked={recruiterData.termsAccepted}
                      onChange={e => setRecruiterData({ ...recruiterData, termsAccepted: e.target.checked })}
                      className="rounded text-violet-600 mt-0.5"
                    />
                    <span>
                      I represent this organization and agree that candidate data is protected under campus confidentiality guidelines.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors"
                  >
                    Submit for TPO Approval
                  </button>
                </form>
              )}

              <p className="text-xs text-center text-slate-500 pt-2 border-t border-slate-100 dark:border-[#24304A]">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
