import React, { useState } from 'react';
import { MessageSquarePlus, CheckCircle2, ChevronDown, X, Send, Sparkles, HelpCircle } from 'lucide-react';
import { useConsultationStore } from '../../lib/consultationStore';

interface AskQuestionViewProps {
  onNavigate: (route: string) => void;
}

export const AskQuestionView: React.FC<AskQuestionViewProps> = ({ onNavigate }) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [procedure, setProcedure] = useState('Rhinoplasty');
  const [questionText, setQuestionText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const { questions, addQuestion } = useConsultationStore();

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText || !email) return;

    addQuestion({
      authorName: authorName || 'Anonymous Patient',
      email,
      procedure,
      question: questionText
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setQuestionText('');
      setAuthorName('');
      setEmail('');
    }, 2000);
  };

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#F8FAFC]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-[#64748B] flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        <button onClick={() => onNavigate('home')} className="hover:text-[#003366] transition-colors cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#003366] font-semibold">Ask Dr. R. K. Mishra</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block mb-1">
              Direct Surgeon Inquiry
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#003366] tracking-tight">
              Ask Dr. R. K. <span className="italic text-[#00A3E0] font-normal">Mishra</span>
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed pt-1">
              Have clinical questions regarding surgical candidacy, safety protocols, anesthesia, or recovery? Ask directly or read verified responses from Senior Plastic Surgeon Dr. R. K. Mishra.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="btn-navy shrink-0 text-sm font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#00A3E0]" />
            <span>Ask a Question</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-4">
          {questions.map((q) => {
            const isExpanded = expandedQuestion === q.id;
            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#00A3E0]/40 transition-all"
              >
                <div 
                  onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                  className="cursor-pointer flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
                        {q.procedure}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-[#64748B]">Asked by {q.authorName} on {q.date}</span>
                    </div>

                    <h3 className="text-lg font-editorial font-bold text-[#003366]">
                      {q.question}
                    </h3>
                  </div>

                  <div className={`p-1.5 rounded-xl bg-[#F8FAFC] text-[#003366] border border-[#E2E8F0] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* Doctor Answer */}
                {q.answer ? (
                  <div className={`mt-4 pt-4 border-t border-[#E2E8F0] space-y-2.5 ${isExpanded ? 'block' : 'hidden sm:block'}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#003366] text-white text-xs flex items-center justify-center font-editorial font-bold">
                        RM
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#003366] flex items-center gap-2">
                          <span>{q.answeredBy || 'Dr. R. K. Mishra'}</span>
                          <span className="text-[#00A3E0] flex items-center gap-1 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3E0]" /> Senior Plastic Surgeon
                          </span>
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[#475569] leading-relaxed pl-10 font-normal">
                      {q.answer}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-xs text-[#00A3E0] italic">
                    Under clinical evaluation by Dr. R. K. Mishra. Response will appear shortly.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ask Question Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-[#002244]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#003366] mb-1">
              Ask Dr. R. K. Mishra
            </h3>
            <p className="text-xs text-[#64748B] mb-5">
              Submit your inquiry. All questions are treated with absolute medical confidentiality.
            </p>

            {submitSuccess ? (
              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-[#00A3E0]" />
                <p className="text-sm font-bold text-[#003366]">Question Received</p>
                <p className="text-xs text-[#475569]">Dr. Mishra's surgical team will review and reply to your inquiry.</p>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#003366] mb-1">Your Name / Alias</label>
                  <input
                    type="text"
                    placeholder="Leave blank for Anonymous"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#003366] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#003366] mb-1">Procedure Category</label>
                  <select
                    value={procedure}
                    onChange={(e) => setProcedure(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                  >
                    <option value="Rhinoplasty">Rhinoplasty (Nose Surgery)</option>
                    <option value="Gynecomastia">Gynecomastia (Male Chest)</option>
                    <option value="Liposuction">VASER Liposuction</option>
                    <option value="Facelift">Deep-Plane Facelift</option>
                    <option value="Blepharoplasty">Blepharoplasty (Eyelid Surgery)</option>
                    <option value="Breast Surgery">Breast Augmentation / Reduction</option>
                    <option value="Tummy Tuck">Abdominoplasty (Tummy Tuck)</option>
                    <option value="General Plastic Surgery">General Aesthetic / Reconstructive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#003366] mb-1">Your Question *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, concerns, or previous surgical background..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#003366] hover:bg-[#002244] text-white font-bold text-sm shadow-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Question</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
