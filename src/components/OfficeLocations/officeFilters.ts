import type { FirestoreOffice } from '../../store/types';

export const KNOWN_OFFICE_TYPES = ['Regional', 'International'];

export function buildOfficeTabs(offices: Pick<FirestoreOffice, 'type'>[]): string[] {
  const liveTypes = offices
    .map((office) => office.type?.trim())
    .filter((type): type is string => Boolean(type));

  const allTypes = Array.from(new Set([...KNOWN_OFFICE_TYPES, ...liveTypes]));
  const activeTypes = allTypes.filter((type) => offices.some((office) => office.type === type));

  return ['All', ...activeTypes.sort((a, b) => a.localeCompare(b))];
}

export function filterOfficesByType(offices: FirestoreOffice[], selectedTab: string): FirestoreOffice[] {
  if (!selectedTab || selectedTab === 'All') return offices;

  const tabExists = offices.some((office) => office.type === selectedTab);
  if (!tabExists) return offices;

  return offices.filter((office) => office.type === selectedTab);
}

export function getNextOfficeTab(currentTab: string, clickedTab: string): string {
  if (!clickedTab || clickedTab === 'All') return 'All';
  return currentTab === clickedTab ? 'All' : clickedTab;
}
