import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, ArrowLeft, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { navigate, showToast } = useApp();

  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Strength calculation
  const getStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score;
  };

  const strength = getStrength(newPassword);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('reset');
      showToast({
        type: 'info',
        title: 'Reset Code Sent',
        message: 'A verification link and token have been simulated for your email.',
      });
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast({ type: 'error', title: 'Passwords mismatch', message: 'Confirm password must match.' });
      return;
    }

    showToast({ type: 'success', title: 'Password Reset Successful', message: 'You can now sign in with your updated password.' });
    navigate('/login');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-[#111A2E] rounded-3xl p-8 shadow-xl border border-slate-200/80 dark:border-[#24304A] space-y-6">
        
        {step === 'request' ? (
          <>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Forgot Password?</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your university roll number or official email to receive a password reset link.
              </p>
            </div>

            <form onSubmit={handleSendLink} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>{isLoading ? 'Verifying...' : 'Send Reset Link'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-[#24304A]">
              <button
                onClick={() => navigate('/login')}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1 mx-auto font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </>
        ) : (
          /* Step 2: Reset Screen */
          <>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Set New Password</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a strong passphrase for your account: {email || 'student@college.edu'}
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                {/* Password strength meter */}
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full flex-1 ${strength >= 1 ? (strength === 1 ? 'bg-rose-500' : strength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 ${strength >= 2 ? (strength === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 ${strength >= 3 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 ${strength >= 4 ? 'bg-emerald-600' : 'bg-transparent'}`} />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Strength: {strength <= 1 ? 'Weak' : strength <= 2 ? 'Moderate' : 'Strong'} (8+ chars, upper, numbers, symbol)
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Save Password & Sign In</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-[#24304A]">
              <button
                onClick={() => setStep('request')}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1 mx-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Use another email</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
