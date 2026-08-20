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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <div>
          <div className="flex items-center mb-4">
            <img src="/assets/logo_icon.png" alt="" />
            <h2 className="ml-2 font-bold text-lg">Estatein</h2>
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
              className="w-full rounded-lg border py-3 pl-12 pr-12 placeholder:text-gray-500"
            />

            <img
              src="/assets/icon_5.png"
              alt="icon5"
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {footerLinks.map((foot) => {
            return (
              <div key={foot.title} className="flex flex-col">
                <h3 className="text-gray text-xl">{foot.title}</h3>
                {foot.links.map((link, i) => {
                  return <p key={i}>{link}</p>;
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
        <div className="flex md:flex-row flex-col text-center order-2 md:order-1">
          <p className="pr-6">@2023 Estatein. All Rights Reserved.</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="flex order-1 md:order-2 pb-6 md:pb-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark" ? "bg-black" : "bg-transparent"
            }`}
          >
            <FaFacebookF />
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark" ? "bg-black" : "bg-transparent"
            }`}
          >
            <FaLinkedinIn />
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark" ? "bg-black" : "bg-transparent"
            }`}
          >
            <FaTwitter />
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              theme === "dark" ? "bg-black" : "bg-transparent"
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
