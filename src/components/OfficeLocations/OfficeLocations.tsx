import { useState } from "react";
import { cards, types } from "./OfficeLocationsData";

const OfficeLocations = () => {
  const [selectedType, setSelectedType] = useState("All");

  const filteredCards = cards.filter((card) => {
    if (selectedType === "All") {
      return true;
    }

    return card.type === selectedType;
  });

  return (
    <section className="bg-bg-dark-1 py-16 text-white">
      <div className="site-container">
        <div className="mb-10 flex w-fit items-center gap-2 rounded-lg border border-[#333333] bg-[#141414] p-2">
          <button
            onClick={() => setSelectedType("All")}
            className={`rounded-md px-5 py-3 text-sm font-medium transition ${
              selectedType === "All"
                ? "bg-primary text-white"
                : "text-gray hover:bg-[#252525] hover:text-white"
            }`}
          >
            All
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`rounded-md px-5 py-3 text-sm font-medium transition ${
                selectedType === type
                  ? "bg-primary text-white"
                  : "text-gray hover:bg-[#252525] hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-[#333333] bg-bg-dark p-7"
            >
              <p className="mb-4 text-sm ext-gray">{card.mainTitle}</p>

              <h2 className="mb-4 text-2xl font-semibold whitespace-nowrap">{card.title}</h2>

              <p className="mb-7 max-w-150 leading-7 text-gray">
                {card.description}
              </p>

              <div className="mb-7 flex flex-wrap gap-3">
                {card.info.map((item) => (
                  <span
                    key={item.text}
                    className="flex items-center gap-2 rounded-full border border-[#333333] bg-[#222222] px-4 py-2 text-sm text-[#CCCCCC]"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;
