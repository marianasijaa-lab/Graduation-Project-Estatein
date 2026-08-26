/**
 * قائمة متغيرات البيئة المطلوبة لتهيئة Firebase
 */
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

/**
 * التحقق من وجود متغيرات البيئة المطلوبة.
 * يُسجّل خطأً لكل متغير مفقود ويُرجع قائمة المتغيرات الناقصة.
 *
 * @param env - كائن البيئة (import.meta.env أو أي كائن Record)
 * @returns مصفوفة بأسماء المتغيرات المفقودة
 */
export function validateFirebaseEnvVars(
  env: Record<string, string | undefined>
): RequiredEnvVar[] {
  const missing = REQUIRED_ENV_VARS.filter((varName) => !env[varName]);

  if (missing.length > 0) {
    console.error(
      `[Firebase] متغيرات البيئة التالية مفقودة: ${missing.join(', ')}\n` +
        'تأكد من ملء ملف .env بالقيم الصحيحة من لوحة تحكم Firebase.'
    );
  }

  return missing;
}
