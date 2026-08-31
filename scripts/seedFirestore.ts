
import * as dotenv from 'dotenv';
import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ── Load env vars ────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// ── Use a Service Account if present, otherwise fall back to project ID ──
const serviceAccountPath = path.resolve(__dirname, '../serviceAccount.json');

let app: ReturnType<typeof initializeApp>;

if (fs.existsSync(serviceAccountPath)) {
  // Preferred: Service Account JSON.
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8')) as ServiceAccount;
  app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  });
  console.log('✅ Connected to Firebase via Service Account');
} else {
  // Fallback: project ID only (requires firebase-tools login).
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  if (!projectId) {
    console.error('❌ VITE_FIREBASE_PROJECT_ID not found in .env');
    console.error('   Or place a serviceAccount.json file in the project folder');
    process.exit(1);
  }
  app = initializeApp({
    projectId,
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  });
  console.log(`✅ Connected to Firebase (projectId: ${projectId})`);
}

const db  = getFirestore(app);
const rdb = getDatabase(app);

// ═══════════════════════════════════════════════════════════════════════════
//  Data
// ═══════════════════════════════════════════════════════════════════════════

// ── 1. properties ────────────────────────────────────────────────────────
const properties = [
  {
    id:1,
    image: '/assets/Discover1.webp',
    tag: 'Coastal Escapes - Where Waves Beckon',
    name: 'Seaside Serenity Villa',
    descriptionShort: 'A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...',
    descriptionLong:
      'Discover your own piece of paradise with the Seaside Serenity Villa. With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.',
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000,
    priceProperties: 550000,
    location: 'Malibu, California',
    size: 320,
    buildYear: 2019,
    amenities: ['Private Pool', 'Beach Access', 'Ocean View', 'Smart Home'],
    featured: true,
    currency: 'USD',
    createdAt: new Date().toISOString(),
  },
  {
    id:2,
    image: '/assets/Discover2.webp',
    tag: 'Urban Oasis - Life in the Heart of the City',
    name: 'Metropolitan Haven',
    descriptionShort: 'A chic and fully-furnished 2-bedroom apartment with panoramic city views...',
    descriptionLong:
      'Immerse yourself in the energy of the city. This modern apartment in the heart...',
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000,
    priceProperties: 550000,
    location: 'Manhattan, New York',
    size: 180,
    buildYear: 2021,
    amenities: ['City View', 'Concierge', 'Gym', 'Rooftop Terrace'],
    featured: true,
    currency: 'USD',
    createdAt: new Date().toISOString(),
  },
  {
    id:3,
    image: '/assets/Discover3.webp',
    tag: "Countryside Charm - Escape to Nature's Embrace",
    name: 'Rustic Retreat Cottage',
    descriptionShort: "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community...",
    descriptionLong:
      'Find tranquility in the countryside. This charming cottage is nestled amidst rolling hills...',
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000,
    priceProperties: 550000,
    location: 'Aspen, Colorado',
    size: 120,
    buildYear: 2015,
    amenities: ['Garden', 'Fireplace', 'Mountain View'],
    featured: false,
    currency: 'USD',
    createdAt: new Date().toISOString(),
  },
  {
    id:4,
    image: '/assets/Villa1.webp',
    tag: 'For Sale',
    name: 'Azure Skyline Penthouse',
    descriptionShort: 'An ultra-luxury penthouse with panoramic 360° city views.',
    descriptionLong:
      "Perched atop one of the city's most prestigious towers, this extraordinary penthouse redefines luxury living.",
    bedrooms: 5,
    bathrooms: 4,
    propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 2800000,
    priceProperties: 2800000,
    location: 'Dubai Marina, UAE',
    size: 650,
    buildYear: 2022,
    amenities: ['Infinity Pool', 'Private Gym', '360° Views', 'Butler Service'],
    featured: true,
    currency: 'USD',
    createdAt: new Date().toISOString(),
  },
  {
    id:5,
    image: '/assets/Villa2.webp',
    tag: 'For Rent',
    name: 'Garden View Townhouse',
    descriptionShort: 'A spacious 3-bedroom townhouse with a beautiful private garden.',
    descriptionLong:
      'This elegant townhouse offers the perfect blend of space and style. The open-plan ground floor flows seamlessly into a stunning landscaped garden, while three well-appointed bedrooms upstairs ensure comfort for the whole family.',
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'Townhouse',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 3200,
    priceProperties: 3200,
    location: 'Kensington, London',
    size: 220,
    buildYear: 2018,
    amenities: ['Private Garden', 'Terrace', 'Parking'],
    featured: false,
    currency: 'USD',
    createdAt: new Date().toISOString(),
  },
  {
    id:6,
    image: '/assets/Hero Image_1.webp',
    tag: 'For Sale',
    name: 'Desert Oasis Estate',
    descriptionShort: 'A stunning 6-bedroom estate with resort-style amenities.',
    descriptionLong:
      'Set in the exclusive desert landscape, this magnificent estate features resort-style amenities including a full-size tennis court, a lagoon pool with a waterfall, and a home theater. The gourmet kitchen and formal dining room make it ideal for grand entertaining.',
    bedrooms: 6,
    bathrooms: 5,
    propertyType: 'Estate',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 4200000,
    priceProperties: 4200000,
    location: 'Scottsdale, Arizona',
    size: 850,
    buildYear: 2020,
    amenities: ['Tennis Court', 'Lagoon Pool', 'Home Theater', 'Guest House'],
    featured: true,
    currency: 'USD',
    createdAt: new Date().toISOString(),
  },
];

