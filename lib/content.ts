import type { IconName } from "@/components/icons";

/*
 * Site content. Structure follows the GPMC Final Website Roadmap:
 * Departments (care units), Procedures (clinical interventions),
 * Patient Resources (guides) and Health Blog (education) are kept separate,
 * and every fact has one primary home.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface Reference {
  label: string;
  href: string;
}

export interface ContentBlock {
  heading: string;
  points: string[];
}

export interface Department {
  slug: string;
  title: string;
  /** Optional photo under /public. */
  image?: string;
  icon: IconName;
  summary: string;
  overview: string;
  sections: ContentBlock[];
  /** Scope or status clarification shown as a notice (in-house vs referral, timings). */
  note?: string;
  /** Slugs of linked procedures. */
  procedures?: string[];
  /** Slugs of specialists who work in this department. */
  specialists?: string[];
  /** Shown in the Appointment Request department list. */
  bookable: boolean;
  /** Core clinical focus, featured first on the home page. */
  focus?: boolean;
}

export type ProcedureGroup = "Diagnostic & therapeutic endoscopy" | "Biliary & pancreatic";

export interface Procedure {
  slug: string;
  title: string;
  alsoKnownAs?: string;
  group: ProcedureGroup;
  image?: string;
  icon: IconName;
  summary: string;
  /** Department slug the procedure is performed in. */
  department: string;
  whatItIs: string;
  whyRecommended: string[];
  suitability: string;
  preparation: string[];
  during: string[];
  risks: string[];
  recovery: string[];
  whenToContact: string[];
  /** ISO date the content was last updated. */
  lastUpdated: string;
  /** Clinician who reviewed this page. Set only once they have actually reviewed it. */
  reviewedBy?: string;
  references: Reference[];
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
  /** Clinical designation, shown as "Gastroenterologist | Hepatologist | ...". */
  roles: string[];
  specialty: string;
  /** Department slug for the directory and the appointment form filter. */
  department: string;
  qualifications?: string[];
  positions: Position[];
  interests?: string[];
  bio: string[];
  /** Only render when verified. */
  experience?: string;
  /** GPMC consultation schedule. Empty = patients are asked to call to confirm. */
  schedule?: string;
  /** Path of an approved photograph. Without one, the profile shows the GPMC logo. */
  photo?: string;
}

export interface Article {
  slug: string;
  image?: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  /** Qualified reviewer. Set only once they have actually reviewed the article. */
  reviewedBy?: string;
  published: string;
  updated: string;
  readingMinutes: number;
  /** Paragraphs. A paragraph starting with "## " renders as a subheading. */
  body: string[];
  references: Reference[];
  related: Reference[];
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

export interface JourneyStep {
  title: string;
  text: string;
  icon: IconName;
}

export interface Faq {
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/* Home page                                                           */
/* ------------------------------------------------------------------ */

/** "Why GPMC": evidence-based reasons only, no superlatives (Roadmap §4, Home 6). */
export const whyChoose: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Specialist-led care",
    description: "Consultations are led by an FCPS-qualified gastroenterologist and hepatologist.",
    icon: "user",
  },
  {
    title: "Endoscopy on site",
    description: "Upper GI endoscopy, colonoscopy and ERCP are performed in GPMC's own endoscopy unit.",
    icon: "scan",
  },
  {
    title: "Tests in the same building",
    description: "Laboratory, ultrasound and pharmacy services are under one roof, so many investigations can be arranged during your visit.",
    icon: "flask",
  },
  {
    title: "Patient safety processes",
    description: "Patient identification checks, informed consent and infection-prevention procedures are part of every procedure.",
    icon: "shield",
  },
  {
    title: "Patient education",
    description: "Findings and next steps are explained to you, and our patient resources help you prepare.",
    icon: "book",
  },
];

/** Honest patient journey (Roadmap §4, Home 7). */
export const journey: JourneyStep[] = [
  { title: "Request an appointment", text: "Use the online form, WhatsApp or call us.", icon: "calendar" },
  { title: "Staff confirmation", text: "Our front desk contacts you to confirm the date and time.", icon: "phone" },
  { title: "Consultation", text: "The specialist reviews your symptoms, history and reports.", icon: "user" },
  { title: "Tests or procedure, if advised", text: "Any investigation is explained, with preparation instructions.", icon: "scan" },
  { title: "Follow-up", text: "Results are discussed and your care plan is agreed.", icon: "heart" },
];

/* ------------------------------------------------------------------ */
/* Departments                                                         */
/* ------------------------------------------------------------------ */

