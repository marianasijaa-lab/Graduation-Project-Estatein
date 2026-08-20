const JourneyToday = () => {
    return (
      <section className="w-full bg-black px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-24 `lg:px-[160px] `lg:py-[100px]">
        <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row md:items-center md:gap-12">
          
          
          <div className="`max-w-[900px]`">
            <h2 className="text-[28px] font-bold leading-[1.2] text-white sm:text-[32px] md:text-[36px] lg:text-[40px]">
              Start Your Real Estate Journey Today
            </h2>
  
            <p className="mt-5 `max-w-[900px]` text-[14px] font-normal leading-[1.7] text-gray-400 sm:text-[15px] md:text-[16px]">
              Your dream property is just a click away. Whether you're looking for
              a new home, a strategic investment, or expert real estate advice,
              Estatein is here to assist you every step of the way. Take the first
              step towards your real estate goals and explore our available
              properties or get in touch with our team for personalized assistance.
            </p>
          </div>
  
          
          <div className="w-full  shrink-0 md:w-auto">
            <button
              type="button"
              className="w-full rounded-lg  bg-[#703BF7] px-7 py-4 text-[14px] font-medium text-white transition duration-200 hover:bg-[#6230e8] sm:w-auto sm:px-8"
            >
              Explore Properties
            </button>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default JourneyToday;
  
  