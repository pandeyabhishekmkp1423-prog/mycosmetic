import { useState, useEffect } from 'react';
import { ConsultationLead, QuestionSubmission, Review, ReviewItem } from '../types';
import { reviewsData as initialReviews } from '../data/reviewsData';

const CONSULTATION_STORAGE_KEY = 'mcs_consultations_v1';
const QUESTIONS_STORAGE_KEY = 'mcs_questions_v1';
const REVIEWS_STORAGE_KEY = 'mcs_reviews_v1';

export interface StoredLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  procedure: string;
  city?: string;
  preferredDate: string;
  timeSlot: string;
  consultationType: 'IN_PERSON' | 'VIRTUAL';
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface StoredQuestion {
  id: string;
  authorName: string;
  email: string;
  procedure: string;
  question: string;
  date: string;
  answer?: string;
  answeredBy?: string;
  answerDate?: string;
}

export const initialConsultationLeads: StoredLead[] = [
  {
    id: 'lead-101',
    name: 'Sameer Verma',
    phone: '+91 98390 12345',
    email: 'sameer.verma@example.com',
    procedure: 'Rhinoplasty',
    city: 'Lucknow',
    preferredDate: '2025-03-15',
    timeSlot: '11:00 AM – 1:00 PM (Morning OPD)',
    consultationType: 'IN_PERSON',
    notes: 'Interested in dorsal hump reduction and septoplasty assessment.',
    status: 'CONFIRMED',
    createdAt: '2025-02-28T10:14:00Z'
  },
  {
    id: 'lead-102',
    name: 'Aditya Singh',
    phone: '+91 94150 98765',
    email: 'aditya.singh@example.com',
    procedure: 'Gynecomastia',
    city: 'Kanpur',
    preferredDate: '2025-03-18',
    timeSlot: '4:00 PM – 6:30 PM (Evening OPD)',
    consultationType: 'IN_PERSON',
    notes: 'Looking for gland excision + micro-liposuction combination.',
    status: 'PENDING',
    createdAt: '2025-03-01T08:30:00Z'
  },
  {
    id: 'lead-103',
    name: 'Meenakshi Rao',
    phone: '+91 99350 44321',
    email: 'meenakshi.rao@example.com',
    procedure: 'Liposuction',
    city: 'Varanasi',
    preferredDate: '2025-03-20',
    timeSlot: '11:00 AM – 1:00 PM (Morning OPD)',
    consultationType: 'VIRTUAL',
    notes: 'Inquiring regarding abdomen & waist sculpting recovery timeline.',
    status: 'PENDING',
    createdAt: '2025-03-01T14:45:00Z'
  }
];

export const initialCommunityQuestions: StoredQuestion[] = [
  {
    id: 'q-1',
    authorName: 'Rohit K.',
    email: 'rohit.k@example.com',
    procedure: 'Rhinoplasty',
    question: 'How many days after nasal surgery can I travel back to Delhi by flight?',
    date: 'February 24, 2025',
    answer: 'For primary rhinoplasty, patients can typically take domestic flights 5 to 7 days post-surgery once internal splints/nasal packs are removed and nasal mucosal swelling is stable. We advise keeping hydrated and using saline nasal spray in flight.',
    answeredBy: 'Dr. R. K. Mishra (Senior Plastic Surgeon)',
    answerDate: 'February 25, 2025'
  },
  {
    id: 'q-2',
    authorName: 'Aman V.',
    email: 'aman.v@example.com',
    procedure: 'Gynecomastia',
    question: 'Is gynecomastia surgery permanent or can gland tissue grow back after workout?',
    date: 'February 26, 2025',
    answer: 'When complete surgical excision of glandular tissue is performed alongside lipo-sculpting, the glandular cells are permanently removed and cannot regenerate. Maintaining a stable body weight ensures lifelong flat, masculine chest contours.',
    answeredBy: 'Dr. R. K. Mishra (Senior Plastic Surgeon)',
    answerDate: 'February 27, 2025'
  },
  {
    id: 'q-3',
    authorName: 'Pooja S.',
    email: 'pooja.s@example.com',
    procedure: 'Blepharoplasty',
    question: 'Will eyelid surgery change my natural eye shape or look stretched?',
    date: 'March 01, 2025',
    answer: 'No. Modern blepharoplasty preserves delicate orbital ligaments and focuses on conservative fat repositioning and minimal skin trimming. Your natural ethnic and personal facial character remains intact, simply looking refreshed and rested.',
    answeredBy: 'Dr. R. K. Mishra (Senior Plastic Surgeon)',
    answerDate: 'March 02, 2025'
  }
];

// Helper functions for persistent storage
export function getStoredLeads(): StoredLead[] {
  try {
    const raw = localStorage.getItem(CONSULTATION_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CONSULTATION_STORAGE_KEY, JSON.stringify(initialConsultationLeads));
      return initialConsultationLeads;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initialConsultationLeads;
  }
}

export function getStoredQuestions(): StoredQuestion[] {
  try {
    const raw = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(initialCommunityQuestions));
      return initialCommunityQuestions;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initialCommunityQuestions;
  }
}

export function getStoredReviews(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// React Custom Hook for unified store access
export function useConsultationStore() {
  const [leads, setLeads] = useState<StoredLead[]>(() => getStoredLeads());
  const [questions, setQuestions] = useState<StoredQuestion[]>(() => getStoredQuestions());
  const [reviews, setReviews] = useState<ReviewItem[]>(() => getStoredReviews());

  // Listen for storage events across tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      setLeads(getStoredLeads());
      setQuestions(getStoredQuestions());
      setReviews(getStoredReviews());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addLead = (leadData: Omit<StoredLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: StoredLead = {
      ...leadData,
      id: 'MCS-' + Math.floor(100000 + Math.random() * 900000),
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    try {
      localStorage.setItem(CONSULTATION_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save lead', e);
    }
    return newLead;
  };

  const updateLeadStatus = (id: string, status: StoredLead['status']) => {
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    setLeads(updated);
    try {
      localStorage.setItem(CONSULTATION_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update lead status', e);
    }
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    try {
      localStorage.setItem(CONSULTATION_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete lead', e);
    }
  };

  const addQuestion = (qData: { authorName: string; email: string; procedure: string; question: string }) => {
    const newQ: StoredQuestion = {
      ...qData,
      id: 'q-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    const updated = [newQ, ...questions];
    setQuestions(updated);
    try {
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save question', e);
    }
    return newQ;
  };

  const answerQuestion = (id: string, answerText: string, answeredBy: string = 'Dr. R. K. Mishra') => {
    const updated = questions.map(q => q.id === id ? {
      ...q,
      answer: answerText,
      answeredBy,
      answerDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    } : q);
    setQuestions(updated);
    try {
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to answer question', e);
    }
  };

  const addReview = (reviewData: Omit<ReviewItem, 'id' | 'date'>) => {
    const newReview: ReviewItem = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      helpfulCount: 0
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save review', e);
    }
    return newReview;
  };

  return {
    leads,
    addLead,
    updateLeadStatus,
    deleteLead,
    questions,
    addQuestion,
    answerQuestion,
    reviews,
    addReview
  };
}