export const departments: Department[] = [
  {
    slug: "gastroenterology",
    title: "Gastroenterology",
    image: "/images/departments/gastroenterology.jpg",
    icon: "heart",
    focus: true,
    bookable: true,
    summary: "Assessment and treatment of digestive and pancreatic conditions.",
    overview:
      "Gastroenterology is GPMC's primary clinical service: specialist assessment and treatment of conditions of the food pipe, stomach, intestines, pancreas and bile ducts.",
    sections: [
      {
        heading: "Conditions commonly assessed",
        points: [
          "Reflux, heartburn and indigestion",
          "Upper abdominal pain and difficulty swallowing",
          "Change in bowel habit, chronic diarrhoea or constipation",
          "Blood in the stool or black stools",
          "Gallstone and bile duct problems",
          "Pancreatitis and other pancreatic disorders",
        ],
      },
      {
        heading: "Consultation pathway",
        points: [
          "Request an appointment; our front desk confirms the date and time",
          "The specialist takes your history, examines you and reviews previous reports",
          "Blood tests, ultrasound or endoscopy are arranged if needed",
          "Your treatment plan and follow-up are agreed with you",
          "If you need a service that GPMC does not provide, you are referred and told where to go",
        ],
      },
    ],
    procedures: ["upper-gi-endoscopy", "colonoscopy", "ercp"],
    specialists: ["dr-umair-khan-sherwani"],
  },
  {
    slug: "hepatology",
    title: "Hepatology / Liver Clinic",
    image: "/images/blog/fatty-liver-disease.jpg",
    icon: "activity",
    focus: true,
    bookable: true,
    summary: "Evaluation and long-term follow-up of liver disease.",
    overview:
      "The liver clinic assesses and follows up patients with liver disease, from fatty liver and viral hepatitis to cirrhosis and its complications.",
    sections: [
      {
        heading: "Liver conditions assessed",
        points: [
          "Fatty liver disease",
          "Hepatitis B and hepatitis C",
          "Raised liver function tests",
          "Jaundice (yellowing of the eyes or skin)",
          "Cirrhosis and its complications",
        ],
      },
      {
        heading: "Evaluation and follow-up",
        points: [
          "Specialist consultation and review of previous reports",
          "Liver blood tests, hepatitis screening and abdominal ultrasound as needed",
          "Upper GI endoscopy where screening for varices is advised",
          "Regular follow-up to monitor the liver and adjust treatment",
        ],
      },
    ],
    note: "Your specialist explains which tests are done at GPMC and which, if any, are arranged elsewhere.",
    procedures: ["upper-gi-endoscopy"],
    specialists: ["dr-umair-khan-sherwani"],
  },
  {
    slug: "endoscopy-unit",
    title: "Endoscopy Unit",
    image: "/images/departments/endoscopy-unit.jpg",
    icon: "scan",
    focus: true,
    bookable: true,
    summary: "Diagnostic and therapeutic endoscopy.",
    overview:
      "The endoscopy unit is where GPMC's diagnostic and therapeutic endoscopic procedures are performed, with preparation, recovery and follow-up handled by the same team.",
    sections: [
      {
        heading: "Procedures performed",
        points: ["Upper GI endoscopy (gastroscopy)", "Colonoscopy, including removal of polyps where appropriate", "ERCP for bile duct and pancreatic duct conditions"],
      },
      {
        heading: "Before, during and after",
        points: [
          "Personal preparation instructions are given when your procedure is booked",
          "The procedure, its risks and alternatives are explained before you sign consent",
          "Sedation is offered when appropriate, with monitoring during and after",
          "You rest in recovery until it is safe to go home",
          "Findings are explained before discharge; biopsy results are discussed at follow-up",
        ],
      },
      {
        heading: "Safety",
        points: [
          "Patient identification checks before every procedure",
          "Cleaning and disinfection of endoscopes between patients",
          "Written discharge advice, including when to contact the team",
        ],
      },
    ],
    note: "Only the procedures listed on our Procedures page are offered. Ask our team about any other procedure.",
    procedures: ["upper-gi-endoscopy", "colonoscopy", "ercp"],
    specialists: ["dr-umair-khan-sherwani"],
  },
  {
    slug: "dental-surgery",
    title: "Dental Surgery",
    icon: "smile",
    bookable: true,
    summary: "Dental care, provided as a separate specialty.",
    overview: "Dental Surgery is a separate specialty at GPMC, provided by Dr. Muhammad Hunain (BDS).",
    sections: [
      {
        heading: "Areas of practice",
        points: ["Operative dentistry: fillings and restoration of damaged teeth", "Dental implants"],
      },
    ],
    note: "Dental clinic days and timings may differ from the GPMC OPD. Please call to confirm before your visit.",
    specialists: ["dr-muhammad-hunain"],
  },
  {
    slug: "diagnostic-laboratory",
    title: "Diagnostic Laboratory",
    image: "/images/departments/diagnostic-laboratory.jpg",
    icon: "flask",
    bookable: true,
    summary: "Sample collection and laboratory tests.",
    overview: "The laboratory collects samples and carries out the tests your doctor requests, to support diagnosis and follow-up.",
    sections: [
      {
        heading: "Sample collection and reports",
        points: [
          "Samples are collected at GPMC",
          "The front desk tells you when and how your report will be available",
          "Your doctor reviews the results with you at your consultation or follow-up",
        ],
      },
    ],
    note: "Some specialised tests may be processed by a partner laboratory. Ask the front desk which tests are done in-house and the expected report time.",
  },
  {
    slug: "ultrasound",
    title: "Ultrasound Services",
    image: "/images/departments/ultrasound.jpg",
    icon: "activity",
    bookable: true,
    summary: "Abdominal ultrasound scans.",
    overview: "Ultrasound scans of the abdomen help assess the liver, gallbladder, bile ducts, pancreas and kidneys.",
    sections: [
      {
        heading: "Booking and preparation",
        points: [
          "Request a scan with the online form or by phone",
          "For an abdominal scan you may be asked not to eat for several hours beforehand",
          "Follow the instructions you are given when the scan is booked",
        ],
      },
    ],
    note: "Please confirm the type of scan you need and its timing when booking.",
  },
  {
    slug: "pharmacy",
    title: "Pharmacy",
    image: "/images/departments/pharmacy.jpg",
    icon: "pill",
    bookable: false,
    summary: "Prescribed medicines with counselling.",
    overview: "The pharmacy dispenses prescribed medicines and explains how to take them.",
    sections: [
      {
        heading: "Prescriptions and counselling",
        points: [
          "Bring your prescription to the pharmacy counter",
          "The dose, timing and common side effects are explained",
          "Ask the pharmacist if you take other medicines, so interactions can be checked",
        ],
      },
    ],
    note: "Medicine availability varies; some medicines may need to be obtained elsewhere. Ask the front desk for pharmacy hours.",
  },
  {
    slug: "short-stay-ipd",
    title: "Short Stay / IPD",
    image: "/images/departments/short-stay-ipd.jpg",
    icon: "bed",
    bookable: false,
    summary: "Short admission for observation, treatment and recovery.",
    overview:
      "Short stay admission (IPD) is for patients who need observation, treatment or recovery time, for example after an ERCP.",
    sections: [
      {
        heading: "Admission and discharge",
        points: [
          "Admission is advised and arranged by your specialist",
          "The care plan is explained and consent is taken for any procedure",
          "Nursing staff observe you and give the treatment prescribed",
          "You are discharged with written instructions and a follow-up plan",
        ],
      },
    ],
    note: "For a medical emergency, call Rescue 1122 or go to the nearest emergency department.",
    procedures: ["ercp"],
  },
];

