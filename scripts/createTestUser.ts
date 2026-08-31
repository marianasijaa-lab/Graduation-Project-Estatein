// One-off script: creates a test admin user in Firebase Authentication so
// there's an account to sign in with while the login screen is in place.
import * as dotenv from 'dotenv';
import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const serviceAccountPath = path.resolve(__dirname, '../serviceAccount.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccount.json not found — see scripts/seedFirestore.ts for setup.');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8')) as ServiceAccount;
const app = initializeApp({ credential: cert(serviceAccount) });
const auth = getAuth(app);

// Override via env vars if you want different test credentials.
const TEST_EMAIL = process.env.TEST_ADMIN_EMAIL ?? 'admin@estatein.com';
const TEST_PASSWORD = process.env.TEST_ADMIN_PASSWORD ?? 'Estatein123!';

// Creates the test admin user, or reports that one already exists with this email.
async function main() {
  const existing = await auth.getUserByEmail(TEST_EMAIL).catch(() => null);
  if (existing) {
    console.log(`ℹ️  User already exists: ${TEST_EMAIL} (uid: ${existing.uid})`);
    process.exit(0);
  }

  const user = await auth.createUser({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    emailVerified: true,
  });

  console.log(`✅ Created test admin user: ${user.email} (uid: ${user.uid})`);
  console.log(`   Password: ${TEST_PASSWORD}`);
  console.log('\n⚠️  Make sure Email/Password sign-in is enabled in the Firebase Console:');
  console.log('   Authentication → Sign-in method → Email/Password');
}

main().catch((err) => {
  console.error('❌ Failed to create test user:', err);
  process.exit(1);
});
