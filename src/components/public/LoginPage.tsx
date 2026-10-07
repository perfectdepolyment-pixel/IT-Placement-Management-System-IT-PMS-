import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Building, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Lock,
  Mail
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate, setCurrentRole, loginAs, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('aryan.sharma@college.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Role Change presets
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'student') {
      setEmail('aryan.sharma@college.edu');
    } else if (role === 'recruiter') {
      setEmail('priya.nair@microsoft.com');
    } else if (role === 'admin') {
      setEmail('tpo.director@college.edu');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both your registered ID and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      if (selectedRole === 'student') {
        loginAs('user-student-1');
        navigate('/student/dashboard');
      } else if (selectedRole === 'recruiter') {
        loginAs('user-recruiter-1');
        navigate('/recruiter/dashboard');
      } else if (selectedRole === 'admin') {
        loginAs('user-admin-1');
        navigate('/admin/dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-[#111A2E] rounded-3xl shadow-xl border border-slate-200/80 dark:border-[#24304A] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Branded Panel (Hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-tr from-blue-700 via-indigo-700 to-violet-800 text-white relative">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Institutional Placement Management System
            </h2>
            <p className="text-xs text-blue-100 leading-relaxed">
              Your gateway to campus recruitment drives, verified resumes, interview tracks, and corporate offer acceptance.
            </p>
          </div>

          <div className="space-y-3 pt-8 border-t border-white/20 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Real-time CGPA and backlog eligibility checks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Seamless Google Meet and interview scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Verified ATS-compliant resume builder</span>
            </div>
          </div>

          <p className="text-[11px] text-blue-200 mt-6">
            Season 2025–2026 Directorate of Career Services
          </p>
        </div>

        {/* Right Form Card */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm tracking-tight">IT-PMS PORTAL</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome Back</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select your institutional persona and sign in with your credentials.
            </p>
          </div>

          {/* Role selector tabs (Student | Recruiter | Admin) */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-[#141f36] rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'student'
                  ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('recruiter')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'recruiter'
                  ? 'bg-white dark:bg-[#1f2c48] text-violet-600 dark:text-violet-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Recruiter</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'admin'
                  ? 'bg-white dark:bg-[#1f2c48] text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin / TPO</span>
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {selectedRole === 'student' ? 'College Email / Roll Number' : selectedRole === 'recruiter' ? 'Official Corporate Email' : 'TPO Administrative Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-[11px]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying Credentials...' : `Log In to ${selectedRole.toUpperCase()} Portal`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="pt-2 border-t border-slate-100 dark:border-[#24304A] text-center space-y-2">
            <span className="text-[11px] text-slate-400 block font-medium">Or quick demo fill:</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => { handleRoleChange('student'); }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => { handleRoleChange('recruiter'); }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-semibold border border-violet-200 dark:border-violet-800"
              >
                Recruiter Demo
              </button>
              <button
                type="button"
                onClick={() => { handleRoleChange('admin'); }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800"
              >
                TPO Admin Demo
              </button>
            </div>

            <p className="text-xs text-slate-500 pt-2">
              New to IT-PMS?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                Register an Account
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
