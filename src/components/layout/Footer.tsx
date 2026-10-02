import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube,
  ExternalLink,
  Calendar,
  ShieldCheck,
  Mail,
  MessageCircle
} from 'lucide-react';
import { Logo } from '../common/Logo';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onNavigate(id);
    }
  };

  const socialLinks = [
    {
      name: 'Email Clinical Desk',
      url: 'mailto:MyCosmeticSurgery@gmail.com?subject=Consultation%20Inquiry%20-%20Dr.%20R.K.%20Mishra',
      icon: Mail,
      hoverClass: 'hover:bg-[#00A3E0] hover:text-white',
      color: '#00A3E0'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/drrkmishra.sips',
      icon: Facebook,
      hoverClass: 'hover:bg-[#1877F2] hover:text-white',
      color: '#1877F2'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/drrkmishra.sips/',
      icon: Instagram,
      hoverClass: 'hover:bg-[#E4405F] hover:text-white',
      color: '#E4405F'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/DrRKMishraSips',
      icon: Youtube,
      hoverClass: 'hover:bg-[#CD201F] hover:text-white',
      color: '#CD201F'
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/rkmsips',
      customSvg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      hoverClass: 'hover:bg-white hover:text-black',
      color: '#000000'
    },
    {
      name: 'Pinterest',
      url: 'https://in.pinterest.com/dmishra0076/',
      customSvg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      ),
      hoverClass: 'hover:bg-[#E60023] hover:text-white',
      color: '#E60023'
    }
  ];

  return (
    <footer className="bg-[#001D3D] text-[#CBD5E1] font-sans border-t border-[#003366]">
      
      {/* Streamlined Landing Page Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: Brand & Credentials (6 cols on md) */}
          <div className="md:col-span-5 space-y-4">
            <div onClick={() => scrollTo('hero')} className="inline-block cursor-pointer">
              <Logo variant="white" />
            </div>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm max-w-md font-normal">
              <strong>My Cosmetic Surgery</strong> — Revamping Your Looks. Premier plastic, aesthetic and reconstructive surgery directed by ASPS Board Certified Plastic Surgeon <strong>Dr. R.K. Mishra</strong> (Managing Director &amp; Head of Plastic Surgery Dept., SIPS Super Specialty Hospital Pvt. Ltd., 25+ Yrs Exp • 30,000+ Surgeries).
            </p>

            {/* Clickable Social Media & Direct Email Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Connect with Dr. R.K. Mishra:
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-full bg-[#0A2E54] border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-200 cursor-pointer shadow-sm ${social.hoverClass}`}
                      aria-label={social.name}
                      title={social.name}
                    >
                      {social.customSvg ? (
                        social.customSvg
                      ) : (
                        Icon && <Icon className="w-4 h-4" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Essential Quick Navigation (3 cols on md) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <button 
                  onClick={() => scrollTo('hero')} 
                  className="hover:text-[#00A3E0] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('results')} 
                  className="hover:text-[#00A3E0] transition-colors cursor-pointer text-left"
                >
                  Before &amp; After Results
                </button>
              </li>
              <li>
                <a 
                  href="https://mycosmeticsurgery.in/dr-r-k-mishra-best-cosmetic-surgeon-in-lucknow/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00A3E0] transition-colors inline-flex items-center gap-1 text-left"
                >
                  <span>About Dr. R.K. Mishra</span>
                  <ExternalLink className="w-3 h-3 text-[#00A3E0]" />
                </a>
              </li>
              <li>
                <a 
                  href="https://mycosmeticsurgery.in/services/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00A3E0] transition-colors inline-flex items-center gap-1 text-left"
                >
                  <span>All Procedures &amp; Services</span>
                  <ExternalLink className="w-3 h-3 text-[#00A3E0]" />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('hospital')} 
                  className="hover:text-[#00A3E0] transition-colors cursor-pointer text-left"
                >
                  SIPS Hospital Infrastructure
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('consultation')} 
                  className="hover:text-[#00A3E0] transition-colors cursor-pointer text-left text-[#00A3E0] font-bold"
                >
                  Book Private Consultation →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hospital Clinic Location & Helpline (4 cols on md) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              Clinic &amp; Hospital Address
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Sushrut Institute of Plastic Surgery (SIPS) Hospital, 29, Shah Mina Rd, Lucknow, Uttar Pradesh 226003, India
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919795800800" className="hover:text-white font-semibold block transition-colors">
                    +91 9795 800 800
                  </a>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Calls: 10:00 AM – 5:00 PM (Mon – Sat)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/919795800800?text=Hello%20Dr.%20Mishra%20%2F%20SIPS%20Hospital%2C%20I%20would%20like%20to%20inquire%20regarding%20a%20consultation." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white font-semibold text-emerald-300 transition-colors"
                >
                  WhatsApp: +91 9795 800 800
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <a 
                  href="mailto:MyCosmeticSurgery@gmail.com?subject=Consultation%20Inquiry%20-%20Dr.%20R.K.%20Mishra" 
                  className="hover:text-white font-semibold transition-colors"
                  title="Click to email MyCosmeticSurgery@gmail.com"
                >
                  MyCosmeticSurgery@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>OPD &amp; Call Hours: 10:00 AM – 5:00 PM (Mon – Sat)</span>
              </div>
            </div>

            {/* Direct Book CTA Pill */}
            <div className="pt-2">
              <button
                onClick={() => scrollTo('consultation')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#00A3E0] hover:bg-[#008CC4] text-[#001D3D] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Calendar className="w-3.5 h-3.5 text-[#001D3D]" />
                <span>Schedule Consultation with Dr. Mishra</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Clean Bottom Legal Bar (pb-24 on mobile so MobileBottomBar never obscures it) */}
      <div className="border-t border-[#002B59] pt-4 pb-24 lg:pb-4 px-4 sm:px-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2026 My Cosmetic Surgery • Dr. R. K. Mishra • SIPS Super Specialty Hospital, Lucknow. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">NABH Accredited Tertiary Center</span>
            <span>•</span>
            <span className="text-slate-400">Dallas &amp; NYU Plastic Surgery Fellow</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
