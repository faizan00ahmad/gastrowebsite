import type { IconName } from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface Department {
  slug: string;
  /** Optional photo under /public, e.g. "/images/departments/endoscopy-suite.jpg". */
  image?: string;
  title: string;
  summary: string;
  icon: IconName;
  points: string[];
}

export interface Procedure {
  slug: string;
  image?: string;
  title: string;
  summary: string;
  icon: IconName;
  whatItIs: string;
  whatToExpect: string[];
  preparation: string[];
}

export interface Position {
  role: string;
  place: string;
  /** True for other hospitals the doctor also works at (used for Physician schema). */
  external?: boolean;
}

export interface Specialist {
  slug: string;
  name: string;
  /** Academic / professional title, e.g. "Assistant Professor". */
  title?: string;
  /** Clinical roles, shown as "Gastroenterologist | Hepatologist | ...". */
  roles: string[];
  specialty: string;
  /** Current appointments, most relevant first. */
  positions: Position[];
  bio: string[];
  /** Optional — only render when verified. */
  qualifications?: string[];
  /** Optional — only render when verified. */
  experience?: string;
}

export interface Article {
  slug: string;
  image?: string;
  title: string;
  summary: string;
  category: string;
  /** ISO date, used for Article schema and sorting. */
  published: string;
  readingMinutes: number;
  /** Paragraphs. A paragraph starting with "## " renders as a subheading. */
  body: string[];
  /** Doctor who medically reviewed the article. Set only once they have actually reviewed it. */
  reviewedBy?: string;
}

export interface SeoLanding {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  points: string[];
  related: { label: string; href: string }[];
}

export interface Guide {
  title: string;
  summary: string;
  points: string[];
}

export interface Testimonial {
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Patient's first name or initials, only with their consent. */
  author?: string;
  /** Where the review was posted, e.g. Google. Shown as a link for credibility. */
  source?: { label: string; href: string };
}

export interface Stat {
  label: string;
  icon: IconName;
  /** Only verified figures should be set here. Stats without a value are hidden. */
  value: string | null;
}

export interface JourneyStep {
  title: string;
  icon: IconName;
}

/* ------------------------------------------------------------------ */
/* Home page                                                           */
/* ------------------------------------------------------------------ */

export const trustPoints: string[] = [
  "Expert Consultants",
  "Advanced Endoscopy Suite",
  "Diagnostic Laboratory",
  "Ultrasound Services",
  "Pharmacy",
  "Short Stay Care",
];

/** Display verified statistics only. Fill `value` once figures are confirmed. */
export const stats: Stat[] = [
  { label: "Specialists", icon: "user", value: null },
  { label: "Years of Excellence", icon: "shield", value: null },
  { label: "Diagnostic Tests Performed", icon: "flask", value: null },
  { label: "Endoscopic Procedures", icon: "scan", value: null },
  { label: "Patient Satisfaction", icon: "star", value: null },
];

export const whyChoose: { title: string; description: string; icon: IconName }[] = [
  // Blueprint Section 6: titles and descriptions exactly as specified.
  {
    title: "Specialized Gastroenterology",
    description: "Advanced care for digestive and liver diseases.",
    icon: "heart",
  },
  {
    title: "Modern Endoscopy Suite",
    description: "Safe diagnostic and therapeutic procedures.",
    icon: "scan",
  },
  {
    title: "Accurate Diagnostics",
    description: "Reliable laboratory and imaging services.",
    icon: "flask",
  },
  {
    title: "Experienced Specialists",
    description: "Highly qualified consultants and healthcare professionals.",
    icon: "user",
  },
  {
    title: "Patient Safety",
    description: "Strict infection prevention and quality standards.",
    icon: "shield",
  },
  {
    title: "Personalized Care",
    description: "Individualized treatment plans for every patient.",
    icon: "check",
  },
];

export const journey: JourneyStep[] = [
  { title: "Book Appointment", icon: "calendar" },
  { title: "Meet Specialist", icon: "user" },
  { title: "Diagnostic Evaluation", icon: "flask" },
  { title: "Treatment Plan", icon: "pill" },
  { title: "Follow-up Care", icon: "heart" },
];

export const testimonials: Testimonial[] = [
  { quote: "The staff was professional and caring.", rating: 5 },
  { quote: "Excellent consultation and diagnostic services.", rating: 5 },
  { quote: "Highly recommended for digestive health issues.", rating: 5 },
];

/* ------------------------------------------------------------------ */
/* Departments                                                         */
/* ------------------------------------------------------------------ */

