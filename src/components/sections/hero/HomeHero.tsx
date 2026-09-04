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
    <section className="w-full bg-(--bg-main) overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-120">
        {/* Left: Text Content */}
        <div className="flex-1 flex items-center px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-8 xl:py-0 order-2 md:order-1">
          <StaggerContainer className="flex w-full flex-col gap-8 max-w-145">
            <motion.div variants={staggerItem} className="flex flex-col gap-4">
              <h1 className="text-[1.60rem] sm:text-4xl md:text-[2rem] lg:text-[2.5rem] xl:text-5xl font-semibold leading-tight">
                Discover Your Dream Property with Estatein
              </h1>
              <p className="text-gray text-[12px] sm:text-base leading-relaxed max-w-120">
                Your journey to finding the perfect property begins here. Explore our
                listings to find the home that matches your dreams.
              </p>
            </motion.div>
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-auto">
                <Button text="Learn More" variant="secondary" onClick={() => {}} fullWidth />
              </div>
              <div className="w-full sm:w-auto">
                <Button text="Browse Properties" variant="primary" onClick={() => {}} fullWidth />
              </div>
            </motion.div>
            <motion.div variants={staggerItem} className="w-full">
              {(status === 'loading' || status === 'idle') && stats.length === 0 ? (
                <LoadingSkeleton variant="stats" count={3} />
              ) : (
                <StatsBar stats={stats} />
              )}
            </motion.div>
          </StaggerContainer>
        </div>

        {/* Right: Hero Image full height, no border */}
        <FadeInSection direction="right" delay={0.2} className="flex flex-1 relative min-h-[240px] sm:min-h-[360px] md:min-h-[480px] order-1 md:order-2">
          <div className="absolute z-30 -bottom-8 left-0 translate-x-0 translate-y-0 w-[65px] sm:top-[28%] sm:bottom-auto sm:left-0 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-20 md:w-22 lg:w-26 xl:w-36">
            <img src='/assets/HeroSticker.png' alt="" className='w-full h-full animate-[spin_10s_linear_infinite]'/>
          </div>
          <img
            src="/assets/Abstract_6.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none bg-(--bg-secondary) max-sm:rounded-xl max-sm:border max-sm:border-bg-gray-1"
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