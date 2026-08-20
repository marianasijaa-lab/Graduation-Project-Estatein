import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useTheme } from "../../Context/ThemeContext";

const footerLinks = [
  {
    title: "Home",
    links: ["Hero Section", "Features", "Properties", "Testimonials", "FAQs"],
  },
  {
    title: "About Us",
    links: [
      "Our Story",
      "Our Works",
      "How It Works",
      "Our Team",
      "Our Clients",
    ],
  },
  {
    title: "Properties",
    links: ["Portfolio", "Categories"],
  },
  {
    title: "Services",
    links: [
      "Valuation Mastery",
      "Strategic Marketing",
      "Negotiation Wizardry",
      "Closing Success",
      "Property Management",
    ],
  },
  {
    title: "Contact Us",
    links: ["Contact Form", "Our Offices"],
  },
];

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start py-14 px-11">
        <div>
          <div className="flex items-center mb-4">
            <img src="/assets/logo_icon.png" alt="" />
            <h2 className="ml-2 font-semibold text-xl">Estatein</h2>
          </div>
          <div className="relative w-full">
            <img
              src="/assets/icon_6.png"
              alt="icon6"
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
            />

            <input
              type="text"
              placeholder="Enter Your Email"
              className="w-[90%] rounded-lg border border-bg-gray-1 py-3 pl-12 pr-12 placeholder:text-gray"
            />

            <img
              src="/assets/Icon_5.png"
              alt="icon5"
              className="absolute right-14 top-1/2 h-5 w-5 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {footerLinks.map((foot) => {
            return (
              <div key={foot.title} className="flex flex-col gap-3">
                <h3 className="font-medium text-gray text-xl">{foot.title}</h3>
                {foot.links.map((link, i) => {
                  return <p key={i} className="text-base text-white hover:text-gray cursor-pointer transition-colors whitespace-nowrap">{link}</p>;
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`flex flex-col md:flex-row justify-between items-center pt-8 pb-8 mt-10 ${
          theme === "dark" ? "bg-bg-dark" : "bg-gray-50"
        }`}
      >
        <div className="flex md:flex-row flex-col text-center order-2 md:order-1 px-11">
          <p className="pr-6">@2023 Estatein. All Rights Reserved.</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="flex order-1 md:order-2 pb-6 md:pb-0 px-11">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark" ? "bg-bg-dark-1" : "bg-transparent"
            }`}
          >
            <FaFacebookF />
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark" ? "bg-bg-dark-1" : "bg-transparent"
            }`}
          >
            <FaLinkedinIn />
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark" ? "bg-bg-dark-1" : "bg-transparent"
            }`}
          >
            <FaTwitter />
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark" ? "bg-bg-dark-1" : "bg-transparent"
            }`}
          >
            <FaYoutube />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
