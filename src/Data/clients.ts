// Client companies shown in CompaniesSlider on the About Us page.

export interface Company {
  companyId: number;
  date: string;
  heading: string;
  link: string;
  domain: string;
  category: string;
  testimony: string;
}

export const companies: Company[] = [
  {
    companyId: 1,
    date: "Since 2019",
    domain: "Commercial Real Estate",
    category: "Luxury Home Development",
    heading: "ABC Corporation",
    link: "",
    testimony:
      "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
  {
    companyId: 2,
    date: "Since 2018",
    domain: "Commercial Real Estate",
    category: "Retail Space",
    heading: "GreenTech Enterprises",
    link: "",
    testimony:
      "Estatein's ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
  },
  {
    companyId: 3,
    date: "Since 2020",
    domain: "Residential Real Estate",
    category: "Luxury Home Development",
    heading: "Skyline Properties",
    link: "",
    testimony:
      "Working with Estatein transformed our approach to luxury residential projects. Their market knowledge is unmatched.",
  },
];
