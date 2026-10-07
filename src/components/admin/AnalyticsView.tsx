import React, { useState } from 'react';
import { 
  BRANCH_WISE_STATS, 
  PACKAGE_TIER_DISTRIBUTION, 
  PLACEMENT_STATS, 
  INITIAL_COMPANIES 
} from '../../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Printer, 
  DollarSign, 
  Building2, 
  GraduationCap, 
  PieChart, 
  Users2,
  Download
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const currentYear = PLACEMENT_STATS[0];
  const [selectedMetric, setSelectedMetric] = useState<'percentage' | 'avgCtc'>('percentage');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Institutional Placement Analytics & Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time hiring metrics, department placement ratios, CTC compensation brackets, and multi-year trends.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="self-start sm:self-auto px-4 py-2 rounded-xl border border-slate-200 dark:border-[#24304A] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Official Report</span>
        </button>
      </div>

      {/* Top High-Level Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Overall Placement Rate
          </span>
          <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            {currentYear.percentagePlaced}%
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {currentYear.totalPlaced} of {currentYear.totalEligible} Students Placed
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Highest CTC Secured
          </span>
          <h3 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {currentYear.highestCtcLpa} LPA
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Google India & Microsoft SDE
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Average Package (CTC)
          </span>
          <h3 className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 mt-1">
            {currentYear.averageCtcLpa} LPA
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Median: {currentYear.medianCtcLpa} LPA
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Recruiting Companies
          </span>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {currentYear.totalCompanies}+
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {currentYear.totalOffers} Total Offers Generated
          </p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Branch-wise Placement & Salary */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Department Placement Performance</span>
            </h3>

            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setSelectedMetric('percentage')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedMetric === 'percentage'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Placement %
              </button>
              <button
                onClick={() => setSelectedMetric('avgCtc')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedMetric === 'avgCtc'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Avg CTC (LPA)
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {BRANCH_WISE_STATS.map(branch => {
              const value = selectedMetric === 'percentage' ? branch.percentage : branch.avgLpa;
              const maxVal = selectedMetric === 'percentage' ? 100 : 25;
              const percentageWidth = (value / maxVal) * 100;

              return (
                <div key={branch.branch} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold">
                    <span>{branch.branch}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedMetric === 'percentage' ? `${branch.percentage}% (${branch.placed}/${branch.eligible})` : `${branch.avgLpa} LPA`}
                    </span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-600 to-indigo-500"
                      style={{ width: `${Math.min(100, percentageWidth)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Package Tier Distribution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <span>Compensation CTC Tier Breakdown</span>
            </h3>
            <span className="text-xs text-slate-400">Total: 538 Placed</span>
          </div>

          <div className="space-y-4 pt-2">
            {PACKAGE_TIER_DISTRIBUTION.map(tier => (
              <div key={tier.tier} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                    <span>{tier.tier}</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {tier.count} Students ({tier.percentage}%)
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${tier.percentage}%`,
                      backgroundColor: tier.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Historical Growth & Recruiters Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Historical Year Comparison Table */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>3-Year Placement Trajectory</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#24304A] text-slate-500 dark:text-slate-400 pb-2">
                  <th className="py-2">Academic Season</th>
                  <th className="py-2">Placement %</th>
                  <th className="py-2">Average CTC</th>
                  <th className="py-2">Highest CTC</th>
                  <th className="py-2">Offers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#24304A]">
                {PLACEMENT_STATS.map(stat => (
                  <tr key={stat.academicYear} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 font-semibold text-slate-800 dark:text-slate-200">{stat.academicYear}</td>
                    <td className="py-2.5 font-bold text-blue-600 dark:text-blue-400">{stat.percentagePlaced}%</td>
                    <td className="py-2.5 text-slate-700 dark:text-slate-300">{stat.averageCtcLpa} LPA</td>
                    <td className="py-2.5 font-bold text-emerald-600">{stat.highestCtcLpa} LPA</td>
                    <td className="py-2.5 text-slate-700 dark:text-slate-300">{stat.totalOffers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Star Recruiting Partners</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            {INITIAL_COMPANIES.slice(0, 5).map(comp => (
              <div
                key={comp.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141f36] border border-slate-100 dark:border-[#24304A] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <img src={comp.logo} alt={comp.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{comp.name}</h5>
                    <span className="text-[11px] text-slate-400">{comp.industry}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{comp.highestPackage}</span>
                  <span className="text-[11px] text-slate-400">{comp.totalHired} Campus Hires</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