// ── 2. companies ──────────────────────────────────────────────────────────
const companies = [
   {
    id: 'comp-1',
    date: 'Since 2019',
    heading: 'ABC Corporation',
    link: 'https://abccorporation.example.com',
    domain: 'Commercial Real Estate',
    category: 'Luxury Home Development',
    testimony: "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
    order: 1,
  },
  {
    id: 'comp-2',
    date: 'Since 2018',
    heading: 'GreenTech Enterprises',
    link: 'https://greentech.example.com',
    domain: 'Commercial Real Estate',
    category: 'Retail Space',
    testimony: "Estatein's ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
    order: 2,
  },
  {
    id: 'comp-3',
    date: 'Since 2020',
    heading: 'Skyline Developments',
    link: 'https://skyline.example.com',
    domain: 'Residential Real Estate',
    category: 'High-Rise Construction',
    testimony: 'Working with Estatein has been a game-changer for our development projects. Their market knowledge and network are second to none.',
    order: 3,
  },
  {
    id: 'comp-4',
    date: 'Since 2017',
    heading: 'Prestige Realty Group',
    link: 'https://prestigerealty.example.com',
    domain: 'Luxury Real Estate',
    category: 'Premium Residential',
    testimony: 'Estatein consistently delivers exceptional results for our luxury portfolio. Their professionalism and attention to detail are unmatched.',
    order: 4,
  },
  {
    id: 'comp-5',
    date: 'Since 2021',
    heading: 'Urban Living Co.',
    link: 'https://urbanliving.example.com',
    domain: 'Mixed-Use Development',
    category: 'Urban Residential',
    testimony: 'The team at Estatein helped us identify the best urban locations for our projects. Their insight into city living trends is invaluable.',
    order: 5,
  },
];

// ── 3. values ────────────────────────────────────────────────────────────
const values = [
  {
    icon: '/assets/Icon_33.png',
    title: 'Trust',
    description: 'Trust is the cornerstone of every successful real estate transaction.',
  },
  {
    icon: '/assets/icon_10.png',
    title: 'Excellence',
    description: 'We set the bar high for ourselves. From the properties we list to the services we provide.',
  },
  {
    icon: '/assets/icon_11.png',
    title: 'Client-Centric',
    description: 'Your dreams and needs are at the center of our universe. We listen, understand.',
  },
  {
    icon: '/assets/Icon_33.png',
    title: 'Our Commitment',
    description: 'We are dedicated to providing you with the highest level of service, professionalism, and support.',
  },
];

// ── 4. achievements ───────────────────────────────────────────────────────
const achievements = [
  {
    title: '3+ Years of Excellence',
    description:
      "With over 3 years in the industry, we've amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate.",
    order: 1,
  },
  {
    title: 'Happy Clients',
    description:
      'Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.',
    order: 2,
  },
  {
    title: 'Industry Recognition',
    description:
      "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
    order: 3,
  },
];

