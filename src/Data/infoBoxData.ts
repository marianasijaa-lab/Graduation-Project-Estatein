export interface InfoBoxItem {
  variant: 'horizontal' | 'vertical';
  title: string;
  description: string;
  buttonLabel?: string;
}

export const infoBoxData: InfoBoxItem[] = [
  {
    variant: 'horizontal',
    title: 'Unlock the Value of Your Property Today',
    description:
      "Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset.",
    buttonLabel: 'Learn More',
  },
  {
    variant: 'vertical',
    title: 'Unlock Your Investment Potential',
    description:
      'Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership.',
    buttonLabel: 'Learn More',
  },
  {
    variant: 'horizontal',
    title: 'Experience Effortless Property Management',
    description:
      'Ready to experience hassle-free property management? Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership.',
    buttonLabel: 'Learn More',
  },
];
