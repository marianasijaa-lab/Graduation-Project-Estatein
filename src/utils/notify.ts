import toast from "react-hot-toast";

/**
 * Thin wrapper around react-hot-toast so every call site in the app uses the
 * same duration / id strategy. Styling lives on the <Toaster> in AppToaster.tsx.
 */

const SUCCESS_DURATION = 3500;
const ERROR_DURATION = 6000;

export function notifySuccess(message: string): void {
  toast.success(message, { duration: SUCCESS_DURATION });
}

export function notifyError(message: string): void {
  toast.error(message, { duration: ERROR_DURATION });
}

// ─── Error → readable message ───

/**
 * Turns whatever was thrown by a Firebase / Firestore call into a short, plain
 * sentence suitable for a toast. Falls back to `fallback` only when nothing
 * useful can be extracted — never returns a raw error code.
 */
export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";

  const code = (error as { code?: string })?.code ?? "";
  const haystack = `${code} ${raw}`.toLowerCase();

  if (haystack.includes("permission-denied") || haystack.includes("insufficient permissions")) {
    return "You don't have permission to make this change.";
  }
  if (haystack.includes("firebase is not configured") || haystack.includes("configuration_not_found")) {
    return "Firebase isn't configured. Check the .env file.";
  }
  if (
    haystack.includes("unavailable") ||
    haystack.includes("network-request-failed") ||
    haystack.includes("network error") ||
    haystack.includes("failed to fetch")
  ) {
    return "Network error — check your connection and try again.";
  }
  if (haystack.includes("resource-exhausted") || haystack.includes("quota")) {
    return "Service is temporarily rate-limited. Try again in a moment.";
  }
  if (haystack.includes("deadline-exceeded")) {
    return "The request timed out. Please try again.";
  }
  if (haystack.includes("not-found") || haystack.includes("already taken") || haystack.includes("already registered")) {
    // These messages are already written for humans in api/firestore.ts.
    return raw || fallback;
  }

  return raw || fallback;
}
