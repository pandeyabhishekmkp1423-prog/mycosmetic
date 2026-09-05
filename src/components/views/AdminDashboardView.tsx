import React, { useState } from 'react';
import { 
  Users, 
  HelpCircle, 
  Star, 
  Phone, 
  Mail, 
  Download, 
  Search, 
  Trash2,
  ShieldCheck
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
    reviews 
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
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#003366] text-white text-[10px] font-bold uppercase rounded-md">
                Clinic Admin Desk
              </span>
              <span className="text-xs text-[#64748B]">SIPS Super Specialty Hospital, Lucknow</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#003366] mt-1">
              Clinic Operations & Patient Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportLeadsToJSON}
              className="px-3.5 py-2 bg-white text-[#003366] border border-[#E2E8F0] text-xs font-semibold rounded-xl flex items-center gap-1.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Export Leads</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="btn-navy"
            >
              Exit to Website
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 pt-6">
          <button
            onClick={() => setActiveTab('LEADS')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'LEADS'
                ? 'bg-[#003366] text-white shadow-sm'
                : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Consultation Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('QUESTIONS')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'QUESTIONS'
                ? 'bg-[#003366] text-white shadow-sm'
                : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Patient Q&A ({questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'REVIEWS'
                ? 'bg-[#003366] text-white shadow-sm'
                : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Reviews Moderation ({reviews.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        
        {/* TAB 1: CONSULTATION LEADS */}
        {activeTab === 'LEADS' && (
          <div className="space-y-4">
            
            <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 text-[#00A3E0] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patient name, phone, procedure..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#1E293B] focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                />
              </div>
              <p className="text-xs text-[#64748B]">
                Showing <strong className="text-[#003366]">{filteredLeads.length}</strong> of {leads.length} recorded leads
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Patient Info</th>
                      <th className="py-3 px-4">Procedure</th>
                      <th className="py-3 px-4">Slot</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date Logged</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-[#003366]">{lead.name}</p>
                          <div className="flex items-center gap-2 text-[#64748B] text-[11px] mt-0.5">
                            <span className="flex items-center gap-1 font-medium"><Phone className="w-3 h-3 text-[#003366]" /> {lead.phone}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#64748B]" /> {lead.email}</span>
                          </div>
                          {lead.city && <p className="text-[10px] text-[#64748B]">City: {lead.city}</p>}
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-[#003366]">
                          {lead.procedure}
                        </td>

                        <td className="py-3.5 px-4 text-[#475569]">
                          <span className="px-2 py-0.5 bg-[#00A3E0]/10 text-[#003366] rounded-md text-[10px] font-bold uppercase border border-[#00A3E0]/20">
                            {lead.consultationType === 'IN_PERSON' ? 'In-Person' : 'Virtual'}
                          </span>
                          <p className="text-[11px] text-[#64748B] mt-1">{lead.preferredDate}</p>
                          <p className="text-[10px] text-[#64748B]">{lead.timeSlot}</p>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className={`p-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
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

                        <td className="py-3.5 px-4 text-[#64748B] text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, this is SIPS Hospital Lucknow regarding your consultation for ${lead.procedure} with Dr. R. K. Mishra.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Message Patient on WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
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
              <div key={q.id} className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-[#00A3E0]/10 text-[#003366] text-xs font-bold uppercase rounded-md border border-[#00A3E0]/20">
                    {q.procedure}
                  </span>
                  <span className="text-xs text-[#64748B]">{q.date}</span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#003366]">
                  {q.question}
                </h3>
                <p className="text-xs text-[#64748B]">From: {q.authorName} ({q.email})</p>

                {q.answer ? (
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] space-y-1.5">
                    <p className="font-bold text-[#003366]">Answered by: {q.answeredBy}</p>
                    <p>{q.answer}</p>
                  </div>
                ) : (
                  <div className="pt-2">
                    {answerModalId === q.id ? (
                      <div className="space-y-2.5">
                        <textarea
                          rows={3}
                          placeholder="Type Dr. Mishra's clinical answer..."
                          value={answerDraft}
                          onChange={(e) => setAnswerDraft(e.target.value)}
                          className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAnswerSubmit(q.id)}
                            className="btn-crimson text-xs py-1.5 px-3"
                          >
                            Publish Answer
                          </button>
                          <button
                            onClick={() => { setAnswerModalId(null); setAnswerDraft(''); }}
                            className="px-3 py-1.5 text-xs text-[#64748B] hover:text-[#1E293B] cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAnswerModalId(q.id)}
                        className="px-3.5 py-1.5 bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#003366] border border-[#E2E8F0] text-xs font-semibold rounded-xl cursor-pointer transition-colors"
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
              <div key={rev.id} className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#64748B]">{rev.date}</span>
                </div>
                <h4 className="font-bold text-sm text-[#003366]">{rev.title}</h4>
                <p className="text-xs text-[#475569]">"{rev.content}"</p>
                <div className="pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                  <span>{rev.author} ({rev.procedure})</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Published
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