export const departments: Department[] = [
  {
    slug: "gastroenterology",
    image: "/images/departments/gastroenterology.jpg",
    title: "Gastroenterology",
    summary: "Digestive, liver and pancreatic diseases.",
    icon: "heart",
    points: [
      "Evaluation of reflux, indigestion, abdominal pain and changes in bowel habits",
      "Management of liver conditions, including fatty liver and hepatitis",
      "Assessment and ongoing care for pancreatic disorders",
    ],
  },
  {
    slug: "endoscopy-suite",
    image: "/images/departments/endoscopy-suite.jpg",
    title: "Endoscopy Suite",
    summary: "All kinds of diagnostic and therapeutic upper GI endoscopy and colonoscopy.",
    icon: "scan",
    points: [
      "Diagnostic upper GI endoscopy (gastroscopy)",
      "Diagnostic and therapeutic colonoscopy",
      "Trained team focused on comfort and infection prevention",
    ],
  },
  {
    slug: "diagnostic-laboratory",
    image: "/images/departments/diagnostic-laboratory.jpg",
    title: "Diagnostic Laboratory",
    summary: "Accurate and timely diagnostic testing.",
    icon: "flask",
    points: [
      "Routine and specialist laboratory investigations",
      "Results delivered in a timely manner for faster decisions",
    ],
  },
  {
    slug: "ultrasound-radiology",
    image: "/images/departments/ultrasound-radiology.jpg",
    title: "Ultrasound & Radiology",
    summary: "Professional imaging services.",
    icon: "activity",
    points: [
      "Abdominal and liver ultrasound",
      "Imaging that supports diagnosis and treatment planning",
    ],
  },
  {
    slug: "pharmacy",
    image: "/images/departments/pharmacy.jpg",
    title: "Pharmacy",
    summary: "Quality medicines and patient counselling.",
    icon: "pill",
    points: [
      "Quality-assured medicines on site",
      "Counselling so patients understand how to take their medicines",
    ],
  },
  {
    slug: "short-stay-unit",
    image: "/images/departments/short-stay-unit.jpg",
    title: "Short Stay Unit",
    summary: "Admission / IPD services under expert care.",
    icon: "bed",
    points: [
      "Admission for procedures and short-term treatment",
      "Comfortable observation and recovery care",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Procedures                                                          */
/* ------------------------------------------------------------------ */

export const procedures: Procedure[] = [
  {
    slug: "upper-gi-endoscopy",
    image: "/images/procedures/upper-gi-endoscopy.jpg",
    title: "Upper GI Endoscopy",
    summary: "Evaluate the upper digestive tract safely and accurately.",
    icon: "scan",
    whatItIs:
      "An upper GI endoscopy (gastroscopy) uses a thin, flexible camera to examine the food pipe (oesophagus), stomach and first part of the small intestine. It can also be used to take small tissue samples or treat certain bleeding points.",
    whatToExpect: [
      "A specialist reviews your history and explains the procedure before it begins",
      "Throat numbing spray and sedation can be offered for comfort",
      "The procedure is usually completed in around 10 to 15 minutes",
    ],
    preparation: [
      "Fast for the number of hours your doctor advises before the procedure",
      "Tell the team about all medicines, especially blood thinners and diabetes medicines",
    ],
  },
  {
    slug: "colonoscopy",
    image: "/images/procedures/colonoscopy.jpg",
    title: "Colonoscopy",
    summary: "Screening and diagnosis of colon diseases.",
    icon: "scan",
    whatItIs:
      "A colonoscopy examines the large bowel (colon) and rectum with a flexible camera. It helps detect inflammation, polyps and other changes, and polyps can often be removed during the same procedure.",
    whatToExpect: [
      "Sedation can be offered so that the procedure is comfortable",
      "Samples can be taken for laboratory testing when needed",
      "You will be observed in recovery before going home",
    ],
    preparation: [
      "Complete the bowel preparation exactly as instructed",
      "Arrange for someone to accompany you if sedation is given",
    ],
  },
  {
    slug: "ercp",
    image: "/images/procedures/ercp.jpg",
    title: "ERCP",
    summary:
      "Endoscopic retrograde cholangiopancreatography for bile duct and pancreatic conditions.",
    icon: "activity",
    whatItIs:
      "ERCP combines endoscopy with X-ray imaging to examine and treat the bile ducts and pancreatic duct. It is used for conditions such as bile duct stones and blockages.",
    whatToExpect: [
      "Performed under sedation or anaesthesia by a specialist team",
      "Imaging is used throughout to guide the procedure",
      "Your doctor explains findings and any next steps afterwards",
    ],
    preparation: [
      "Fast as instructed before the procedure",
      "Share your complete medicine list and any allergies in advance",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Specialists                                                         */
/* ------------------------------------------------------------------ */

export const specialists: Specialist[] = [
  {
    slug: "dr-umair-khan-sherwani",
    name: "Dr. Umair Khan Sherwani",
    title: "Assistant Professor",
    roles: ["Gastroenterologist", "Hepatologist", "Interventional Endoscopist"],
    specialty: "Gastroenterology, Hepatology & Interventional Endoscopy",
    qualifications: ["MBBS (KEMU)", "FCPS Gastroenterology"],
    positions: [
      { role: "Chief Executive Officer", place: "Gastro Plus Medical Complex Multan" },
      { role: "Head of Gastroenterology Department", place: "Ibn e Sina Hospital Multan", external: true },
      { role: "Consultant Gastroenterologist", place: "Mukhtar A Sheikh Hospital Multan", external: true },
    ],
    bio: [
      "At Gastro Plus Medical Complex Multan, our mission is to provide advanced, ethical, and compassionate healthcare with a strong focus on digestive and liver diseases. We believe every patient deserves expert care, accurate diagnosis, and respectful treatment.",
    ],
  },
  {
    slug: "dr-hunain",
    name: "Dr. Hunain",
    roles: ["Dental Surgeon"],
    specialty: "Dentistry & Oral Surgery",
    positions: [{ role: "Dental Surgeon", place: "Gastro Plus Medical Complex Multan" }],
    // TODO: add full name, qualifications, experience and a photo (public/images/dr-hunain.jpg).
    bio: ["Dental Surgeon at Gastro Plus Medical Complex Multan, providing dental and oral care."],
  },
];

/**
 * Choices in the booking form's Department dropdown: the departments above,
 * plus OPD and services that are not separate department pages.
 */
export const bookingDepartments: string[] = [
  "OPD (Outpatient Consultation)",
  ...departments.map((d) => d.title),
  "Dental Surgery",
];

/* ------------------------------------------------------------------ */
/* Patient guides                                                      */
/* ------------------------------------------------------------------ */

export const guides: Guide[] = [
  {
    title: "Preparing for an Endoscopy",
    summary: "What to do before your upper GI endoscopy.",
    points: [
      "Follow the fasting instructions given at booking",
      "Bring a list of current medicines and any previous reports",
      "Arrange transport home if sedation is planned",
    ],
  },
  {
    title: "Preparing for a Colonoscopy",
    summary: "Bowel preparation made simple.",
    points: [
      "Start the bowel preparation on the day and time your doctor specifies",
      "Drink clear fluids throughout the preparation",
      "Contact us early if you feel unwell or have questions",
    ],
  },
  {
    title: "Admission & Short Stay",
    summary: "What to expect during a short stay with us.",
    points: [
      "Bring your identity card and any previous medical records",
      "Our team explains the care plan and discharge instructions",
      "Follow-up appointments are scheduled before you leave",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Health blog                                                         */
/* ------------------------------------------------------------------ */

export const articles: Article[] = [
  {
    slug: "fatty-liver-disease",
    image: "/images/blog/fatty-liver-disease.jpg",
    title: "Fatty Liver Disease: Symptoms, Causes and Prevention",
    summary: "Symptoms, causes and prevention.",
    category: "Liver Health",
    published: "2026-01-15",
    readingMinutes: 4,
    body: [
      "Fatty liver disease means fat has built up inside liver cells. It is now one of the most common liver problems worldwide, and it is often found by chance on an ultrasound done for another reason.",
      "## Symptoms are easy to miss",
      "Most people have no symptoms early on. Some notice tiredness or a dull ache under the right ribs. Yellowing of the eyes, swelling of the legs or abdomen, and easy bruising are signs of more advanced disease and need prompt review.",
      "## Who is at risk",
      "Risk is higher with excess weight, especially around the waist, type 2 diabetes, high cholesterol or triglycerides, high blood pressure and regular alcohol intake. Fatty liver can also occur in people of normal weight.",
      "## How it is checked",
      "An abdominal ultrasound and liver function blood tests are usually the first steps. Your doctor may suggest further tests to see whether there is inflammation or scarring (fibrosis), because that changes the treatment plan.",
      "## What helps",
      "Losing around 7 to 10 percent of body weight gradually can reduce liver fat. Aim for about 150 minutes of brisk walking or similar activity each week, cut down sugary drinks, white flour and fried food, and avoid alcohol. Keeping diabetes, blood pressure and cholesterol under control protects the liver too.",
      "## When to see a specialist",
      "Book a review if an ultrasound has shown fatty liver, your liver tests are raised, or you have diabetes and have never had your liver checked.",
    ],
  },
  {
    slug: "when-do-you-need-a-colonoscopy",
    image: "/images/blog/when-do-you-need-a-colonoscopy.jpg",
    title: "When Do You Need a Colonoscopy?",
    summary: "Know the warning signs.",
    category: "Digestive Health",
    published: "2026-02-10",
    readingMinutes: 4,
    body: [
      "A colonoscopy lets the doctor look at the whole large bowel with a thin flexible camera. It is the most reliable way to find the cause of many bowel symptoms, and polyps can usually be removed during the same test.",
      "## Warning signs worth checking",
      "See a specialist if you have blood in your stool or black stools, a change in bowel habit lasting more than a few weeks, unexplained weight loss, ongoing abdominal pain, or anaemia without a clear cause. These do not always mean something serious, but they should be looked at properly.",
      "## Screening without symptoms",
      "Many international guidelines now advise people at average risk to start bowel cancer screening at around age 45. If a parent, brother or sister had bowel cancer or advanced polyps, screening usually starts earlier. Your doctor will advise on timing for you.",
      "## What the day looks like",
      "Bowel preparation the day before is the most important part: a clean bowel means a clearer view and fewer repeat tests. Sedation is available, the procedure itself usually takes 20 to 40 minutes, and you rest in recovery before going home with someone.",
      "## Results",
      "Your doctor explains what was seen before you leave. If samples or polyps were sent to the laboratory, those results follow at a review appointment.",
    ],
  },
  {
    slug: "hepatitis-awareness",
    image: "/images/blog/hepatitis-awareness.jpg",
    title: "Hepatitis Awareness: Protecting Your Liver Health",
    summary: "Protecting your liver health.",
    category: "Liver Health",
    published: "2026-03-05",
    readingMinutes: 5,
    body: [
      "Hepatitis means inflammation of the liver. In Pakistan the most important causes are the hepatitis viruses, and hepatitis C in particular is common. Many people carry the virus for years without knowing.",
      "## How the viruses spread",
      "Hepatitis A and E spread through contaminated food and water. Hepatitis B and C spread through blood: reused needles and syringes, unscreened blood transfusions, unsterile dental or surgical instruments, shared razors, and from mother to baby. Hepatitis B can also spread through sexual contact.",
      "## Symptoms",
      "Long-term hepatitis B and C often cause no symptoms until the liver is damaged. When symptoms appear they can include tiredness, poor appetite, dark urine, yellow eyes and pain under the right ribs.",
      "## Testing",
      "Simple blood tests detect hepatitis B and C. If a screening test is positive, further tests show how active the infection is and whether the liver has been affected, often alongside an ultrasound.",
      "## Treatment works",
      "Modern tablets cure most people with hepatitis C, usually within 12 weeks. Hepatitis B can be kept under control with long-term antiviral medicine and regular monitoring. Starting treatment early prevents cirrhosis and lowers the risk of liver cancer.",
      "## Protect yourself and your family",
      "Get vaccinated against hepatitis B, insist on a new syringe for every injection, never share razors or toothbrushes, and get tested if a family member has hepatitis.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export interface GalleryImage {
  /** Path under /public, e.g. "/images/gallery/reception.jpg". */
  src: string;
  alt: string;
}

/**
 * Local gallery photos. Save images (e.g. downloaded from the clinic's Facebook
 * page) into /public/images/gallery/ and list them here. Empty = grid hidden.
 */
export const galleryImages: GalleryImage[] = [];

/** Public Facebook posts embedded in the gallery via Facebook's official post embed. */
export const facebookGalleryPosts: string[] = [
  "https://www.facebook.com/100083268912246/posts/477211998397760/",
];

/* ------------------------------------------------------------------ */
/* FAQ (answers use only facts from the brief / site config)           */
/* ------------------------------------------------------------------ */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What are the clinic's working days?",
    answer:
      "Gastro Plus Medical Complex Multan is open Monday to Saturday. Timings may vary by specialty, so please call or WhatsApp us to confirm before your visit.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "Use the online booking form, message us on WhatsApp at +92 300 4139320, or call +92 312 4139320. Our team will confirm your appointment time.",
  },
  {
    question: "Which endoscopic procedures do you offer?",
    answer:
      "We offer diagnostic and therapeutic upper GI endoscopy and colonoscopy, and ERCP for bile duct and pancreatic conditions.",
  },
  {
    question: "Are lab tests and ultrasound available on site?",
    answer:
      "Yes. Our diagnostic laboratory, ultrasound and radiology services and pharmacy are all under one roof, so most investigations can be completed in a single visit.",
  },
  {
    question: "Do you provide admission or short stay care?",
    answer:
      "Yes. Our Short Stay Unit provides admission / IPD services with observation and recovery care under expert supervision.",
  },
];

/* ------------------------------------------------------------------ */
/* SEO landing pages (service + city keywords)                         */
/* ------------------------------------------------------------------ */

export const seoLandings: SeoLanding[] = [
  {
    slug: "gastroenterologist-in-multan",
    metaTitle: "Gastroenterologist in Multan",
    metaDescription:
      "Consult an experienced gastroenterologist in Multan for reflux, liver disease, abdominal pain and digestive disorders at Gastro Plus Medical Complex.",
    h1: "Gastroenterologist in Multan",
    intro:
      "Our gastroenterology team diagnoses and treats conditions of the stomach, intestines, liver and pancreas, combining clinical expertise with advanced endoscopy and diagnostics.",
    points: [
      "Reflux, indigestion and persistent abdominal pain",
      "Liver disease, fatty liver and hepatitis care",
      "Pancreatic and bowel disorders",
      "Diagnostics and endoscopy under one roof",
    ],
    related: [
      { label: "Endoscopy in Multan", href: "/endoscopy-in-multan/" },
      { label: "Liver Specialist in Multan", href: "/liver-specialist-in-multan/" },
    ],
  },
  {
    slug: "endoscopy-in-multan",
    metaTitle: "Endoscopy in Multan",
    metaDescription:
      "Upper GI endoscopy in Multan with modern equipment, trained specialists and strict infection-prevention standards at Gastro Plus Medical Complex.",
    h1: "Endoscopy in Multan",
    intro:
      "Our modern endoscopy suite offers safe diagnostic and therapeutic upper GI procedures, performed by experienced gastroenterologists with a focus on patient comfort.",
    points: [
      "Diagnostic upper GI endoscopy",
      "Comfort-focused sedation options",
      "Strict infection prevention and quality standards",
    ],
    related: [
      { label: "Upper GI Endoscopy", href: "/procedures/upper-gi-endoscopy/" },
      { label: "Colonoscopy in Multan", href: "/colonoscopy-in-multan/" },
    ],
  },
  {
    slug: "colonoscopy-in-multan",
    metaTitle: "Colonoscopy in Multan",
    metaDescription:
      "Colonoscopy in Multan for diagnosis and screening of bowel conditions, with expert gastroenterologists and a comfortable recovery area.",
    h1: "Colonoscopy in Multan",
    intro:
      "Colonoscopy is an essential tool for detecting and removing bowel polyps and diagnosing causes of bowel symptoms. Our team guides you through preparation, the procedure and recovery.",
    points: [
      "Screening and diagnostic colonoscopy",
      "Polyp detection and removal where appropriate",
      "Clear preparation guidance before your procedure",
    ],
    related: [
      { label: "Colonoscopy Procedure", href: "/procedures/colonoscopy/" },
      { label: "Patient Guides", href: "/patient-guides/" },
    ],
  },
  {
    slug: "ercp-in-multan",
    metaTitle: "ERCP in Multan",
    metaDescription:
      "ERCP in Multan for bile duct stones and pancreatic duct conditions, performed by specialist gastroenterologists at Gastro Plus Medical Complex.",
    h1: "ERCP in Multan",
    intro:
      "ERCP is a specialised endoscopic procedure for conditions of the bile ducts and pancreatic duct. Our specialists assess each case carefully and explain the options clearly.",
    points: [
      "Bile duct stone removal",
      "Evaluation of bile duct and pancreatic duct blockages",
      "Specialist team with imaging support",
    ],
    related: [{ label: "ERCP Procedure", href: "/procedures/ercp/" }],
  },
  {
    slug: "liver-specialist-in-multan",
    metaTitle: "Liver Specialist in Multan",
    metaDescription:
      "Liver specialist in Multan for hepatitis, fatty liver disease and liver function concerns, with integrated diagnostics at Gastro Plus Medical Complex.",
    h1: "Liver Specialist in Multan",
    intro:
      "Our hepatology care covers fatty liver disease, viral hepatitis and other liver conditions. We combine laboratory testing, ultrasound and specialist review for accurate, personalised care.",
    points: [
      "Fatty liver disease assessment and management",
      "Hepatitis evaluation and treatment",
      "Laboratory and ultrasound services on site",
    ],
    related: [
      { label: "Fatty Liver Disease article", href: "/blog/fatty-liver-disease/" },
      { label: "Hepatitis Awareness article", href: "/blog/hepatitis-awareness/" },
    ],
  },
];