/* ------------------------------------------------------------------ */
/* Procedures (template: Roadmap §4, Page 5)                           */
/* ------------------------------------------------------------------ */

const SUITABILITY =
  "Your specialist decides whether this procedure is right for you after reviewing your symptoms, medical history and medicines. The expected benefits, the risks and any alternatives are explained before you give consent.";

export const procedures: Procedure[] = [
  {
    slug: "upper-gi-endoscopy",
    title: "Upper GI Endoscopy",
    alsoKnownAs: "Gastroscopy",
    group: "Diagnostic & therapeutic endoscopy",
    image: "/images/procedures/upper-gi-endoscopy.jpg",
    icon: "scan",
    department: "endoscopy-unit",
    summary: "A camera examination of the food pipe, stomach and first part of the small intestine.",
    whatItIs:
      "An upper GI endoscopy uses a thin, flexible tube with a camera to look at the food pipe (oesophagus), stomach and first part of the small intestine (duodenum). Small tissue samples (biopsies) can be taken, and some problems, such as bleeding points, can be treated during the same procedure.",
    whyRecommended: [
      "Indigestion or heartburn that does not settle with treatment",
      "Difficulty or pain when swallowing, or persistent vomiting",
      "Vomiting blood or passing black stools",
      "Unexplained anaemia or weight loss",
      "Checking known conditions, such as screening for varices in liver disease",
      "Taking biopsies, for example to test for H. pylori or coeliac disease",
    ],
    suitability: SUITABILITY,
    preparation: [
      "You will usually be asked not to eat for several hours beforehand. Follow the exact fasting time your team gives you.",
      "Tell the team in advance if you take blood thinners (anticoagulants or antiplatelets) or diabetes medicines, or if you have kidney disease or are pregnant. These can change your instructions.",
      "Do not stop any medicine unless your doctor tells you to.",
      "Bring your medicine list and previous reports.",
      "If you will have sedation, bring an adult who can take you home.",
    ],
    during: [
      "The procedure is explained and you sign a consent form",
      "A throat spray, sedation or both may be offered, depending on your case",
      "You lie on your left side and a mouth guard protects your teeth",
      "The endoscope is passed through the mouth; it does not block your breathing",
      "It usually takes around 5 to 15 minutes; biopsies are painless",
    ],
    risks: [
      "A sore throat or bloating for a short time is common",
      "A reaction to sedation, including effects on breathing or heart rhythm, is uncommon",
      "Bleeding, mainly after a biopsy or treatment, is uncommon",
      "A tear (perforation) in the lining of the gut is rare but serious",
      "Occasionally a small abnormality can be missed",
    ],
    recovery: [
      "You rest until the throat spray or sedation wears off",
      "After sedation, do not drive, operate machinery or sign important documents for 24 hours",
      "The doctor explains the findings before you leave",
      "Biopsy results take longer and are discussed at your follow-up",
    ],
    whenToContact: [
      "Severe or worsening pain in the chest, neck or abdomen",
      "Vomiting blood or passing black stools",
      "Fever, or difficulty breathing or swallowing",
    ],
    lastUpdated: "2026-11-24",
    references: [
      { label: "NHS: Gastroscopy", href: "https://www.nhs.uk/conditions/gastroscopy/" },
      { label: "NIDDK: Upper GI Endoscopy", href: "https://www.niddk.nih.gov/health-information/diagnostic-tests/upper-gi-endoscopy" },
    ],
  },
  {
    slug: "colonoscopy",
    title: "Colonoscopy",
    group: "Diagnostic & therapeutic endoscopy",
    image: "/images/procedures/colonoscopy.jpg",
    icon: "scan",
    department: "endoscopy-unit",
    summary: "A camera examination of the large bowel, with removal of polyps where appropriate.",
    whatItIs:
      "A colonoscopy examines the large bowel (colon) and rectum with a thin, flexible camera. It helps find the cause of bowel symptoms and detect inflammation, polyps and other changes. Biopsies can be taken, and polyps can often be removed during the same procedure (polypectomy).",
    whyRecommended: [
      "Bleeding from the back passage",
      "A change in bowel habit lasting more than a few weeks",
      "Unexplained anaemia or weight loss",
      "Ongoing abdominal pain or diarrhoea",
      "An abnormal result on a bowel screening test",
      "Screening or surveillance if you or a close relative have had polyps, bowel cancer or inflammatory bowel disease",
    ],
    suitability: SUITABILITY,
    preparation: [
      "The bowel must be empty for a clear view. Follow the diet and laxative instructions exactly as you are given them.",
      "You will usually change to a low-fibre diet and then clear fluids before the test; your team gives the exact timings.",
      "Tell the team in advance about blood thinners, iron tablets, diabetes medicines, kidney disease or pregnancy.",
      "Do not stop any medicine unless your doctor tells you to.",
      "If you will have sedation, bring an adult who can take you home.",
    ],
    during: [
      "The procedure is explained and you sign a consent form",
      "Sedation may be offered for comfort",
      "You lie on your side and the colonoscope is passed through the back passage",
      "Air or gas gently opens the bowel, which can cause bloating or cramping",
      "It usually takes around 20 to 45 minutes",
    ],
    risks: [
      "Bloating and cramping afterwards are common and settle quickly",
      "Bleeding, mainly after polyp removal, is uncommon",
      "A tear (perforation) in the bowel wall is rare but serious, and more likely when polyps are removed",
      "A reaction to sedation is uncommon",
      "Sometimes the whole bowel cannot be seen or a polyp is missed, and the test may need repeating",
    ],
    recovery: [
      "You rest in recovery until the sedation wears off",
      "After sedation, do not drive, operate machinery or sign important documents for 24 hours",
      "A small amount of blood may be seen after polyp removal",
      "The findings are explained before you leave; results of biopsies or polyps are discussed at follow-up",
    ],
    whenToContact: [
      "Severe or worsening abdominal pain",
      "Heavy bleeding or passing clots",
      "Fever, vomiting or feeling faint",
    ],
    lastUpdated: "2026-11-24",
    references: [
      { label: "NHS: Colonoscopy", href: "https://www.nhs.uk/conditions/colonoscopy/" },
      { label: "NIDDK: Colonoscopy", href: "https://www.niddk.nih.gov/health-information/diagnostic-tests/colonoscopy" },
    ],
  },
  {
    slug: "ercp",
    title: "ERCP",
    alsoKnownAs: "Endoscopic retrograde cholangiopancreatography",
    group: "Biliary & pancreatic",
    image: "/images/procedures/ercp.jpg",
    icon: "activity",
    department: "endoscopy-unit",
    summary: "An endoscopic procedure to treat bile duct and pancreatic duct problems.",
    whatItIs:
      "ERCP combines endoscopy with X-ray imaging to reach the bile ducts and the pancreatic duct. It is mainly a treatment procedure: stones can be removed and blocked ducts opened, often with a small tube (stent). The diagnosis is usually made beforehand with scans such as ultrasound, CT or MRCP.",
    whyRecommended: [
      "Removing stones from the bile duct",
      "Relieving a blocked or narrowed bile duct, often with a stent",
      "Jaundice caused by a blocked bile duct",
      "Selected problems of the pancreatic duct",
      "Taking samples (brushings) from a narrowed duct",
    ],
    suitability:
      SUITABILITY +
      " Because ERCP carries more risk than a routine endoscopy, these are discussed in detail.",
    preparation: [
      "Do not eat or drink for the time your team specifies.",
      "Blood tests are usually needed beforehand.",
      "Tell the team about blood thinners, diabetes medicines, allergies (especially to contrast dye), kidney disease or pregnancy, as X-rays are used.",
      "Do not stop any medicine unless your doctor tells you to.",
      "You may be asked to stay for observation afterwards. Bring an adult who can take you home.",
    ],
    during: [
      "The procedure is explained and you sign a consent form",
      "It is done under sedation or anaesthesia",
      "The endoscope is passed through the mouth to the duodenum, and contrast dye shows the ducts on X-ray",
      "A small cut (sphincterotomy) may be made to open the duct, then stones removed or a stent placed",
      "It usually takes around 30 to 90 minutes",
    ],
    risks: [
      "Inflammation of the pancreas (pancreatitis) is the most common significant complication; most cases are mild",
      "Bleeding, mainly after a sphincterotomy",
      "Infection of the bile ducts (cholangitis)",
      "A tear (perforation) in the gut wall is rare but serious",
      "Reactions to sedation or anaesthesia",
      "Sometimes the procedure cannot be completed and another treatment is needed",
    ],
    recovery: [
      "You are observed for several hours, and sometimes overnight in the short stay unit",
      "You are told when you can start eating and drinking again",
      "If a stent is placed, you are told when it needs to be checked, changed or removed",
      "After sedation, do not drive or operate machinery for 24 hours",
    ],
    whenToContact: [
      "Severe abdominal pain",
      "Fever or shivering",
      "Vomiting, black stools or vomiting blood",
      "Worsening yellowing of the eyes or skin",
    ],
    lastUpdated: "2026-11-24",
    references: [
      {
        label: "NIDDK: Endoscopic Retrograde Cholangiopancreatography (ERCP)",
        href: "https://www.niddk.nih.gov/health-information/diagnostic-tests/endoscopic-retrograde-cholangiopancreatography",
      },
    ],
  },
];

