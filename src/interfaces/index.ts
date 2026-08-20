export type PageId = 'home' | 'about' | 'properties' | 'property-details' | 'services' | 'contact' | 'dashboard';

export interface NavItem {
  id: PageId;
  label: string;
  href?: string;
}