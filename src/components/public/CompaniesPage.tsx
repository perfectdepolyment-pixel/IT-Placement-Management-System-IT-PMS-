import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Users2, 
  Briefcase, 
  X, 
  CheckCircle2, 
  Calendar,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Company } from '../../types';

export const CompaniesPage: React.FC = () => {
  const { companies, drives, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return companies.filter(c => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.industry.toLowerCase().includes(q)) {
          return false;
        }
      }

      if (selectedIndustry !== 'all' && !c.industry.toLowerCase().includes(selectedIndustry.toLowerCase())) {
        return false;
      }

      if (selectedLocation !== 'all' && !c.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      if (selectedTier !== 'all' && c.tier !== selectedTier) {
        return false;
      }

      return true;
    });
  }, [companies, searchQuery, selectedIndustry, selectedLocation, selectedTier]);

  const totalPages = Math.ceil(filteredCompanies.length / pageSize) || 1;
  const paginatedCompanies = filteredCompanies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-12 animate-in fade-in">
      
      {/* 4.1.3 Banner with title */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-violet-950 to-slate-900 text-white shadow-lg space-y-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-violet-400 font-semibold">Recruiting Companies</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Partner Companies & Recruiters
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Explore global technology organizations that recruit from our campus. Review historical hiring packages, open positions, and campus engagement records.
        </p>
      </section>

      {/* Search and Filters Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company or industry..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          {/* Industry */}
          <div>
            <select
              value={selectedIndustry}
              onChange={e => { setSelectedIndustry(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Industries</option>
              <option value="Software">Software & Cloud Services</option>
              <option value="AI">Search, AI & Enterprise</option>
              <option value="Cloud">Cloud Computing & E-Commerce</option>
              <option value="Collaboration">Collaboration Software</option>
              <option value="Networking">Networking & Cybersecurity</option>
              <option value="Consulting">Technology Consulting</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <select
              value={selectedLocation}
              onChange={e => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Hiring Locations</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Noida">Noida</option>
              <option value="Chennai">Chennai</option>
              <option value="Remote">Remote First</option>
            </select>
          </div>

          {/* Package Tier */}
          <div>
            <select
              value={selectedTier}
              onChange={e => { setSelectedTier(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
            >
              <option value="all">All Compensation Tiers</option>
              <option value="Dream">Dream Tier (&gt; 35 LPA)</option>
              <option value="Tier-1">Tier-1 (15 - 35 LPA)</option>
              <option value="Tier-2">Tier-2 (8 - 15 LPA)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Found <strong>{filteredCompanies.length}</strong> partner companies</span>
          {(searchQuery || selectedIndustry !== 'all' || selectedLocation !== 'all' || selectedTier !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedIndustry('all');
                setSelectedLocation('all');
                setSelectedTier('all');
                setCurrentPage(1);
              }}
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Company Grid (card: logo, name, industry, roles hiring, "View Profile") */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCompanies.map(company => {
          const activeDrives = drives.filter(d => d.companyId === company.id);

          return (
            <div
              key={company.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                    {company.tier}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{company.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{company.industry}</p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {company.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#24304A] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peak Package:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{company.highestPackage}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Hires:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{company.totalHired} Students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Campus Drives:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{activeDrives.length} Open Now</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCompany(company)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors text-center"
                >
                  View Profile
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold"
                >
                  Apply
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#24304A] text-xs font-semibold disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#24304A] text-xs font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#111A2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-[#24304A] flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-[#141f36]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                  <img src={selectedCompany.logo} alt={selectedCompany.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedCompany.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                      {selectedCompany.tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selectedCompany.industry} · {selectedCompany.location}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* About */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 text-sm">About the Organization</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedCompany.aboutLong || selectedCompany.description}
                </p>
                {selectedCompany.website && (
                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-semibold mt-2"
                  >
                    <span>Visit Careers Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Roles Offered */}
              {selectedCompany.rolesOffered && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Campus Profiles & Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.rolesOffered.map((role, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] text-slate-800 dark:text-slate-200 font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Hiring Track Record */}
              {selectedCompany.pastHiringStats && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Historical Recruitment Track Record</h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#24304A]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 dark:bg-[#141f36] text-slate-500 font-semibold border-b border-slate-200 dark:border-[#24304A]">
                        <tr>
                          <th className="py-2.5 px-3">Academic Year</th>
                          <th className="py-2.5 px-3">Students Hired</th>
                          <th className="py-2.5 px-3">Average Package</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-[#24304A]">
                        {selectedCompany.pastHiringStats.map((stat, i) => (
                          <tr key={i}>
                            <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{stat.year} Season</td>
                            <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{stat.count} Hires</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{stat.avgPackage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* HR Contacts */}
              {selectedCompany.hrContact && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A]">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">University Relations Contact</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Coordinator: <strong>{selectedCompany.hrContact.name}</strong> · Email: {selectedCompany.hrContact.email}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-[#24304A] flex justify-end gap-2">
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => { setSelectedCompany(null); navigate('/login'); }}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold"
              >
                Apply for Open Drives
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
