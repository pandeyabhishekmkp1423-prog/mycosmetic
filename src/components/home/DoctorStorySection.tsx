import React, { useState } from 'react';
import { Play, ShieldCheck, Building2, UserCheck, Sparkles, X } from 'lucide-react';

interface DoctorStorySectionProps {
  onNavigate: (route: string) => void;
}

export const DoctorStorySection: React.FC<DoctorStorySectionProps> = ({ onNavigate }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const features = [
    { title: 'Board-Certified Surgeons', icon: ShieldCheck },
    { title: 'State-of-the-Art Accredited Facility', icon: Building2 },
    { title: 'Personalized Patient Care', icon: UserCheck },
    { title: 'Long-Lasting Natural Results', icon: Sparkles }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Luxury Clinic Reception Image with Play Button (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] group">
              <img
                src="/assets/clinic_reception.jpg"
                alt="Clinic Reception & Waiting Lounge"
                className="w-full h-auto object-cover aspect-[16/10]"
              />

              {/* Centered Circular Play Button */}
              <button
                onClick={() => setVideoModalOpen(true)}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-md shadow-2xl flex items-center justify-center text-[#003366] hover:scale-110 hover:bg-white transition-all cursor-pointer group-hover:shadow-3xl"
                aria-label="Play clinic tour video"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-[#003366] ml-1" />
              </button>
            </div>
          </div>

          {/* Right: Editorial Story & Clinical Precision (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <span className="text-sm font-semibold tracking-widest text-[#00A3E0] uppercase block">
              About Dr. R. K. Mishra & SIPS Hospital
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003366] tracking-tight leading-[1.12]">
              Where Surgical Precision Meets <br />
              <span className="italic text-[#00A3E0] font-normal">Aesthetic Artistry.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              At <strong>My Cosmetic Surgery</strong>, we combine advanced surgical precision with high aesthetic harmony to deliver refined, natural results that enhance your self-confidence and quality of life. Led by Senior Plastic Surgeon <strong>Dr. R. K. Mishra</strong> (M.Ch Plastic Surgery, KGMC; Fellowships at Dallas & NYU), with over 25 years of specialized surgical excellence.
            </p>

            {/* 4 Clean Clinical Feature Cards in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.title}
                    className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] border border-[#00A3E0]/30 flex items-center justify-center shrink-0 text-[#003366]">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-[#0F172A]">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('doctor')}
                className="btn-outline-navy"
              >
                <span>Read Dr. Mishra's Full Profile</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-serif font-bold mb-4 text-[#003366]">
              Clinical Excellence & Hospital Tour
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Sushrut Institute of Plastic Surgery (SIPS Hospital Lucknow) features NABH-accredited laminar airflow Class 100 operating rooms and specialized aesthetic recovery suites.
            </p>
            <div className="rounded-xl overflow-hidden aspect-video bg-gray-900 flex items-center justify-center text-white">
              <div className="text-center p-6">
                <Building2 className="w-12 h-12 mx-auto text-[#00A3E0] mb-2" />
                <p className="text-sm font-semibold">NABH Accredited Hospital Facility</p>
                <p className="text-xs text-gray-400">Class 100 HEPA-Filtered OTs & VASER 4D Liposuction Technology</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