export const procedureGroups: ProcedureGroup[] = ["Diagnostic & therapeutic endoscopy", "Biliary & pancreatic"];

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
    department: "gastroenterology",
    qualifications: ["MBBS (KEMU)", "FCPS Gastroenterology"],
    positions: [
      { role: "Chief Executive Officer", place: "Gastro Plus Medical Complex Multan" },
      { role: "Head of Gastroenterology Department", place: "Ibn e Sina Hospital Multan", external: true },
      { role: "Consultant Gastroenterologist", place: "Mukhtar A Sheikh Hospital Multan", external: true },
    ],
    interests: ["Gastroenterology", "Hepatology (liver disease)", "Interventional endoscopy"],
    bio: [
      "Dr. Umair Khan Sherwani is a gastroenterologist, hepatologist and interventional endoscopist, and the Chief Executive Officer of Gastro Plus Medical Complex Multan.",
      "He graduated MBBS from King Edward Medical University (KEMU), Lahore, and holds the FCPS in Gastroenterology. He is an Assistant Professor, Head of the Gastroenterology Department at Ibn e Sina Hospital Multan and Consultant Gastroenterologist at Mukhtar A Sheikh Hospital Multan.",
    ],
    photo: "/images/dr-umair-khan-sherwani.jpg",
  },
  {
    slug: "dr-muhammad-hunain",
    name: "Dr. Muhammad Hunain",
    roles: ["Dental Surgeon"],
    specialty: "Operative Dentistry & Implantology",
    department: "dental-surgery",
    qualifications: ["BDS", "C. Implantology (Diploma)"],
    positions: [{ role: "Dental Surgeon", place: "Gastro Plus Medical Complex Multan" }],
    interests: ["Operative dentistry", "Dental implants"],
    experience: "12 years",
    bio: [
      "Dr. Muhammad Hunain is the Dental Surgeon at Gastro Plus Medical Complex Multan. He holds a BDS and a diploma in implantology, and has 12 years of experience, with a focus on operative dentistry.",
    ],
    // Add `photo: "/images/dr-muhammad-hunain.jpg"` once an approved photograph is supplied.
  },
];

