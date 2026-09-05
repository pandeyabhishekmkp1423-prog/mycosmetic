import React from 'react';
import { ArrowRight, Sparkles, User, Heart, Activity, Shield, Feather } from 'lucide-react';

interface ProcedureExplorerProps {
  onNavigate: (route: string) => void;
}

export const ProcedureExplorer: React.FC<ProcedureExplorerProps> = ({ onNavigate }) => {
  const categories = [
    {
      title: 'Facial Surgery',
      subtitle: 'Rhinoplasty, facelift, eyelid surgery & more.',
      image: '/assets/proc_face.jpg',
      slug: 'rhinoplasty',
      icon: User
    },
    {
      title: 'Breast Surgery',
      subtitle: 'Augmentation, lift, reduction & reconstruction.',
      image: '/assets/proc_breast.jpg',
      slug: 'breast-augmentation',
      icon: Heart
    },
    {
      title: 'Body Contouring',
      subtitle: 'Liposuction, tummy tuck, 360 sculpting & more.',
      image: '/assets/proc_body.jpg',
      slug: 'liposuction',
      icon: Activity
    },
    {
      title: 'Male Procedures',
      subtitle: 'Gynecomastia, male chest & facial sculpting.',
      image: '/assets/proc_male.jpg',
      slug: 'gynecomastia',
      icon: Shield
    },
    {
      title: 'Non-Surgical',
      subtitle: 'Botox, dermal fillers, tightening & threads.',
      image: '/assets/proc_nonsurgical.jpg',
      slug: 'hair-transplant',
      icon: Feather
    },
    {
      title: 'Skin Treatments',
      subtitle: 'Laser resurfacing, microneedling & scar repair.',
      image: '/assets/proc_skincare.jpg',
      slug: 'scar-revision',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#00A3E0] uppercase block">
            Our Specialties
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-bold text-[#003366] tracking-tight">
            Surgical & Aesthetic Solutions
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Comprehensive reconstructive & aesthetic procedures performed at SIPS Super Specialty Hospital Lucknow.
          </p>
          <div className="w-16 h-[3px] bg-[#00A3E0] mx-auto rounded-full mt-4" />
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => onNavigate(`procedure-${item.slug}`)}
                className="clean-card bg-white overflow-hidden flex flex-col justify-between group cursor-pointer border border-[#E2E8F0] rounded-xl hover:shadow-xl hover:border-[#00A3E0]/40 transition-all"
              >
                <div>
                  {/* Photo with subtle top radius */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 text-center space-y-2 relative">
                    {/* Outline circular icon badge floating right above title */}
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center mx-auto -mt-8 shadow-sm text-[#003366] group-hover:text-[#00A3E0] relative z-10 transition-colors">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>

                    <h3 className="text-sm sm:text-base font-heading font-bold text-[#003366] pt-1 group-hover:text-[#00A3E0] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Learn More Button */}
                <div className="p-4 pt-0 text-center">
                  <button className="w-full py-2 px-3 border border-[#003366]/20 text-[10px] sm:text-[11px] font-bold tracking-[0.1em] uppercase text-[#003366] rounded-lg group-hover:bg-[#003366] group-hover:text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Procedures Action */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('procedures')}
            className="btn-navy px-8 py-3.5 rounded-lg shadow-sm"
          >
            <span>View All 30+ Procedures</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
