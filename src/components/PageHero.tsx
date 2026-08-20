
  interface PageHeroProps {
    title: string;
    description: string;
  }
  
  const PageHero = ({ title, description }: PageHeroProps) => {
    return (
      <section className="w-full bg-black `pt-[150px] `pb-[100px]">
        <div className="w-full max-w-[1568px] mx-auto px-6 sm:px-8 md:px-10">
          
          {/* Title */}
          <h1
            className="
              w-full
              `h-[72px]
              font-['Urbanist']
              text-[28px]
              font-semibold
              leading-[150%]
              tracking-[0%]
              text-white
              flex
              items-center
            "
          >
            {title}
          </h1>
  
          {/* Description */}
          <p
            className="
              w-full
              `h-[72px]
              mt-3
              font-['Urbanist']
              text-[14px]
              font-medium
              leading-[150%]
              tracking-[0%]
              text-[#999999]
              flex
              items-start
            "
          >
            {description}
          </p>
  
        </div>
      </section>
    );
  };
  
  export default PageHero;