/** Full leadership statement. Primary home: About GPMC → Leadership (Roadmap §8). */
export const leadershipMessage =
  "At Gastro Plus Medical Complex Multan, our mission is to provide advanced, ethical, and compassionate healthcare with a strong focus on digestive and liver diseases. We believe every patient deserves expert care, accurate diagnosis, and respectful treatment.";

/** Appointment Request department choices: active, bookable units only. */
export const bookingDepartments: { value: string; label: string }[] = [
  { value: "opd", label: "OPD (Outpatient Consultation)" },
  ...departments.filter((d) => d.bookable).map((d) => ({ value: d.slug, label: d.title })),
];

/* ------------------------------------------------------------------ */
/* About GPMC                                                          */
/* ------------------------------------------------------------------ */

/** Proposed drafts from the roadmap (§8), pending management approval. */
export const vision =
  "To be a trusted centre for specialist digestive and liver healthcare in Multan, recognised for ethical practice, patient dignity, clinical quality and continuous improvement.";

export const mission =
  "To provide accessible, specialist-led gastroenterology and liver care through accurate assessment, evidence-informed decisions, safe diagnostic and therapeutic services, clear communication and respectful patient support.";

export const values: { title: string; description: string }[] = [
  { title: "Patient dignity", description: "Every patient is treated with respect and privacy." },
  { title: "Clinical integrity", description: "Advice is honest, evidence-informed and within our scope." },
  { title: "Safety", description: "Checks, consent and infection prevention come first." },
  { title: "Compassion", description: "We listen, and we explain in plain language." },
  { title: "Transparency", description: "Clear information on services, preparation and costs." },
  { title: "Teamwork", description: "Doctors, nurses and staff work as one team around the patient." },
  { title: "Continuous improvement", description: "We learn from feedback and review how we work." },
];

