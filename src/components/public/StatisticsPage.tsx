import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Award, 
  PieChart, 
  Calendar,
  ChevronRight,
  Download,
  Printer
} from 'lucide-react';
import { 
  PLACEMENT_STATS, 
  BRANCH_WISE_STATS, 
  PACKAGE_TIER_DISTRIBUTION, 
  TOP_OFFERS 
} from '../../data/mockData';

export const StatisticsPage: React.FC = () => {
  const { navigate } = useApp();
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  const selectedYear = PLACEMENT_STATS[selectedYearIndex];

  return (
    <div className="space-y-12 animate-in fade-in">
      
      {/* 4.1.4 Banner and year selector dropdown */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-lg space-y-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400 font-semibold">Placement Statistics</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Placement Statistics & Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
              Official institutional placement records, branch-wise placement percentages, CTC compensation brackets, and multi-year recruitment audit figures.
            </p>
          </div>

          {/* Year selector dropdown */}
          <div className="self-start md:self-auto flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            <Calendar className="w-4 h-4 text-blue-300 ml-2" />
            <select
              value={selectedYearIndex}
              onChange={e => setSelectedYearIndex(parseInt(e.target.value))}
              className="bg-transparent text-white text-xs font-semibold px-2 py-1 focus:outline-hidden cursor-pointer"
            >
              {PLACEMENT_STATS.map((stat, idx) => (
                <option key={stat.academicYear} value={idx} className="text-slate-900 bg-white">
                  Academic Season: {stat.academicYear}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Key stat cards (Placed %, Average package, Highest package, Companies visited) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Placement Rate</span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">{selectedYear.percentagePlaced}%</h3>
          <p className="text-[11px] text-slate-400">{selectedYear.totalPlaced} of {selectedYear.totalEligible} Placed</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Average Package</span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-violet-600 dark:text-violet-400">{selectedYear.averageCtcLpa} LPA</h3>
          <p className="text-[11px] text-slate-400">Median: {selectedYear.medianCtcLpa} LPA</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Highest Package</span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{selectedYear.highestCtcLpa} LPA</h3>
          <p className="text-[11px] text-slate-400">Dream Tier Offers</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Companies Visited</span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{selectedYear.totalCompanies}+</h3>
          <p className="text-[11px] text-slate-400">{selectedYear.totalOffers} Total Offers Extended</p>
        </div>
      </div>

      {/* Charts Section: Bar (department-wise), Line (year-wise trend), Donut (package ranges) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart: Department-wise Placements */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Department Placements</span>
            </h3>
            <span className="text-[11px] text-slate-400">Success %</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {BRANCH_WISE_STATS.map(branch => (
              <div key={branch.branch} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{branch.branch}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{branch.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    style={{ width: `${branch.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart / Trajectory: 3-Year Comparison */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Year-wise Average CTC</span>
            </h3>
            <span className="text-[11px] text-slate-400">Growth</span>
          </div>

          <div className="space-y-4 pt-2">
            {PLACEMENT_STATS.map(stat => (
              <div key={stat.academicYear} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{stat.academicYear}</span>
                  <span className="font-bold text-emerald-600">{stat.averageCtcLpa} LPA</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500"
                    style={{ width: `${(stat.averageCtcLpa / 20) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donut / Package Range Distribution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-violet-600" />
              <span>Package Brackets</span>
            </h3>
            <span className="text-[11px] text-slate-400">Share %</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {PACKAGE_TIER_DISTRIBUTION.map(tier => (
              <div key={tier.tier} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                    <span>{tier.tier}</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{tier.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${tier.percentage}%`, backgroundColor: tier.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Table of Top Offers (company, role, package, students selected) */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Major Campus Placement Offers Overview
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-[#24304A] bg-white dark:bg-[#111A2E] shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#141f36] border-b border-slate-200 dark:border-[#24304A] text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Recruiting Company</th>
                <th className="py-3.5 px-4">Role Offered</th>
                <th className="py-3.5 px-4">Compensation (CTC)</th>
                <th className="py-3.5 px-4">Offers Extended</th>
                <th className="py-3.5 px-4">Category Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#24304A]">
              {TOP_OFFERS.map(offer => (
                <tr key={offer.company} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{offer.company}</td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">{offer.role}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">{offer.package}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{offer.selectedCount} Students</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold text-[10px]">
                      {offer.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
