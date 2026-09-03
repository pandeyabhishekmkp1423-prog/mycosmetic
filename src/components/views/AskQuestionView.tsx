import React, { useState } from 'react';
import { HelpCircle, MessageSquarePlus, CheckCircle2, User, Sparkles, Send, ShieldCheck, ChevronDown } from 'lucide-react';
import { useConsultationStore } from '../../lib/consultationStore';
import { doctorData } from '../../data/doctorData';

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
    <div id="ask-question-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#102A43]">Home</button>
        <span>/</span>
        <span className="text-[#102A43] font-semibold">Ask a Cosmetic Surgeon</span>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1769AA] block">
              Doctor Q&A Community
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102A43] tracking-tight">
              Ask Dr. R. K. Mishra Online
            </h1>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              Have clinical doubts about surgical techniques, anesthesia, scars, or recovery? Submit your question directly to Senior Plastic Surgeon Dr. R. K. Mishra or browse answered medical inquiries.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-6 py-3.5 bg-[#102A43] hover:bg-[#1769AA] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C89448]" />
            <span>Ask Your Question</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {questions.map((q) => {
            const isExpanded = expandedQuestion === q.id;
            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-[#DCE7F0] p-6 shadow-xs hover:border-[#1769AA]/50 transition-colors"
              >
                <div 
                  onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                  className="cursor-pointer flex items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 bg-[#F6FAFD] text-[#1769AA] font-bold uppercase rounded-md border border-[#DCE7F0]">
                        {q.procedure}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">Asked by {q.authorName} on {q.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#102A43]">
                      {q.question}
                    </h3>
                  </div>

                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-[#1769AA]' : ''}`} />
                </div>

                {/* Doctor Answer Container */}
                {q.answer ? (
                  <div className={`mt-4 pt-4 border-t border-[#DCE7F0] space-y-3 ${isExpanded ? 'block' : 'hidden sm:block'}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#102A43] text-[#C89448] text-xs flex items-center justify-center font-serif font-bold">
                        RM
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#102A43]">{q.answeredBy || 'Dr. R. K. Mishra'}</p>
                        <p className="text-[10px] text-gray-400">Senior Plastic Surgeon • Answered on {q.answerDate || q.date}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-9">
                      {q.answer}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 pt-3 border-t border-[#DCE7F0] text-xs text-[#1769AA] italic flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Under clinical review by Dr. R. K. Mishra. Answer will appear shortly.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ask Question Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#DCE7F0] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <h3 className="text-xl font-serif font-bold text-[#102A43] mb-1">
              Ask Dr. R. K. Mishra
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Submit your question for professional clinical insight. Questions are moderated for patient privacy.
            </p>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
                <p className="text-sm font-bold">Question Submitted!</p>
                <p className="text-xs">Dr. Mishra’s medical team will review and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Name / Alias</label>
                  <input
                    type="text"
                    placeholder="Leave blank for Anonymous"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-2.5 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address (for notification) *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Procedure Category</label>
                  <select
                    value={procedure}
                    onChange={(e) => setProcedure(e.target.value)}
                    className="w-full p-2.5 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  >
                    <option value="Rhinoplasty">Rhinoplasty</option>
                    <option value="Gynecomastia">Gynecomastia</option>
                    <option value="Liposuction">Liposuction</option>
                    <option value="Blepharoplasty">Blepharoplasty</option>
                    <option value="Breast Augmentation">Breast Augmentation</option>
                    <option value="Tummy Tuck">Tummy Tuck</option>
                    <option value="Hair Transplant">Hair Transplant</option>
                    <option value="Scar Revision">Scar Revision</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Question *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="What specific doubt or question do you have for the surgeon?"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full p-2.5 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl focus:outline-hidden focus:border-[#1769AA]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCE7F0]">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#102A43] hover:bg-[#1769AA] text-white font-bold rounded-xl transition-colors"
                  >
                    Submit Question
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
