import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import StatsBar from '../stats/StatsBar';
import { useStats } from '../../../hooks/useStats';
import { LoadingSkeleton } from '../../ui/LoadingSkeleton';
import { StaggerContainer, staggerItem } from '../../common/StaggerContainer';
import { FadeInSection } from '../../common/FadeInSection';

const HomeHero = () => {
  const { stats, status } = useStats();

  return (
    <section className="w-full bg-bg-dark-1 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        {/* Left: Text Content */}
        <div className="flex-1 flex items-center px-4 sm:px-8 lg:px-16 py-12 xl:py-0 order-2 lg:order-1">
          <StaggerContainer className="flex flex-col gap-8 max-w-[580px]">
            <motion.div variants={staggerItem} className="flex flex-col gap-4">
              <h1 className="text-[1.65rem] sm:text-4xl xl:text-5xl font-semibold leading-tight">
                Discover Your Dream <br /> Property with Estatein
              </h1>
              <p className="text-gray text-sm sm:text-base leading-relaxed max-w-[480px]">
                Your journey to finding the perfect property begins here. Explore our
                listings to find the home that matches your dreams.
              </p>
            </motion.div>
            <motion.div variants={staggerItem} className="flex flex-row gap-4">
              <Button text="Learn More" variant="secondary" onClick={() => {}} />
              <Button text="Browse Properties" variant="primary" onClick={() => {}} />
            </motion.div>
            <motion.div variants={staggerItem}>
              {(status === 'loading' || status === 'idle') ? (
                <LoadingSkeleton variant="stats" count={3} />
              ) : (
                <StatsBar stats={stats} />
              )}
            </motion.div>
          </StaggerContainer>
        </div>

        {/* Right: Hero Image full height, no border */}
        <FadeInSection direction="right" delay={0.2} className="flex flex-1 relative min-h-[240px] sm:min-h-[360px] lg:min-h-[480px] order-1 lg:order-2">
          <div className="absolute z-30 -bottom-8 left-0 translate-x-0 translate-y-0 w-20 sm:top-[28%] sm:bottom-auto sm:left-0 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-28 lg:w-32 xl:w-44">
            <img src='/assets/HeroSticker.png' alt="" className='w-full h-full animate-[spin_10s_linear_infinite]'/>
          </div>
          <img
            src="/assets/Abstract_6.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none bg-bg-dark max-sm:rounded-xl max-sm:border max-sm:border-bg-gray-1"
          />
          <img
            src="/assets/Hero Image_1.webp"
            alt="Hero Image"
            className="relative w-full h-full object-cover object-center z-10 max-sm:rounded-xl max-sm:border max-sm:border-bg-gray-1"
          />
        </FadeInSection>
      </div>
    </section>
  );
};

export default HomeHero;