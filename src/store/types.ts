
export type DataStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// ── Properties (Firestore collection: "properties") ────────────────────────
export interface FirestoreProperty {
  id: string;
  image: string;
  tag?: string;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  bedroomIcon?: string;
  bathroomIcon?: string;
  propertyTypeIcon?: string;
  priceHome: number;
  priceProperties: number;
  // Extended fields, used by the Dashboard
  location?: string;
  size?: number;
  buildYear?: number;
  amenities?: string[];
  images?: string[];
  featured?: boolean;
  currency?: string;
  createdAt?: string;
}

// ── Companies (Firestore collection: "companies") ───────────────────────────
export interface FirestoreCompany {
  id: string;
  date: string;
  heading: string;
  link: string;
  domain: string;
  category: string;
  testimony: string;
}

// ── Stats (Realtime Database path: /stats) ──────────────────────────────────
export interface Stat {
  value: string;
  label: string;
}

// ── Core values (Firestore collection: "values") ────────────────────────────
export interface FirestoreValue {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// ── Achievements (Firestore collection: "achievements") ─────────────────────
export interface FirestoreAchievement {
  id: string;
  title: string;
  description: string;
}

// ── FAQs (Firestore collection: "faqs") ──────────────────────────────────────
export interface FirestoreFAQ {
  id: string;
  question: string;
  description: string;
}

// ── Home page CTA section (Firestore collection: "cta") ─────────────────────
export interface FirestoreCTA {
  id: string;
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
}

// ── Cards for the "Unlock Property Value" section on the Services page ──────
// (Firestore collection: "unlockPropertyValue"). Each card is its own doc —
// the section's header/subtitle and InfoBox banner stay hardcoded in the component.
export interface FirestoreUnlockPropertyValueCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ── Cards for the "Effortless Property Management" section on the Services page ──
// (Firestore collection: "effortlessPropertyManagement") — same note as above.
export interface FirestoreEffortlessPropertyManagementCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ── Cards for the "Smart Investments" section on the Services page ──────────
// (Firestore collection: "smartInvestments") — same note as above.
export interface FirestoreSmartInvestmentsCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ── Services (Firestore collection: "services") ─────────────────────────────
export interface FirestoreService {
  id: string;
  icon: string;
  heading: string;
}

// ── Info boxes (Firestore collection: "infoBoxes") ───────────────────────────
export interface FirestoreInfoBox {
  id: string;
  variant: 'horizontal' | 'vertical';
  title: string;
  description: string;
  buttonLabel?: string;
}

// ── Client testimonials (Firestore collection: "testimonials") ──────────────
export interface FirestoreTestimonial {
  id: string;
  clientName: string;
  clientImage: string;       // client photo URL
  clientLocation: string;    // e.g. "USA, California"
  title: string;             // testimonial headline
  description: string;       // testimonial body
  rating: number;            // 1 - 5
  position?: string;         // job title (optional)
  createdAt?: string;
}

// ── Contact messages (Firestore collection: "contacts") ──────────────────────
export interface FirestoreContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  inquiryType?: string;      // buying, selling, consulting, etc.
  howDidYouHear?: string;    // how they heard about us
  propertyId?: string;       // related property (optional)
  status: 'new' | 'processing' | 'replied';
  createdAt: string;
}

// ── Company offices (Firestore collection: "offices") ─────────────────────────
export interface FirestoreOffice {
  id: string;
  name: string;             // office name
  address: string;          // full address
  city: string;
  country: string;
  phone: string;
  email: string;
  type: 'Regional' | 'International' | 'Local';  // for tab filtering
  latitude?: number;
  longitude?: number;
  image?: string;           // office photo (optional)
}
