import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building, Mail, Phone, MapPin, ExternalLink, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">IT-PMS</span>
                <span className="text-[10px] ml-2 uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  Campus
                </span>
                <p className="text-xs text-slate-400">Institutional Placement Management System</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The official centralized placement portal connecting university engineering graduates with global technology enterprises. Streamlining eligibility, job drives, interviews, and verified records.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-blue-400 transition-colors">Home Page</button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-blue-400 transition-colors">About Placement Cell</button>
              </li>
              <li>
                <button onClick={() => navigate('/companies')} className="hover:text-blue-400 transition-colors">Partner Companies</button>
              </li>
              <li>
                <button onClick={() => navigate('/statistics')} className="hover:text-blue-400 transition-colors">Placement Statistics</button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-blue-400 transition-colors">Contact TPO</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Roles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Portals & Login</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/login')} className="hover:text-blue-400 transition-colors">Student Sign In</button>
              </li>
              <li>
                <button onClick={() => navigate('/register')} className="hover:text-blue-400 transition-colors">Student Registration</button>
              </li>
              <li>
                <button onClick={() => navigate('/login')} className="hover:text-blue-400 transition-colors">Recruiter Portal</button>
              </li>
              <li>
                <button onClick={() => navigate('/login')} className="hover:text-blue-400 transition-colors">TPO / Admin Access</button>
              </li>
              <li>
                <button onClick={() => navigate('/forgot-password')} className="hover:text-blue-400 transition-colors">Forgot Password</button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Placement Directorate</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Floor 2, Administrative Block, Central Campus, New Delhi 110025</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 94250 88990 (Direct)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>tpo.director@college.edu</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} IT Placement Management System (IT-PMS). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/contact')} className="hover:text-slate-300">Privacy Policy</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigate('/contact')} className="hover:text-slate-300">Placement Code of Conduct</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigate('/contact')} className="hover:text-slate-300">TPO Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
