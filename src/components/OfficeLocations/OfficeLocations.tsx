import { useMemo } from "react";
import { motion } from "framer-motion";
import { FadeInSection } from "../common/FadeInSection";
import { staggerItem } from "../common/StaggerContainer";
import { useOffices } from "../../hooks/useOffices";
import { useAppDispatch } from "../../store";
import { setActiveTab } from "../../store/slices/officesSlice";
import type { FirestoreOffice } from "../../store/types";
import { buildOfficeTabs, getNextOfficeTab } from "./officeFilters";

// Builds a usable "Get Direction" link even when an office has no directionsUrl.
function directionsHref(office: FirestoreOffice): string {
  if (office.directionsUrl) return office.directionsUrl;
  const query = encodeURIComponent(
    `${office.name}, ${office.city}, ${office.country}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

const OfficeLocations = () => {
  const dispatch = useAppDispatch();
  const { offices, allOffices, status, activeTab } = useOffices();

  const tabs = useMemo(() => buildOfficeTabs(allOffices), [allOffices]);

  const sortedOffices = useMemo(
    () =>
      offices
        .slice()
        .sort(
          (a, b) =>
            (a.order ?? Number.MAX_SAFE_INTEGER) -
            (b.order ?? Number.MAX_SAFE_INTEGER),
        ),
    [offices],
  );

  return (
    <section className="bg-(--bg-main) py-4 text-(--text-main) lg:py-16">
      <div className="site-container max-lg:px-2">
        {/* Tab filter */}
        <FadeInSection
          direction="up"
          className="mb-10 -mx-2 flex w-[calc(100%+1rem)] items-center gap-1.5 rounded-lg border border-bg-gray-1 bg-(--bg-secondary) p-3 lg:mx-0 lg:w-fit lg:gap-2 lg:p-2"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => dispatch(setActiveTab(getNextOfficeTab(activeTab, tab)))}
              className={`h-11 flex-1 rounded-md border px-3 text-sm font-medium transition lg:h-auto lg:w-[120px] lg:flex-none lg:px-5 lg:py-3 lg:text-sm ${
                activeTab === tab
                  ? "border-[#262626] bg-(--bg-main) text-(--text-main)"
                  : "border-[#262626] bg-(--bg-secondary) text-gray hover:bg-[#252525] hover:text-(--text-main)"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </FadeInSection>

        {/* Loading state */}
        {status === "loading" && (
          <p className="text-center text-gray py-10">Loading offices…</p>
        )}

        {/* Office cards */}
        {status !== "loading" && (
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {sortedOffices.map((office) => (
              <motion.div
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                key={office.id}
                className="rounded-lg border border-bg-gray-1 bg-(--bg-main) p-7"
              >
                {/* Office type badge */}
                <p className="mb-4 text-sm text-gray">{office.type}</p>

                <h2 className="mb-4 text-xl font-semibold leading-tight sm:text-2xl lg:whitespace-nowrap">
                  {office.name}
                </h2>

                {office.description && (
                  <p className="mb-7 max-w-150 text-gray">{office.description}</p>
                )}

                <div className="mb-7 flex flex-col gap-2 lg:flex lg:flex-row lg:flex-wrap">
                  {/* Row 1: Email — full width */}
                  <span className="w-fit flex items-center gap-2 rounded-full border border-bg-gray-1 bg-bg-dark px-3 py-2 text-[12px] sm:text-[14px] lg:text-[15px] text-white whitespace-nowrap">
                    <img src="/assets/icon_18.png" alt="" loading="lazy" decoding="async" className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain shrink-0" />
                    {office.email}
                  </span>

                  {/* Row 2: Phone + Location */}
                  <div className="flex gap-2">
                    <span className="w-fit flex items-center gap-2 rounded-full border border-bg-gray-1 bg-bg-dark px-3 py-2 text-[12px] sm:text-[14px] lg:text-[15px] text-white whitespace-nowrap">
                      <img src="/assets/icon_34.png" alt="" loading="lazy" decoding="async" className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain shrink-0" />
                      {office.phone}
                    </span>
                    <span className="w-fit flex items-center gap-2 rounded-full border border-bg-gray-1 bg-bg-dark px-3 py-2 text-[12px] sm:text-[14px] lg:text-[15px] text-white whitespace-nowrap">
                      <img src="/assets/icon_35.png" alt="" loading="lazy" decoding="async" className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain shrink-0" />
                      {office.city}, {office.country}
                    </span>
                  </div>
                </div>

                <a
                  href={directionsHref(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-md bg-primary py-3 text-center font-medium text-white transition hover:bg-[#5d2de0]"
                >
                  Get Direction
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OfficeLocations;