export const qualityPractices: { title: string; description: string; icon: IconName }[] = [
  { title: "Patient identification", description: "Your identity is checked before tests, procedures and medicines.", icon: "user" },
  { title: "Informed consent", description: "Procedures, risks and alternatives are explained before you agree.", icon: "check" },
  { title: "Infection prevention", description: "Endoscopes and equipment are cleaned and disinfected between patients.", icon: "shield" },
  { title: "Medication safety", description: "Your current medicines and allergies are reviewed before treatment.", icon: "pill" },
  { title: "Privacy", description: "Your records and conversations are kept confidential.", icon: "lock" },
  { title: "Feedback and complaints", description: "Concerns can be raised with the front desk and are reviewed by management.", icon: "message" },
];

/* ------------------------------------------------------------------ */
/* Patient Resources                                                   */
/* ------------------------------------------------------------------ */

export const preparationGuides: { procedure: string; title: string; points: string[] }[] = [
  {
    procedure: "upper-gi-endoscopy",
    title: "Upper GI endoscopy preparation",
    points: [
      "Fast for the time your team gives you",
      "Bring your medicine list and previous reports",
      "Tell us early about blood thinners, diabetes medicines, kidney disease or pregnancy",
      "Bring an adult to take you home if you will have sedation",
    ],
  },
  {
    procedure: "colonoscopy",
    title: "Colonoscopy preparation",
    points: [
      "Follow the diet and bowel preparation instructions exactly",
      "Start the laxative at the time you are told",
      "Tell us early about blood thinners, iron tablets or diabetes medicines",
      "Bring an adult to take you home if you will have sedation",
    ],
  },
  {
    procedure: "ercp",
    title: "ERCP preparation",
    points: [
      "Do not eat or drink for the time your team specifies",
      "Have the blood tests you are asked for",
      "Tell us about allergies, especially to contrast dye",
      "Be ready to stay for observation afterwards",
    ],
  },
];

export const admissionGuide: ContentBlock[] = [
  {
    heading: "What to bring",
    points: ["CNIC (identity card)", "Previous reports and prescriptions", "Your current medicines", "One attendant"],
  },
  {
    heading: "Admission steps",
    points: [
      "Register at the front desk",
      "The care plan is explained and consent is taken for any procedure",
      "Nursing staff record your observations and give prescribed treatment",
    ],
  },
  {
    heading: "Discharge and follow-up",
    points: [
      "You receive written discharge instructions and prescriptions",
      "Your follow-up date is arranged before you leave",
      "You are told which symptoms mean you should contact us",
    ],
  },
];

export const patientRights: string[] = [
  "To be treated with respect and dignity",
  "To privacy and confidentiality of your information",
  "To clear information about your condition and treatment options",
  "To give or refuse informed consent",
  "To have your identity checked before tests and procedures",
  "To raise a concern or complaint without it affecting your care",
];

export const patientResponsibilities: string[] = [
  "Give accurate information about your health and medicines",
  "Follow the preparation and treatment instructions you are given",
  "Arrive on time, or tell us early if you cannot attend",
  "Treat staff and other patients with respect",
];

export const reportsGuide: string[] = [
  "The team tells you when and how each report will be available",
  "Endoscopy findings are explained on the day; biopsy results take longer",
  "Bring your reports to your follow-up so the specialist can review them",
  "To arrange a follow-up, use the Appointment Request form or call the main number",
];

/* ------------------------------------------------------------------ */
/* FAQ (primary home: Patient Resources)                               */
/* ------------------------------------------------------------------ */

export const faqs: Faq[] = [
  {
    question: "What are the OPD hours?",
    answer:
      "The GPMC OPD runs Monday to Friday, 3:00 PM to 9:00 PM. Specialist and department timings, including the dental clinic, may differ, so please call to confirm before your visit.",
  },
  {
    question: "How do I request an appointment?",
    answer:
      "Use the Appointment Request form, send a WhatsApp message to +92 300 4139320, or call +92 300 4139320 or +92 312 4139320. Your request is not confirmed until our team contacts you with a date and time.",
  },
  {
    question: "Which endoscopic procedures are available at GPMC?",
    answer:
      "Upper GI endoscopy (gastroscopy), colonoscopy and ERCP. Please ask our team about any other procedure.",
  },
  {
    question: "How should I prepare for an endoscopy or colonoscopy?",
    answer:
      "Follow the personal instructions your team gives you when the procedure is booked. Fasting, bowel preparation and medicine changes depend on your health and medicines, so do not stop any medicine unless your doctor tells you to.",
  },
  {
    question: "When will I receive my reports?",
    answer:
      "It depends on the test. The team tells you when and how each report will be available, and your specialist reviews the results with you at follow-up.",
  },
  {
    question: "What should I do in an emergency?",
    answer:
      "For a medical emergency, call Rescue 1122 or go to the nearest emergency department. Do not use the website form or WhatsApp for emergencies.",
  },
];

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export interface Vacancy {
  title: string;
  department: string;
  type: string;
  responsibilities: string[];
  requirements: string[];
  closingDate: string;
}

