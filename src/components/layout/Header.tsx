import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  Calendar,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  CreditCard,
  Plane,
  MessageCircle,
  Star
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { proceduresData } from '../../data/proceduresData';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [procDropdownOpen, setProcDropdownOpen] = useState(false);
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // De-densified, spacious navigation links (6 clean anchors)
  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Procedures', route: 'procedures', hasDropdown: true },
    { label: 'Before & After', route: 'results' },
    { label: 'About Surgeon', route: 'doctor' },
    { 
      label: 'Patient Care', 
      route: 'patient-stories',
      hasPatientDropdown: true 
    },
    { label: 'Contact', route: 'contact' }
  ];

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setProcDropdownOpen(false);
    setPatientDropdownOpen(false);
  };

  const isLinkActive = (item: typeof navLinks[0]) => {
    if (item.route === 'home') return currentRoute === 'home';
    if (item.route === 'procedures') return currentRoute === 'procedures' || currentRoute.startsWith('procedure-');
    if (item.route === 'patient-stories') return currentRoute === 'patient-stories' || currentRoute === 'reviews' || currentRoute === 'pricing' || currentRoute === 'hospital';
    return currentRoute === item.route;
  };

  // Groupings for mega menu
  const faceProcedures = proceduresData.filter(p => p.category === 'FACE').slice(0, 5);
  const bodyBreastProcedures = proceduresData.filter(p => p.category === 'BREAST' || p.category === 'BODY').slice(0, 5);
  const skinReconProcedures = proceduresData.filter(p => p.category === 'SKIN' || p.category === 'RECONSTRUCTIVE').slice(0, 5);

  // Marquee announcement ticker items
  const marqueeItems = [
    { icon: ShieldCheck, text: 'NABH Super Specialty Center • SIPS Hospital Chowk, Lucknow' },
    { icon: Award, text: 'Senior Plastic Surgeon Dr. R. K. Mishra (25+ Yrs Exp • 30,000+ Surgeries)' },
    { icon: Clock, text: 'OPD Hours: Mon – Sat 10:00 AM – 6:00 PM' },
    { icon: Phone, text: 'Direct Clinic Helpline: +91 94150 23675 / (0522) 225-8700' },
    { icon: CreditCard, text: '0% Interest Surgery EMI Options Available' },
    { icon: Plane, text: 'Out-of-Town & Medical Tourism Patient Concierge Desk' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300">
      
      {/* 1. Moving Marquee Announcement Bar */}
      <div className="bg-[#001D3D] text-slate-300 text-[11px] py-1.5 border-b border-[#002E5C] overflow-hidden select-none">
        <div className="flex items-center overflow-hidden">
          {/* Continuous scrolling track (duplicated for seamless loop) */}
          <div className="animate-marquee-scroll flex items-center gap-10 sm:gap-14 cursor-pointer">
            
            {/* First Set */}
            {marqueeItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`m1-${idx}`} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Icon className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                  <span className="font-medium text-slate-200 tracking-wide">{item.text}</span>
                  <span className="text-slate-600 pl-4">•</span>
                </div>
              );
            })}

            {/* Duplicate Set for Seamless Loop */}
            {marqueeItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`m2-${idx}`} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Icon className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                  <span className="font-medium text-slate-200 tracking-wide">{item.text}</span>
                  <span className="text-slate-600 pl-4">•</span>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Smooth Frosted Blur on Scroll */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-[#E2E8F0]/80 py-2.5' 
          : 'bg-white/95 backdrop-blur-xs border-b border-[#E2E8F0] py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div onClick={() => handleNav('home')} className="shrink-0 cursor-pointer">
            <Logo />
          </div>

          {/* Desktop Navigation Links: Spacious & De-densified */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-8">
            {navLinks.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (item.hasDropdown) setProcDropdownOpen(true);
                  if (item.hasPatientDropdown) setPatientDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  if (item.hasDropdown) setProcDropdownOpen(false);
                  if (item.hasPatientDropdown) setPatientDropdownOpen(false);
                }}
              >
                <button
                  onClick={() => handleNav(item.route)}
                  className={`flex items-center gap-1.5 text-sm transition-all py-1.5 px-2.5 rounded-lg cursor-pointer ${
                    isLinkActive(item) 
                      ? 'text-[#003366] font-bold' 
                      : 'text-slate-600 hover:text-[#003366] font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {(item.hasDropdown || item.hasPatientDropdown) && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003366] transition-transform" />
                  )}
                  {/* Subtle active indicator dot */}
                  {isLinkActive(item) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] ml-0.5" />
                  )}
                </button>

                {/* Procedures Mega Dropdown */}
                {item.hasDropdown && procDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-2xl rounded-2xl p-6 z-50 transition-all animate-in fade-in zoom-in-95 duration-150 mt-1">
                    
                    <div className="grid grid-cols-3 gap-6">
                      
                      {/* Column 1: Face & Nose */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0] block pb-2 border-b border-slate-100">
                          Face & Neck Aesthetics
                        </span>
                        <div className="space-y-1">
                          {faceProcedures.map((p) => (
                            <div
                              key={p.slug}
                              onClick={() => handleNav(`procedure-${p.slug}`)}
                              className="text-xs text-[#334155] hover:text-[#003366] hover:bg-[#F0F7FD] p-1.5 rounded-lg transition-colors cursor-pointer font-medium"
                            >
                              {p.title}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Breast & Body */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0] block pb-2 border-b border-slate-100">
                          Body & Chest Sculpting
                        </span>
                        <div className="space-y-1">
                          {bodyBreastProcedures.map((p) => (
                            <div
                              key={p.slug}
                              onClick={() => handleNav(`procedure-${p.slug}`)}
                              className="text-xs text-[#334155] hover:text-[#003366] hover:bg-[#F0F7FD] p-1.5 rounded-lg transition-colors cursor-pointer font-medium"
                            >
                              {p.title}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Reconstructive & Skin */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0] block pb-2 border-b border-slate-100">
                          Skin & Reconstructive
                        </span>
                        <div className="space-y-1">
                          {skinReconProcedures.map((p) => (
                            <div
                              key={p.slug}
                              onClick={() => handleNav(`procedure-${p.slug}`)}
                              className="text-xs text-[#334155] hover:text-[#003366] hover:bg-[#F0F7FD] p-1.5 rounded-lg transition-colors cursor-pointer font-medium"
                            >
                              {p.title}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Bottom Feature Strip inside Mega Menu */}
                    <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC] -mx-6 -mb-6 p-4 rounded-b-2xl text-xs">
                      <div 
                        onClick={() => {
                          setProcDropdownOpen(false);
                          const el = document.getElementById('procedure-matcher-quiz');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center gap-1.5 font-bold text-[#003366] hover:text-[#00A3E0] transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#00A3E0]" />
                        <span>Unsure which procedure is right for you? Take 1-Min Quiz →</span>
                      </div>

                      <button
                        onClick={() => handleNav('procedures')}
                        className="font-bold text-[#003366] hover:text-[#00A3E0] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All Procedures</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                )}

                {/* Patients Dropdown */}
                {item.hasPatientDropdown && patientDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-xl rounded-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 mt-1">
                    <button
                      onClick={() => handleNav('hospital')}
                      className="w-full text-left text-xs text-[#334155] hover:text-[#003366] hover:bg-[#F0F7FD] p-2.5 rounded-xl transition-colors font-medium flex items-center justify-between cursor-pointer"
                    >
                      <span>Hospital & Laminar OTs</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNav('patient-stories')}
                      className="w-full text-left text-xs text-[#334155] hover:text-[#003366] hover:bg-[#F0F7FD] p-2.5 rounded-xl transition-colors font-medium flex items-center justify-between cursor-pointer"
                    >
                      <span>Patient Stories</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNav('reviews')}
                      className="w-full text-left text-xs text-[#334155] hover:text-[#003366] hover:bg-[#F0F7FD] p-2.5 rounded-xl transition-colors font-medium flex items-center justify-between cursor-pointer"
                    >
                      <span>Verified Reviews (★ 4.9)</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNav('pricing')}
                      className="w-full text-left text-xs text-[#334155] hover:text-[#003366] hover:bg-[#F0F7FD] p-2.5 rounded-xl transition-colors font-medium flex items-center justify-between cursor-pointer"
                    >
                      <span>Pricing & 0% EMI Plans</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNav('ask-question')}
                      className="w-full text-left text-xs text-[#334155] hover:text-[#003366] hover:bg-[#F0F7FD] p-2.5 rounded-xl transition-colors font-medium flex items-center justify-between cursor-pointer"
                    >
                      <span>Ask Dr. R. K. Mishra</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                )}

              </div>
            ))}
          </nav>

          {/* Right Actions: Clean, Uncluttered & No Red */}
          <div className="flex items-center gap-3">
            
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-[#003366] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] rounded-xl transition-all cursor-pointer"
              title="Search procedures (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#003366]" />
            </button>

            {/* Prestige Royal Navy Consultation Button (No Red) */}
            <button
              onClick={() => handleNav('book-consultation')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md border border-[#003366] hover:border-[#00A3E0] transition-all cursor-pointer group"
            >
              <Calendar className="w-3.5 h-3.5 text-[#00A3E0] group-hover:scale-110 transition-transform" />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#003366] lg:hidden hover:bg-slate-100 rounded-xl cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xl px-6 py-6 space-y-5 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pb-2">
            <a
              href="tel:+919415023675"
              className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center gap-1.5 text-xs font-bold text-[#003366]"
            >
              <Phone className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Call Helpline</span>
            </a>
            <a
              href="https://wa.me/919415023675?text=Hello%20Dr.%20Mishra%2C%20I%20would%20like%20to%20inquire%20about%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="space-y-1 divide-y divide-slate-100 text-sm">
            {navLinks.map((item) => (
              <div key={item.label} className="pt-2.5 first:pt-0">
                <button
                  onClick={() => handleNav(item.route)}
                  className={`w-full text-left py-1.5 font-medium tracking-wide flex items-center justify-between ${
                    isLinkActive(item) ? 'text-[#003366] font-bold' : 'text-[#334155]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
            <button
              onClick={() => handleNav('book-consultation')}
              className="w-full py-3 rounded-xl bg-[#003366] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#00A3E0]" />
              <span>Schedule Confidential Consultation</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('procedure-matcher-quiz');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#003366] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#00A3E0]" />
              <span>Take Procedure Self-Assessment Quiz</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
};