import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { StaggerContainer, staggerItem } from "../common/StaggerContainer";

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
  return (
    <footer className="bg-(--bg-main) text-(--text-main)">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start pb-12 pt-14 px-4 sm:px-8 md:px-11">
        <div>
          <div className="flex items-center mb-4">
            <img src="/assets/logo_icon.png" alt="" className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105" />
            <h2 className="ml-2 font-semibold text-lg md:text-xl">Estatein</h2>
          </div>
          <div className="relative w-full">
            <img
              src="/assets/icon_6.png"
              alt="icon6"
              className="absolute left-4 top-1/2 w-4 h-3.5 md:h-5 md:w-5  -translate-y-1/2"
            />

            <input
              type="text"
              placeholder="Enter Your Email"
              className="text-sm md:text-base w-full md:w-[80%] rounded-lg border border-(--color-border) py-3 pl-12 pr-12 placeholder:text-gray bg-(--bg-secondary) text-(--text-main) autofill:bg-(--bg-main) autofill:text-(--text-main) transition-colors duration-300"
            />

            <img
              src="/assets/Icon_5.png"
              alt="icon5"
              style={{filter: 'var(--icon-filter)'}}
              className="absolute right-4 md:right-22.5 top-1/2 w-4 h-4  md:h-5 md:w-5 -translate-y-1/2 transition-all duration-300"
            />
          </div>
        </div>

        {/* ── Links: Desktop (md+) ── */}
        <StaggerContainer className="hidden md:grid md:grid-cols-5 gap-x-10 gap-y-0" staggerDelay={0.08}>
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={staggerItem} className="flex flex-col gap-3">
              <h3 className="font-medium text-gray text-base lg:text-xl">{section.title}</h3>
              {section.links.map((link, i) => (
                <p key={i} className="text-sm whitespace-nowrap lg:text-base text-(--text-main) hover:text-gray cursor-pointer transition-colors">{link}</p>
              ))}
            </motion.div>
          ))}
        </StaggerContainer>

        {/* ── Links: Mobile (< md) ── */}
        <div className="relative flex flex-col md:hidden">

          {/* خط شاقولي علوي (Row 1 فقط) */}
          <div
            className="absolute left-1/2 w-px bg-(--color-border) -translate-x-1/2"
            style={{ top: '8px', height: 'calc(50% - 45px)' }}
          />
          {/* خط شاقولي سفلي (Row 2 فقط) */}
          <div
            className="absolute left-1/2 w-px bg-(--color-border) -translate-x-1/2"
            style={{ bottom: '0px', height: 'calc(50% + 25px)' }}
          />

          {/* Row 1: Home + About Us */}
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2 pb-6 pt-2 pr-2">
              <h3 className="font-medium text-gray text-[11px] sm:text-base">{footerLinks[0].title}</h3>
              {footerLinks[0].links.map((link, i) => (
              <p key={i} className="text-[10px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors leading-tight">{link}</p>
              ))}
              <div className="mt-2 h-px bg-(--color-border)" />
            </div>
            <div className="flex flex-col gap-2 pb-6 pt-2 pl-2">
              <h3 className="font-medium text-gray text-[11px] sm:text-base">{footerLinks[1].title}</h3>
              {footerLinks[1].links.map((link, i) => (
                <p key={i} className="text-[10px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors leading-tight">{link}</p>
              ))}
              <div className="mt-2 h-px bg-(--color-border)" />
            </div>
          </div>

          {/* Row 2: Properties+Contact Us | Services */}
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2 pb-4 pt-4 pr-2">
              <h3 className="font-medium text-gray text-[11px] sm:text-base">{footerLinks[2].title}</h3>
              {footerLinks[2].links.map((link, i) => (
                <p key={i} className="text-[10px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors ">{link}</p>
              ))}
              <div className="mt-2 h-px bg-(--color-border)" />
              <div className="pt-3">
                <h3 className="font-medium text-gray text-[11px] sm:text-base mb-2">{footerLinks[4].title}</h3>
                {footerLinks[4].links.map((link, i) => (
                  <p key={i} className="text-[10px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors  mb-2">{link}</p>
                ))}
                <div className="mt-2 h-px bg-(--color-border)" />
              </div>
            </div>
            <div className="flex flex-col gap-2 pb-6 pt-4 pl-2">
              <h3 className="font-medium text-gray text-[11px] sm:text-base">{footerLinks[3].title}</h3>
              {footerLinks[3].links.map((link, i) => (
                <p key={i} className="text-[10px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors ">{link}</p>
              ))}
              <div className="mt-2 h-px bg-(--color-border)" />
            </div>
          </div>

        </div>
      </div>
      <div
        className="flex flex-col md:flex-row justify-between items-center pt-8 pb-8 mt-10 bg-(--bg-secondary) transition-colors duration-300"
      >
        <div className="flex order-1 md:order-2 pb-6 md:pb-0 px-4 sm:px-8 md:px-11">
          {[FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-(--bg-main) transition-colors duration-300 cursor-pointer"
            >
              <Icon />
            </motion.div>
          ))}
        </div>
        <div className="flex md:flex-row flex-col text-center order-2 md:order-1 px-4 sm:px-8 md:px-11">
          <p className="pr-6">@2023 Estatein. All Rights Reserved.</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
