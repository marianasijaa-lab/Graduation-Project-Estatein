import React, { useState, useRef, useEffect } from "react";
import { FiMapPin, FiChevronDown, FiSearch } from "react-icons/fi";
import { HiHomeModern } from "react-icons/hi2";
import { PiMoneyWavyFill } from "react-icons/pi";
import { BsFillBoxFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa6";
import { useTheme } from "../../../Context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "../../common/FadeInSection";
import type { FirestoreProperty } from "../../../store/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type RangeOption = { label: string; value: [number, number] };
type FilterOption = string | RangeOption;

interface Filters {
  location: string;
  propertyType: string;
  pricingRange: RangeOption;
  propertySize: RangeOption;
  buildYear: string;
}

interface SearchSectionProps {
  onSearchSubmit?: (filteredResults: FirestoreProperty[]) => void;
  className?: string;
  properties: FirestoreProperty[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PropitySearchSection: React.FC<SearchSectionProps> = ({
  properties,
  onSearchSubmit,
  className = "",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Build filter options from live data
  const FILTER_OPTIONS = {
    location: ["All", ...Array.from(new Set(properties.map((p) => p.location)))],
    propertyType: ["All", ...Array.from(new Set(properties.map((p) => p.propertyType)))],
    pricingRange: [
      { label: "All", value: [0, Infinity] as [number, number] },
      { label: "$100k – $300k", value: [100_000, 300_000] as [number, number] },
      { label: "$500k – $1M", value: [500_000, 1_000_000] as [number, number] },
      { label: "$1M+", value: [1_000_000, Infinity] as [number, number] },
    ] as RangeOption[],
    propertySize: [
      { label: "All", value: [0, Infinity] as [number, number] },
      { label: "100–200 m²", value: [100, 200] as [number, number] },
      { label: "200–300 m²", value: [200, 300] as [number, number] },
      { label: "400–600 m²", value: [400, 600] as [number, number] },
      { label: "600–900 m²", value: [600, 900] as [number, number] },
      { label: "1000+ m²", value: [1000, Infinity] as [number, number] },
    ] as RangeOption[],
    buildYear: ["All", ...Array.from(new Set(properties.map((p) => String(p.buildYear))))],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    location: "",
    propertyType: "",
    pricingRange: { label: "", value: [0, Infinity] },
    propertySize: { label: "", value: [0, Infinity] },
    buildYear: "",
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key: string) =>
    setActiveDropdown((prev) => (prev === key ? null : key));

  const handleSelectOption = (key: string, option: FilterOption) => {
    if (key === "pricingRange" || key === "propertySize") {
      const rangeValue: RangeOption =
        typeof option === "string"
          ? { label: option, value: [0, Infinity] }
          : (option as RangeOption);
      setFilters((prev) => ({ ...prev, [key]: rangeValue }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: option === "All" ? "" : (option as string),
      }));
    }
    setActiveDropdown(null);
  };

  const handleSearch = () => {
    const results = properties.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !filters.location || item.location === filters.location;
      const matchesType = !filters.propertyType || item.propertyType === filters.propertyType;
      const [minPrice, maxPrice] = filters.pricingRange.value;
      const itemPrice = Number(item.priceProperties) || 0;
      const matchesPrice = itemPrice >= minPrice && itemPrice <= maxPrice;
      const [minSize, maxSize] = filters.propertySize.value;
      const itemSize = Number(item.size) || 0;
      const matchesSize = itemSize >= minSize && itemSize <= maxSize;
      const matchesYear = !filters.buildYear || String(item.buildYear) === filters.buildYear;
      return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesSize && matchesYear;
    });
    onSearchSubmit?.(results);
  };

  // ── Shared filter list config ──
  const filterList = [
    { id: "location",     label: "Location",      icon: FiMapPin,        options: FILTER_OPTIONS.location },
    { id: "propertyType", label: "Property Type", icon: HiHomeModern,    options: FILTER_OPTIONS.propertyType },
    { id: "pricingRange", label: "Pricing Range", icon: PiMoneyWavyFill, options: FILTER_OPTIONS.pricingRange },
    { id: "propertySize", label: "Property Size", icon: BsFillBoxFill,   options: FILTER_OPTIONS.propertySize },
    { id: "buildYear",    label: "Build Year",    icon: FaRegCalendar,   options: FILTER_OPTIONS.buildYear },
  ] as const;

  // Returns display label for a filter
  const getSelectedLabel = (id: string): string => {
    if (id === "pricingRange" || id === "propertySize") {
      return filters[id as "pricingRange" | "propertySize"].label;
    }
    return filters[id as keyof Filters] as string;
  };

  // ── Dropdown menu renderer ──
  const renderDropdownMenu = (
    filterId: string,
    options: readonly FilterOption[],
    isMobile = false,
  ) => (
    <AnimatePresence>
      {activeDropdown === filterId && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className={`absolute top-full left-0 w-full ${isMobile ? "mt-1" : "mt-2"} rounded-xl border shadow-xl z-50 max-h-48 overflow-y-auto ${
            isDark
              ? "bg-bg-dark border-bg-gray-1 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          {options.map((option) => {
            const isStr = typeof option === "string";
            const key = isStr ? option : (option as RangeOption).label;
            const display = isStr ? option : (option as RangeOption).label;
            return (
              <div
                key={key}
                onClick={() => handleSelectOption(filterId, option)}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  isDark ? "hover:bg-bg-gray-1" : "hover:bg-gray-100"
                }`}
              >
                {display}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ── Shared search input styles ──
  const searchInputClass = `flex-1 bg-transparent focus:outline-none text-sm ${
    isDark ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
  }`;

  return (
    <FadeInSection
      direction="up"
      className={`w-full pt-6 pb-10 px-4 lg:px-8 xl:px-16 transition-colors duration-300 relative z-10 ${className}`}
    >
      <div className="site-container flex flex-col items-center" ref={containerRef}>

        {/* ===== MOBILE ===== */}
        <div className="w-full flex flex-col gap-3 lg:hidden">

          {/* Search bar */}
          <div
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-colors ${
              isDark
                ? "bg-bg-dark-1 border-bg-gray-1"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search For A Property"
              className={searchInputClass}
            />
            <button
              onClick={handleSearch}
              className="shrink-0 ml-3 w-12 h-10 flex items-center justify-center bg-primary text-white rounded-lg hover:opacity-90 transition-all cursor-pointer"
            >
              <FiSearch className="text-lg" />
            </button>
          </div>

          {/* Filters */}
          <div
            className={`w-full flex flex-col gap-2 border rounded-2xl p-3 shadow-xl transition-colors ${
              isDark ? "bg-bg-dark border-bg-gray-1" : "bg-gray-50 border-gray-200"
            }`}
          >
            {filterList.map((filter) => {
              const Icon = filter.icon;
              const selectedValue = getSelectedLabel(filter.id);
              const isOpen = activeDropdown === filter.id;
              return (
                <div key={filter.id} className="relative w-full">
                  <div
                    onClick={() => toggleDropdown(filter.id)}
                    className={`w-full flex items-center justify-between border rounded-xl px-4 py-3.5 cursor-pointer transition-colors ${
                      isDark
                        ? "bg-bg-dark-1 border-bg-gray-1"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`shrink-0 text-lg ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                      <div className={`w-px h-4 ${isDark ? "bg-bg-gray-1" : "bg-gray-200"}`} />
                      <span
                        className={`text-sm ${
                          selectedValue
                            ? isDark ? "text-white" : "text-gray-900"
                            : isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {selectedValue || filter.label}
                      </span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronDown className={`shrink-0 text-base ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    </motion.div>
                  </div>
                  {renderDropdownMenu(filter.id, filter.options, true)}
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== DESKTOP ===== */}
        <div className="hidden lg:flex w-full flex-col items-center">

          {/* Search bar desktop */}
          <div
            className={`w-full max-w-4xl border border-b-0 rounded-t-2xl p-2.5 transition-colors ${
              isDark ? "bg-bg-dark border-bg-gray-1" : "bg-gray-100 border-gray-200"
            }`}
          >
            <div
              className={`w-full flex items-center justify-between border rounded-xl p-2 transition-colors ${
                isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center flex-1 px-3 py-1.5">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search For A Property"
                  className={`w-full h-13 bg-transparent focus:outline-none text-sm lg:text-base ${
                    isDark ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                  }`}
                />
              </div>
              <div className="shrink-0">
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white hover:opacity-90 max-2xl:px-[20px] max-2xl:py-[14px] 2xl:px-[24px] 2xl:py-[18px] 2xl:rounded-[10px] max-2xl:rounded-lg font-medium 2xl:text-[18px] max-2xl:text-sm whitespace-nowrap transition-all cursor-pointer"
                >
                  <FiSearch className="text-white text-base shrink-0" />
                  <span>Find Property</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters desktop */}
          <div
            className={`w-full border rounded-2xl p-2 sm:p-3 shadow-2xl transition-colors ${
              isDark ? "bg-bg-dark border-bg-gray-1" : "bg-gray-100 border-gray-200"
            }`}
          >
            <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-3">
              {filterList.map((filter) => {
                const Icon = filter.icon;
                const selectedValue = getSelectedLabel(filter.id);
                const isOpen = activeDropdown === filter.id;
                return (
                  <div key={filter.id} className="relative w-full">
                    <div
                      onClick={() => toggleDropdown(filter.id)}
                      className={`w-full h-16 flex items-center justify-between border rounded-xl px-3.5 py-1 cursor-pointer transition-colors ${
                        isDark
                          ? "bg-bg-dark-1 border-bg-gray-1 hover:border-gray-700"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`shrink-0 text-base ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                        <div className={`w-px h-4 ${isDark ? "bg-bg-gray-1" : "bg-gray-200"}`} />
                        <span
                          className={`text-sm truncate ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {selectedValue || filter.label}
                        </span>
                      </div>
                      <div
                        className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
                          isDark ? "border-bg-gray-1 bg-bg-dark" : "border-gray-300 bg-gray-100"
                        }`}
                      >
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <FiChevronDown className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                        </motion.div>
                      </div>
                    </div>
                    {renderDropdownMenu(filter.id, filter.options)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};
