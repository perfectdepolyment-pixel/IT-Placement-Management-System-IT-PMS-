import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCircle, 
  BookOpen, 
  Code, 
  FolderGit2, 
  Briefcase, 
  Award, 
  Printer, 
  Save, 
  Plus, 
  Trash2, 
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Eye
} from 'lucide-react';

export const ResumeBuilder: React.FC = () => {
  const { studentProfile, updateStudentProfile } = useApp();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [formData, setFormData] = useState(studentProfile);

  // New item states
  const [newSkill, setNewSkill] = useState('');
  const [skillCategory, setSkillCategory] = useState<'programming' | 'frameworks' | 'tools' | 'core'>('programming');
  
  const [newCert, setNewCert] = useState('');

  // Handle Save
  const handleSave = () => {
    updateStudentProfile(formData);
  };

  // Add skill
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
  };

  const handleRemoveSkill = (category: 'programming' | 'frameworks' | 'tools' | 'core', index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }));
  };

  // Add certification
  const handleAddCert = () => {
    if (!newCert.trim()) return;
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert.trim()],
    }));
    setNewCert('');
  };

  const handleRemoveCert = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Profile completion meter
  const calculateCompleteness = () => {
    let score = 0;
    if (formData.fullName && formData.email && formData.phone) score += 20;
    if (formData.cgpa > 0 && formData.tenthPercent > 0) score += 20;
    if (formData.skills.programming.length > 0) score += 20;
    if (formData.projects.length > 0) score += 20;
    if (formData.experiences.length > 0 || formData.certifications.length > 0) score += 20;
    return score;
  };

  const completeness = calculateCompleteness();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Profile & ATS Resume Builder
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build a comprehensive campus placement CV, verified by the institutional placement cell.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-[#141f36] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'edit'
                  ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Edit Details
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Resume Preview</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
            title="Export / Print ATS Compliant PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          {activeTab === 'edit' && (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      {/* Completion Meter */}
      <div className="no-print p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
            {completeness}%
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Profile Verification Score
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Verified records with complete projects receive 3.4x more interview callouts.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" /> Ready for Drives
        </span>
      </div>

      {/* Mode 1: Edit Forms */}
      {activeTab === 'edit' ? (
        <div className="space-y-6">
          {/* Personal & Academic Details */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-blue-600" />
              <span>Personal & College Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Roll / Registration No.
                </label>
                <input
                  type="text"
                  value={formData.rollNo}
                  onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Department / Branch
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Cumulative CGPA (Scale 10.0)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={e => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Active Backlogs
                </label>
                <input
                  type="number"
                  value={formData.activeBacklogs}
                  onChange={e => setFormData({ ...formData, activeBacklogs: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Passing Batch
                </label>
                <input
                  type="text"
                  value={formData.batch}
                  onChange={e => setFormData({ ...formData, batch: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  10th Grade Percentage (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.tenthPercent}
                  onChange={e => setFormData({ ...formData, tenthPercent: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  12th / Diploma Percentage (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.twelfthPercent}
                  onChange={e => setFormData({ ...formData, twelfthPercent: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Career Summary */}
            <div className="pt-2">
              <label className="block font-semibold text-xs text-slate-700 dark:text-slate-300 mb-1">
                Professional Bio / Summary
              </label>
              <textarea
                rows={3}
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-xs text-slate-900 dark:text-white leading-relaxed"
              />
            </div>
          </div>

          {/* Technical Skills Editor */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-violet-600" />
              <span>Technical Skills Inventory</span>
            </h3>

            {/* Add skill input */}
            <div className="flex gap-2">
              <select
                value={skillCategory}
                onChange={e => setSkillCategory(e.target.value as any)}
                className="px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-xs text-slate-900 dark:text-white"
              >
                <option value="programming">Programming Languages</option>
                <option value="frameworks">Frameworks & Libraries</option>
                <option value="tools">Tools, DBs & Cloud</option>
                <option value="core">Core CS Fundamentals</option>
              </select>

              <input
                type="text"
                placeholder="e.g. Docker, TypeScript, PyTorch"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-xs text-slate-900 dark:text-white"
              />

              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Display by category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {(['programming', 'frameworks', 'tools', 'core'] as const).map(cat => (
                <div key={cat} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A]">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 capitalize mb-2">
                    {cat === 'programming' ? 'Languages' : cat === 'core' ? 'Core CS Subjects' : cat}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.skills[cat].map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(cat, sIdx)}
                          className="text-slate-400 hover:text-rose-500 ml-1"
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

          {/* Certifications Editor */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Certifications & Honors</span>
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. AWS Certified Developer Associate, LeetCode 500+ Solved"
                value={newCert}
                onChange={e => setNewCert(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCert())}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-xs text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddCert}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {formData.certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A] text-xs"
                >
                  <span className="text-slate-800 dark:text-slate-200">{cert}</span>
                  <button
                    onClick={() => handleRemoveCert(cIdx)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Live ATS Resume Preview (Print-Ready) */
        <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 max-w-4xl mx-auto space-y-6 print:shadow-none print:border-none print:p-0 print:m-0">
          
          {/* Resume Header */}
          <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
              {formData.fullName}
            </h1>
            <p className="text-xs text-slate-700 font-medium">
              {formData.department} · Batch of {formData.batch}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 pt-1">
              <span>{formData.email}</span>
              <span aria-hidden="true">|</span>
              <span>{formData.phone}</span>
              <span aria-hidden="true">|</span>
              <span>Roll: {formData.rollNo}</span>
              {formData.githubUrl && (
                <>
                  <span aria-hidden="true">|</span>
                  <a href={formData.githubUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    GitHub
                  </a>
                </>
              )}
              {formData.linkedinUrl && (
                <>
                  <span aria-hidden="true">|</span>
                  <a href={formData.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    LinkedIn
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Education & Academic Record
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-slate-900 font-bold">Bachelor of Technology in {formData.department}</strong>
                  <p className="text-slate-600">Institute of Technology & Engineering</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">CGPA: {formData.cgpa} / 10.0</span>
                  <p className="text-slate-500">Graduation: 2026</p>
                </div>
              </div>

              <div className="flex justify-between items-start pt-1 text-slate-600">
                <span>Higher Secondary School (Class XII): <strong>{formData.twelfthPercent}%</strong></span>
                <span>Secondary School (Class X): <strong>{formData.tenthPercent}%</strong></span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="space-y-1 text-xs">
              <div>
                <strong className="text-slate-900">Programming Languages: </strong>
                <span className="text-slate-700">{formData.skills.programming.join(', ')}</span>
              </div>
              <div>
                <strong className="text-slate-900">Frameworks & Technologies: </strong>
                <span className="text-slate-700">{formData.skills.frameworks.join(', ')}</span>
              </div>
              <div>
                <strong className="text-slate-900">Tools & Databases: </strong>
                <span className="text-slate-700">{formData.skills.tools.join(', ')}</span>
              </div>
              <div>
                <strong className="text-slate-900">Core Subjects: </strong>
                <span className="text-slate-700">{formData.skills.core.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Technical Projects
            </h2>
            <div className="space-y-3 text-xs">
              {formData.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-start font-bold text-slate-900">
                    <span>
                      {proj.title}
                      {proj.link && (
                        <span className="font-normal text-blue-600 ml-2">[{proj.link}]</span>
                      )}
                    </span>
                    <span className="text-slate-500 font-normal">{proj.startDate} - {proj.endDate}</span>
                  </div>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">
                    {proj.description}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    <strong>Tech Stack:</strong> {proj.techStack.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Work Experience & Internships
            </h2>
            <div className="space-y-2.5 text-xs">
              {formData.experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start font-bold text-slate-900">
                    <span>{exp.role} · {exp.company}</span>
                    <span className="text-slate-500 font-normal">{exp.duration}</span>
                  </div>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Certifications & Accomplishments
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
              {formData.certifications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
