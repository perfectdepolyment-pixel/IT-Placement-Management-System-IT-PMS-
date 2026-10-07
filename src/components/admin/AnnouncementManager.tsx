import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Pin, 
  Plus, 
  Trash2, 
  Search, 
  AlertTriangle, 
  Megaphone, 
  CheckCircle2, 
  Users, 
  X
} from 'lucide-react';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { EmptyState } from '../common/EmptyState';

export const AnnouncementManager: React.FC = () => {
  const { 
    announcements, 
    addAnnouncement, 
    deleteAnnouncement, 
    togglePinAnnouncement,
    currentUser,
    currentRole 
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'urgent' | 'drive_update' | 'general' | 'result'>('general');
  const [targetAudience, setTargetAudience] = useState<'all' | 'students' | 'recruiters'>('all');
  const [pinned, setPinned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title,
      content,
      type,
      targetAudience,
      authorName: currentUser?.name || 'Dr. V. K. Raman',
      authorRole: currentUser?.designation || 'Placement Director',
      pinned,
    });

    setTitle('');
    setContent('');
    setIsModalOpen(false);
  };

  const filteredAnnouncements = announcements.filter(ann => {
    if (typeFilter !== 'all' && ann.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!ann.title.toLowerCase().includes(q) && !ann.content.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Placement Cell Notice Board & Circulars
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Broadcast official circulars, drive dates, shortlisted notices, and test instructions.
          </p>
        </div>

        {currentRole === 'admin' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Notice</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices and circulars..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white text-xs w-full sm:w-auto"
          >
            <option value="all">All Notice Types</option>
            <option value="urgent">Urgent Alerts</option>
            <option value="drive_update">Drive Updates</option>
            <option value="result">Offer Results</option>
            <option value="general">General Circulars</option>
          </select>
        </div>
      </div>

      {/* Notices List */}
      {filteredAnnouncements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No circular notices found"
          description="There are currently no circulars matching your active filter or search query. Try clearing filters or checking other categories."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setTypeFilter('all');
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map(ann => {
          let badgeColor = 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
          if (ann.type === 'urgent') badgeColor = 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
          if (ann.type === 'result') badgeColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
          if (ann.type === 'drive_update') badgeColor = 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300';

          return (
            <div
              key={ann.id}
              className={`p-5 rounded-2xl bg-white dark:bg-[#111A2E] border shadow-xs transition-all space-y-3 ${
                ann.pinned
                  ? 'border-blue-300 dark:border-blue-900 ring-1 ring-blue-500/20'
                  : 'border-slate-200/80 dark:border-[#24304A]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 shrink-0 mt-0.5">
                    {ann.type === 'urgent' ? (
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                    ) : (
                      <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {ann.title}
                      </h4>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${badgeColor}`}>
                        {ann.type.replace('_', ' ')}
                      </span>
                      {ann.pinned && (
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <Pin className="w-3 h-3 fill-current" /> Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Published by {ann.authorName} ({ann.authorRole}) · {ann.createdAt}
                    </p>
                  </div>
                </div>

                {currentRole === 'admin' && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => togglePinAnnouncement(ann.id)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      title={ann.pinned ? 'Unpin' : 'Pin to top'}
                    >
                      <Pin className={`w-4 h-4 ${ann.pinned ? 'fill-blue-600 text-blue-600' : ''}`} />
                    </button>
                    <button
                      onClick={() => setAnnouncementToDelete(ann.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete notice"
                      aria-label="Delete circular notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-12">
                {ann.content}
              </p>
            </div>
          );
        })}
      </div>
      )}

      {/* Modal: Publish Notice */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#111A2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#24304A] overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-[#24304A] flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Create Official Announcement
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Circular Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule Update: Coding Round 2 Postponed"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="general">General Circular</option>
                    <option value="urgent">Urgent Alert</option>
                    <option value="drive_update">Drive Update</option>
                    <option value="result">Offer Results</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={targetAudience}
                    onChange={e => setTargetAudience(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="all">Entire Campus (All)</option>
                    <option value="students">Students Only</option>
                    <option value="recruiters">Recruiters Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Notice Details & Instructions
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type clear instructions, venue details, or reporting timings..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white leading-relaxed"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={e => setPinned(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Pin notice to the top of student dashboards</span>
              </label>

              <div className="pt-3 border-t border-slate-100 dark:border-[#24304A] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Notice Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!announcementToDelete}
        onConfirm={() => {
          if (announcementToDelete) {
            deleteAnnouncement(announcementToDelete);
            setAnnouncementToDelete(null);
          }
        }}
        onCancel={() => setAnnouncementToDelete(null)}
        title="Delete Official Circular"
        message="Are you sure you want to permanently delete this announcement? This action is irreversible and the notice will be immediately removed from all student and recruiter notice boards."
        confirmLabel="Delete Notice"
        cancelLabel="Cancel"
        isDestructive={true}
        type="delete"
      />
    </div>
  );
};
