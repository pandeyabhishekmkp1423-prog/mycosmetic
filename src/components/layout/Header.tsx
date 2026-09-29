import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  Clock,
  Phone,
  CreditCard,
  Plane,
  Search,
  Calendar,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../common/Logo';

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const marqueeItems = [
    { icon: ShieldCheck, text: 'NABH Super Specialty Center • SIPS Super Specialty Hospital (Pvt. Ltd.), Lucknow' },
    { icon: Award, text: 'ASPS Board Certified Plastic Surgeon Dr. R.K. Mishra (Managing Director & Head of Plastic Surgery, SIPS)' },
    { icon: Clock, text: 'OPD Hours: Mon – Sat 10:00 AM – 6:00 PM' },
    { icon: Phone, text: 'Clinic Helpline: +91 94150 23675' },
    { icon: CreditCard, text: '0% Interest Surgery EMI Options Available' },
    { icon: Plane, text: 'Out-of-Town & Medical Tourism Concierge Desk' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans select-none">

      {/* 1. Marquee Announcement Bar */}
      <div className="bg-[#001D3D] text-slate-300 text-xs py-2 border-b border-[#002E5C] overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="animate-marquee-scroll flex items-center gap-10 whitespace-nowrap cursor-pointer">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="inline-flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                  <span className="font-medium text-slate-200 tracking-wide">{item.text}</span>
                  <span className="text-slate-600 pl-4">•</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`transition-all duration-200 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-200 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <div onClick={() => handleNav('home')} className="shrink-0 cursor-pointer">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${currentRoute === 'home'
                ? 'text-[#003366] bg-slate-100/80'
                : 'text-slate-600 hover:text-[#003366] hover:bg-slate-50'
                }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('results')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${currentRoute === 'results'
                ? 'text-[#003366] bg-slate-100/80'
                : 'text-slate-600 hover:text-[#003366] hover:bg-slate-50'
                }`}
            >
              Before &amp; After
            </button>

            <button
              onClick={() => handleNav('doctor')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${currentRoute === 'doctor'
                ? 'text-[#003366] bg-slate-100/80'
                : 'text-slate-600 hover:text-[#003366] hover:bg-slate-50'
                }`}
            >
              About Dr. Mishra
            </button>

            <button
              onClick={() => handleNav('hospital')}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-[#003366] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Hospital
            </button>

            <button
              onClick={() => handleNav('consultation')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${currentRoute === 'contact'
                ? 'text-[#003366] bg-slate-100/80'
                : 'text-slate-600 hover:text-[#003366] hover:bg-slate-50'
                }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-[#003366] hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              title="Search (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#003366]" />
            </button>

            {/* Direct Consultation Link */}
            <button
              onClick={() => handleNav('consultation')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer group"
            >
              <Calendar className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#003366] md:hidden hover:bg-slate-100 rounded-xl cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xl px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:+919415023675"
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center gap-1.5 text-xs font-bold text-[#003366]"
            >
              <Phone className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Call Helpline</span>
            </a>
            <a
              href="https://wa.me/919415023675"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="space-y-1 divide-y divide-slate-100">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left py-3 flex items-center justify-between font-medium text-sm ${currentRoute === 'home' ? 'text-[#003366] font-bold' : 'text-slate-700'
                }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            <button
              onClick={() => handleNav('results')}
              className={`w-full text-left py-3 flex items-center justify-between font-medium text-sm ${currentRoute === 'results' ? 'text-[#003366] font-bold' : 'text-slate-700'
                }`}
            >
              <span>Before &amp; After (Real Results)</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            <button
              onClick={() => handleNav('doctor')}
              className={`w-full text-left py-3 flex items-center justify-between font-medium text-sm ${currentRoute === 'doctor' ? 'text-[#003366] font-bold' : 'text-slate-700'
                }`}
            >
              <span>About Dr. R.K. Mishra</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            <button
              onClick={() => handleNav('hospital')}
              className="w-full text-left py-3 flex items-center justify-between font-medium text-sm text-slate-700 hover:text-[#003366]"
            >
              <span>Hospital Facilities</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>

            <button
              onClick={() => handleNav('consultation')}
              className="w-full text-left py-3 flex items-center justify-between font-medium text-sm text-slate-700 hover:text-[#003366]"
            >
              <span>Book Consultation</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          <button
            onClick={() => handleNav('consultation')}
            className="w-full py-3 rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 text-[#00A3E0]" />
            <span>Consult Dr. R.K. Mishra</span>
            <ArrowRight className="w-4 h-4 text-[#00A3E0]" />
          </button>
        </div>
      )}
    </header>
  );
};