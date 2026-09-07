import { useSyncExternalStore } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { getFallbackErrors, subscribeFallbackErrors } from "../../api/firestore";

export const DemoDataBanner = () => {
  const errors = useSyncExternalStore(
    subscribeFallbackErrors,
    getFallbackErrors,
    getFallbackErrors,
  );

  if (errors.length === 0) return null;

  const reason = errors[0]?.message;

  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-500"
    >
      <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="font-medium">
          Showing demo data — Firestore is empty, unreachable, or rejecting reads.
        </p>
        <p className="mt-0.5 opacity-80">
          Changes you make here won&apos;t persist.
          {reason ? ` Reason: ${reason}` : ""}
        </p>
      </div>
    </div>
  );
};

export default DemoDataBanner;
