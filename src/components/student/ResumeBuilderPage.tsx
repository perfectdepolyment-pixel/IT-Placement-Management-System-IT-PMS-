import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Printer, 
  Upload, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Code, 
  BookOpen, 
  Briefcase, 
  Award, 
  FolderGit2, 
  FileText, 
  Sparkles,
  Sliders
} from 'lucide-react';

export const ResumeBuilderPage: React.FC = () => {
  const { studentProfile, resumeTemplate, setResumeTemplate, showToast } = useApp();

  const [openSections, setOpenSections] = useState({
    summary: true,
    education: true,
    skills: false,
    projects: false,
    experience: false,
    certifications: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleUploadResume = () => {
    showToast({
      type: 'info',
      title: 'Resume Parser Ready',
      message: 'PDF uploaded. Extracted 8 skills and updated project highlights.',
    });
  };

  const handleSetDefault = () => {
    showToast({
      type: 'success',
      title: 'Default Resume Saved',
      message: `${resumeTemplate.toUpperCase()} layout is now your primary campus drive application resume.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 4.2.3 Top Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            ATS Resume Builder & Formats
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build, template, and export compliant A4 resumes parsed by Fortune 500 ATS applicant systems.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          {/* Template Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-[#141f36] p-1 rounded-xl text-xs font-semibold">
            {(['modern', 'classic', 'minimalist'] as const).map(tpl => (
              <button
                key={tpl}
                onClick={() => setResumeTemplate(tpl)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  resumeTemplate === tpl
                    ? 'bg-white dark:bg-[#1f2c48] text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {tpl}
              </button>
            ))}
          </div>

          <button
            onClick={handleUploadResume}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload PDF</span>
          </button>

          <button
            onClick={handleSetDefault}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Set Default</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Two Pane Layout: Form Left + Live A4 Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Pane (5 Cols): Collapsible Accordion Sections */}
        <div className="lg:col-span-5 space-y-3 no-print">
          
          {/* Section: Summary */}
          <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] overflow-hidden shadow-xs">
            <button
              onClick={() => toggleSection('summary')}
              className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white"
            >
              <span>1. Professional Career Summary</span>
              {openSections.summary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.summary && (
              <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-[#24304A]/60">
                <p className="leading-relaxed bg-slate-50 dark:bg-[#141f36] p-3 rounded-xl">
                  {studentProfile.summary}
                </p>
              </div>
            )}
          </div>

          {/* Section: Education */}
          <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] overflow-hidden shadow-xs">
            <button
              onClick={() => toggleSection('education')}
              className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white"
            >
              <span>2. Education & Academic Marks</span>
              {openSections.education ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.education && (
              <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-[#24304A]/60 space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] space-y-1">
                  <strong>Bachelor of Technology ({studentProfile.department})</strong>
                  <p>CGPA: {studentProfile.cgpa} / 10.0 · Batch: {studentProfile.batch}</p>
                  <p className="text-[11px] text-slate-400">Class 12th: {studentProfile.twelfthPercent}% · Class 10th: {studentProfile.tenthPercent}%</p>
                </div>
              </div>
            )}
          </div>

          {/* Section: Skills */}
          <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] overflow-hidden shadow-xs">
            <button
              onClick={() => toggleSection('skills')}
              className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white"
            >
              <span>3. Technical Skills Taxonomy</span>
              {openSections.skills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.skills && (
              <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-[#24304A]/60 space-y-2">
                <p><strong>Languages:</strong> {studentProfile.skills.programming.join(', ')}</p>
                <p><strong>Frameworks:</strong> {studentProfile.skills.frameworks.join(', ')}</p>
                <p><strong>Tools & Cloud:</strong> {studentProfile.skills.tools.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Section: Projects */}
          <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] overflow-hidden shadow-xs">
            <button
              onClick={() => toggleSection('projects')}
              className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white"
            >
              <span>4. Software Projects ({studentProfile.projects.length})</span>
              {openSections.projects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.projects && (
              <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-[#24304A]/60 space-y-2">
                {studentProfile.projects.map(p => (
                  <div key={p.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#141f36]">
                    <strong>{p.title}</strong>
                    <p className="line-clamp-2 mt-0.5 text-[11px]">{p.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Experience & Certifications */}
          <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] overflow-hidden shadow-xs">
            <button
              onClick={() => toggleSection('certifications')}
              className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white"
            >
              <span>5. Certifications & Experience</span>
              {openSections.certifications ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.certifications && (
              <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-[#24304A]/60 space-y-1.5">
                {studentProfile.certifications.map((c, i) => (
                  <p key={i}>• {c}</p>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Pane (7 Cols): A4 Live Resume Preview */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 max-w-2xl mx-auto space-y-5 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-xs">
            
            {/* Header */}
            <div className={`pb-3 ${resumeTemplate === 'classic' ? 'border-b-2 border-slate-900 text-center' : resumeTemplate === 'minimalist' ? 'border-b border-slate-200 text-left' : 'border-b-2 border-blue-600 text-left'}`}>
              <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
                {studentProfile.fullName}
              </h2>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                {studentProfile.department} · Class of {studentProfile.passingYear || 2026}
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 pt-1">
                <span>{studentProfile.email}</span>
                <span>•</span>
                <span>{studentProfile.phone}</span>
                <span>•</span>
                <span>Roll: {studentProfile.rollNo}</span>
                {studentProfile.githubUrl && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600">{studentProfile.githubUrl}</span>
                  </>
                )}
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Summary
              </h3>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {studentProfile.summary}
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Education
              </h3>
              <div className="flex justify-between items-start text-[11px]">
                <div>
                  <strong className="block text-slate-900 font-bold">B.Tech in {studentProfile.department}</strong>
                  <span className="text-slate-600">Institute of Technology & Engineering, New Delhi</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">CGPA: {studentProfile.cgpa} / 10.0</span>
                  <p className="text-slate-500">Graduation 2026</p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Technical Skills
              </h3>
              <div className="space-y-1 text-[11px]">
                <p><strong>Languages:</strong> {studentProfile.skills.programming.join(', ')}</p>
                <p><strong>Frameworks:</strong> {studentProfile.skills.frameworks.join(', ')}</p>
                <p><strong>Tools & Cloud:</strong> {studentProfile.skills.tools.join(', ')}</p>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Selected Engineering Projects
              </h3>
              <div className="space-y-2.5 text-[11px]">
                {studentProfile.projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{proj.title}</span>
                      <span className="text-slate-400 font-normal">{proj.startDate} – {proj.endDate}</span>
                    </div>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{proj.description}</p>
                    <p className="text-slate-500 text-[10px]"><strong>Stack:</strong> {proj.techStack.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Certifications & Achievements
              </h3>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                {studentProfile.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