// ── 5. services ───────────────────────────────────────────────────────────
// The 4 short highlight cards at the top of the Services page (heading + icon
// only) — matches FALLBACK_SERVICES in servicesSlice.ts.
const services = [
  {
    icon: '/assets/Icon_1.png',
    heading: 'Find Your Dream Home',
  },
  {
    icon: '/assets/Icon_2.png',
    heading: 'Unlock Property Value',
  },
  {
    icon: '/assets/Icon_3.png',
    heading: 'Effortless Property Management',
  },
  {
    icon: '/assets/Icon_4.png',
    heading: 'Smart Investments, Informed Decisions',
  },
];

// ── 6. infoBoxes ──────────────────────────────────────────────────────────
const infoBoxes = [
  {
    variant: 'horizontal',
    title: 'Discover Your Dream Property with Estatein',
    description:
      'Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.',
    buttonLabel: 'Learn More',
  },
  {
    variant: 'vertical',
    title: "Unlock the Door to Your Real Estate Dreams",
    description:
      'With years of experience and a dedicated team, we\'re here to make your real estate dreams come true. Whether you\'re buying, selling, or renting, we offer a seamless and rewarding experience.',
    buttonLabel: 'Get Started',
  },
];

// ── 7. testimonials ───────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    clientName: 'Wade Warren',
    clientImage: '/assets/Profile_1.png',
    clientLocation: 'USA, California',
    title: 'Exceptional Service!',
    description: "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    rating: 5,
    position: 'Software Engineer',
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    clientName: 'Emelie Thomson',
    clientImage: '/assets/Profile_2.png',
    clientLocation: 'USA, Florida',
    title: 'Efficient and Reliable',
    description: "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
    rating: 5,
    position: 'Business Owner',
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    clientName: 'John Mans',
    clientImage: '/assets/Profile_3.png',
    clientLocation: 'USA, Nevada',
    title: 'Trusted Advisors!',
    description: "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
    rating: 5,
    position: 'Financial Analyst',
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    clientName: 'Cameron Williamson',
    clientImage: '/assets/Profile_1.png',
    clientLocation: 'USA',
    title: 'Stress-Free Experience!',
    description:
      'Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. ',
    rating: 5,
    position: 'Corporate Executive',
    order: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    clientName: 'Brooklyn Simmons',
    clientImage: '/assets/Profile_2.png',
    clientLocation: 'USA, Illinois',
    title: 'Outstanding Support!',
    description:
      'The team at Estatein went above and beyond to help us find our dream home. Their professionalism, attention to detail, and genuine care for their clients sets them apart from the rest.',
    rating: 5,
    position: 'Entrepreneur',
    order: 5,
    createdAt: new Date().toISOString(),
  },
];

// ── 8. offices ────────────────────────────────────────────────────────────
const offices = [
  
     {
    id: 'off-1',
    name: '123 Estatein Plaza, City Center, Metropolis',
    city: 'Metropolis',
    country: '',
    phone: '+1 (123) 456-7890',
    email: 'info@estatein.com',
    type: 'Regional',
    description:
      'Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Metropolis+889+Francisco+Street+Los+Angeles',
    order: 1,
  },
 {
    id: 'off-2',
    name: '456 Urban Avenue, Downtown District, Metropolis',
    city: 'Metropolis',
    country: '',
    phone: '+1 (123) 628-7890',
    email: 'info@restatein.com',
    type: 'International',
    description:
      "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Metropolis+889+Francisco+Street+Los+Angeles',
    order: 2,
  },

];

// ── 9. unlockPropertyValue ────────────────────────────────────────────────
// Each card is its own doc — the section's header and banner aren't managed
// from the dashboard, they stay hardcoded in UnlockPropertyValue.tsx.
const unlockPropertyValue = [
  {
    title: 'Valuation Mastery',
    description: 'Discover the true worth of your property with our expert valuation services.',
    icon: '/assets/Icon_19.png',
  },
  {
    title: 'Strategic Marketing',
    description: 'Selling a property requires more than just a listing; it demands a strategic marketing approach.',
    icon: '/assets/Icon_20.png',
  },
  {
    title: 'Negotiation Wizardry',
    description: 'Negotiating the best deal is an art, and our negotiation experts are masters of it.',
    icon: '/assets/Icon_21.png',
  },
  {
    title: 'Closing Success',
    description: 'A successful sale is not complete until the closing. We guide you through the intricate closing process.',
    icon: '/assets/Icon_22.png',
  },
];

