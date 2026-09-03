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

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  // Handle route change and scroll to top
  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <DoctorStorySection onNavigate={handleNavigate} />
            <WhyDrMishra onNavigate={handleNavigate} />
            <InteractiveBeforeAfter onNavigate={handleNavigate} />
            <PatientStoriesSection onNavigate={handleNavigate} />
            <HospitalSection onNavigate={handleNavigate} />
            <InsightsSection onNavigate={handleNavigate} />
            <HomeFaqSection />
            <ConsultationCTA onNavigate={handleNavigate} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FBFE] text-[#102A43] selection:bg-[#0B2A5B] selection:text-white font-sans antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-[#0B2A5B] focus:border focus:border-[#DCE7F0] focus:rounded-lg focus:shadow-lg"
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

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
