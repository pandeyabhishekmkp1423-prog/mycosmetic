import { BeforeAfterCase } from '../types';

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: 'rhino-01',
    procedureSlug: 'rhinoplasty',
    procedureName: 'Structural Preservation Rhinoplasty',
    category: 'FACE',
    patientInfo: 'Male, 28 Years | Lucknow',
    timeline: '6 Months Post-Op',
    description: 'Correction of pronounced dorsal bone hump, drooping tip on smile, and internal septal deviation. Achieved a clean, masculine straight nasal bridge and unrestricted airway.',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    keyImprovements: [
      'Eliminated dorsal hump while maintaining natural masculine bridge height',
      'Refined bulbous tip with auto-cartilage grafting',
      'Normalized nasal airflow with concurrent septoplasty'
    ]
  },
  {
    id: 'gyn-01',
    procedureSlug: 'gynecomastia',
    procedureName: 'Minimally Invasive Gynecomastia Correction',
    category: 'BREAST',
    patientInfo: 'Male, 24 Years | Kanpur',
    timeline: '3 Months Post-Op',
    description: 'Grade 2 mixed fibro-glandular and adipose male breast enlargement. Treated with sub-areolar gland excision and power-assisted peripheral chest liposuction.',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    keyImprovements: [
      'Sculpted athletic, flat pectoral chest profile',
      'Discreet sub-areolar micro-incision with virtually no visible scarring',
      'Restored full confidence in fitted shirts and sportswear'
    ]
  },
  {
    id: 'lipo-01',
    procedureSlug: 'liposuction',
    procedureName: 'High-Definition 360° Abdominal & Flank Liposculpture',
    category: 'BODY',
    patientInfo: 'Female, 34 Years | Varanasi',
    timeline: '4 Months Post-Op',
    description: 'Treatment of diet-resistant circumferential waist and lower abdominal fat deposits. Enhanced natural waist tapering and abdominal muscular lines.',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    keyImprovements: [
      'Extracted 3.8 Liters of targeted subcutaneous fat',
      'Defined lateral waist contour and athletic lumbar curve',
      'Smooth skin retraction with zero contour irregularities'
    ]
  },
  {
    id: 'tuck-01',
    procedureSlug: 'tummy-tuck',
    procedureName: 'Full Abdominoplasty & Rectus Diastasis Repair',
    category: 'BODY',
    patientInfo: 'Female, 39 Years | Lucknow',
    timeline: '6 Months Post-Op',
    description: 'Correction of postpartum rectus muscle separation (6cm diastasis) and extensive lower abdominal skin laxity with low concealed bikini incision.',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    keyImprovements: [
      'Internal vertical muscle plication restoring deep core stability',
      'Excision of 850g redundant skin apron and stretch marks',
      'Aesthetically recessed natural umbilicus creation'
    ]
  },
  {
    id: 'chin-01',
    procedureSlug: 'chin-correction',
    procedureName: 'Anatomical Chin Augmentation & Jawline Sculpting',
    category: 'FACE',
    patientInfo: 'Male, 31 Years | Prayagraj',
    timeline: '8 Weeks Post-Op',
    description: 'Intraoral anatomical silicone chin implant placed to correct severe microgenia (receding chin) and define the cervicofacial angle.',
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    keyImprovements: [
      'Increased anterior chin projection by 7mm',
      'Balanced profile relationship with the nasal tip',
      'Zero external facial incisions performed completely intraorally'
    ]
  }
];
