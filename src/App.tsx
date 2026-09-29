import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';

// Homepage Sections
import { HeroSection } from './components/home/HeroSection';
import { TrustCredentials } from './components/home/TrustCredentials';
import { InteractiveBeforeAfter } from './components/home/InteractiveBeforeAfter';
import { HospitalSection } from './components/home/HospitalSection';
import { ConsultationCTA } from './components/home/ConsultationCTA';
import { ConsultationSection } from './components/home/ConsultationSection';

// Dedicated Views
import { ProcedureDetailView } from './components/views/ProcedureDetailView';
import { ResultsGalleryView } from './components/views/ResultsGalleryView';
import { PatientStoriesView } from './components/views/PatientStoriesView';
import { ReviewsView } from './components/views/ReviewsView';
import { PricingView } from './components/views/PricingView';
import { InsightsView } from './components/views/InsightsView';
import { HospitalView } from './components/views/HospitalView';
import { ContactView } from './components/views/ContactView';
import { AskQuestionView } from './components/views/AskQuestionView';
import { BookConsultationView } from './components/views/BookConsultationView';
import { LocalLucknowView } from './components/views/LocalLucknowView';
import { AdminDashboardView } from './components/views/AdminDashboardView';

const routeFromPathname = (pathname: string): string => {
  const path = pathname.replace(/^\/+|\/+$/g, '');
  return path ? decodeURIComponent(path) : 'home';
};

const pathnameFromRoute = (route: string): string => {
  return route === 'home' ? '/' : `/${route}`;
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => routeFromPathname(window.location.pathname));
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  // Single Page Landing Navigation: All buttons scroll to corresponding sections on home
  const handleNavigate = (route: string) => {
    const sectionMap: Record<string, string> = {
      home: 'hero',
      hero: 'hero',
      results: 'results',
      'before-after': 'results',
      hospital: 'hospital',
      contact: 'consultation',
      'book-consultation': 'consultation',
      consultation: 'consultation',
    };

    const targetSection = sectionMap[route] || (route.startsWith('procedure-') ? 'results' : null);

    if (targetSection) {
      if (currentRoute !== 'home') {
        setCurrentRoute('home');
      }
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
      return;
    }

    if (route === currentRoute) {
      return;
    }

    window.history.pushState({}, '', pathnameFromRoute(route));
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(routeFromPathname(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    // Dynamic Procedure Detail Route: procedure-[slug]
    if (currentRoute.startsWith('procedure-')) {
      const slug = currentRoute.replace('procedure-', '');
      return <ProcedureDetailView procedureSlug={slug} onNavigate={handleNavigate} />;
    }

    // Dynamic Insight Detail Route: insight-[slug]
    if (currentRoute.startsWith('insight-')) {
      const slug = currentRoute.replace('insight-', '');
      return <InsightsView activeArticleSlug={slug} onNavigate={handleNavigate} />;
    }

    switch (currentRoute) {
      case 'about':
      case 'about-us':
      case 'doctor':
        window.location.replace('https://mycosmeticsurgery.in/dr-r-k-mishra-best-cosmetic-surgeon-in-lucknow/');
        return null;
      case 'procedures':
        window.location.replace('https://mycosmeticsurgery.in/services/');
        return null;
      case 'results':
        return <ResultsGalleryView onNavigate={handleNavigate} />;
      case 'patient-stories':
        return <PatientStoriesView onNavigate={handleNavigate} />;
      case 'reviews':
        return <ReviewsView onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingView onNavigate={handleNavigate} />;
      case 'insights':
        return <InsightsView onNavigate={handleNavigate} />;
      case 'hospital':
        return <HospitalView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView onNavigate={handleNavigate} />;
      case 'ask-question':
        return <AskQuestionView onNavigate={handleNavigate} />;
      case 'book-consultation':
        return <BookConsultationView onNavigate={handleNavigate} />;
      case 'local-seo':
        return <LocalLucknowView onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboardView onNavigate={handleNavigate} />;
      case 'home':
      default:
        return (
          <main>
            <HeroSection onNavigate={handleNavigate} />
            <TrustCredentials />
            <InteractiveBeforeAfter onNavigate={handleNavigate} />
            <HospitalSection onNavigate={handleNavigate} />
            <ConsultationSection onNavigate={handleNavigate} />
            <ConsultationCTA onNavigate={handleNavigate} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E293B] selection:bg-[#003366] selection:text-white font-sans antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] px-4 py-2 bg-white text-[#003366] border border-[#E2E8F0] rounded-md shadow-lg font-semibold"
      >
        Skip to main content
      </a>
      
      {/* Sticky Top Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={() => setLang(l => l === 'EN' ? 'HI' : 'EN')}
      />

      {/* Main Page Content Body - with top padding so fixed header never overlaps content */}
      <main id="main-content" key={currentRoute} className="flex-1 route-transition pt-[104px] sm:pt-[108px]">
        {renderContent()}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Floating Quick Action Bar (Call / WhatsApp / Book) */}
      <MobileBottomBar onNavigate={handleNavigate} />

    </div>
  );
}