// ── 10. effortlessPropertyManagement ─────────────────────────────────────
// Each card is its own doc — same note as above (header/banner stay hardcoded).
const effortlessPropertyManagement = [
  {
    title: 'Tenant Harmony',
    description: 'Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.',
    icon: '/assets/Icon_23.png',
  },
  {
    title: 'Maintenance Ease',
    description: 'Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.',
    icon: '/assets/Icon_24.png',
  },
  {
    title: 'Financial Peace of Mind',
    description: 'Managing property finances can be complex. Our financial experts take care of rent collection',
    icon: '/assets/Icon_25.png',
  },
  {
    title: 'Legal Guardian',
    description: 'Stay compliant with property laws and regulations effortlessly.',
    icon: '/assets/Icon_27.png',
  },
];

// ── 11. smartInvestments ──────────────────────────────────────────────────
// Each card is its own doc — same note as above (header/banner stay hardcoded).
const smartInvestments = [
  {
    title: 'Market Insight',
    description:
      'Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions',
    icon: '/assets/Icon_19.png',
  },
  {
    title: 'ROI Assessment',
    description:
      'Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments',
    icon: '/assets/Icon_27.png',
  },
  {
    title: 'Customized Strategies',
    description:
      'Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs',
    icon: '/assets/Icon_28.png',
  },
  {
    title: 'Diversification Mastery',
    description:
      'Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations',
    icon: '/assets/Icon_4.png',
  },
];

