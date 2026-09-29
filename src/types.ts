export type ProcedureCategory = 'FACE' | 'BREAST' | 'BODY' | 'SKIN' | 'RECONSTRUCTIVE';

export interface Procedure {
  slug: string;
  title: string;
  subtitle: string;
  category: ProcedureCategory;
  shortDesc: string;
  overview: string;
  idealCandidate: string[];
  procedureSteps: string[];
  anesthesiaType: string;
  duration: string;
  hospitalStay: string;
  recoveryTimeline: string;
  expectedResults: string;
  risksAndSafety: string[];
  costRange: string;
  priceStartingFrom: number;
  featured: boolean;
  image: string;
  beforeAfterCaseIds?: string[];
  faqs: { question: string; answer: string }[];
  tags: string[];
  relatedSlugs: string[];
}

export interface BeforeAfterCase {
  id: string;
  procedureSlug: string;
  procedureName: string;
  category: ProcedureCategory;
  patientInfo: string;
  timeline: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  fullImage?: string;
  keyImprovements: string[];
  externalUrl?: string;
  badge?: string;
}

export interface PatientStory {
  id: string;
  patientName: string;
  location: string;
  procedure: string;
  procedureSlug: string;
  headline: string;
  quote: string;
  story: string;
  timeline: string;
  date: string;
  rating: number;
  doctorNote?: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  procedure: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpfulCount: number;
}

export type ReviewItem = Review;

export interface InsightArticle {
  slug: string;
  title: string;
  category: 'Procedures' | 'Recovery' | 'Patient Guides' | 'Costs' | 'Safety';
  author: string;
  medicalReviewer: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
  image: string;
  faqs?: { question: string; answer: string }[];
}

export interface DoctorProfile {
  name: string;
  qualifications: string;
  title: string;
  specialty: string;
  experienceYears: number;
  surgeriesCount: string;
  hospital: string;
  hospitalAddress: string;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  professionalRolesAndAffiliations: string[];
  internationalTraining: string[];
  affiliations: string[];
  philosophy: string;
  aboutBio: string[];
  awardsAndRoles: string[];
}

export interface ConsultationLead {
  id: string;
  category: ProcedureCategory | 'NOT_SURE';
  procedure: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  hasPhoto: boolean;
  photoFileName?: string;
  createdAt: string;
  status: 'PENDING' | 'CONTACTED' | 'CONFIRMED' | 'ARCHIVED';
  notes?: string;
}

export interface QuestionSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  procedure: string;
  question: string;
  hasPhoto: boolean;
  createdAt: string;
  status: 'UNANSWERED' | 'ANSWERED';
}
