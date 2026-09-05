import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { Logo } from '../common/Logo';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#002244] text-[#CBD5E1] font-sans text-xs border-t border-[#003366]">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <div onClick={() => onNavigate('home')} className="inline-block">
              <Logo variant="white" />
            </div>

            <p className="text-slate-300 leading-relaxed text-xs max-w-sm pt-2">
              <strong>My Cosmetic Surgery</strong> — Revamping Your Looks. Premier plastic and cosmetic surgery center led by Dr. R. K. Mishra (25+ Yrs Exp, 30,000+ Surgeries) at SIPS Super Specialty Hospital Lucknow.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0A325E] flex items-center justify-center text-slate-200 hover:text-white hover:bg-[#00A3E0] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0A325E] flex items-center justify-center text-slate-200 hover:text-white hover:bg-[#00A3E0] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0A325E] flex items-center justify-center text-slate-200 hover:text-white hover:bg-[#CE181E] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#00A3E0] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctor')} className="hover:text-[#00A3E0] transition-colors">
                  About Dr. R. K. Mishra
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('procedures')} className="hover:text-[#00A3E0] transition-colors">
                  All Procedures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-[#00A3E0] transition-colors">
                  Before & After Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#00A3E0] transition-colors">
                  Contact & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Procedures */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
              Popular Procedures
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('procedure-rhinoplasty')} className="hover:text-[#00A3E0] transition-colors">
                  Rhinoplasty (Nose Job)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('procedure-gynecomastia')} className="hover:text-[#00A3E0] transition-colors">
                  Gynecomastia Correction
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('procedure-liposuction')} className="hover:text-[#00A3E0] transition-colors">
                  360° Liposuction
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('procedure-tummy-tuck')} className="hover:text-[#00A3E0] transition-colors">
                  Tummy Tuck (Abdominoplasty)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('procedure-breast-augmentation')} className="hover:text-[#00A3E0] transition-colors">
                  Breast Augmentation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Clinic */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
              Hospital & Clinic
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <span>SIPS Super Specialty Hospital, 29 Shahmina Road, Chowk, Lucknow, UP 226003</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>+91 94150 23675 / (0522) 225-8700</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>OPD Hours: Mon - Sat 10 AM - 6 PM</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#003366] py-4 px-4 sm:px-8 text-slate-400 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © 2026 My Cosmetic Surgery • Dr. R. K. Mishra • SIPS Hospital Lucknow. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Medical Disclaimer
            </button>
            <button onClick={() => onNavigate('admin')} className="hover:text-[#00A3E0] transition-colors">
              Admin Portal
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
