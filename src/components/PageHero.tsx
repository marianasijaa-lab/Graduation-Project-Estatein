<<<<<<< HEAD

=======
/*interface PageHeroProps {
    title: string;
    description: string;
  }
  
  const PageHero = ({ title, description }: PageHeroProps) => {
    return (
      <section className="w-full bg-black px-6 py-16 sm:px-8 sm:py-20 md:px-0 `md:py-[150px] `md:pl-[162px] `md:pr-[400px]">
        <div className="w-full">
         
          <h1
            className="font-['Urbanist'] text-[28px] font-semibold leading-[150%] tracking-[0%] text-white"
          >
           
          </h1>
  
         
          <p
            className="mt-3 `max-w-[900px] font-['Urbanist'] text-[14px] font-medium leading-[150%] tracking-[0%] text-[#999999]  `sm:max-w-[750px] `md:max-w-[900px]"
          >
            {description}
          </p>
        </div>
      </section>
    );
  };
  
  export default PageHero;*/
>>>>>>> 73627b9620e5507b609926c4159fc626592eb214
  interface PageHeroProps {
    title: string;
    description: string;
  }
  
  const PageHero = ({ title, description }: PageHeroProps) => {
    return (
<<<<<<< HEAD
      <section className="w-full bg-black `pt-[150px] `pb-[100px]">
=======
      <section className="w-full `pt-[150px] `pb-[100px]">
>>>>>>> 73627b9620e5507b609926c4159fc626592eb214
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