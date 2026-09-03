import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  HelpCircle, 
  Star, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Download, 
  RefreshCw,
  Search,
  MessageSquare,
  ShieldCheck,
  Building2,
  Trash2
} from 'lucide-react';
import { useConsultationStore } from '../../lib/consultationStore';

interface AdminDashboardViewProps {
  onNavigate: (route: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'LEADS' | 'QUESTIONS' | 'REVIEWS'>('LEADS');
  const [leadSearch, setLeadSearch] = useState('');
  const [answerModalId, setAnswerModalId] = useState<string | null>(null);
  const [answerDraft, setAnswerDraft] = useState('');

  const { 
    leads, 
    updateLeadStatus, 
    deleteLead,
    questions, 
    answerQuestion, 
    reviews, 
    addReview 
  } = useConsultationStore();

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
    l.phone.includes(leadSearch) ||
    l.procedure.toLowerCase().includes(leadSearch.toLowerCase())
  );

  const handleAnswerSubmit = (qId: string) => {
    if (!answerDraft.trim()) return;
    answerQuestion(qId, answerDraft, 'Dr. R. K. Mishra (Senior Plastic Surgeon)');
    setAnswerDraft('');
    setAnswerModalId(null);
  };

  const exportLeadsToJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mycosmeticsurgery_leads_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="admin-dashboard-page" className="pt-24 pb-20 bg-[#F6FAFD]">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DCE7F0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#102A43] text-white text-[10px] font-mono uppercase rounded-md">
                Clinic Admin CMS
              </span>
              <span className="text-xs text-gray-500">SIPS Hospital Lucknow</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#102A43] mt-1">
              Clinic Operations & Patient Desk
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportLeadsToJSON}
              className="px-4 py-2 bg-white hover:bg-[#F6FAFD] text-[#102A43] border border-[#DCE7F0] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#1769AA]" />
              <span>Export Leads Data</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 bg-[#102A43] text-white text-xs font-semibold rounded-xl hover:bg-[#1769AA] transition-colors"
            >
              Exit to Website
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 pt-6">
          <button
            onClick={() => setActiveTab('LEADS')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'LEADS'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-[#F6FAFD] border border-[#DCE7F0]'
            }`}
          >
            <Users className="w-4 h-4 text-[#C89448]" />
            <span>Consultation Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('QUESTIONS')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'QUESTIONS'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-[#F6FAFD] border border-[#DCE7F0]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#C89448]" />
            <span>Patient Q&A Inbox ({questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'REVIEWS'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-[#F6FAFD] border border-[#DCE7F0]'
            }`}
          >
            <Star className="w-4 h-4 text-[#C89448]" />
            <span>Reviews Moderation ({reviews.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* TAB 1: CONSULTATION LEADS */}
        {activeTab === 'LEADS' && (
          <div className="space-y-6">
            
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-2xl border border-[#DCE7F0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patient name, phone, procedure..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl text-xs focus:outline-hidden focus:border-[#1769AA]"
                />
              </div>
              <p className="text-xs text-gray-500">
                Showing {filteredLeads.length} of {leads.length} recorded leads
              </p>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-3xl border border-[#DCE7F0] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F6FAFD] border-b border-[#DCE7F0] text-gray-500 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Patient Info</th>
                      <th className="py-3 px-4">Procedure</th>
                      <th className="py-3 px-4">Type & Preferred Slot</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date Logged</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7F0]">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#F6FAFD]/60 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-[#102A43]">{lead.name}</p>
                          <div className="flex items-center gap-2 text-gray-500 text-[11px] mt-0.5">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#1769AA]" /> {lead.phone}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-gray-400" /> {lead.email}</span>
                          </div>
                          {lead.city && <p className="text-[10px] text-gray-400">City: {lead.city}</p>}
                        </td>

                        <td className="py-3 px-4 font-semibold text-[#1769AA]">
                          {lead.procedure}
                        </td>

                        <td className="py-3 px-4 text-gray-700">
                          <span className="px-2 py-0.5 bg-[#F6FAFD] rounded text-[10px] font-bold uppercase border border-[#DCE7F0]">
                            {lead.consultationType === 'IN_PERSON' ? 'In-Person OPD' : 'Virtual Call'}
                          </span>
                          <p className="text-[11px] text-gray-500 mt-1">{lead.preferredDate}</p>
                          <p className="text-[10px] text-gray-400">{lead.timeSlot}</p>
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className={`p-1.5 rounded-lg text-xs font-bold border focus:outline-hidden ${
                              lead.status === 'PENDING' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                              lead.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                              lead.status === 'COMPLETED' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                              'bg-gray-100 text-gray-700 border-gray-300'
                            }`}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-gray-500 text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, this is SIPS Hospital Lucknow regarding your consultation for ${lead.procedure} with Dr. R. K. Mishra.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg"
                              title="Message Patient on WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: QUESTIONS INBOX */}
        {activeTab === 'QUESTIONS' && (
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="p-6 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-[#F6FAFD] text-[#1769AA] text-xs font-bold uppercase rounded border border-[#DCE7F0]">
                    {q.procedure}
                  </span>
                  <span className="text-xs text-gray-400">{q.date}</span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#102A43]">
                  {q.question}
                </h3>
                <p className="text-xs text-gray-500">From: {q.authorName} ({q.email})</p>

                {q.answer ? (
                  <div className="p-4 rounded-xl bg-[#F6FAFD] border border-[#DCE7F0] text-xs text-gray-700 space-y-1">
                    <p className="font-bold text-[#102A43]">Answered by: {q.answeredBy}</p>
                    <p>{q.answer}</p>
                  </div>
                ) : (
                  <div className="pt-2">
                    {answerModalId === q.id ? (
                      <div className="space-y-3">
                        <textarea
                          rows={3}
                          placeholder="Type Dr. Mishra's surgical answer..."
                          value={answerDraft}
                          onChange={(e) => setAnswerDraft(e.target.value)}
                          className="w-full p-3 bg-[#F6FAFD] border border-[#DCE7F0] rounded-xl text-xs focus:outline-hidden focus:border-[#1769AA]"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAnswerSubmit(q.id)}
                            className="px-4 py-2 bg-[#102A43] text-white text-xs font-bold rounded-lg"
                          >
                            Publish Doctor Answer
                          </button>
                          <button
                            onClick={() => { setAnswerModalId(null); setAnswerDraft(''); }}
                            className="px-3 py-2 text-xs text-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAnswerModalId(q.id)}
                        className="px-4 py-2 bg-[#F6FAFD] hover:bg-[#E7F2F8] text-[#102A43] border border-[#DCE7F0] text-xs font-semibold rounded-lg"
                      >
                        Reply & Publish Answer
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: REVIEWS MODERATION */}
        {activeTab === 'REVIEWS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-white border border-[#DCE7F0] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C89448]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#102A43]">{rev.title}</h4>
                <p className="text-xs text-gray-600">"{rev.content}"</p>
                <div className="pt-2 border-t border-[#DCE7F0] flex items-center justify-between text-xs text-gray-500">
                  <span>{rev.author} ({rev.procedure})</span>
                  <span className="text-emerald-700 font-semibold">Published</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
