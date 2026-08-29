import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getDatabase, type Database } from 'firebase/database';
import { getAuth, type Auth } from 'firebase/auth';
import { validateFirebaseEnvVars } from './validateEnvVars';

const missingVars = validateFirebaseEnvVars(import.meta.env as Record<string, string | undefined>);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

let app: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let realtimeDb: Database | null = null;
let auth: Auth | null = null;

if (missingVars.length === 0) {
  app = initializeApp(firebaseConfig);
  firestoreDb = getFirestore(app);
  realtimeDb = getDatabase(app);
  auth = getAuth(app);
} else {
  console.warn('[Firebase] التطبيق يعمل بدون Firebase — يرجى ملء ملف .env بقيم المشروع.');
}

export { firestoreDb, realtimeDb, auth };