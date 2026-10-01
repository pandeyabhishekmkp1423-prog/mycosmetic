import { Procedure } from '../types';

export const proceduresData: Procedure[] = [
  {
    slug: 'rhinoplasty',
    title: 'Rhinoplasty',
    subtitle: 'Preservation & Structural Aesthetic Nose Reshaping',
    category: 'FACE',
    shortDesc: 'Refine nasal contours, correct dorsal humps, refine nasal tips, and restore optimal airway breathing with natural facial balance.',
    overview: 'Rhinoplasty (cosmetic and functional nose surgery) is one of Dr. R. K. Mishra’s primary clinical specializations. Using modern structural and preservation rhinoplasty techniques, the procedure reshapes bone, cartilage, and soft tissue to achieve an aesthetically balanced nose that harmonizes seamlessly with your facial profile while preserving or improving respiratory function.',
    idealCandidate: [
      'Individuals looking to correct a prominent dorsal hump, crooked bridge, or wide nasal bones',
      'Patients seeking refinement of a bulbous, drooping, or asymmetrical nasal tip',
      'Those experiencing breathing obstruction due to a deviated nasal septum (Septorhinoplasty)',
      'Individuals with realistic expectations who desire proportional, natural-looking results',
      'Non-smokers in good overall health with completed facial growth'
    ],
    procedureSteps: [
      'Comprehensive digital photographic analysis & bespoke aesthetic consultation with Dr. Mishra',
      'Administration of customized general anesthesia for complete patient comfort',
      'Precise closed (endonasal) or open structural incisions with micro-cartilage sculpting',
      'Structural septal grafting and preservation alignment for lifetime stability',
      'Placement of internal silicone splints and lightweight external protective nasal cast'
    ],
    anesthesiaType: 'General Anesthesia (NABH Accredited Surgical Suite)',
    duration: '2.5 – 3.5 Hours',
    hospitalStay: 'Daycare or 1 Night Stay at SIPS Hospital',
    recoveryTimeline: '7–10 days for splint removal and return to desk work; 3–4 weeks for active exercise; final structural definition settles over 6–12 months.',
    expectedResults: 'A harmonious nasal profile that enhances overall facial attractiveness without ever looking artificial or surgically operated on.',
    risksAndSafety: [
      'Temporary bruising and periorbital swelling (resolves in 7–10 days)',
      'Mild temporary nasal congestion during the initial healing period',
      'Performed in dedicated laminar airflow operating suites minimizing infection risks'
    ],
    costRange: '₹65,000 – ₹1,35,000',
    priceStartingFrom: 65000,
    featured: true,
    image: '/cases/02-rhinoplasty-male-facial-contouring_full.jpg',
    beforeAfterCaseIds: ['rhino-01', 'rhino-02'],
    tags: ['Nose Job', 'Dorsal Hump', 'Septorhinoplasty', 'Tip Plasty', 'Facial Harmony'],
    relatedSlugs: ['chin-correction', 'facelift', 'blepharoplasty'],
    faqs: [
      {
        question: 'How long do I need to wear the nasal cast after rhinoplasty?',
        answer: 'The external protective nasal splint/cast is typically removed in the clinic between day 6 and day 7 post-surgery. Most swelling subsides significantly over the subsequent two weeks.'
      },
      {
        question: 'Will there be visible external scars?',
        answer: 'In closed rhinoplasty, all incisions are entirely internal. In open rhinoplasty, a tiny 3mm inverted-V incision across the columella fades into an almost imperceptible hairline mark within a few months.'
      },
      {
        question: 'Can rhinoplasty fix breathing difficulties as well?',
        answer: 'Yes. Dr. Mishra frequently performs septorhinoplasty, correcting internal septal deviation and turbinate hypertrophy simultaneously during the cosmetic refinement.'
      }
    ]
  },
  {
    slug: 'gynecomastia',
    title: 'Gynecomastia Surgery',
    subtitle: 'Minimally Invasive & Nearly Scarless Male Chest Contouring',
    category: 'BREAST',
    shortDesc: 'Eliminate enlarged glandular breast tissue and stubborn fat deposits to sculpt a firm, masculine, athletic chest contour.',
    overview: 'Male breast enlargement (gynecomastia) affects men of all ages due to hormonal fluctuations, genetics, or medication. Dr. R. K. Mishra is widely regarded as a pioneer in minimally invasive, scarless gynecomastia correction, combining power-assisted liposculpture with precise sub-areolar micro-glandular excision.',
    idealCandidate: [
      'Men with persistent chest enlargement or puffy nipples that do not respond to diet and exercise',
      'Patients feeling self-conscious in fitted clothing or during swimming and physical activities',
      'Non-smokers with stable weight and good overall health'
    ],
    procedureSteps: [
      'Pre-operative ultrasound evaluation to determine exact ratio of glandular vs adipose tissue',
      'Tumescent infiltration with specialized local anesthetic and vasoconstrictor solution',
      'Power-assisted VASER/Micro-cannula liposuction of peripheral chest fat',
      'Periareolar micro-incision for direct excision of dense fibrous glandular tissue',
      'Application of customized high-compression post-surgical chest garment'
    ],
    anesthesiaType: 'Sedation / General Anesthesia (NABH Accredited)',
    duration: '1.5 – 2 Hours',
    hospitalStay: 'Daycare (Discharge on the same day)',
    recoveryTimeline: 'Return to office work in 2–3 days; light cardio in 10 days; weight training and intense chest workouts in 4 weeks.',
    expectedResults: 'A flat, contoured, masculine chest contour with permanent removal of glandular tissue.',
    risksAndSafety: [
      'Mild bruising and tightness (managed comfortably with oral medications)',
      'Wearing compression vest for 4 weeks ensures smooth skin retraction and optimal definition'
    ],
    costRange: '₹45,000 – ₹85,000',
    priceStartingFrom: 45000,
    featured: true,
    image: '/cases/01-gynecomastia-male-chest-sculpting_full.jpg',
    beforeAfterCaseIds: ['gyn-01'],
    tags: ['Male Breast Reduction', 'Puffy Nipple', 'Chest Contouring', 'VASER Liposuction'],
    relatedSlugs: ['liposuction', 'tummy-tuck'],
    faqs: [
      {
        question: 'Can gynecomastia return after surgery?',
        answer: 'Because the glandular tissue is permanently excised and fat cells are removed, recurrence is extremely rare as long as weight is maintained and anabolic steroids are avoided.'
      },
      {
        question: 'How visible are the incisions?',
        answer: 'Incisions are strategically hidden along the natural lower semi-circular border of the dark areola and lateral chest crease, making them virtually unnoticeable once fully matured.'
      }
    ]
  },
  {
    slug: 'liposuction',
    title: 'Liposuction & Body Sculpting',
    subtitle: 'High-Definition 360° Liposculpture & Fat Redistribution',
    category: 'BODY',
    shortDesc: 'Target localized, resistant fat pockets across the abdomen, flanks, back, thighs, arms, and neck for defined anatomical contours.',
    overview: 'Liposuction under Dr. R. K. Mishra is an artistic body contouring discipline rather than a weight-loss method. Utilizing advanced power-assisted and ultrasonic techniques, Dr. Mishra removes stubborn fat deposits while accentuating natural athletic muscular highlights and silhouette curves.',
    idealCandidate: [
      'Individuals within or near 10–15% of their healthy goal weight',
      'Patients with persistent localized fat on abdomen, love handles, thighs, arms, or double chin',
      'Individuals with good skin elasticity seeking enhanced muscle definition and body proportion'
    ],
    procedureSteps: [
      'Precision standing anatomical topographic vector mapping of fat deposits',
      'Infusion of specialized tumescent solution to minimize bleeding and facilitate gentle fat aspiration',
      'High-definition cannula aspiration sculpting key muscular transitions (linea alba, rectus contours)',
      'Optional autologous fat grafting (fat transfer to gluteal, facial, or breast regions)',
      'Immediate fitting of clinical compression garment'
    ],
    anesthesiaType: 'Tumescent Local / Sedation / General Anesthesia',
    duration: '2 – 3 Hours',
    hospitalStay: 'Daycare or 1 Night Stay',
    recoveryTimeline: 'Return to routine work in 4–5 days; resumption of light gym training in 2 weeks; compression garment worn for 4–6 weeks.',
    expectedResults: 'Dramatically streamlined silhouette, refined waistline, and permanent reduction of targeted subcutaneous fat cells.',
    risksAndSafety: [
      'Temporary swelling, fluid drainage, and numbness in treated zones',
      'Strict adherence to international fluid-balance and safety guidelines at SIPS Hospital'
    ],
    costRange: '₹55,000 – ₹1,45,000',
    priceStartingFrom: 55000,
    featured: true,
    image: '/cases/03-tummy-tuck-waist-liposculpture_full.jpg',
    beforeAfterCaseIds: ['lipo-01'],
    tags: ['High Definition Liposuction', 'Love Handles', 'Abdominal Sculpting', 'Double Chin', '360 Lipo'],
    relatedSlugs: ['tummy-tuck', 'gynecomastia', 'mommy-makeover'],
    faqs: [
      {
        question: 'Is liposuction a substitute for weight loss?',
        answer: 'No. Liposuction is designed for body contouring and reshaping stubborn problem areas that diet and workouts cannot address. Candidates should be relatively close to their target weight.'
      },
      {
        question: 'Are the results of liposuction permanent?',
        answer: 'Yes, the removed fat cells cannot regenerate. Maintaining a balanced lifestyle and stable weight ensures lifetime aesthetic results.'
      }
    ]
  },
  {
    slug: 'tummy-tuck',
    title: 'Tummy Tuck (Abdominoplasty)',
    subtitle: 'Complete Abdominal Muscle Repair & Skin Tightening',
    category: 'BODY',
    shortDesc: 'Restore a taut, flat midsection by repairing separated abdominal muscles (diastasis recti) and excising loose excess skin.',
    overview: 'Pregnancy, significant weight loss, or aging can stretch the abdominal rectus muscles and cause lax, drooping skin that cannot be toned through exercise alone. Abdominoplasty directly repairs internal muscle separation and removes redundant overhang to create a flat, contoured abdomen.',
    idealCandidate: [
      'Post-pregnancy mothers with separated abdominal muscles and lax stretched skin',
      'Men and women following massive weight loss with hanging abdominal folds',
      'Patients with lower abdominal aprons or stretch marks seeking a tighter profile'
    ],
    procedureSteps: [
      'Low, bikini-line incision mapped so it remains discreetly concealed under swimwear',
      'Elevation of abdominal skin and subcutaneous fat flap up to the ribcage',
      'Internal vertical plication (tightening) of the rectus abdominis muscles',
      'Repositioning and natural aesthetic refinement of the umbilicus (belly button)',
      'Excision of excess lower skin and multi-layer tension-free closure'
    ],
    anesthesiaType: 'General Anesthesia (NABH Accredited)',
    duration: '3 – 4 Hours',
    hospitalStay: '1 – 2 Nights at SIPS Hospital',
    recoveryTimeline: 'Walking on day 1; desk work resumed in 10–14 days; full physical activity and gym workouts at 6–8 weeks.',
    expectedResults: 'A flat, firm, tight abdomen with improved core support and posture.',
    risksAndSafety: [
      'Low horizontal scar placed strategically below the bikini line',
      'Multi-layer closure with deep tension sutures to protect vascularity and promote smooth healing'
    ],
    costRange: '₹95,000 – ₹1,80,000',
    priceStartingFrom: 95000,
    featured: true,
    image: '/cases/05-abdominoplasty-panniculectomy-tummy-tuck_full.jpg',
    beforeAfterCaseIds: ['tuck-01'],
    tags: ['Abdominoplasty', 'Diastasis Recti', 'Mommy Makeover', 'Loose Skin Removal'],
    relatedSlugs: ['liposuction', 'mommy-makeover'],
    faqs: [
      {
        question: 'What is the difference between liposuction and a tummy tuck?',
        answer: 'Liposuction only removes excess fat when skin elasticity is good and muscles are intact. A tummy tuck tightens separated underlying muscles and removes loose hanging skin.'
      },
      {
        question: 'Where is the scar placed?',
        answer: 'The incision is placed very low across the lower pelvis, designed to be completely hidden underneath standard underwear and bikini bottoms.'
      }
    ]
  },
  {
    slug: 'chin-correction',
    title: 'Profile Harmony & Rhinoplasty',
    subtitle: 'Female Profile Balancing & Dorsal Hump Refinement',
    category: 'FACE',
    shortDesc: 'Harmonize your facial profile through preservation rhinoplasty, gentle dorsal hump reduction, tip rotation, and natural structural balancing.',
    overview: 'A well-defined chin anchors facial proportion and frames a crisp, youthful neck-jaw angle. Dr. Mishra performs customized genioplasty using anatomical biocompatible implants or precision sliding osteotomy to bring the chin into balanced alignment with the nose and lips.',
    idealCandidate: [
      'Individuals with a weak, receding chin causing the nose to look disproportionately large',
      'Patients with a blunt or poorly defined jawline-neck transition',
      'Those seeking permanent facial profile harmony'
    ],
    procedureSteps: [
      'Cephalometric and photographic profile balancing analysis',
      'Selection of custom anatomical implant or precision intraoral approach',
      'Secure surgical fixation of implant over the mandibular bone',
      'Internal dissolving sutures with zero external facial scarring'
    ],
    anesthesiaType: 'Local Anesthesia with Sedation or General Anesthesia',
    duration: '1 – 1.5 Hours',
    hospitalStay: 'Daycare procedure',
    recoveryTimeline: 'Return to work in 3–5 days; mild swelling resolves in 1–2 weeks.',
    expectedResults: 'A defined, strong jawline and balanced facial profile in both front and side views.',
    risksAndSafety: [
      'Temporary chin stiffness and tightness for the first 5–7 days',
      'Completely hidden intraoral incision leaves no external scar'
    ],
    costRange: '₹40,000 – ₹75,000',
    priceStartingFrom: 40000,
    featured: true,
    image: '/cases/07-genioplasty-chin-enhancement_full.jpg',
    beforeAfterCaseIds: ['chin-01'],
    tags: ['Genioplasty', 'Chin Implant', 'Jawline Contouring', 'Profile Harmony'],
    relatedSlugs: ['rhinoplasty', 'facelift', 'buccal-fat-reduction'],
    faqs: [
      {
        question: 'Will there be any visible scar on my face?',
        answer: 'No. The procedure is typically performed through a small incision made inside the mouth between the lower lip and gum, leaving no external marks.'
      }
    ]
  },
  {
    slug: 'facelift',
    title: 'Facelift & Neck Lift (Rhytidectomy)',
    subtitle: 'Deep-Plane Structural Facial Rejuvenation & Muscle Repositioning',
    category: 'FACE',
    shortDesc: 'Rejuvenate mid-face sagging, smooth deep nasolabial folds, and tighten lax neck bands for a refreshed, 10–15 years younger appearance.',
    overview: 'Rather than pulling skin tight, Dr. R. K. Mishra’s facelift technique repositions the underlying superficial musculoaponeurotic system (SMAS) and deep facial retaining ligaments. This restores youthful volume to the cheeks, sharpens the jawline, and tightens neck contours while preserving dynamic facial expression.',
    idealCandidate: [
      'Individuals aged 40–70+ experiencing moderate to severe facial sagging and jowling',
      'Patients with loose, banded neck skin and loss of jawline definition',
      'Those seeking comprehensive, long-lasting facial rejuvenation'
    ],
    procedureSteps: [
      'Pre-operative dynamic vector mapping of facial tissues',
      'Inconspicuous incisions traced along the natural auricular ear contours and hairline',
      'Elevation, structural tightening, and suspension of the deep SMAS layer',
      'Platysmaplasty (neck muscle tightening) to eliminate vertical neck bands',
      'Redraping of skin with zero tension to ensure soft, natural healing'
    ],
    anesthesiaType: 'General Anesthesia (NABH Accredited)',
    duration: '3.5 – 5 Hours',
    hospitalStay: '1 Night Stay at SIPS Hospital',
    recoveryTimeline: 'Initial recovery in 10–14 days; social recovery at 2–3 weeks; full rejuvenation settles beautifully at 2–3 months.',
    expectedResults: 'A natural, elegantly refreshed facial appearance that turns back the clock by 10 to 15 years without a "pulled" look.',
    risksAndSafety: [
      'Temporary swelling and minor bruising managed with cold compresses and head elevation',
      'Expert nerve mapping protocols ensure full preservation of facial nerve function'
    ],
    costRange: '₹1,20,000 – ₹2,50,000',
    priceStartingFrom: 120000,
    featured: false,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    tags: ['Facelift', 'Neck Lift', 'SMAS Lift', 'Anti-Aging', 'Jowl Reduction'],
    relatedSlugs: ['blepharoplasty', 'rhinoplasty', 'chin-correction'],
    faqs: [
      {
        question: 'Will I look "windblown" or artificial?',
        answer: 'No. Modern deep-plane and SMAS facelifts lift the deep structural muscle layers rather than tensioning the skin, ensuring you look like yourself, only 10 to 15 years more rested and vibrant.'
      }
    ]
  },
  {
    slug: 'blepharoplasty',
    title: 'Eyelid Surgery (Blepharoplasty)',
    subtitle: 'Upper & Lower Periorbital Rejuvenation & Bag Removal',
    category: 'FACE',
    shortDesc: 'Remove drooping upper eyelid skin and eliminate under-eye bags, dark hollows, and puffiness for an alert, rested gaze.',
    overview: 'The eyes are often the first area to show signs of fatigue and aging. Blepharoplasty removes excess hooded skin from the upper lids and repositions herniated orbital fat in the lower lids, restoring crisp periorbital contours.',
    idealCandidate: [
      'Individuals with drooping upper eyelid skin that impairs vision or causes a tired look',
      'Patients with chronic under-eye bags, puffiness, or dark tear-trough hollows',
      'Healthy adults seeking bright, refreshed eyes'
    ],
    procedureSteps: [
      'Precise micro-incision placement along upper eyelid natural crease or transconjunctival internal lower lid',
      'Conservative excision of lax skin and delicate fat pad repositioning',
      'Microscopic tension-free suturing for invisible scar maturation'
    ],
    anesthesiaType: 'Local Anesthesia with Sedation or General Anesthesia',
    duration: '1 – 2 Hours',
    hospitalStay: 'Daycare procedure',
    recoveryTimeline: 'Stitches removed on day 5; return to work in 5–7 days; contact lenses worn after 10 days.',
    expectedResults: 'Bright, rested, and youthful eyes with no disruption to natural eye shape.',
    risksAndSafety: ['Mild swelling and dry eyes for 3–5 days, treated with lubricating drops.'],
    costRange: '₹35,000 – ₹70,000',
    priceStartingFrom: 35000,
    featured: true,
    image: '/cases/08-blepharoplasty-eyelid-rejuvenation_full.jpg',
    beforeAfterCaseIds: ['bleph-01'],
    tags: ['Eyelid Surgery', 'Under Eye Bags', 'Hooded Eyelids', 'Periorbital'],
    relatedSlugs: ['facelift', 'rhinoplasty'],
    faqs: [
      {
        question: 'Will eyelid surgery change the shape of my eyes?',
        answer: 'No. The goal is periorbital rejuvenation, removing redundant skin folds and bags while maintaining your authentic eye shape.'
      }
    ]
  },
  {
    slug: 'breast-augmentation',
    title: 'Breast Augmentation',
    subtitle: 'FDA-Approved Cohesive Silicone Implants & Hybrid Fat Grafting',
    category: 'BREAST',
    shortDesc: 'Enhance breast volume, symmetry, and cleavage projection using premium FDA-approved implants or natural autologous fat transfer.',
    overview: 'Breast augmentation enhances size, shape, and proportion for women seeking to restore post-pregnancy volume loss or achieve greater silhouette symmetry. Dr. Mishra utilizes international safety protocols, selecting cohesive silicone gel implants tailored to your thoracic anatomy.',
    idealCandidate: [
      'Women seeking fuller breast proportion or correction of natural asymmetry',
      'Mothers experiencing volume loss and deflated appearance after nursing',
      'Patients wanting natural feel and certified lifetime-warranty implants'
    ],
    procedureSteps: [
      'Detailed 3D sizing analysis and implant profile selection (Smooth/Micro-textured, High/Moderate projection)',
      'Subpectoral (dual-plane) or subfascial pocket dissection through hidden inframammary or periareolar incisions',
      'Implantation with no-touch technique to ensure maximum sterility and safety',
      'Multi-layer internal closure'
    ],
    anesthesiaType: 'General Anesthesia (NABH Accredited)',
    duration: '1.5 – 2.5 Hours',
    hospitalStay: 'Daycare or 1 Night Stay',
    recoveryTimeline: 'Return to desk work in 3–5 days; supportive bra worn for 6 weeks; gym workouts resumed at 6 weeks.',
    expectedResults: 'Fuller, natural-feeling breasts with ideal cleavage and upper-pole fullness.',
    risksAndSafety: [
      'Only US-FDA approved Mentor/Motiva/Allergan cohesive gel implants are used with serial authentication'
    ],
    costRange: '₹1,10,000 – ₹1,95,000',
    priceStartingFrom: 110000,
    featured: false,
    image: '/cases/06-breast-augmentation-mammoplasty_full.jpg',
    beforeAfterCaseIds: ['breast-01'],
    tags: ['Breast Implants', 'Silicone Gel', 'Dual Plane', 'Breast Enlargement'],
    relatedSlugs: ['breast-reduction', 'tummy-tuck', 'mommy-makeover'],
    faqs: [
      {
        question: 'Can I still breastfeed after breast augmentation?',
        answer: 'Yes. With dual-plane submuscular placement, the milk ducts and mammary glands remain completely undisturbed, preserving breastfeeding ability in the vast majority of women.'
      }
    ]
  },
  {
    slug: 'breast-reduction',
    title: 'Breast Reduction & Lift (Mastopexy)',
    subtitle: 'Alleviate Physical Strain & Restore Perky, Balanced Contours',
    category: 'BREAST',
    shortDesc: 'Relieve chronic neck, shoulder, and back pain by reducing heavy, pendulous breast tissue and elevating the nipple-areola complex.',
    overview: 'Disproportionately large breasts frequently cause chronic postural strain, bra strap grooving, and skin irritation. Breast reduction (reduction mammaplasty) removes excess glandular tissue, fat, and skin while elevating the breast to a light, lifted position.',
    idealCandidate: [
      'Women experiencing persistent neck, upper back, or shoulder pain from heavy breasts',
      'Individuals with severe breast ptosis (sagging) or stretched areolae',
      'Patients seeking athletic freedom and better proportioned clothing fit'
    ],
    procedureSteps: [
      'Pre-operative vector mapping of superior/inferior pedicle blood supply',
      'Excision of excess lower and lateral glandular breast tissue',
      'Superior repositioning of the nipple-areola complex with preserved sensation',
      'Internal parenchymal reshaping and skin tightening'
    ],
    anesthesiaType: 'General Anesthesia',
    duration: '2.5 – 3.5 Hours',
    hospitalStay: '1 Night Stay at SIPS Hospital',
    recoveryTimeline: 'Return to non-strenuous work in 7–10 days; supportive athletic bra worn for 6 weeks.',
    expectedResults: 'Lighter, elevated, firmer breasts with immediate relief from upper back and neck strain.',
    risksAndSafety: ['Precision pedicle preservation technique safeguards nipple sensation and blood supply.'],
    costRange: '₹85,000 – ₹1,60,000',
    priceStartingFrom: 85000,
    featured: true,
    image: '/cases/06b-breast-reduction-mastopexy_full.jpg',
    beforeAfterCaseIds: ['breast-red-01'],
    tags: ['Breast Reduction', 'Mastopexy', 'Back Pain Relief', 'Breast Lift'],
    relatedSlugs: ['breast-augmentation', 'tummy-tuck', 'mommy-makeover'],
    faqs: [
      {
        question: 'Will my insurance cover breast reduction?',
        answer: 'If severe symptomatic neck/back pain and bra grooving are clinically documented, partial insurance or medical claims may be supported. SIPS Hospital provides full medical documentation for insurance approval.'
      }
    ]
  },
  {
    slug: 'buccal-fat-reduction',
    title: 'Buccal Fat Reduction & Jawline Contouring',
    subtitle: 'Permanent Cheek Hollow Definition & V-Line Facial Sculpting',
    category: 'FACE',
    shortDesc: 'Slim down round "chubby" cheeks from the inside of the mouth to reveal sculpted cheekbones and an elegant, chiseled facial profile.',
    overview: 'Buccal fat pads are deep encapsulated fat pockets in the lower mid-face. For individuals with persistent round or baby-faced cheeks despite being thin, conservative removal of buccal fat carves subtle cheek hollows and sharpens the jawline.',
    idealCandidate: [
      'Adults with excess fullness in the lower cheeks causing a heavy or round appearance',
      'Individuals with good zygomatic (cheekbone) bone structure desiring sculpted definition'
    ],
    procedureSteps: [
      'Small 1cm incision made inside the mouth along the upper buccal mucosa',
      'Gentle tease and extraction of the walnut-sized buccal fat capsule',
      'Self-dissolving stitches requiring zero suture removal'
    ],
    anesthesiaType: 'Local Anesthesia (Quick Outpatient Procedure)',
    duration: '30 – 45 Minutes',
    hospitalStay: 'Outpatient (Go home within 1 hour)',
    recoveryTimeline: 'Return to routine activities the next day; mild cheek swelling subsides in 7–10 days.',
    expectedResults: 'A slimmer lower face, enhanced cheekbone shadow, and defined V-line contour.',
    risksAndSafety: ['Zero external cuts or scars on the skin.'],
    costRange: '₹30,000 – ₹55,000',
    priceStartingFrom: 30000,
    featured: false,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
    tags: ['Buccal Fat Removal', 'Cheek Slimming', 'V-Line Face', 'Jawline Definition'],
    relatedSlugs: ['chin-correction', 'rhinoplasty', 'facelift'],
    faqs: [
      {
        question: 'Is buccal fat reduction painful?',
        answer: 'No. The procedure is performed comfortably under local anesthesia and takes only about 30 to 40 minutes, similar to a routine dental visit.'
      }
    ]
  },
  {
    slug: 'mommy-makeover',
    title: 'Mommy Makeover',
    subtitle: 'Comprehensive Post-Pregnancy Restoration Surgery',
    category: 'BODY',
    shortDesc: 'A customized single-session combination of tummy tuck, breast enhancement, and 360° liposuction to restore your pre-baby body.',
    overview: 'Pregnancy and nursing create profound anatomical changes across the abdomen, breasts, and waistline. A Mommy Makeover is a tailored combination of procedures performed during a single surgical session to restore core firmness, lift and project the breasts, and sculpt the waist.',
    idealCandidate: [
      'Mothers who have finished childbearing and wish to restore their pre-pregnancy physique',
      'Women with combined abdominal muscle laxity, deflated breasts, and stubborn waist fat',
      'Non-smokers in good cardiovascular health'
    ],
    procedureSteps: [
      'Comprehensive multi-zone surgical planning with Dr. Mishra',
      'Simultaneous 360-degree liposuction of waist, flanks, and lower back',
      'Abdominoplasty (muscle repair and removal of c-section overhang/stretch marks)',
      'Breast restoration (implant augmentation, lift, or combination)'
    ],
    anesthesiaType: 'General Anesthesia (NABH Accredited)',
    duration: '4 – 5.5 Hours',
    hospitalStay: '1 – 2 Nights Stay at SIPS Hospital',
    recoveryTimeline: '7–14 days for desk activities; full return to high-impact fitness at 6–8 weeks.',
    expectedResults: 'A firm, flat abdomen, perky contoured breasts, and a dramatically refined hourglass silhouette.',
    risksAndSafety: ['Carefully coordinated multi-team surgical protocols ensuring optimal anesthesia safety.'],
    costRange: '₹1,60,000 – ₹2,90,000',
    priceStartingFrom: 160000,
    featured: false,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mommy Makeover', 'Tummy Tuck', 'Breast Lift', 'Body Transformation'],
    relatedSlugs: ['tummy-tuck', 'liposuction', 'breast-augmentation'],
    faqs: [
      {
        question: 'When should I schedule a Mommy Makeover after giving birth?',
        answer: 'It is recommended to wait at least 6 months after finishing breastfeeding and when you have returned to a stable body weight.'
      }
    ]
  },
  {
    slug: 'scar-revision',
    title: 'Scar Revision & Keloid Treatment',
    subtitle: 'Advanced Surgical & Non-Surgical Scar Erasure',
    category: 'SKIN',
    shortDesc: 'Minimize noticeable facial and body surgical, burn, or trauma scars using W-plasty, geometric broken-line excision, and laser smoothing.',
    overview: 'While no scar can be erased 100%, advanced plastic surgery techniques can dramatically reduce scar visibility, reorient tension vectors along relaxed skin tension lines (RSTL), and restore smooth skin texture.',
    idealCandidate: [
      'Patients with thick, raised hypertrophic scars or keloids causing tightness or distress',
      'Individuals with depressed acne scars or irregular post-accident trauma marks'
    ],
    procedureSteps: [
      'Scar topology assessment and vector analysis',
      'Surgical excision with geometric micro-interposition (Z-plasty or W-plasty)',
      'Tension-relieving deep dermal suturing and post-op silicone sheet/steroid protocol'
    ],
    anesthesiaType: 'Local Anesthesia',
    duration: '45 – 90 Minutes',
    hospitalStay: 'Outpatient Daycare',
    recoveryTimeline: 'Stitches removed in 5–7 days; scar maturation continues to soften over 6 months.',
    expectedResults: 'A thin, flat, inconspicuous line that blends smoothly into surrounding skin folds.',
    risksAndSafety: ['Customized post-surgical care prevents keloid recurrence.'],
    costRange: '₹15,000 – ₹45,000',
    priceStartingFrom: 15000,
    featured: false,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Scar Revision', 'Keloid Treatment', 'Z Plasty', 'Facial Scar Correction'],
    relatedSlugs: ['reconstructive-cleft-lip', 'rhinoplasty'],
    faqs: [
      {
        question: 'Can old scars from years ago still be revised?',
        answer: 'Yes. Fully matured scars often respond exceptionally well to surgical re-excision and precision plastic closure.'
      }
    ]
  },
  {
    slug: 'reconstructive-cleft-lip',
    title: 'Cleft Lip, Palate & Microvascular Reconstruction',
    subtitle: 'Humanitarian & Super-Specialty Reconstructive Excellence',
    category: 'RECONSTRUCTIVE',
    shortDesc: 'Comprehensive functional and aesthetic correction for cleft lip, palate, facial trauma, post-burn contractures, and microvascular defects.',
    overview: 'As Project Director, Smile Train (USA), Dr. R.K. Mishra has dedicated decades to restoring facial function, speech, and dental harmony for children and adults born with cleft lip and palate anomalies, as well as complex trauma reconstruction.',
    idealCandidate: [
      'Infants, children, or adults with unrepaired or secondary cleft lip/palate deformities',
      'Patients suffering from post-burn neck/limb contractures or trauma defects'
    ],
    procedureSteps: [
      'Detailed multidisciplinary anatomical assessment',
      'Precision muscle realignment (orbicularis oris repair) and nasal cartilage repositioning',
      'Micro-surgical closure preserving long-term growth vectors'
    ],
    anesthesiaType: 'Specialized Pediatric / General Anesthesia (NABH Suites)',
    duration: '2 – 3 Hours',
    hospitalStay: '1 – 2 Days at SIPS Hospital',
    recoveryTimeline: 'Sutures removed in 7 days; comprehensive follow-up speech and orthodontic support.',
    expectedResults: 'Restoration of normal facial appearance, symmetrical lip/nose anatomy, and clear speech.',
    risksAndSafety: ['Over 15,000+ cleft procedures successfully performed at SIPS Super Specialty Hospital (Pvt. Ltd.).'],
    costRange: 'Subsidized / Smile Train Program / Transparent Private Tariff',
    priceStartingFrom: 35000,
    featured: false,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    tags: ['Cleft Lip Surgery', 'Smile Train', 'Reconstructive Surgery', 'Trauma Repair'],
    relatedSlugs: ['rhinoplasty', 'scar-revision'],
    faqs: [
      {
        question: 'What is the right age for cleft lip and palate repair?',
        answer: 'Cleft lip repair is typically performed around 3 to 6 months of age, while cleft palate repair is recommended around 9 to 12 months before normal speech patterns develop.'
      }
    ]
  }
];
