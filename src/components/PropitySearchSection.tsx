import React, { useState, useRef, useEffect } from 'react';
import {
    FiMapPin,
    FiChevronDown
} from 'react-icons/fi';
import { HiHomeModern } from "react-icons/hi2";
import { PiMoneyWavyFill } from "react-icons/pi";
import { BsFillBoxFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa6";
import { useTheme } from '../Context/ThemeContext';

import { Button } from './Button'; // تأكدي من مسار مكوّن الزر

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
}

export const PropitySearchSection: React.FC<SearchSectionProps> = ({ onSearchSubmit }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

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
        <section
            className={`w-full pt-6 pb-10 px-4 md:px-8 lg:px-16 transition-colors duration-300 ${isDark ? 'bg-bg-dark-1 text-white' : 'bg-white text-gray-900'
                }`}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center" ref={containerRef}>

                {/* 1. السيرش العلوي (Radius بس ع الزوايا العلوية + ملتصق بالسفلي) */}
                <div
                    className={`w-full max-w-4xl border border-b-0 rounded-t-2xl p-2.5 transition-colors ${isDark
                            ? 'bg-bg-dark border-bg-gray-1'
                            : 'bg-gray-400 border-gray-200'
                        }`}
                >
                    <div
                        className={`w-full flex flex-col sm:flex-row items-center justify-between border rounded-xl p-2 transition-colors ${isDark
                                ? 'bg-bg-dark border-bg-gray-1'
                                : 'bg-white border-gray-200'
                            }`}
                    >
                        <div className="flex items-center flex-1 w-full px-3 py-1.5">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search For A Property"
                                className={`w-full h-13 bg-transparent focus:outline-none text-sm md:text-base ${isDark
                                        ? 'text-white placeholder-gray-500'
                                        : 'text-gray-900 placeholder-gray-700'
                                    }`}
                            />
                        </div>

                        <div className="w-full sm:w-auto shrink-0">
                            <Button
                                text="Find Property"
                                variant="primary"
                                onClick={handleSearch}
                                icon="/icons/search.svg"
                                iconPosition="left"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. المربع السفلي للدروب داونز (الخلفية العريضة المشتركة) */}
                <div
                    className={`w-full border rounded-2xl  p-3 sm:p-4 shadow-2xl transition-colors ${isDark
                            ? 'bg-bg-dark border-bg-gray-1'
                            : 'bg-gray-400 border-gray-200'
                        }`}
                >
                    <div className="w-full h-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
                                        className={`w-full h-18 flex items-center justify-between border rounded-xl px-3.5 py-3 cursor-pointer transition-colors ${isDark
                                                ? 'bg-bg-dark-1 border-bg-gray-1 hover:border-gray-700'
                                                : 'bg-white border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2.5 truncate">
                                            <Icon className={`shrink-0 text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />

                                            <div className={`w-px h-4 ${isDark ? 'bg-bg-gray-1' : 'bg-gray-200'}`}></div>

                                            <span className={`text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {selectedValue || filter.label}
                                            </span>
                                        </div>

                                        <FiChevronDown className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                    </div>

                                    {isOpen && (
                                        <div
                                            className={`absolute top-full left-0 w-full mt-2 rounded-xl border shadow-xl z-50 max-h-48 overflow-y-auto ${isDark
                                                    ? 'bg-bg-dark border-bg-gray-1 text-white'
                                                    : 'bg-white border-gray-200 text-gray-800'
                                                }`}
                                        >
                                            {filter.options.map((option) => (
                                                <div
                                                    key={option}
                                                    onClick={() => handleSelectOption(filter.id, option)}
                                                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${isDark
                                                            ? 'hover:bg-bg-gray-1'
                                                            : 'hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};