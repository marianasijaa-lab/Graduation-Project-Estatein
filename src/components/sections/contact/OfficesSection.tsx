import React from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { useOffices } from '../../../hooks/useOffices';
import { useAppDispatch } from '../../../store';
import { setActiveTab, fetchOffices } from '../../../store/slices/officesSlice';
import { LoadingSkeleton } from '../../ui/LoadingSkeleton';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { SectionHeader } from '../../common/SectionHeader';
import type { FirestoreOffice } from '../../../store/types';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';

type TabType = 'All' | 'Regional' | 'International';
const TABS: TabType[] = ['All', 'Regional', 'International'];

export const OfficesSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const dispatch = useAppDispatch();
  const { offices, allOffices, status, error, activeTab } = useOffices();

  return (
    <section className={`w-full ${isDark ? 'bg-bg-dark-1' : 'bg-gray-50'}`}>
      <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
        <SectionHeader
          title="Our Office Locations"
          subtitle="Discover Estatein's global presence. Find our offices across different regions and get in touch with your nearest branch."
          className="mb-10"
        />

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => dispatch(setActiveTab(tab))}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : isDark
                  ? 'bg-[#1A1A1A] border border-[#262626] text-gray-400 hover:text-white hover:border-primary/50'
                  : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-primary/50'
              }`}
            >
              {tab}
              {tab === 'All' && allOffices.length > 0 && (
                <span className="ml-2 text-xs opacity-60">({allOffices.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {(status === 'loading' || status === 'idle') && (
          <LoadingSkeleton variant="list" count={3} />
        )}

        {status === 'failed' && (
          <ErrorMessage
            message={error ?? 'فشل جلب المكاتب'}
            onRetry={() => dispatch(fetchOffices())}
          />
        )}

        {status === 'succeeded' && (
          <>
            {offices.length === 0 ? (
              <p className="text-center text-gray-400 py-12">
                No offices found for this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {offices.map((office) => (
                  <OfficeCard key={office.id} office={office} isDark={isDark} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

function OfficeCard({
  office,
  isDark,
}: {
  office: FirestoreOffice;
  isDark: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-6 flex flex-col gap-4 border transition-colors ${
        isDark
          ? 'bg-[#141414] border-[#262626] hover:border-primary/40'
          : 'bg-white border-gray-200 hover:border-primary/40'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3
            className={`font-semibold text-lg ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {office.name}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border mt-1 inline-block ${
              office.type === 'International'
                ? 'border-purple-500/40 text-purple-400'
                : 'border-blue-500/40 text-blue-400'
            }`}
          >
            {office.type}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <MdLocationOn
            className="text-primary shrink-0 mt-0.5"
            size={18}
          />
          <p
            className={`text-sm leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {office.address}, {office.city}, {office.country}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MdPhone className="text-primary shrink-0" size={18} />
          <a
            href={`tel:${office.phone}`}
            className={`text-sm hover:text-primary transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {office.phone}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <MdEmail className="text-primary shrink-0" size={18} />
          <a
            href={`mailto:${office.email}`}
            className={`text-sm hover:text-primary transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {office.email}
          </a>
        </div>
      </div>
    </div>
  );
}

export default OfficesSection;
