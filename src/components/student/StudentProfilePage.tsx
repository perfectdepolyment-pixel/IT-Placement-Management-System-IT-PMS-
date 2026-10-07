import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCircle, 
  Camera, 
  BookOpen, 
  Code, 
  Briefcase, 
  Award, 
  Link as LinkIcon, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { studentProfile, updateStudentProfile, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'skills' | 'projects' | 'certifications' | 'links'>('personal');
  const [formData, setFormData] = useState(studentProfile);
  const [isDirty, setIsDirty] = useState(false);

  // New item states
  const [newSkill, setNewSkill] = useState('');
  const [skillCategory, setSkillCategory] = useState<'programming' | 'frameworks' | 'tools' | 'core'>('programming');
  const [newCert, setNewCert] = useState('');

  // Handle Form Input Change
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  // Add Skill
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillCategory]: [...prev.skills[skillCategory], newSkill.trim()],
      },
    }));
    setNewSkill('');
    setIsDirty(true);
  };

  const handleRemoveSkill = (cat: 'programming' | 'frameworks' | 'tools' | 'core', idx: number) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [cat]: prev.skills[cat].filter((_, i) => i !== idx),
      },
    }));
    setIsDirty(true);
  };

  // Save changes
  const handleSave = () => {
    updateStudentProfile(formData);
    setIsDirty(false);
  };

  const handleCancel = () => {
    setFormData(studentProfile);
    setIsDirty(false);
    showToast({ type: 'info', title: 'Changes Reverted' });
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in">
      
      {/* 4.2.2 Profile header card: photo, name, roll no, department, completion badge */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group shrink-0">
          <img
            src={formData.avatar}
            alt={formData.fullName}
            className="w-24 h-24 rounded-2xl object-cover ring-2 ring-blue-600/30 shadow-md"
          />
          <button
            type="button"
            onClick={() => {
              const newUrl = prompt('Enter image URL for avatar:', formData.avatar);
              if (newUrl) handleChange('avatar', newUrl);
            }}
            className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            title="Update photo"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{formData.fullName}</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Candidate
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Roll No: <strong>{formData.rollNo}</strong> · {formData.department} ({formData.batch})
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold pt-1">
            <span className="text-blue-600 dark:text-blue-400">CGPA: {formData.cgpa} / 10.0</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-600 dark:text-slate-300">Backlogs: {formData.activeBacklogs} Active</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600">85% Profile Completeness</span>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-[#141f36] rounded-2xl text-xs font-semibold">
        {[
          { id: 'personal', label: 'Personal Information' },
          { id: 'academic', label: 'Academic & Semester Scores' },
          { id: 'skills', label: 'Technical Skills' },
          { id: 'projects', label: 'Projects & Experience' },
          { id: 'certifications', label: 'Certifications' },
          { id: 'links', label: 'Profiles & Portfolio' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
        
        {/* Tab 1: Personal (DOB, gender, phone, address) */}
        {activeTab === 'personal' && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Personal Coordinates</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">University Email</label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth || '2004-05-14'}
                  onChange={e => handleChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                <select
                  value={formData.gender || 'Male'}
                  onChange={e => handleChange('gender', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={e => handleChange('address', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Career Objective / Bio</label>
              <textarea
                rows={3}
                value={formData.summary}
                onChange={e => handleChange('summary', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Academic (10th, 12th, semester-wise CGPA, backlogs) */}
        {activeTab === 'academic' && (
          <div className="space-y-6 text-xs animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Academic Qualifications & Cutoff Verification</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#141f36]">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Overall CGPA (Scale 10.0)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={e => handleChange('cgpa', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Active Backlogs</label>
                <input
                  type="number"
                  value={formData.activeBacklogs}
                  onChange={e => handleChange('activeBacklogs', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">10th Standard (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.tenthPercent}
                  onChange={e => handleChange('tenthPercent', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">12th / Diploma (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.twelfthPercent}
                  onChange={e => handleChange('twelfthPercent', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Semester-wise breakdown */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">UG Semester-wise SGPA Track Record</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {formData.semesterScores?.map(sem => (
                  <div key={sem.semester} className="p-3 rounded-xl border border-slate-200 dark:border-[#24304A] text-center">
                    <span className="text-[11px] text-slate-400 font-semibold">Semester {sem.semester}</span>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{sem.sgpa}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Passed ({sem.credits} credits)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-6 text-xs animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Technical Skills Inventory</h3>

            <div className="flex gap-2">
              <select
                value={skillCategory}
                onChange={e => setSkillCategory(e.target.value as any)}
                className="px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
              >
                <option value="programming">Programming Languages</option>
                <option value="frameworks">Frameworks & Libraries</option>
                <option value="tools">Tools, DBs & Cloud</option>
                <option value="core">Core CS Fundamentals</option>
              </select>

              <input
                type="text"
                placeholder="e.g. Next.js, Kubernetes, PostgreSQL"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
              />

              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tag</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['programming', 'frameworks', 'tools', 'core'] as const).map(cat => (
                <div key={cat} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A] space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                    {cat === 'programming' ? 'Programming Languages' : cat === 'core' ? 'Core CS Subjects' : cat}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.skills[cat].map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(cat, sIdx)}
                          className="text-slate-400 hover:text-rose-500 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Projects & Experience */}
        {activeTab === 'projects' && (
          <div className="space-y-6 text-xs animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Engineering Projects & Internships</h3>

            <div className="space-y-4">
              {formData.projects.map(proj => (
                <div key={proj.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A] space-y-2">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                    <span>{proj.title}</span>
                    <span className="text-slate-400 font-normal">{proj.startDate} – {proj.endDate}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{proj.description}</p>
                  <p className="text-slate-400">Tech Stack: {proj.techStack.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Certifications */}
        {activeTab === 'certifications' && (
          <div className="space-y-6 text-xs animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Certifications & Honors</h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. AWS Certified Solutions Architect, HackerRank Gold"
                value={newCert}
                onChange={e => setNewCert(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newCert.trim()) return;
                  setFormData(prev => ({ ...prev, certifications: [...prev.certifications, newCert.trim()] }));
                  setNewCert('');
                  setIsDirty(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold"
              >
                Add Certification
              </button>
            </div>

            <div className="space-y-2">
              {formData.certifications.map((cert, cIdx) => (
                <div key={cIdx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A]">
                  <span>{cert}</span>
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== cIdx) }));
                      setIsDirty(true);
                    }}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Links */}
        {activeTab === 'links' && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Online Portfolios & Repositories</h3>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={e => handleChange('githubUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.linkedinUrl || ''}
                  onChange={e => handleChange('linkedinUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Personal Portfolio / Website</label>
                <input
                  type="url"
                  value={formData.portfolioUrl || ''}
                  onChange={e => handleChange('portfolioUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Sticky Save/Cancel Bar with Unsaved-changes warning */}
      {isDirty && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 text-xs animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-semibold">You have unsaved modifications in your profile.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-xl border border-slate-600 hover:bg-slate-800 text-slate-300 transition-colors"
            >
              Revert
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