// ── 12. contacts (inquiries / messages) ──────────────────────────────────
const contacts = [
  {
    firstName: 'Jordan',
    lastName: 'Rivera',
    email: 'jordan.rivera@example.com',
    phone: '+1 (415) 555-0148',
    message:
      "I'm relocating to the Bay Area this autumn and would love a call to talk through 3-bedroom options in the $1.2M–$1.6M range.",
    inquiryType: 'Buying',
    howDidYouHear: 'Google',
    status: 'new',
    createdAt: new Date().toISOString(),
  },
  {
    firstName: 'Amelia',
    lastName: 'Chen',
    email: 'amelia.chen@example.com',
    phone: '+44 20 5555 0192',
    message:
      'We are considering listing our Kensington townhouse next spring and would like a valuation and marketing plan.',
    inquiryType: 'Selling',
    howDidYouHear: 'Friend',
    status: 'contacted',
    assignedTo: 'London desk',
    adminNote: 'Sent valuation pack on the 12th — following up next week.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    firstName: 'Marcus',
    lastName: 'Okafor',
    email: 'marcus.okafor@example.com',
    phone: '+971 4 555 0210',
    message:
      'Interested in the Azure Skyline Penthouse — can you share the full pricing breakdown and arrange a viewing?',
    inquiryType: 'Investment',
    howDidYouHear: 'Advertisement',
    propertyId: 'prop-4',
    propertyName: 'Azure Skyline Penthouse',
    status: 'closed',
    assignedTo: 'Dubai desk',
    adminNote: 'Viewing completed, client decided to hold. Archived.',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ── 13. subscribers (newsletter) ─────────────────────────────────────────
const subscribers = [
  {
    email: 'olivia.bennett@example.com',
    status: 'subscribed',
    source: 'footer',
    name: 'Olivia Bennett',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    email: 'noah.kim@example.com',
    status: 'subscribed',
    source: 'contact-page',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    email: 'liam.torres@example.com',
    status: 'unsubscribed',
    source: 'footer',
    name: 'Liam Torres',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ── 14. siteSettings/contact (single doc: contact info + social links) ────
const contactSettings = {
  email: 'info@estatein.com',
  phone: '+1 (123) 456-7890',
  address: '123 Estatein Plaza, City Center, Metropolis',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=123+Estatein+Plaza+Metropolis',
  openingHours: 'Mon–Fri, 9:00 AM – 6:00 PM',
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/estatein', enabled: true },
    { platform: 'linkedin', url: 'https://linkedin.com/company/estatein', enabled: true },
    { platform: 'twitter', url: 'https://twitter.com/estatein', enabled: true },
    { platform: 'youtube', url: 'https://youtube.com/@estatein', enabled: true },
    { platform: 'instagram', url: 'https://instagram.com/estatein', enabled: false },
  ],
};

// ── 15. faqs ──────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'How do I search for properties on Estatein?',
    description:
      'Use the search bar on the Properties page to filter listings by location, price range, property type, and more. Each result links straight to its full details page.',
  },
  {
    question: 'What documents do I need to buy a property?',
    description:
      'Typically a valid photo ID, proof of funds or a mortgage pre-approval, and a signed offer letter. Our agents walk you through every document at each step.',
  },
  {
    question: 'Does Estatein help with property financing?',
    description:
      'Yes. We partner with trusted lenders and can connect you with mortgage advisors to find financing options that fit your budget.',
  },
  {
    question: 'Can I schedule a viewing before making an offer?',
    description:
      'Absolutely. You can request an in-person or virtual viewing for any active listing directly from its property details page.',
  },
];

// ── 16. cta ────────────────────────────────────────────────────────────────
const cta = [
  {
    heading: 'Start Your Real Estate Journey Today',
    subheading:
      "Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.",
    buttonText: 'Explore Properties',
    buttonLink: '/properties',
  },
];

// ── 17. stats (Realtime Database) ─────────────────────────────────────────
const stats = [
  { value: '200+', label: 'Happy Customers' },
  { value: '10K+', label: 'Properties For Clients' },
  { value: '16+',  label: 'Years of Experience' },
];

// ═══════════════════════════════════════════════════════════════════════════
//  Uploads a single collection to Firestore
// ═══════════════════════════════════════════════════════════════════════════
async function seedCollection(
  collectionName: string,
  documents: Record<string, unknown>[],
) {
  console.log(`\n📦 Uploading collection: ${collectionName} (${documents.length} documents)`);

  const colRef = db.collection(collectionName);

  // Delete old documents first to avoid duplicates.
  const existing = await colRef.get();
  if (!existing.empty) {
    const batch = db.batch();
    existing.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    console.log(`  🗑  Deleted ${existing.size} old document(s)`);
  }

  // Upload the new documents.
  const batch = db.batch();
  documents.forEach((doc) => {
    const docRef = colRef.doc(); // auto-generated ID
    batch.set(docRef, doc);
  });
  await batch.commit();
  console.log(`  ✅ Uploaded ${documents.length} document(s) successfully`);
}

// ═══════════════════════════════════════════════════════════════════════════
//  Writes a single well-known document (e.g. siteSettings/contact)
// ═══════════════════════════════════════════════════════════════════════════
async function seedSingletonDoc(
  collectionName: string,
  docId: string,
  data: Record<string, unknown>,
) {
  console.log(`\n Writing document: ${collectionName}/${docId}`);
  await db.collection(collectionName).doc(docId).set(data);
  console.log(' Document written successfully');
}

// ═══════════════════════════════════════════════════════════════════════════
//  Uploads stats to the Realtime Database
// ═══════════════════════════════════════════════════════════════════════════
async function seedRealtimeStats(statsData: { value: string; label: string }[]) {
  console.log('\n⚡ Uploading stats to the Realtime Database');
  const statsRef = rdb.ref('stats');
  await statsRef.set(statsData);
  console.log('  ✅ Stats uploaded successfully');
}

// ═══════════════════════════════════════════════════════════════════════════
//  Main entry point
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('🚀 Starting data upload to Firebase...\n');

  await seedCollection('properties',   properties   as Record<string, unknown>[]);
  await seedCollection('companies',    companies    as Record<string, unknown>[]);
  await seedCollection('values',       values       as Record<string, unknown>[]);
  await seedCollection('achievements', achievements as Record<string, unknown>[]);
  await seedCollection('services',     services     as Record<string, unknown>[]);
  await seedCollection('infoBoxes',    infoBoxes    as Record<string, unknown>[]);
  await seedCollection('testimonials', testimonials as Record<string, unknown>[]);
  await seedCollection('offices',      offices      as Record<string, unknown>[]);
  await seedCollection('unlockPropertyValue',           unlockPropertyValue           as Record<string, unknown>[]);
  await seedCollection('effortlessPropertyManagement',  effortlessPropertyManagement  as Record<string, unknown>[]);
  await seedCollection('smartInvestments',              smartInvestments              as Record<string, unknown>[]);
  await seedCollection('contacts',     contacts     as Record<string, unknown>[]);
  await seedCollection('subscribers',  subscribers  as Record<string, unknown>[]);
  await seedCollection('faqs',         faqs         as Record<string, unknown>[]);
  await seedCollection('cta',          cta          as Record<string, unknown>[]);
  await seedSingletonDoc('siteSettings', 'contact', contactSettings as Record<string, unknown>);
  await seedRealtimeStats(stats);

  console.log('\n🎉 All data uploaded successfully!');
  console.log('   You can now run the app with: npm run dev\n');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});