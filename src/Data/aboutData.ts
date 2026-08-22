export interface Value {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    id: 1,
    icon: '/assets/Icon_33.png',
    title: 'Trust',
    description: 'Trust is the cornerstone of every successful real estate transaction.',
  },
  {
    id: 2,
    icon: '/assets/icon_10.png',
    title: 'Excellence',
    description:
      'We set the bar high for ourselves. From the properties we list to the services we provide.',
  },
  {
    id: 3,
    icon: '/assets/icon_11.png',
    title: 'Client-Centric',
    description:
      'Your dreams and needs are at the center of our universe. We listen, understand.',
  },
  {
    id: 4,
    icon: '/assets/Icon_33.png',
    title: 'Our Commitment',
    description:
      'We are dedicated to providing you with the highest level of service, professionalism, and support.',
  },
];

export interface Achievement {
  id: number;
  title: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: '3+ Years of Excellence',
    description:
      "With over 3 years in the industry, we've amassed a wealth of knowledge and experience.",
  },
  {
    id: 2,
    title: 'Happy Clients',
    description:
      'Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.',
  },
  {
    id: 3,
    title: 'Industry Recognition',
    description:
      "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
  },
];
