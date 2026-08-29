import { useState } from "react";
import { cards, types } from "./OfficeLocationsData";
import { motion } from "framer-motion";
import { FadeInSection } from "../common/FadeInSection";
import { StaggerContainer, staggerItem } from "../common/StaggerContainer";


const OfficeLocations = () => {
  const [selectedType, setSelectedType] = useState("All");

  const filteredCards = cards.filter((card) => {
    if (selectedType === "All") {
      return true;
    }

    return card.type === selectedType;
  });

  return (
    <section className="bg-bg-dark-1 py-4 text-white md:py-16">
      <div className="site-container max-md:px-2">
        <FadeInSection direction="up" className="mb-10 -mx-2 flex w-[calc(100%+1rem)] items-center gap-1.5 rounded-lg border border-bg-gray-1 bg-bg-dark p-3 md:mx-0 md:w-fit md:gap-2 md:p-2">
          <motion.button
            whileHover={{scale: 1.03}}
            whileTap={{scale: 0.97}}
            onClick={() => setSelectedType("All")}
            className={`h-11 flex-1 rounded-md border px-3 text-sm font-medium transition md:h-auto md:w-[120px] md:flex-none md:px-5 md:py-3 md:text-sm ${
              selectedType === "All"
                ? "border-[#262626] bg-[#141414] text-white"
                : "border-[#262626] bg-[#1A1A1A] text-white hover:bg-[#252525] hover:text-white"
            }`}
          >
            All
          </motion.button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`h-11 flex-1 rounded-md border px-3 text-sm font-medium transition md:h-auto md:w-[120px] md:flex-none md:px-5 md:py-3 md:text-sm ${
                selectedType === type
                  ? "border-[#262626] bg-[#141414] text-white"
                  : "border-[#262626] bg-[#1A1A1A] text-gray hover:bg-[#252525] hover:text-white"
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
              className="rounded-lg border border-bg-gray-1 bg-bg-dark-1 p-7"
            >
              <p className="mb-4 text-sm ext-gray">{card.mainTitle}</p>

              <h2 className="mb-4 text-xl font-semibold leading-tight sm:text-2xl md:whitespace-nowrap">
                {card.title}
              </h2>

              <p className="mb-7 max-w-150 text-gray">
                {card.description}
              </p>

              <div className="mb-7 grid grid-cols-2 gap-3 md:flex md:flex-wrap">
                {card.info.map((item, index) => (
                  <span
                    key={item.text}
                    className={`flex min-w-0 w-fit max-w-full items-center gap-2 rounded-full border border-bg-gray-1 bg-bg-dark px-4 py-2 text-[15px] text-white ${
                      index === 0 ? "col-span-2 md:col-span-1" : ""
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt=""
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
