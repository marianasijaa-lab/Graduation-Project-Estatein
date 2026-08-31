import { useState } from "react";
import { cards, types } from "./OfficeLocationsData";
import { motion } from "framer-motion";
import { FadeInSection } from "../common/FadeInSection";
import { StaggerContainer, staggerItem } from "../common/StaggerContainer";


// Public tabs — mirrors officesSlice.activeTab. "Local" offices only surface
// under "All", matching the slice's tab union.
const types: Array<Exclude<FirestoreOffice["type"], "Local">> = ["Regional", "International"];

// Builds a usable "Get Direction" link even when an office has no directionsUrl.
function directionsHref(office: FirestoreOffice): string {
  if (office.directionsUrl) return office.directionsUrl;
  const query = encodeURIComponent(`${office.name}, ${office.address}, ${office.city}, ${office.country}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

const OfficeLocations = () => {
  const dispatch = useAppDispatch();
  const { offices, status, activeTab } = useOffices();

  const sortedOffices = useMemo(
    () =>
      offices
        .slice()
        .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)),
    [offices],
  );

  return (
    <section className="bg-(--bg-main) py-4 text-(--text-main) md:py-16">
      <div className="site-container max-md:px-2">
        <FadeInSection direction="up" className="mb-10 -mx-2 flex w-[calc(100%+1rem)] items-center gap-1.5 rounded-lg border border-bg-gray-1 bg-(--bg-secondary) p-3 md:mx-0 md:w-fit md:gap-2 md:p-2">
          <motion.button
            whileHover={{scale: 1.03}}
            whileTap={{scale: 0.97}}
            onClick={() => setSelectedType("All")}
            className={`h-11 flex-1 rounded-md border px-3 text-sm font-medium transition md:h-auto md:w-[120px] md:flex-none md:px-5 md:py-3 md:text-sm ${
              activeTab === "All"
                ? "border-[#262626] bg-(--bg-main) text-(--text-main)"
                : "border-[#262626] bg-(--bg-secondary) text-(--text-main) hover:bg-(--bg-hover) hover:text-(--text-main)"
            }`}
          >
            All
          </motion.button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => dispatch(setActiveTab(type))}
              className={`h-11 flex-1 rounded-md border px-3 text-sm font-medium transition md:h-auto md:w-[120px] md:flex-none md:px-5 md:py-3 md:text-sm ${
                activeTab === type
                  ? "border-[#262626] bg-(--bg-main) text-(--text-main)"
                  : "border-[#262626] bg-(--bg-secondary) text-gray hover:bg-(--bg-hover) hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredCards.map((card) => (
            <motion.div
              variants={staggerItem}
              whileHover={{y : -6}}
              transition={{duration: [0.25, 0.1, 0.25, 1]}}
              key={card.title}
              className="rounded-lg border border-bg-gray-1 bg-(--bg-main) p-7"
            >
              <p className="mb-4 text-sm ext-gray">{card.mainTitle}</p>

                <h2 className="mb-4 text-xl font-semibold leading-tight sm:text-2xl md:whitespace-nowrap">
                  {office.name}
                </h2>

                {office.description && (
                  <p className="mb-7 max-w-150 text-gray">{office.description}</p>
                )}

                <div className="mb-7 grid grid-cols-2 gap-3 md:flex md:flex-wrap">
                  {[
                    { icon: "/assets/icon_18.png", text: office.email },
                    { icon: "/assets/icon_34.png", text: office.phone },
                    { icon: "/assets/icon_35.png", text: `${office.city}, ${office.country}` },
                  ].map((item, index) => (
                    <span
                      key={item.text}
                      className={`flex min-w-0 w-fit max-w-full items-center gap-2 rounded-full border border-bg-gray-1 bg-bg-dark px-4 py-2 text-[15px] text-white ${
                        index === 0 ? "col-span-2 md:col-span-1" : ""
                      }`}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-4 w-4 object-contain text-white"
                      />

                      {item.text}
                    </span>
                  ))}
                </div>

              <button className="w-full rounded-md bg-primary py-3 font-medium text-white transition hover:bg-[#5d2de0]">
                {card.buttonText}
              </button>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default OfficeLocations;
