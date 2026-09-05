import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  HelpCircle, 
  Clock, 
  Scale, 
  Sliders, 
  CreditCard, 
  Building2, 
  ArrowRight, 
  ChevronDown, 
  Compass,
  PhoneCall,
  Calendar,
  Layers
} from 'lucide-react';

interface InteractiveExperienceDockProps {
  onNavigate: (route: string) => void;
  currentRoute: string;
}

export const InteractiveExperienceDock: React.FC<InteractiveExperienceDockProps> = ({ 
  onNavigate,
  currentRoute 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCount, setActiveCount] = useState(7);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    {
      id: 'procedure-matcher-quiz',
      title: 'Procedure Matcher Quiz',
      tagline: 'Instant clinical recommendation in 3 steps',
      badge: 'Interactive',
      icon: HelpCircle,
      accentColor: 'from-[#003366] to-[#00A3E0]',
      iconColor: 'text-[#00A3E0]'
    },
    {
      id: 'recovery-timeline-simulator',
      title: 'Recovery Simulator',
      tagline: 'Day 1 to Month 6 post-op healing guide',
      badge: 'Timeline',
      icon: Clock,
      accentColor: 'from-[#0284C7] to-[#38BDF8]',
      iconColor: 'text-sky-400'
    },
    {
      id: 'procedure-comparison-matrix',
      title: 'Procedure Comparison',
      tagline: 'Surgical vs non-surgical direct matrix',
      badge: 'Comparison',
      icon: Scale,
      accentColor: 'from-[#002244] to-[#0A4580]',
      iconColor: 'text-[#00A3E0]'
    },
    {
      id: 'before-after-gallery',
      title: 'Interactive Results Slider',
      tagline: 'Drag-to-compare verified patient transformations',
      badge: 'Visual 4K',
      icon: Sliders,
      accentColor: 'from-[#0A4580] to-[#003366]',
      iconColor: 'text-emerald-400'
    },
    {
      id: 'surgery-emi-calculator',
      title: '0% Interest EMI Calculator',
      tagline: 'Compute monthly outlay & finance approval',
      badge: 'Financing',
      icon: CreditCard,
      accentColor: 'from-[#001D3D] to-[#003366]',
      iconColor: 'text-amber-400'
    },
    {
      id: 'deep-facial-anatomy',
      title: 'Deep Facial Architecture',
      tagline: 'Inspect 6 anatomical tiers: SMAS, nerves & bone',
      badge: 'Anatomy',
      icon: Layers,
      accentColor: 'from-[#001329] to-[#003366]',
      iconColor: 'text-[#00A3E0]'
    },
    {
      id: 'hospital-section',
      title: 'SIPS Hospital Laminar OTs',
      tagline: 'Class-100 sterile operating theatre tour',
      badge: 'Hospital',
      icon: Building2,
      accentColor: 'from-[#003366] to-[#0284C7]',
      iconColor: 'text-sky-300'
    }
  ];

  const handleToolClick = (toolId: string) => {
    setIsOpen(false);
    if (currentRoute !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(toolId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(toolId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        // Flash subtle highlight ring
        el.classList.add('ring-4', 'ring-[#00A3E0]/40', 'transition-all', 'duration-1000');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-[#00A3E0]/40');
        }, 1500);
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Dock (Bottom-Right, Hidden on small mobile screens where bottom bar exists) */}
      <aside 
        aria-label="Interactive Clinical Experience Suite"
        className="fixed bottom-6 right-6 z-40 hidden md:block select-none"
      >
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#001D3D]/95 hover:bg-[#003366] text-white shadow-xl hover:shadow-2xl border border-white/20 hover:border-[#00A3E0]/50 backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105"
            title="Open Interactive Clinical Suite"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#00A3E0] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00A3E0] animate-ping" />
            </div>

            <div className="text-left">
              <span className="text-xs font-bold tracking-wide block leading-none">
                Interactive Suite
              </span>
              <span className="text-xs text-[#00A3E0] font-semibold block leading-tight mt-0.5">
                6 Clinical Tools Active
              </span>
            </div>

            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center ml-1 group-hover:bg-[#00A3E0] group-hover:text-white transition-colors">
              <Compass className="w-3.5 h-3.5" />
            </div>
          </button>
        ) : (
          /* Expanded Interactive Suite Console */
          <div className="w-[380px] bg-[#001D3D]/95 backdrop-blur-xl border border-white/15 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200 text-white">
            
            {/* Header */}
            <div className="p-4 sm:p-5 pb-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#003366] border border-[#00A3E0]/30 flex items-center justify-center text-[#00A3E0]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wide">
                    Clinical Experience Suite
                  </h4>
                  <p className="text-xs text-slate-300">
                    Jump to any interactive diagnostic tool
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close suite"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of 6 Interactive Tools */}
            <div className="p-3 space-y-1.5 max-h-[380px] overflow-y-auto">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-[#00A3E0]/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <div className="w-9 h-9 rounded-xl bg-[#002B59] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className={`w-4 h-4 ${tool.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-white group-hover:text-[#00A3E0] transition-colors leading-tight">
                            {tool.title}
                          </h5>
                          <span className="text-xs font-semibold text-[#00A3E0]">
                            {tool.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                          {tool.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#00A3E0] group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Quick Direct Contact Action */}
            <div className="p-3 bg-[#001329] border-t border-white/10 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('book-consultation');
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-[#003366] hover:bg-[#002244] border border-[#00A3E0]/40 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>Book Consultation</span>
              </button>

              <a
                href="tel:+919415023675"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold"
                title="Call Helpline"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#00A3E0]" />
              </a>
            </div>

          </div>
        )}
      </aside>
    </>
  );
};
