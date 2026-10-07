import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  HelpCircle,
  Building2
} from 'lucide-react';
import { FAQ_ITEMS } from '../../data/mockData';

export const ContactPage: React.FC = () => {
  const { navigate, showToast } = useApp();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Campus Recruitment Drive Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqCategory, setFaqCategory] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast({
        type: 'success',
        title: 'Message Sent Successfully',
        message: 'The Placement Secretariat will reply to your email within 24 business hours.',
      });
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  const filteredFaqs = FAQ_ITEMS.filter(f => {
    if (faqCategory === 'all') return true;
    return f.category === faqCategory;
  });

  return (
    <div className="space-y-16 animate-in fade-in">
      
      {/* Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg space-y-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400 font-semibold">Contact TPO</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Contact Training & Placement Directorate
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Have queries regarding drive schedules, corporate partnerships, student verification, or portal access? Our team is available 6 days a week to support you.
        </p>
      </section>

      {/* 4.1.5 Two Columns Section: Left Form + Right Office Coordinates */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send an Official Inquiry</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Fill in your details below and our placement secretariat will respond promptly.
            </p>
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>Thank you! Your inquiry has been logged. We will get back to you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe / HR Lead"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Inquiry Subject *
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white"
              >
                <option value="Campus Recruitment Drive Inquiry">Corporate Drive Slot Booking</option>
                <option value="Student Verification & CGPA Query">Student Profile & Academic Verification</option>
                <option value="Pre-Placement Talk (PPT) Auditorium Booking">Auditorium / Lab Booking Request</option>
                <option value="Technical Portal Support">IT-PMS Portal Technical Support</option>
                <option value="Other Inquiries">Other Matters</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Message / Query *
              </label>
              <textarea
                rows={5}
                required
                placeholder="State your question, requested campus drive dates, or student roll numbers..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#141f36] border border-slate-200 dark:border-[#24304A] rounded-xl text-slate-900 dark:text-white leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
            </button>
          </form>
        </div>

        {/* Right: Office Coordinates & Map representation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Directorate Coordinates</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Campus Address</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Training & Placement Directorate, Floor 2, Administrative Block, Central University Campus, New Delhi 110025, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Telephone & Hotlines</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    TPO Direct: +91 94250 88990<br />
                    Helpdesk: +91 11 2690 7400
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Official Correspondence</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    tpo.director@college.edu<br />
                    placements@college.edu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold">Office Working Hours</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Monday – Saturday: 09:00 AM – 06:00 PM IST<br />
                    (Extended hours during active placement drives)
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Campus Map Embed Representation */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-[#24304A] bg-slate-100 dark:bg-[#141f36] p-4 text-center space-y-2">
              <div className="h-32 rounded-xl bg-gradient-to-tr from-blue-900/20 via-indigo-900/30 to-violet-900/20 flex flex-col items-center justify-center p-4">
                <Building2 className="w-8 h-8 text-blue-600 mb-1" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Central Campus Placement Complex</span>
                <span className="text-[11px] text-slate-500">Opposite Central Library & Computing Labs</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* FAQ Accordion Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Frequently Asked Questions</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Got Questions? We’ve Got Answers</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Common questions about campus drives, eligibility calculation, and recruiter workflows.</p>
        </div>

        {/* Category filter pills */}
        <div className="flex items-center justify-center gap-2">
          {['all', 'Students', 'Recruiters', 'Policies'].map(cat => (
            <button
              key={cat}
              onClick={() => setFaqCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                faqCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#111A2E] border border-slate-200 dark:border-[#24304A] text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-[#24304A] overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#24304A]/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