/** Current vacancies. Empty = the page states that there are no open positions. */
export const vacancies: Vacancy[] = [];

export const careerRoles: string[] = [
  "Consultants and specialists",
  "Medical officers",
  "BSN nurses",
  "Technicians",
  "Pharmacy staff",
  "Reception and administration",
  "Support staff",
];

/* ------------------------------------------------------------------ */
/* Health blog                                                         */
/* ------------------------------------------------------------------ */

export const articles: Article[] = [
  {
    slug: "fatty-liver-disease",
    image: "/images/blog/fatty-liver-disease.jpg",
    title: "Fatty Liver Disease: Symptoms, Causes and Prevention",
    summary: "What fatty liver is, who is at risk, how it is checked and what helps.",
    category: "Liver Health",
    author: "GPMC Editorial Team",
    published: "2026-01-15",
    updated: "2026-11-24",
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
    references: [
      { label: "NHS: Non-alcoholic fatty liver disease", href: "https://www.nhs.uk/conditions/non-alcoholic-fatty-liver-disease/" },
      { label: "NIDDK: Nonalcoholic fatty liver disease", href: "https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash" },
    ],
    related: [
      { label: "Hepatology / Liver Clinic", href: "/departments/hepatology/" },
      { label: "Ultrasound Services", href: "/departments/ultrasound/" },
    ],
  },
  {
    slug: "when-do-you-need-a-colonoscopy",
    image: "/images/blog/when-do-you-need-a-colonoscopy.jpg",
    title: "When Do You Need a Colonoscopy?",
    summary: "Warning signs worth checking, screening and what the day looks like.",
    category: "Colonoscopy Education",
    author: "GPMC Editorial Team",
    published: "2026-02-10",
    updated: "2026-11-24",
    readingMinutes: 4,
    body: [
      "A colonoscopy lets the doctor look at the whole large bowel with a thin flexible camera. It is the most reliable way to find the cause of many bowel symptoms, and polyps can usually be removed during the same test.",
      "## Warning signs worth checking",
      "See a specialist if you have blood in your stool or black stools, a change in bowel habit lasting more than a few weeks, unexplained weight loss, ongoing abdominal pain, or anaemia without a clear cause. These do not always mean something serious, but they should be looked at properly.",
      "## Screening without symptoms",
      "Many international guidelines now advise people at average risk to start bowel cancer screening at around age 45. If a parent, brother or sister had bowel cancer or advanced polyps, screening usually starts earlier. Your doctor will advise on timing for you.",
      "## What the day looks like",
      "Bowel preparation the day before is the most important part: a clean bowel means a clearer view and fewer repeat tests. Sedation is available, the procedure itself usually takes 20 to 45 minutes, and you rest in recovery before going home with someone.",
      "## Results",
      "Your doctor explains what was seen before you leave. If samples or polyps were sent to the laboratory, those results follow at a review appointment.",
    ],
    references: [
      { label: "NHS: Colonoscopy", href: "https://www.nhs.uk/conditions/colonoscopy/" },
      { label: "NHS: Symptoms of bowel cancer", href: "https://www.nhs.uk/conditions/bowel-cancer/symptoms/" },
    ],
    related: [
      { label: "Colonoscopy procedure", href: "/procedures/colonoscopy/" },
      { label: "Colonoscopy preparation", href: "/patient-resources/#preparation" },
    ],
  },
  {
    slug: "hepatitis-awareness",
    image: "/images/blog/hepatitis-awareness.jpg",
    title: "Hepatitis Awareness: Protecting Your Liver Health",
    summary: "How hepatitis spreads, testing, treatment and protecting your family.",
    category: "Liver Health",
    author: "GPMC Editorial Team",
    published: "2026-03-05",
    updated: "2026-11-24",
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
      "Modern tablets cure most people with hepatitis C, usually within 12 weeks. Hepatitis B can be kept under control with long-term antiviral medicine and regular monitoring. Starting treatment early helps prevent cirrhosis and lowers the risk of liver cancer.",
      "## Protect yourself and your family",
      "Get vaccinated against hepatitis B, insist on a new syringe for every injection, never share razors or toothbrushes, and get tested if a family member has hepatitis.",
    ],
    references: [
      { label: "WHO: Hepatitis B fact sheet", href: "https://www.who.int/news-room/fact-sheets/detail/hepatitis-b" },
      { label: "WHO: Hepatitis C fact sheet", href: "https://www.who.int/news-room/fact-sheets/detail/hepatitis-c" },
    ],
    related: [{ label: "Hepatology / Liver Clinic", href: "/departments/hepatology/" }],
  },
];

