import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  HelpCircle, 
  Star, 
  Phone, 
  Mail, 
  Download, 
  Search, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  MessageCircle,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { useConsultationStore } from '../../lib/consultationStore';

interface AdminDashboardViewProps {
  onNavigate: (route: string) => void;
}

export interface LiveDbLead {
  id: number | string;
  reference_id: string;
  name: string;
  phone: string;
  email: string | null;
  procedure_name: string;
  consultation_type: string;
  preferred_date: string | null;
  preferred_time: string | null;
  city: string | null;
  message: string | null;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Completed' | 'Cancelled';
  ip_address?: string;
  created_at: string;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'LEADS' | 'QUESTIONS' | 'REVIEWS'>('LEADS');
  const [leadSearch, setLeadSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [procedureFilter, setProcedureFilter] = useState<string>('ALL');
  const [dateFilter, setDateFilter] = useState<'ALL' | 'TODAY' | 'WEEK' | 'MONTH'>('ALL');
  
  // Live DB State
  const [liveLeads, setLiveLeads] = useState<LiveDbLead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [apiMetrics, setApiMetrics] = useState<{ total: number; today: number; new: number; scheduled: number; completed: number } | null>(null);
  
  // Selected lead for Full Details Modal
  const [selectedLead, setSelectedLead] = useState<LiveDbLead | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<LiveDbLead | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local Store Fallback
  const { 
    leads: localLeads, 
    updateLeadStatus: updateLocalStatus, 
    deleteLead: deleteLocalLead, 
    questions, 
    answerQuestion, 
    reviews 
  } = useConsultationStore();

  const [answerModalId, setAnswerModalId] = useState<string | null>(null);
  const [answerDraft, setAnswerDraft] = useState('');

  // Fetch leads from MySQL Backend API
  const fetchLeadsFromApi = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/admin_api.php?action=get_leads', {
        headers: { 'Accept': 'application/json' }
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success && Array.isArray(data.leads)) {
        setLiveLeads(data.leads);
        setDbConnected(true);
        if (data.metrics) {
          setApiMetrics(data.metrics);
        }
      } else {
        // Fallback to local leads
        setDbConnected(false);
      }
    } catch {
      setDbConnected(false);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeadsFromApi();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Harmonize leads: use live MySQL leads if available, else convert local leads
  const combinedLeads: LiveDbLead[] = useMemo(() => {
    if (liveLeads && liveLeads.length > 0) {
      return liveLeads;
    }
    // Transform local leads to match interface
    return localLeads.map((l) => ({
      id: l.id,
      reference_id: l.id.startsWith('SIPS') ? l.id : `SIPS-${l.id}`,
      name: l.name,
      phone: l.phone.replace(/\D/g, ''),
      email: l.email || null,
      procedure_name: l.procedure,
      consultation_type: l.consultationType === 'IN_PERSON' ? 'In-Person (SIPS Hospital)' : 'Virtual Consultation',
      preferred_date: l.preferredDate,
      preferred_time: l.timeSlot,
      city: l.city || 'Lucknow',
      message: l.notes || null,
      status: (l.status === 'PENDING' ? 'New' : l.status === 'CONFIRMED' ? 'Scheduled' : l.status === 'COMPLETED' ? 'Completed' : 'Cancelled') as any,
      created_at: l.createdAt || new Date().toISOString()
    }));
  }, [liveLeads, localLeads]);

  // Distinct procedures for filter
  const availableProcedures = useMemo(() => {
    const set = new Set<string>();
    combinedLeads.forEach(l => {
      if (l.procedure_name) set.add(l.procedure_name);
    });
    return Array.from(set);
  }, [combinedLeads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return combinedLeads.filter((l) => {
      // Search
      const s = leadSearch.toLowerCase().trim();
      const matchesSearch = !s || 
        l.name.toLowerCase().includes(s) ||
        l.phone.includes(s) ||
        (l.email && l.email.toLowerCase().includes(s)) ||
        l.reference_id.toLowerCase().includes(s) ||
        (l.city && l.city.toLowerCase().includes(s)) ||
        l.procedure_name.toLowerCase().includes(s) ||
        (l.message && l.message.toLowerCase().includes(s));

      if (!matchesSearch) return false;

      // Status Filter
      if (statusFilter !== 'ALL' && l.status !== statusFilter) {
        return false;
      }

      // Procedure Filter
      if (procedureFilter !== 'ALL' && l.procedure_name !== procedureFilter) {
        return false;
      }

      // Date Filter
      if (dateFilter !== 'ALL') {
        const leadDate = new Date(l.created_at);
        const now = new Date();
        if (dateFilter === 'TODAY') {
          if (leadDate.toDateString() !== now.toDateString()) return false;
        } else if (dateFilter === 'WEEK') {
          const diffDays = (now.getTime() - leadDate.getTime()) / (1000 * 3600 * 24);
          if (diffDays > 7) return false;
        } else if (dateFilter === 'MONTH') {
          const diffDays = (now.getTime() - leadDate.getTime()) / (1000 * 3600 * 24);
          if (diffDays > 30) return false;
        }
      }

      return true;
    });
  }, [combinedLeads, leadSearch, statusFilter, procedureFilter, dateFilter]);

  // Metrics
  const metrics = useMemo(() => {
    if (apiMetrics) return apiMetrics;
    const now = new Date().toDateString();
    return {
      total: combinedLeads.length,
      today: combinedLeads.filter(l => new Date(l.created_at).toDateString() === now).length,
      new: combinedLeads.filter(l => l.status === 'New').length,
      scheduled: combinedLeads.filter(l => l.status === 'Scheduled').length,
      completed: combinedLeads.filter(l => l.status === 'Completed').length
    };
  }, [apiMetrics, combinedLeads]);

  // Handle Status Update
  const handleStatusChange = async (leadId: number | string, newStatus: LiveDbLead['status']) => {
    // 1. Optimistic UI update
    setLiveLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    showToast(`✓ Lead #${leadId} status updated to ${newStatus}`);

    // Update local store as well
    const mappedLocalStatus = newStatus === 'New' ? 'PENDING' : newStatus === 'Scheduled' ? 'CONFIRMED' : newStatus === 'Completed' ? 'COMPLETED' : 'CANCELLED';
    updateLocalStatus(String(leadId), mappedLocalStatus as any);

    // 2. Persist to MySQL Backend API
    try {
      await fetch('/api/admin_api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_status',
          id: leadId,
          status: newStatus
        })
      });
    } catch {
      // Local fallback already applied
    }
  };

  // Handle Delete Lead
  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;
    const id = deleteCandidate.id;

    setLiveLeads(prev => prev.filter(l => l.id !== id));
    deleteLocalLead(String(id));
    showToast(`✓ Lead #${id} deleted successfully`);
    setDeleteCandidate(null);

    try {
      await fetch('/api/admin_api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_lead',
          id: id
        })
      });
    } catch {
      // already deleted locally
    }
  };

  // Export Proper Microsoft Excel (.CSV with UTF-8 BOM)
  const handleDownloadExcelSheet = () => {
    // If live API is connected, trigger direct server export with filters
    if (dbConnected) {
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (procedureFilter !== 'ALL') params.append('procedure', procedureFilter);
      if (leadSearch.trim()) params.append('search', leadSearch.trim());
      if (dateFilter === 'TODAY') params.append('preset', 'today');
      if (dateFilter === 'WEEK') params.append('preset', 'week');
      if (dateFilter === 'MONTH') params.append('preset', 'month');

      window.open(`/api/export_excel.php?${params.toString()}`, '_blank');
      showToast('Downloading Microsoft Excel (.CSV) leads sheet...');
      return;
    }

    // Client-side Excel (.CSV) fallback with UTF-8 BOM
    const headers = [
      'Lead ID',
      'Reference ID',
      'Date Submitted',
      'Time Submitted',
      'Patient Full Name',
      'Mobile Number',
      'Email Address',
      'Procedure / Treatment',
      'Consultation Mode',
      'Preferred Date',
      'OPD Time Slot',
      'City / Location',
      'Patient Notes / Questions',
      'Lead Status',
      'Submission Timestamp'
    ];

    const rows = filteredLeads.map(l => {
      const dt = new Date(l.created_at);
      const dateStr = dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const cleanPhone = `'${l.phone.replace(/\D/g, '')}`; // Apostrophe forces Excel to keep as text without scientific notation
      const messageClean = (l.message || '').replace(/[\r\n]+/g, ' ');

      return [
        l.id,
        l.reference_id,
        dateStr,
        timeStr,
        `"${l.name.replace(/"/g, '""')}"`,
        cleanPhone,
        l.email || '',
        `"${l.procedure_name.replace(/"/g, '""')}"`,
        `"${l.consultation_type}"`,
        l.preferred_date || 'Flexible',
        `"${l.preferred_time || 'Morning OPD'}"`,
        `"${l.city || 'Lucknow'}"`,
        `"${messageClean.replace(/"/g, '""')}"`,
        l.status,
        l.created_at
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dr_RK_Mishra_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ Leads sheet downloaded successfully.');
  };

  const handleAnswerSubmit = (qId: string) => {
    if (!answerDraft.trim()) return;
    answerQuestion(qId, answerDraft, 'Dr. R.K. Mishra (ASPS Board Certified Plastic Surgeon)');
    setAnswerDraft('');
    setAnswerModalId(null);
    showToast('Answer posted to community forum.');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#F8FAFD] min-h-screen text-[#0F172A] font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00264D] text-white px-5 py-3 rounded-xl shadow-xl border border-[#003366] text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A3E0]">
                Surgeon Portal &amp; Clinical Operations Desk
              </span>
              <span className="text-xs text-slate-500">• SIPS Super Specialty Hospital, Lucknow</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-[#00264D] mt-1">
              Patient Consultations &amp; Leads Management
            </h1>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Primary Excel Download Button */}
            <button
              onClick={handleDownloadExcelSheet}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              title="Download all leads in Microsoft Excel (.CSV) format"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              <span>Download Leads in Excel</span>
            </button>

            {/* Standalone PHP Admin Panel Link */}
            <a
              href="/api/admin.php"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-white text-[#00264D] border border-slate-300 hover:border-[#003366] hover:bg-slate-50 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Open full standalone PHP admin panel in a new tab"
            >
              <span>PHP Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Refresh DB */}
            <button
              onClick={fetchLeadsFromApi}
              disabled={isLoadingLeads}
              className="p-2.5 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs transition-colors cursor-pointer shadow-2xs"
              title="Refresh database leads"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLeads ? 'animate-spin text-[#00A3E0]' : ''}`} />
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2.5 bg-[#00264D] hover:bg-[#001A35] text-white text-xs font-bold rounded-xl shadow-2xs transition-all cursor-pointer"
            >
              Exit to Website
            </button>
          </div>
        </div>

        {/* Database Status Alert Bar */}
        <div className="mt-3 flex items-center justify-between text-xs px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="font-semibold text-slate-700">
              {dbConnected 
                ? 'Hostinger MySQL Database Connected (u660349605_cosmetic • Live Sync Active)' 
                : 'Local Mode Active (Hostinger PHP backend reachable upon deployment)'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Total Inquiries: <strong className="text-[#00264D]">{metrics.total}</strong>
          </span>
        </div>

        {/* 4 Executive Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-5">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 border-l-4 border-l-[#003366] shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Total Inquiries</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#00264D] mt-1">{metrics.total}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Lifetime patient records</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Today&apos;s Inquiries</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{metrics.today}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Received today</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 border-l-4 border-l-amber-500 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Pending Action</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-1">{metrics.new}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">New leads needing call</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 border-l-4 border-l-[#00A3E0] shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Scheduled OPDs</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#003366] mt-1">{metrics.scheduled}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Confirmed consultations</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-6">
          <button
            onClick={() => setActiveTab('LEADS')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'LEADS'
                ? 'bg-[#00264D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Consultation Leads ({combinedLeads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('QUESTIONS')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'QUESTIONS'
                ? 'bg-[#00264D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Patient Q&amp;A ({questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'REVIEWS'
                ? 'bg-[#00264D] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Reviews Moderation ({reviews.length})</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* TAB 1: CONSULTATION LEADS */}
        {activeTab === 'LEADS' && (
          <div className="space-y-4">
            
            {/* Filter & Search Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                
                {/* Search Bar */}
                <div className="lg:col-span-5 relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient name, phone, email, ref ID, city..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:border-[#003366] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Status Filter */}
                <div className="lg:col-span-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:border-[#003366] focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Scheduled">Status: Scheduled</option>
                    <option value="Completed">Status: Completed</option>
                    <option value="Cancelled">Status: Cancelled</option>
                  </select>
                </div>

                {/* Procedure Filter */}
                <div className="lg:col-span-4">
                  <select
                    value={procedureFilter}
                    onChange={(e) => setProcedureFilter(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:border-[#003366] focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Procedures ({availableProcedures.length})</option>
                    {availableProcedures.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Date Range Pills & Stats */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold uppercase text-slate-400 mr-1">Date:</span>
                  <button
                    onClick={() => setDateFilter('ALL')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      dateFilter === 'ALL' ? 'bg-[#00264D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Time
                  </button>
                  <button
                    onClick={() => setDateFilter('TODAY')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      dateFilter === 'TODAY' ? 'bg-[#00264D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setDateFilter('WEEK')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      dateFilter === 'WEEK' ? 'bg-[#00264D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => setDateFilter('MONTH')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      dateFilter === 'MONTH' ? 'bg-[#00264D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Last 30 Days
                  </button>

                  {(leadSearch || statusFilter !== 'ALL' || procedureFilter !== 'ALL' || dateFilter !== 'ALL') && (
                    <button
                      onClick={() => {
                        setLeadSearch('');
                        setStatusFilter('ALL');
                        setProcedureFilter('ALL');
                        setDateFilter('ALL');
                      }}
                      className="text-[11px] font-bold text-red-600 hover:underline ml-2 cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>

                <div className="text-slate-500 font-medium">
                  Showing <strong className="text-[#00264D]">{filteredLeads.length}</strong> of {combinedLeads.length} inquiries
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Ref ID &amp; Date</th>
                      <th className="py-3.5 px-4">Patient Details</th>
                      <th className="py-3.5 px-4">Direct Connect</th>
                      <th className="py-3.5 px-4">Procedure</th>
                      <th className="py-3.5 px-4">Preferred Slot</th>
                      <th className="py-3.5 px-4">Patient Notes</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400">
                          <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                          <p className="font-semibold text-sm">No consultation leads found</p>
                          <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or status filter.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const cleanPhone = lead.phone.replace(/\D/g, '');
                        const waText = encodeURIComponent(`Namaste ${lead.name} ji, this is Dr. R. K. Mishra's surgical consultation desk at SIPS Super Specialty Hospital, Lucknow regarding your inquiry for ${lead.procedure_name}. When would you like to schedule your consultation?`);

                        return (
                          <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                            
                            {/* Ref & Date */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-mono font-bold text-[11px] text-[#00264D] bg-slate-100 px-2 py-0.5 rounded-md">
                                {lead.reference_id}
                              </span>
                              <div className="text-[11px] text-slate-400 mt-1">
                                {new Date(lead.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </div>
                            </td>

                            {/* Patient Info */}
                            <td className="py-3.5 px-4">
                              <p className="font-bold text-[#00264D] text-sm">{lead.name}</p>
                              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                                <MapPin className="w-3 h-3 text-[#00A3E0] shrink-0" />
                                <span>{lead.city || 'Lucknow'}</span>
                              </div>
                              {lead.email && (
                                <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[180px]" title={lead.email}>
                                  {lead.email}
                                </p>
                              )}
                            </td>

                            {/* Direct Connect (Call & WhatsApp) */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-bold text-[#0F172A] block">+91 {cleanPhone}</span>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <a
                                  href={`tel:+91${cleanPhone}`}
                                  className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                                  title="Call Patient"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>Call</span>
                                </a>
                                <a
                                  href={`https://wa.me/91${cleanPhone}?text=${waText}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                                  title="WhatsApp Patient"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </td>

                            {/* Procedure & Mode */}
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold block max-w-[180px] truncate" title={lead.procedure_name}>
                                {lead.procedure_name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1 block">
                                {lead.consultation_type.includes('Virtual') ? 'Virtual' : 'In-Person OPD'}
                              </span>
                            </td>

                            {/* Preferred Slot */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1 font-semibold text-[#00264D]">
                                <Calendar className="w-3 h-3 text-[#00A3E0]" />
                                <span>{lead.preferred_date ? new Date(lead.preferred_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'Flexible'}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {lead.preferred_time || 'Morning OPD'}
                              </div>
                            </td>

                            {/* Patient Notes */}
                            <td className="py-3.5 px-4">
                              {lead.message ? (
                                <button
                                  type="button"
                                  onClick={() => setSelectedLead(lead)}
                                  className="text-left text-slate-600 hover:text-[#00264D] italic max-w-[170px] truncate block text-[11px] hover:underline cursor-pointer"
                                  title="Click to view full notes"
                                >
                                  &ldquo;{lead.message}&rdquo;
                                </button>
                              ) : (
                                <span className="text-slate-300">—</span>
                              )}
                            </td>

                            {/* Status Selector */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                className={`px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                                  lead.status === 'New' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                                  lead.status === 'Contacted' ? 'bg-indigo-50 text-indigo-800 border-indigo-300' :
                                  lead.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  lead.status === 'Completed' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                                  'bg-red-50 text-red-700 border-red-200'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedLead(lead)}
                                  className="p-1.5 text-slate-600 hover:text-[#00264D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                  title="View Full Patient Dossier"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteCandidate(lead)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Lead Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: QUESTIONS */}
        {activeTab === 'QUESTIONS' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <h2 className="text-sm font-bold text-[#00264D]">Patient Community Questions ({questions.length})</h2>
              <span className="text-xs text-slate-500">Board Certified Answers by Dr. R. K. Mishra</span>
            </div>

            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0]">{q.procedure}</span>
                      <h3 className="text-sm font-bold text-[#00264D] mt-0.5">&ldquo;{q.question}&rdquo;</h3>
                      <p className="text-[11px] text-slate-400 mt-1">Asked by {q.authorName} • {q.date}</p>
                    </div>
                    {q.answer ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">Answered</span>
                    ) : (
                      <button
                        onClick={() => { setAnswerModalId(q.id); setAnswerDraft(''); }}
                        className="px-3 py-1.5 rounded-lg bg-[#00264D] text-white text-xs font-bold hover:bg-[#001A35] transition-colors cursor-pointer"
                      >
                        Reply
                      </button>
                    )}
                  </div>
                  {q.answer && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                      <p className="font-semibold text-[#00264D] mb-1">{q.answeredBy}:</p>
                      <p className="leading-relaxed">{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'REVIEWS' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <h2 className="text-sm font-bold text-[#00264D]">Published Patient Reviews ({reviews.length})</h2>
              <span className="text-xs text-emerald-600 font-bold">✓ 100% Verified Google &amp; Practo Patients</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#00264D] text-sm">{r.author}</span>
                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider block">{r.procedure}</span>
                  <p className="text-xs text-slate-600 italic leading-relaxed">&ldquo;{r.review}&rdquo;</p>
                  <p className="text-[10px] text-slate-400 pt-1">{r.date} • Verified Patient</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: FULL PATIENT DOSSIER DETAILS */}
      {selectedLead && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedLead(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#00264D] text-white p-6 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#00A3E0] uppercase tracking-wider block">
                  Patient Consultation Dossier
                </span>
                <h3 className="text-xl font-editorial font-bold text-white mt-1">
                  {selectedLead.name}
                </h3>
                <span className="text-xs text-slate-300 font-mono mt-0.5 block">
                  Reference: #{selectedLead.reference_id}
                </span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Mobile Number</span>
                  <span className="font-bold text-[#00264D] text-sm mt-0.5 block">+91 {selectedLead.phone}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Email Address</span>
                  <span className="font-bold text-[#00264D] text-sm mt-0.5 block truncate" title={selectedLead.email || 'N/A'}>
                    {selectedLead.email || 'Not provided'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Procedure</span>
                  <span className="font-bold text-[#00A3E0] text-sm mt-0.5 block">{selectedLead.procedure_name}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Location / City</span>
                  <span className="font-bold text-[#00264D] text-sm mt-0.5 block">{selectedLead.city || 'Lucknow'}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Preferred Date</span>
                  <span className="font-bold text-[#00264D] text-sm mt-0.5 block">
                    {selectedLead.preferred_date ? new Date(selectedLead.preferred_date).toLocaleDateString('en-GB') : 'Flexible'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">OPD Slot</span>
                  <span className="font-bold text-[#00264D] text-sm mt-0.5 block">{selectedLead.preferred_time || 'Morning OPD'}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Submission Date</span>
                  <span className="font-bold text-[#00264D] text-xs mt-0.5 block">
                    {new Date(selectedLead.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Current Status</span>
                  <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{selectedLead.status}</span>
                </div>
              </div>

              {/* Full Patient Written Notes */}
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
                <span className="text-[11px] font-bold uppercase text-sky-800 tracking-wider block">
                  Patient&apos;s Specific Questions / Medical Goals:
                </span>
                <p className="text-slate-800 leading-relaxed italic text-xs whitespace-pre-wrap">
                  {selectedLead.message || 'No additional notes provided by the patient.'}
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:+91${selectedLead.phone.replace(/\D/g, '')}`}
                  className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Patient</span>
                </a>
                <a
                  href={`https://wa.me/91${selectedLead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Namaste ${selectedLead.name} ji, this is Dr. R. K. Mishra's surgical consultation desk at SIPS Super Specialty Hospital, Lucknow regarding your inquiry for ${selectedLead.procedure_name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DELETE CONFIRMATION */}
      {deleteCandidate && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setDeleteCandidate(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full border border-slate-200 shadow-2xl overflow-hidden p-6 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#00264D]">Delete Lead Record</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to permanently delete lead <strong>#{deleteCandidate.id} ({deleteCandidate.name})</strong>?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ANSWER QUESTION */}
      {answerModalId && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setAnswerModalId(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-[#00264D]">Post Medical Answer</h3>
            <textarea
              rows={4}
              placeholder="Type surgical response on behalf of Dr. R. K. Mishra..."
              value={answerDraft}
              onChange={(e) => setAnswerDraft(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#003366]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setAnswerModalId(null)}
                className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAnswerSubmit(answerModalId)}
                className="px-4 py-1.5 bg-[#00264D] hover:bg-[#001A35] text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Publish Answer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
