import React, { useEffect, useState, useRef } from 'react';
import {
  Calendar,
  ChevronDown,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  X,
  ArrowRight
} from 'lucide-react';
import { proceduresData } from '../../data/proceduresData';
import { doctorData } from '../../data/doctorData';
import { Logo } from '../common/Logo';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  lang: 'EN' | 'HI';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  lang,
  onToggleLang
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [proceduresDropdownOpen, setProceduresDropdownOpen] = useState(false);
  const [mobileProceduresOpen, setMobileProceduresOpen] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setProceduresDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', route: 'home' },
    { label: 'Procedures', route: 'procedures', hasDropdown: true },
    { label: 'Doctor', route: 'doctor' },
    { label: 'Results', route: 'results' },
    { label: 'Stories', route: 'patient-stories' },
    { label: 'Pricing', route: 'pricing' },
    { label: 'Insights', route: 'insights' },
    { label: 'Contact', route: 'contact' }
  ];

  const procedureGroups = [
    { title: 'Face & Neck', items: proceduresData.filter((p) => p.category === 'FACE') },
    { title: 'Breast & Body', items: proceduresData.filter((p) => p.category === 'BREAST' || p.category === 'BODY') },
    { title: 'Skin & Reconstruction', items: proceduresData.filter((p) => p.category === 'SKIN' || p.category === 'RECONSTRUCTIVE') }
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setProceduresDropdownOpen(false);
  };

  const isActiveRoute = (route: string) => (
    currentRoute === route || (route === 'procedures' && currentRoute.startsWith('procedure-'))
  );

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProceduresDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProceduresDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      id="main-header"
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? 'border-b border-slate-200/80 shadow-sm py-0'
          : 'border-b border-slate-100 py-0.5'
      }`}
    >
      {/* Top Banner Bar */}
      <div className="hidden border-b border-slate-100 bg-slate-50/90 text-slate-600 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs font-medium sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
              <ShieldCheck className="h-4 w-4 text-sky-600" />
              NABH Accredited SIPS Hospital
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              Lucknow, Uttar Pradesh
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-800 transition-colors hover:text-sky-600"
            >
              <Phone className="h-3.5 w-3.5 text-sky-600" />
              +91 9795 800 800
            </a>
            <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
            <button
              id="language-toggle-btn"
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-bold text-slate-700 transition-colors hover:bg-slate-200/60 hover:text-slate-900"
              aria-label="Toggle language"
            >
              <Languages className="h-3.5 w-3.5 text-sky-600" />
              <span>{lang}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <button
          id="header-logo"
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="Go to homepage"
        >
          <Logo />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = isActiveRoute(item.route);

            if (item.hasDropdown) {
              return (
                <div
                  key={item.route}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    id="nav-procedures-btn"
                    type="button"
                    onClick={() => handleNavClick('procedures')}
                    aria-haspopup="true"
                    aria-expanded={proceduresDropdownOpen}
                    className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        proceduresDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {proceduresDropdownOpen && (
                    <div
                      id="procedures-mega-menu"
                      className="absolute left-1/2 top-full z-50 mt-1 w-[760px] -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-900/10 transition-all"
                    >
                      <div className="grid grid-cols-[1fr_240px] gap-6">
                        <div className="grid grid-cols-3 gap-5 border-r border-slate-100 pr-5">
                          {procedureGroups.map((group) => (
                            <div key={group.title}>
                              <h4 className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                {group.title}
                              </h4>
                              <ul className="space-y-1">
                                {group.items.slice(0, 6).map((procedure) => (
                                  <li key={procedure.slug}>
                                    <button
                                      type="button"
                                      onClick={() => handleNavClick(`procedure-${procedure.slug}`)}
                                      className="w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-700"
                                    >
                                      {procedure.title}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Mega Menu Sidebar CTA */}
                        <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4 border border-slate-100">
                          <div>
                            <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                              Directory
                            </span>
                            <p className="mt-2 text-xs font-bold leading-snug text-slate-800">
                              Compare procedures, downtime, & estimated costs.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleNavClick('procedures')}
                            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800"
                          >
                            Explore Directory
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.route}
                id={`nav-${item.route}-btn`}
                type="button"
                onClick={() => handleNavClick(item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            id="open-search-header-btn"
            type="button"
            onClick={onOpenSearch}
            aria-label="Search procedures and insights"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            title="Search procedures and articles"
          >
            <Search className="h-4 w-4" />
            <span className="hidden text-xs font-semibold lg:inline">Search</span>
          </button>

          <button
            id="header-book-btn"
            type="button"
            onClick={() => handleNavClick('book-consultation')}
            className="hidden h-9 items-center justify-center gap-2 rounded-full bg-amber-600 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-amber-700 hover:shadow sm:inline-flex"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Consultation</span>
          </button>

          <a
            href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100 sm:inline-flex lg:hidden"
            title="WhatsApp consultation"
            aria-label="WhatsApp consultation"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="absolute inset-x-0 top-full z-50 flex h-[calc(100dvh-65px)] max-h-[calc(100dvh-65px)] flex-col justify-between overflow-y-auto border-t border-slate-100 bg-white px-4 pb-6 pt-2 shadow-xl lg:hidden"
        >
          <div className="space-y-4">
            {/* Mobile Practice Badge */}
            <div className="flex items-center justify-between rounded-xl bg-slate-900 p-3.5 text-white shadow-sm">
              <div>
                <p className="text-xs font-bold text-white">Dr. R. K. Mishra</p>
                <p className="text-[11px] text-slate-400">Plastic & Cosmetic Surgeon</p>
              </div>
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                Lucknow
              </span>
            </div>

            {/* Nav Menu */}
            <div className="space-y-1 pt-1">
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.route);

                if (item.hasDropdown) {
                  return (
                    <div key={item.route} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setMobileProceduresOpen(!mobileProceduresOpen)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                          isActive
                            ? 'bg-sky-50 text-sky-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileProceduresOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileProceduresOpen && (
                        <div className="ml-3 space-y-3 border-l-2 border-slate-100 pl-3 py-1">
                          {procedureGroups.map((group) => (
                            <div key={group.title}>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 py-1">
                                {group.title}
                              </p>
                              {group.items.slice(0, 4).map((proc) => (
                                <button
                                  key={proc.slug}
                                  type="button"
                                  onClick={() => handleNavClick(`procedure-${proc.slug}`)}
                                  className="block w-full text-left py-1 text-xs font-medium text-slate-600 hover:text-sky-700"
                                >
                                  {proc.title}
                                </button>
                              ))}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleNavClick('procedures')}
                            className="inline-flex items-center gap-1 pt-1 text-xs font-bold text-sky-600"
                          >
                            View All Procedures
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => handleNavClick(item.route)}
                    className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${doctorData.contactPhone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-800"
              >
                <Phone className="h-3.5 w-3.5 text-sky-600" />
                Call
              </a>
              <a
                href={`https://wa.me/${doctorData.whatsappNumber.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-800"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('book-consultation')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 py-3 text-sm font-semibold text-white shadow-sm active:bg-amber-700"
            >
              <Calendar className="h-4 w-4" />
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};