import React, { useState, useRef, useEffect } from 'react';
import {
    FiMapPin,
    FiChevronDown,
    FiSearch
} from 'react-icons/fi';
import { HiHomeModern } from "react-icons/hi2";
import { PiMoneyWavyFill } from "react-icons/pi";
import { BsFillBoxFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInSection } from '../../common/FadeInSection';

const MOCK_PROPERTIES = [
    { id: 1, name: 'Villa Dubai', location: 'Dubai', type: 'Villa', price: '$500k - $1M', size: '2000-3000 sqft', year: '2023' },
    { id: 2, name: 'Modern Apartment', location: 'Cairo', type: 'Apartment', price: '$100k - $300k', size: '1000-2000 sqft', year: '2022' },
    { id: 3, name: 'Luxury Penthouse', location: 'Riyadh', type: 'Penthouse', price: '$1M+', size: '3000+ sqft', year: '2024' },
];

const FILTER_OPTIONS = {
    location: ['All', 'Dubai', 'Cairo', 'Riyadh'],
    propertyType: ['All', 'Villa', 'Apartment', 'Penthouse'],
    pricingRange: ['All', '$100k - $300k', '$500k - $1M', '$1M+'],
    propertySize: ['All', '1000-2000 sqft', '2000-3000 sqft', '3000+ sqft'],
    buildYear: ['All', '2022', '2023', '2024']
};

interface SearchSectionProps {
    onSearchSubmit?: (filteredResults: typeof MOCK_PROPERTIES) => void;
    className?: string;
}

