import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { values, achievements } from '../data/aboutData';
import HeroAbout from '../components/sections/hero/AboutHero';
import CompaniesSlider from '../components/ui/slider/CompaniesSlider';
import ServiceCard from '../components/sections/services/ServiceCard';
import { motion } from 'framer-motion';
import { StaggerContainer, staggerItem } from '../components/common/StaggerContainer';

// Our Achievements Section

const OurAchievements: React.FC = () => {

  return (
    <section
      className="w-full transition-colors duration-300 bg-(--bg-main) "
    >
      <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20">
        {/* Header */}
        <SectionHeader
          title="Our Achievements"
          subtitle="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
          className="mb-10"
        />

        {/* Cards grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {achievements.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className="rounded-[10px] p-6 sm:p-8 flex flex-col gap-4"
              style={{
                backgroundColor: "(--bg-secondary)",
                border: "1px solid (--color-border)",
                boxShadow: "0px 0px 0px 6px (--bg-main)",
              }}
            >
              <h3
                className="font-semibold sm:text-lg md:text-2xl text-(--text-main) "
              >
                {item.title}
              </h3>
              <p
                className="sm:text-sm md:text-base text-gray "
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

// ─── Our Values Section

const OurValues: React.FC = () => {

  return (
    <section
      className="w-full transition-colors duration-300 bg-(--bg-main) "
    >
      <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left: Header ── */}
          <div className="lg:w-[35%] flex flex-col justify-center">
            <SectionHeader
              title="Our Values"
              subtitle="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
              className="mb-0"
            />
          </div>

          {/* ── Right: Values Grid container ── */}
          <div
            className="lg:w-[65%] rounded-xl overflow-hidden border border-(--color-border) "
            style={{
              backgroundColor: "(--bg-secondary)",
              boxShadow: "0px 0px 0px 10px (--bg-main)",
            }}
          >
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount:0.2}}
              transition={{duration: 0.6}}
              className="relative grid grid-cols-1 sm:grid-cols-2">
              {/* ── الخط الرأسي العلوي (الصف الأول فقط) ── */}
              <div
                className="hidden sm:block absolute left-1/2 w-px -translate-x-1/2 bg-(--color-border) "
                style={{ top: "40px", height: "calc(50% - 40px - 20px)" }}
              />

              {/* ── الخط الرأسي السفلي (الصف الثاني فقط) ── */}
              <div
                className="hidden sm:block absolute left-1/2 w-px -translate-x-1/2 bg-(--color-border) "
                style={{ bottom: "40px", height: "calc(50% - 40px - 20px)" }}
              />

              {/* ── الخط الأفقي الفاصل بين الصفين (شاشات sm فما فوق فقط) ── */}
              <div
                className="hidden sm:block absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-(--color-border) "
              />

              {values.map((value) => (
                <div key={value.id} className="relative">
                  {/* ── خط أفقي بين الـ cards على الشاشات الصغيرة فقط ── */}
                  {values.indexOf(value) > 0 && (
                    <div
                      className="sm:hidden absolute top-0 left-4 right-4 h-px bg-(--color-border)"
                    />
                  )}
                  <div className="p-6 sm:p-8">
                    <ServiceCard
                      type="horizontal"
                      icon={value.icon}
                      heading={value.title}
                      description={value.description}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Our Valued Clients Section

const OurValuedClients: React.FC = () => {

  return (
    <motion.section
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount:0.2}}
      transition={{duration: 0.6}}
      className="w-full transition-colors duration-300 bg-(--bg-main) "
    >
      <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20">
        <SectionHeader
          title="Our Valued Clients"
          subtitle="At Estatein, we have had the privilege of working with a diverse range of clients across various industries. Here are some of the clients we've had the pleasure of serving."
          className="mb-10"
        />
        <CompaniesSlider />
      </div>
    </motion.section>
  );
};

// ─── AboutUs Page

const AboutUs: React.FC = () => {
  return (
    <main>
      <HeroAbout
        image1="/assets/Abstract4.png"
        image2="/assets/About Image_2.webp"
      />
      <OurValues />
      <OurAchievements />
      <OurValuedClients />
    </main>
  );
};

export default AboutUs;
