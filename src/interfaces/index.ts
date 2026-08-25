export type PageId =
  | "home"
  | "about"
  | "properties"
  | "property-details"
  | "services"
  | "contact"
  | "dashboard";

export interface NavItem {
  id: PageId;
  label: string;
  href?: string;
}

export interface PropsContactHero {
  title: string;
  description1: string;
  description2: string;
}
