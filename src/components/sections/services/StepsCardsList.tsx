

interface StepItem {
  id: string | number;
  title: string;
  description: string;
}

interface StepsCardsListProps {
  steps: StepItem[];
}

export const StepsCardsList = ({ steps }: StepsCardsListProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 max-sm:gap-[30px] max-2xl:gap-10 2xl:gap-[50px]">
      {steps.map((step, index) => (
        <div 
          key={step.id} 
          className={`flex-col relative ${index >= 3 ? 'hidden sm:flex' : 'flex'}`}
        > 
          {/* قسم الـ Step العلوي */}
          <div className="relative pb-[14px] pl-4 2xl:pl-[20px] 2xl:pb-4 flex items-center">
            
            {/* الخط الطولي الأيسر العلوي */}
            <div className="absolute left-0 -top-3 h-[calc(100%+12px)] w-[2px] bg-primary"></div>
            
            {/* الخط الأفقي العلوي */}
            <div className="absolute left-[1.5px] bottom-0 w-[180px] h-[1.5px] bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>

            {/* نص Step */}
            <span className="text-white 2xl:text-xl text-base font-medium tracking-wide">
              Step {step.id}
            </span>
          </div>

          {/* صندوق الكارد السفلي */}
          <div className="max-w-[512.33px] max-h-[329px] max-sm:p-[30px] max-2xl:p-10 2xl:p-[50px] border border-bg-gray-1 rounded-[10px] rounded-tl-none flex flex-col max-sm:gap-[14px] max-2xl:gap-4 2xl:gap-5 shadow-2xl relative overflow-hidden">
            
            {/* خط يسار الكارد السفلي  */}
            <div className="absolute left-0 top-0 h-1/2 w-[2px] bg-gradient-to-b from-primary to-transparent z-10"></div>

            {/* الوهج البنفسجي */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/25 via-primary/5 to-transparent pointer-events-none rounded-tl-2xl blur-sm"></div>

            <h3 className="text-white max-sm:text-lg max-2xl:text-xl 2xl:text-2xl font-semibold">
              {step.title}
            </h3>
            <p className="text-gray max-sm:text-sm max-2xl:text-base 2xl:text-lg font-medium leading-relaxed"> 
              {step.description}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};