export const PropitySearchSection: React.FC<SearchSectionProps> = ({ onSearchSubmit, className = '' }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        propertyType: '',
        pricingRange: '',
        propertySize: '',
        buildYear: ''
    });

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (key: string) => {
        setActiveDropdown(prev => prev === key ? null : key);
    };

    const handleSelectOption = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === 'All' ? '' : value
        }));
        setActiveDropdown(null);
    };

    const handleSearch = () => {
        const results = MOCK_PROPERTIES.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = !filters.location || item.location === filters.location;
            const matchesType = !filters.propertyType || item.type === filters.propertyType;
            const matchesPrice = !filters.pricingRange || item.price === filters.pricingRange;
            const matchesSize = !filters.propertySize || item.size === filters.propertySize;
            const matchesYear = !filters.buildYear || item.year === filters.buildYear;

            return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesSize && matchesYear;
        });

        if (onSearchSubmit) {
            onSearchSubmit(results);
        }
    };

    return (
        <FadeInSection
            direction="up"
            className={`w-full pt-6 pb-10 px-4 md:px-8 lg:px-16 transition-colors duration-300 relative z-10 bg-transparent text-(--text-main) ${className}`}
        >
            <div className="site-container flex flex-col items-center" ref={containerRef}>

                {/* ===== MOBILE: container موحد ===== */}
                <div className='w-full block md:hidden border rounded-2xl p-3 shadow-2xl transition-colors bg-(--bg-secondary) border-bg-gray-1'>

                    {/* Search bar موبايل */}
                    <div className='w-full flex items-center justify-between border rounded-xl px-3 py-2 mb-3 transition-colors bg-(--bg-main) border-bg-gray-1'>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search For A Property"
                            className='flex-1 bg-transparent focus:outline-none text-sm text-(--text-main) placeholder-gray-500'
                        />
                        <button
                            onClick={handleSearch}
                            className="shrink-0 ml-2 w-11 h-11 flex items-center justify-center bg-primary text-white rounded-xl hover:opacity-90 transition-all cursor-pointer"
                        >
                            <FiSearch className="text-lg" />
                        </button>
                    </div>

                    {/* Filters موبايل — عمود واحد */}
                    <div className="flex flex-col gap-2">
                        {[
                            { id: 'location', label: 'Location', icon: FiMapPin, options: FILTER_OPTIONS.location },
                            { id: 'propertyType', label: 'Property Type', icon: HiHomeModern, options: FILTER_OPTIONS.propertyType },
                            { id: 'pricingRange', label: 'Pricing Range', icon: PiMoneyWavyFill, options: FILTER_OPTIONS.pricingRange },
                            { id: 'propertySize', label: 'Property Size', icon: BsFillBoxFill, options: FILTER_OPTIONS.propertySize },
                            { id: 'buildYear', label: 'Build Year', icon: FaRegCalendar, options: FILTER_OPTIONS.buildYear },
                        ].map((filter) => {
                            const Icon = filter.icon;
                            const selectedValue = filters[filter.id as keyof typeof filters];
                            const isOpen = activeDropdown === filter.id;
                            return (
                                <div key={filter.id} className="relative w-full">
                                    <div
                                        onClick={() => toggleDropdown(filter.id)}
                                        className='w-full flex items-center justify-between border rounded-xl px-3.5 py-3.5 cursor-pointer transition-colors bg-(--bg-main) border-bg-gray-1'
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Icon className='shrink-0 text-base text-gray-400' />
                                            <div className='w-px h-4 bg-bg-gray-1' />
                                            <span className='text-sm text-gray-300'>
                                                {selectedValue || filter.label}
                                            </span>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiChevronDown className='shrink-0 text-base text-gray-400' />
                                        </motion.div>
                                    </div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.18 }}
                                                className='absolute top-full left-0 w-full mt-1 rounded-xl border shadow-xl z-50 max-h-48 overflow-y-auto bg-(--bg-secondary) border-bg-gray-1 text-(--text-main)'
                                            >
                                                {filter.options.map((option) => (
                                                    <div key={option} onClick={() => handleSelectOption(filter.id, option)} className='px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-bg-gray-1'>
                                                        {option}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ===== DESKTOP: التصميم الأصلي ===== */}
                <div className="hidden md:flex w-full flex-col items-center">

                    {/* Search bar ديسكتوب */}
                    <div className='w-full max-w-4xl border border-b-0 rounded-t-2xl p-2.5 transition-colors bg-(--bg-secondary) border-bg-gray-1'>
                        <div className='w-full flex items-center justify-between border rounded-xl p-2 transition-colors bg-(--bg-main) border-bg-gray-1'>
                            <div className="flex items-center flex-1 px-3 py-1.5">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search For A Property"
                                    className='w-full h-13 bg-transparent focus:outline-none text-sm md:text-base text-(--text-main) placeholder-gray-500'
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

                    {/* Filters ديسكتوب */}
                    <div className='w-full border rounded-2xl p-2 sm:p-3 shadow-2xl transition-colors bg-(--bg-secondary) border-bg-gray-1'>
                        <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-3">
                            {[
                                { id: 'location', label: 'Location', icon: FiMapPin, options: FILTER_OPTIONS.location },
                                { id: 'propertyType', label: 'Property Type', icon: HiHomeModern, options: FILTER_OPTIONS.propertyType },
                                { id: 'pricingRange', label: 'Pricing Range', icon: PiMoneyWavyFill, options: FILTER_OPTIONS.pricingRange },
                                { id: 'propertySize', label: 'Property Size', icon: BsFillBoxFill, options: FILTER_OPTIONS.propertySize },
                                { id: 'buildYear', label: 'Build Year', icon: FaRegCalendar, options: FILTER_OPTIONS.buildYear },
                            ].map((filter) => {
                                const Icon = filter.icon;
                                const selectedValue = filters[filter.id as keyof typeof filters];
                                const isOpen = activeDropdown === filter.id;
                                return (
                                    <div key={filter.id} className="relative w-full">
                                        <div
                                            onClick={() => toggleDropdown(filter.id)}
                                            className='w-full h-16 flex items-center justify-between border rounded-xl px-3.5 py-1 cursor-pointer transition-colors bg-(--bg-main) border-bg-gray-1 hover:border-gray-700' 
                                        >
                                            <div className="flex items-center gap-2.5 truncate">
                                                <Icon className='shrink-0 text-base text-gray-500'  />
                                                <div className='w-px h-4 bg-bg-gray-1'/>
                                                <span className='text-sm truncate text-gray-500'>
                                                    {selectedValue || filter.label}
                                                </span>
                                            </div>
                                            <div className='shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors border-bg-gray-1 bg-(--bg-secondary)'>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <FiChevronDown className='text-sm text-gray-500'  />
                                                </motion.div>
                                            </div>
                                        </div>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.18 }}
                                                    className='absolute top-full left-0 w-full mt-2 rounded-xl border shadow-xl z-50 max-h-48 overflow-y-auto bg-(--bg-secondary) border-bg-gray-1 text-(--text-main)'
                                                >
                                                    {filter.options.map((option) => (
                                                        <div key={option} onClick={() => handleSelectOption(filter.id, option)} className='px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-bg-gray-1'>
                                                            {option}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
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