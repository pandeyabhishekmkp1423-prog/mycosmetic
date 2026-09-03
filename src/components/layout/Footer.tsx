import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Clock,
  Lock
} from 'lucide-react';
import { doctorData } from '../../data/doctorData';
import { proceduresData } from '../../data/proceduresData';
import { Logo } from '../common/Logo';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#071D3B] text-[#EEF7FC] pt-14 pb-20 lg:pb-12 border-t border-[#1E3A6B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Brand Official Logo & Consultation Lines */}
        <div className="pb-10 border-b border-[#1E3A6B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-3">
            <div 
              onClick={() => onNavigate('home')}
              className="cursor-pointer inline-block"
            >
              <Logo variant="white" />
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
              Super-specialized plastic, aesthetic, and reconstructive surgery practice delivering precision, safety, and natural-looking transformations backed by 25+ years of surgical mastery and 30,000+ operations by Dr. R. K. Mishra.
            </p>
          </div>

          {/* Quick Helpline Strip */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 lg:justify-end">
            <div className="p-4 rounded-xl bg-[#0B2A5B] border border-[#1E3A6B] flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#1769AA]/30 text-[#93C5FD] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Consultation Line</p>
                <a href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`} className="text-sm font-bold text-white hover:text-[#93C5FD] transition-colors">
                  +91 9795 800 800
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B2A5B] border border-[#1E3A6B] flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-emerald-900/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Direct Email</p>
                <a href={`mailto:${doctorData.contactEmail}`} className="text-xs sm:text-sm font-semibold text-white hover:text-[#93C5FD] transition-colors">
                  {doctorData.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Tier: Structured Navigation Columns */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-[#1E3A6B]">
          
          {/* Column 1: Face & Neck Procedures */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#93C5FD] mb-3.5">
              Facial Aesthetics
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              {proceduresData.filter(p => p.category === 'FACE').map(p => (
                <li key={p.slug}>
                  <button 
                    onClick={() => onNavigate(`procedure-${p.slug}`)} 
                    className="hover:text-white transition-colors text-left"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Breast & Body */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#93C5FD] mb-3.5">
              Breast & Body
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              {proceduresData.filter(p => p.category === 'BREAST' || p.category === 'BODY').map(p => (
                <li key={p.slug}>
                  <button 
                    onClick={() => onNavigate(`procedure-${p.slug}`)} 
                    className="hover:text-white transition-colors text-left"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About & Hospital */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#93C5FD] mb-3.5">
              Dr. Mishra & Hospital
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <button onClick={() => onNavigate('doctor')} className="hover:text-white transition-colors text-left">
                  Meet Dr. R. K. Mishra
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hospital')} className="hover:text-white transition-colors text-left">
                  SIPS Hospital Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-white transition-colors text-left">
                  Before & After Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('patient-stories')} className="hover:text-white transition-colors text-left">
                  Patient Journeys & Stories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-white transition-colors text-left">
                  Verified Patient Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Patient Guidance & Pricing */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#93C5FD] mb-3.5">
              Patient Guidance
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors text-left">
                  Transparent Pricing Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('insights')} className="hover:text-white transition-colors text-left">
                  Clinical Insights & Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ask-question')} className="hover:text-white transition-colors text-left">
                  Ask a Doctor Online
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book-consultation')} className="hover:text-white transition-colors text-left">
                  Book In-Clinic Consultation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('local-seo')} className="hover:text-white transition-colors text-left">
                  Lucknow Center Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Hospital Address & Timings */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#93C5FD] mb-3.5">
              SIPS Hospital
            </h4>
            <p className="text-xs text-[#CBD5E1] flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
              <span>29 Shah Mina Road, Chowk, Lucknow – 226003, Uttar Pradesh</span>
            </p>
            <p className="text-xs text-[#94A3B8] flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
              <span>Mon – Sat: 10:00 AM – 6:00 PM</span>
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B2A5B] text-[#93C5FD] text-[11px] font-medium border border-[#1E3A6B]">
                <Shield className="w-3.5 h-3.5" /> NABH Accredited Facility
              </span>
            </div>
          </div>
        </div>

        {/* Accreditations & Partnerships Bar */}
        <div className="py-5 border-b border-[#1E3A6B] flex flex-wrap items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px]">
            <span className="text-white font-medium">Affiliations:</span>
            <span>Association of Plastic Surgeons of India (APSI)</span>
            <span className="text-[#334155]">•</span>
            <span>American Society of Plastic Surgeons (ASPS)</span>
            <span className="text-[#334155]">•</span>
            <span>IAAPS</span>
            <span className="text-[#334155]">•</span>
            <span>Smile Train USA Project Director</span>
          </div>

          {/* Admin CMS Access Link */}
          <button
            id="footer-admin-link"
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-1 text-[#64748B] hover:text-[#93C5FD] transition-colors text-[11px]"
          >
            <Lock className="w-3 h-3" />
            <span>Clinic CMS</span>
          </button>
        </div>

        {/* Bottom Legal & Mandatory Medical Disclaimer */}
        <div className="pt-6 space-y-3 text-xs text-[#64748B]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p>© {new Date().getFullYear()} My Cosmetic Surgery (MyCosmeticSurgery.in) — Dr. R. K. Mishra. All rights reserved.</p>
            <div className="flex items-center gap-3 text-[#94A3B8]">
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigate('contact')}>Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigate('contact')}>Patient Terms</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigate('hospital')}>NABH Hospital Standards</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#05152B] border border-[#1E3A6B] text-[11px] text-[#94A3B8] leading-relaxed">
            <span className="font-semibold text-[#CBD5E1]">Mandatory Medical Disclaimer: </span>
            The informational content, medical guides, and before-and-after photographic references published on MyCosmeticSurgery.in are intended strictly for general educational guidance and procedure discovery. They do not constitute formal medical diagnosis, clinical prescription, or surgical warranty. Individual anatomical characteristics, healing dynamics, and surgical outcomes vary significantly from patient to patient. A formal in-person clinical assessment by Dr. R. K. Mishra at SIPS Hospital is required prior to determining surgical candidacy or final customized treatment plans.
          </div>
        </div>

      </div>
    </footer>
  );
};
