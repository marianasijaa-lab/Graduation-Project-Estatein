
export type DataStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// ── العقارات (Firestore collection: "properties") ──────────────────────────
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
  // حقول موسّعة للـ Dashboard
  location?: string;
  size?: number;
  buildYear?: number;
  amenities?: string[];
  images?: string[];
  featured?: boolean;
  currency?: string;
  createdAt?: string;
}

// ── الشركات (Firestore collection: "companies") ────────────────────────────
export interface FirestoreCompany {
  id: string;
  date: string;
  heading: string;
  link: string;
  domain: string;
  category: string;
  testimony: string;
}

// ── الإحصاءات (Realtime Database path: /stats) ────────────────────────────
export interface Stat {
  value: string;
  label: string;
}

// ── القيم المؤسسية (Firestore collection: "values") ───────────────────────
export interface FirestoreValue {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// ── الإنجازات (Firestore collection: "achievements") ──────────────────────
export interface FirestoreAchievement {
  id: string;
  title: string;
  description: string;
}

// ── الخدمات (Firestore collection: "services") ────────────────────────────
export interface FirestoreService {
  id: string;
  icon: string;
  heading: string;
}

// ── صناديق المعلومات (Firestore collection: "infoBoxes") ──────────────────
export interface FirestoreInfoBox {
  id: string;
  variant: 'horizontal' | 'vertical';
  title: string;
  description: string;
  buttonLabel?: string;
}

// ── آراء العملاء (Firestore collection: "testimonials") ───────────────────
export interface FirestoreTestimonial {
  id: string;
  clientName: string;
  clientImage: string;       // رابط صورة العميل
  clientLocation: string;    // مثال: "USA, California"
  title: string;             // عنوان الشهادة
  description: string;       // نص الشهادة
  rating: number;            // 1 - 5
  position?: string;         // المسمى الوظيفي (اختياري)
  createdAt?: string;
}

// ── رسائل التواصل (Firestore collection: "contacts") ─────────────────────
export interface FirestoreContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  inquiryType?: string;      // نوع الاستفسار: شراء، بيع، استشارة
  howDidYouHear?: string;    // كيف عرفت عنا
  propertyId?: string;       // معرف العقار (اختياري)
  status: 'new' | 'processing' | 'replied';   // حالة الرسالة
  createdAt: string;         // وقت الإرسال
}

// ── مكاتب الشركة (Firestore collection: "offices") ───────────────────────
export interface FirestoreOffice {
  id: string;
  name: string;             // اسم المكتب
  address: string;          // العنوان الكامل
  city: string;
  country: string;
  phone: string;
  email: string;
  type: 'Regional' | 'International' | 'Local';  // للتبويب
  latitude?: number;
  longitude?: number;
  image?: string;           // صورة المكتب (اختياري)
}