/* ------------------------------------------------------------------ */
/* Gallery (About GPMC)                                                */
/* ------------------------------------------------------------------ */

export interface GalleryImage {
  /** Path under /public, e.g. "/images/gallery/reception.jpg". */
  src: string;
  alt: string;
}

/**
 * Curated, approved photos of real GPMC spaces. Save images into
 * /public/images/gallery/ and list them here. Empty = gallery hidden.
 */
export const galleryImages: GalleryImage[] = [];

/* ------------------------------------------------------------------ */
/* SEO landing pages (service + city keywords)                         */
/* ------------------------------------------------------------------ */

export const seoLandings: SeoLanding[] = [
  {
    slug: "gastroenterologist-in-multan",
    metaTitle: "Gastroenterologist in Multan",
    metaDescription:
      "Consult an FCPS gastroenterologist in Multan for reflux, liver disease, abdominal pain and bowel problems at Gastro Plus Medical Complex, Khanewal Road.",
    h1: "Gastroenterologist in Multan",
    intro:
      "GPMC's gastroenterology service assesses and treats conditions of the stomach, intestines, liver, pancreas and bile ducts, with endoscopy available in the same building.",
    points: [
      "Reflux, indigestion and persistent abdominal pain",
      "Liver disease, fatty liver and hepatitis",
      "Pancreatic and bowel disorders",
      "Upper GI endoscopy, colonoscopy and ERCP on site",
    ],
    related: [
      { label: "Gastroenterology department", href: "/departments/gastroenterology/" },
      { label: "Liver Specialist in Multan", href: "/liver-specialist-in-multan/" },
    ],
  },
  {
    slug: "endoscopy-in-multan",
    metaTitle: "Endoscopy in Multan",
    metaDescription:
      "Upper GI endoscopy (gastroscopy) in Multan at Gastro Plus Medical Complex: what it is for, how to prepare and how to request an appointment.",
    h1: "Endoscopy in Multan",
    intro:
      "GPMC's endoscopy unit performs upper GI endoscopy, colonoscopy and ERCP. Your specialist explains the procedure, its risks and your preparation before you consent.",
    points: [
      "Upper GI endoscopy (gastroscopy)",
      "Sedation offered when appropriate",
      "Personal preparation instructions",
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
      "Colonoscopy in Multan for diagnosis and screening of bowel conditions at Gastro Plus Medical Complex, with polyp removal where appropriate.",
    h1: "Colonoscopy in Multan",
    intro:
      "Colonoscopy finds the cause of many bowel symptoms and allows polyps to be removed during the same test. Our team guides you through preparation, the procedure and recovery.",
    points: [
      "Diagnostic and screening colonoscopy",
      "Polyp removal where appropriate",
      "Clear preparation guidance before your procedure",
    ],
    related: [
      { label: "Colonoscopy procedure", href: "/procedures/colonoscopy/" },
      { label: "Patient Resources", href: "/patient-resources/" },
    ],
  },
  {
    slug: "ercp-in-multan",
    metaTitle: "ERCP in Multan",
    metaDescription:
      "ERCP in Multan for bile duct stones and blockages at Gastro Plus Medical Complex: what it involves, preparation, risks and recovery.",
    h1: "ERCP in Multan",
    intro:
      "ERCP is a specialised endoscopic procedure for bile duct and pancreatic duct problems. Your specialist assesses your case and explains the benefits, risks and alternatives.",
    points: [
      "Bile duct stone removal",
      "Relief of bile duct blockages, often with a stent",
      "Observation in the short stay unit when needed",
    ],
    related: [{ label: "ERCP procedure", href: "/procedures/ercp/" }],
  },
  {
    slug: "liver-specialist-in-multan",
    metaTitle: "Liver Specialist in Multan",
    metaDescription:
      "Liver specialist (hepatologist) in Multan for hepatitis, fatty liver disease and raised liver tests at Gastro Plus Medical Complex.",
    h1: "Liver Specialist in Multan",
    intro:
      "GPMC's liver clinic covers fatty liver disease, viral hepatitis and other liver conditions, with laboratory tests and ultrasound in the same building.",
    points: [
      "Fatty liver disease assessment and follow-up",
      "Hepatitis B and C evaluation and treatment",
      "Laboratory and ultrasound services on site",
    ],
    related: [
      { label: "Hepatology / Liver Clinic", href: "/departments/hepatology/" },
      { label: "Fatty Liver Disease article", href: "/blog/fatty-liver-disease/" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const findDepartment = (slug: string) => departments.find((d) => d.slug === slug);
export const findProcedure = (slug: string) => procedures.find((p) => p.slug === slug);
export const findSpecialist = (slug: string) => specialists.find((s) => s.slug === slug);
