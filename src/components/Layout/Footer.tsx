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
    <motion.footer
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-(--bg-main) text-(--text-main)"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start pb-12 pt-14 px-4 sm:px-8 md:px-11">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center mb-4">
            <img src="/assets/logo_icon.png" alt="" className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105" />
            <h2 className="ml-2 font-semibold text-lg md:text-xl">Estatein</h2>
          </div>
          <div className="relative w-full">
            <img
              src="/assets/icon_6.png"
              alt="icon6"
              className="absolute left-4 top-1/2 w-5 h-4.5 md:h-5 md:w-5  -translate-y-1/2"
            />

            <input
              type="email"
              placeholder="Enter Your Email"
              autoComplete="off"
              className="text-[15px] md:text-base w-full md:w-[80%] rounded-lg border border-bg-gray-1 py-4 pl-12 pr-12 placeholder:text-gray bg-(--bg-secondary) text-(--text-main) transition-colors duration-300"
              style={{
                WebkitTextFillColor: 'var(--text-main)',
                backgroundColor: 'var(--bg-secondary)',
                boxShadow: 'none',
                color: 'var(--text-main)',
              }}
            />

            <img
              src="/assets/Icon_5.png"
              alt="icon5"
              style={{ filter: 'var(--icon-filter)' }}
              className="absolute right-4 md:right-[100px] top-1/2 w-6 h-6  md:h-5 md:w-5 -translate-y-1/2 transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* ── Links: Desktop (md+) ── */}
        <StaggerContainer className="hidden md:grid md:grid-cols-5 gap-x-10 gap-y-0" staggerDelay={0.08}>
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={staggerItem} className="flex flex-col gap-3">
              <h3 className="font-medium text-gray text-base lg:text-xl">{section.title}</h3>
              {section.links.map((link, i) => (
                <motion.p
                  key={i}
                  whileHover={{ scale: 1.02, x: 2 }}
                  className="text-sm whitespace-nowrap lg:text-base text-(--text-main) hover:text-gray cursor-pointer transition-colors"
                >
                  {link}
                </motion.p>
              ))}
            </motion.div>
          ))}
        </StaggerContainer>

        {/* ── Links: Mobile (< md) ── */}
        <div className="relative flex flex-col md:hidden">

          {/* خط شاقولي علوي (Row 1 فقط) */}
          <div
            className="absolute left-1/2 w-px bg-bg-gray-1 -translate-x-1/2"
            style={{ top: '8px', height: 'calc(50% - 45px)' }}
          />
          {/* خط شاقولي سفلي (Row 2 فقط) */}
          <div
            className="absolute left-1/2 w-px bg-bg-gray-1 -translate-x-1/2"
            style={{ bottom: '0px', height: 'calc(50% + 25px)' }}
          />

          {/* Row 1: Home + About Us */}
          <motion.div
            className="grid grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.div variants={staggerItem} className="flex flex-col gap-2 pb-6 pt-2 pr-2">
              <h3 className="font-medium text-gray text-[17px] sm:text-base">{footerLinks[0].title}</h3>
              {footerLinks[0].links.map((link, i) => (
                <p key={i} className="text-[15px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors leading-tight">{link}</p>
              ))}
              <div className="mt-2 h-px bg-bg-gray-1" />
            </motion.div>
            <motion.div variants={staggerItem} className="flex flex-col gap-2 pb-6 pt-2 pl-2">
              <h3 className="font-medium text-gray text-[17px] sm:text-base">{footerLinks[1].title}</h3>
              {footerLinks[1].links.map((link, i) => (
                <p key={i} className="text-[15px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors leading-tight">{link}</p>
              ))}
              <div className="mt-2 h-px bg-bg-gray-1" />
            </motion.div>
          </motion.div>

          {/* Row 2: Properties+Contact Us | Services */}
          <motion.div
            className="grid grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
          >
            <motion.div variants={staggerItem} className="flex flex-col gap-2 pb-4 pt-4 pr-2">
              <h3 className="font-medium text-gray text-[17px] sm:text-base">{footerLinks[2].title}</h3>
              {footerLinks[2].links.map((link, i) => (
                <p key={i} className="text-[15px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors ">{link}</p>
              ))}
              <div className="mt-2 h-px bg-bg-gray-1" />
              <div className="pt-3">
                <h3 className="font-medium text-gray text-[17px] sm:text-base mb-2">{footerLinks[4].title}</h3>
                {footerLinks[4].links.map((link, i) => (
                  <p key={i} className="text-[15px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors  mb-2">{link}</p>
                ))}
                <div className="mt-2 h-px bg-bg-gray-1" />
              </div>
            </motion.div>
            <motion.div variants={staggerItem} className="flex flex-col gap-2 pb-6 pt-4 pl-2">
              <h3 className="font-medium text-gray text-[17px] sm:text-base">{footerLinks[3].title}</h3>
              {footerLinks[3].links.map((link, i) => (
                <p key={i} className="text-[15px] sm:text-sm text-(--text-main) hover:text-gray cursor-pointer transition-colors ">{link}</p>
              ))}
              <div className="mt-2 h-px bg-bg-gray-1" />
            </motion.div>
          </motion.div>

        </div>
      </div>
      <div
        className="flex flex-col md:flex-row justify-between items-center pt-8 pb-8 mt-10 transition-colors duration-300"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        <div className="flex order-1 md:order-2 pb-6 md:pb-0 px-4 sm:px-8 md:px-11">
          {[FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 cursor-pointer"
              style={{ backgroundColor: '#141414' }}
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
    </motion.footer>
  );
};

export default Footer;