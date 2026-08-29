/** Env vars required to initialize Firebase. */
export const REQUIRED_ENV_VARS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_DATABASE_URL',
] as const;

export type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number];

/** Checks which required env vars are missing; logs and returns the list. */
export function validateFirebaseEnvVars(
  env: Record<string, string | undefined>
): RequiredEnvVar[] {
  const missing = REQUIRED_ENV_VARS.filter((varName) => !env[varName]);

  if (missing.length > 0) {
    console.error(
      `[Firebase] Missing required env vars: ${missing.join(', ')}\n` +
        'Make sure to fill in the .env file with the correct values from your Firebase console.'
    );
  }

  return missing;
}
