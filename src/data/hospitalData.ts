export interface HospitalSlide {
  id: string;
  image: string;
  alt: string;
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
}

export const hospitalData = {
  name: 'SIPS Super Specialty Hospital (Pvt. Ltd.)',
  accreditation: 'NABH Accredited Superspeciality Hospital & Trauma Center',
  address: 'Sushrut Institute of Plastic Surgery (SIPS) Hospital, 29, Shah Mina Rd, Lucknow, Uttar Pradesh 226003, India',
  landmark: 'Near King George’s Medical University (KGMU), Chowk, Lucknow',
  phone: '+91 9795 800 800',
  emergencyPhone: '+91 9795 800 800',
  email: 'MyCosmeticSurgery@gmail.com',
  timings: '10:00 AM – 5:00 PM (Monday to Saturday)',
  consultationHours: '10:00 AM – 5:00 PM (Monday to Saturday)',
  callAvailability: '10:00 AM – 5:00 PM (Monday to Saturday)',
  overview: 'SIPS Super Specialty Hospital (Pvt. Ltd.) — Sushrut Institute of Plastic Surgery — is a premier NABH-accredited super-specialty surgical facility in Lucknow under the leadership of Managing Director and Head of Plastic Surgery Department, Dr. R.K. Mishra. Operating with 6 modular operating theatres, dedicated post-anesthesia recovery units, and 24/7 in-house critical care backup, SIPS provides a sterile, secure, and discrete environment for patients across India and overseas.',
  otDetails: 'SIPS Super Specialty Hospital (Pvt. Ltd.) houses 6 dedicated modular surgical suites equipped with ultra-clean Class 100 laminar airflow and HEPA positive-pressure filtration systems. Surgical instrumentation includes advanced Karl Storz high-definition endoscopy, ultrasonic harmonic scalpels, VASER power-assisted lipo-sculpting systems, and Zeiss operating microscopes for delicate micro-vascular reconstruction.',
  patientRooms: 'Patient accommodation at SIPS Super Specialty Hospital features private, deluxe aesthetic recovery suites created for maximum privacy, quiet recuperation, and personalized nursing. Each suite offers electric adjustable beds, attendant seating, en-suite bathrooms, high-speed Wi-Fi, and personalized dietary room service tailored to post-surgical healing protocols.',
  features: [
    {
      title: 'NABH Accredited Infrastructure',
      desc: 'Certified to uphold the highest benchmarks of clinical governance, patient safety, infection control, and sterile surgical care.'
    },
    {
      title: 'Modular Laminar Airflow Operating Suites',
      desc: 'State-of-the-art positive-pressure surgical theaters equipped with HEPA filtration, reducing surgical site infection rates to near zero.'
    },
    {
      title: 'Dedicated Aesthetic Inpatient Recovery Suites',
      desc: 'Private, tranquil inpatient suites designed for maximum discretion, post-operative comfort, 24/7 dedicated nursing, and high-speed Wi-Fi.'
    },
    {
      title: 'Full-Time Board Certified Anesthesiology Team',
      desc: 'Dedicated round-the-clock cardiac and neuro-anesthesiologists managing safe sedation and pre-operative health optimization.'
    },
    {
      title: 'Smile Train (USA) Cleft Care Center',
      desc: 'Internationally recognized humanitarian center directed by Project Director Dr. R.K. Mishra, providing comprehensive pediatric and adult cleft lip, palate, and facial reconstruction.'
    },
    {
      title: '24x7 Emergency & Advanced ICU Support',
      desc: 'Fully equipped Level-1 trauma response, in-house pharmacy, comprehensive pathology, and diagnostic digital imaging.'
    }
  ],
  gallery: [
    '/assets/hospital.png',
    '/assets/hospital-facility-2.jpeg',
    '/assets/hospital-facility-4.jpeg',
    '/assets/hospital-facility-1.jpeg',
    '/assets/hospital-facility-3.jpeg'
  ],
  slides: [
    {
      id: 'hospital-building',
      image: '/assets/hospital.png',
      alt: 'Sushrut Institute of Plastic Surgery (SIPS) Hospital Building, Lucknow',
      badge: 'NABH Accredited Tertiary Center',
      category: 'Hospital Infrastructure',
      title: 'SIPS Super Specialty Hospital Campus',
      subtitle: '29, Shah Mina Road, Chowk, Lucknow (Near KGMU)',
      description: 'North India’s premier NABH-accredited tertiary center dedicated to advanced aesthetic, plastic, and reconstructive surgery under the leadership of Managing Director Dr. R.K. Mishra.',
      specs: ['NABH Accredited', '6 Modular OTs', '24/7 ICU Support', 'Deluxe Private Suites']
    },
    {
      id: 'modular-ot-surgery',
      image: '/assets/hospital-facility-2.jpeg',
      alt: 'Intra-operative surgery in Class 100 Laminar Airflow Operating Suite at SIPS Hospital',
      badge: 'Class 100 Laminar Airflow OT',
      category: 'Modular Operating Suites',
      title: 'Advanced Intra-Operative Surgical Suite',
      subtitle: 'Ultra-Sterile Positive Pressure Environment',
      description: 'Dr. R. K. Mishra and specialized surgical team performing precision cosmetic surgery under multi-spectrum shadowless LED operating lamps with continuous HEPA positive airflow.',
      specs: ['HEPA Filtered Air', 'Shadowless LED OT Lamps', 'Sterile Field Protocol', 'Certified Scrub Team']
    },
    {
      id: 'dr-mishra-ot-leadership',
      image: '/assets/hospital-facility-4.jpeg',
      alt: 'Managing Director & Head of Plastic Surgery Dr. R. K. Mishra in SIPS Modular OT',
      badge: 'Surgical Leadership',
      category: 'Department Leadership',
      title: 'Dr. R. K. Mishra (M.Ch. Plastic Surgery)',
      subtitle: 'Managing Director & Head of Plastic Surgery Department',
      description: 'ASPS Board Certified Plastic Surgeon with over 15+ years of surgical mastery, personally overseeing surgical planning, meticulous execution, and postoperative care.',
      specs: ['ASPS Board Certified', 'Chang Gung Fellow', '15,000+ Surgeries', 'State-of-the-Art OT']
    },
    {
      id: 'anesthesia-monitoring',
      image: '/assets/hospital-facility-1.jpeg',
      alt: 'GE Healthcare Anesthesia Workstation & Nihon Kohden Life Scope Cardiac Monitor',
      badge: 'Anesthesia & Critical Care',
      category: 'Patient Safety Equipment',
      title: 'Advanced Anesthesia & Life-Support Station',
      subtitle: 'Continuous Hemodynamic & Multi-Parameter Monitoring',
      description: 'Ultra-modern GE Healthcare anesthesia delivery system paired with Nihon Kohden Life Scope precision telemetry for continuous vital monitoring throughout surgery.',
      specs: ['GE Healthcare Workstation', 'Nihon Kohden Telemetry', 'Continuous Vital Tracking', 'MD Anesthesiologist']
    },
    {
      id: 'surgeon-clinical-governance',
      image: '/assets/hospital-facility-3.jpeg',
      alt: 'Dr. R. K. Mishra Plastic Surgeon inside SIPS Operative Theater',
      badge: 'Clinical Governance & Trust',
      category: 'SIPS Plastic Surgery Department',
      title: 'Dedicated Aesthetic & Reconstructive Center',
      subtitle: 'Highest Ethical & Surgical Standards',
      description: 'Specialized plastic surgery facility equipped with Karl Storz HD endoscopy, VASER ultrasonic lipo-sculpting, and Zeiss operative micro-instruments.',
      specs: ['VASER Ultrasound Ready', 'Karl Storz HD Endoscopy', 'Zeiss Micro-Vascular Optics', 'NABH Compliant']
    }
  ] as HospitalSlide[]
};

