import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Homepage Sections (Refined & Upgraded)
import { HeroSection } from './components/home/HeroSection';
import { TrustCredentials } from './components/home/TrustCredentials';
import { ProcedureExplorer } from './components/home/ProcedureExplorer';
import { DoctorStorySection } from './components/home/DoctorStorySection';
import { WhyDrMishra } from './components/home/WhyDrMishra';
import { InteractiveBeforeAfter } from './components/home/InteractiveBeforeAfter';
import { PatientStoriesSection } from './components/home/PatientStoriesSection';
import { HospitalSection } from './components/home/HospitalSection';
import { InsightsSection } from './components/home/InsightsSection';
import { HomeFaqSection } from './components/home/HomeFaqSection';
import { ConsultationCTA } from './components/home/ConsultationCTA';
import { ProcedureCostCalculator } from './components/common/ProcedureCostCalculator';

// World-Class Interactive Medical Tools
import { FindSurgeonSection } from './components/home/FindSurgeonSection';
import { ProcedureMatcherQuiz } from './components/home/ProcedureMatcherQuiz';
import { RecoveryTimelineSimulator } from './components/home/RecoveryTimelineSimulator';
import { ProcedureComparisonMatrix } from './components/home/ProcedureComparisonMatrix';
import { MedicalTourismConcierge } from './components/home/MedicalTourismConcierge';
import { DoctorCredentialsTimeline } from './components/home/DoctorCredentialsTimeline';
import { SurgeryEMICalculator } from './components/common/SurgeryEMICalculator';
import { InteractiveExperienceDock } from './components/common/InteractiveExperienceDock';
import { SkinStorySection } from './components/home/SkinStorySection';
import { DeepAnatomySection } from './components/home/DeepAnatomySection';

// Dedicated Views
import { DoctorView } from './components/views/DoctorView';
import { ProceduresDirectoryView } from './components/views/ProceduresDirectoryView';
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
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  // Keep the single-page views synchronized with the browser history.
  const handleNavigate = (route: string) => {
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

  // Keyboard shortcut for search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      case 'doctor':
        return <DoctorView onNavigate={handleNavigate} />;
      case 'procedures':
        return <ProceduresDirectoryView onNavigate={handleNavigate} />;
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
            <ProcedureExplorer onNavigate={handleNavigate} />
            <FindSurgeonSection onNavigate={handleNavigate} />
            <ProcedureMatcherQuiz onNavigate={handleNavigate} />
            <DoctorStorySection onNavigate={handleNavigate} />
            <DoctorCredentialsTimeline onNavigate={handleNavigate} />
            <DeepAnatomySection onNavigate={handleNavigate} />
            <SkinStorySection onNavigate={handleNavigate} />
            <RecoveryTimelineSimulator onNavigate={handleNavigate} />
            <InteractiveBeforeAfter onNavigate={handleNavigate} />
            <ProcedureComparisonMatrix onNavigate={handleNavigate} />
            <HospitalSection onNavigate={handleNavigate} />
            <MedicalTourismConcierge onNavigate={handleNavigate} />
            <PatientStoriesSection onNavigate={handleNavigate} />
            
            {/* Surgery Financing & Transparent Inclusions */}
            <section className="py-10 sm:py-14 bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <SurgeryEMICalculator onNavigate={handleNavigate} />
              </div>
            </section>

            <HomeFaqSection onNavigate={handleNavigate} />
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
        onOpenSearch={() => setIsSearchOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(l => l === 'EN' ? 'HI' : 'EN')}
      />

      {/* Main Page Content Body */}
      <main id="main-content" key={currentRoute} className="flex-1 route-transition">
        {renderContent()}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Floating Quick Action Bar (Call / WhatsApp / Book) */}
      <MobileBottomBar onNavigate={handleNavigate} />

      {/* Floating Interactive Experience Suite Dock (Next-Level UI Hub) */}
      <InteractiveExperienceDock
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
