
import { Button } from './Button';

interface FAQProps
{
question: string;
description: string;
onReadMore: () => void;

}
export const FAQCard = ({question,description,onReadMore}:FAQProps) => {
  return (
    <div className="flex justify-between w-full  lg:flex-row lg:items-end lg:gap-[200px]  md:gap-[150px]  max-sm:gap-[40px]   ">
     
      <div className="flex flex-col lg:gap-[14px] md:gap-[10px]  max-w-[1236px] max-sm:gap-[6px]  ">
        <h2 className="lg:text-[48px]  lg:pb-[14px] md:pb-[10px] md:text-[38px] max-sm:text-[28px] max-sm:pb-[6px]
         font-semibold text-white">
          {question}
        </h2>
        <p className=" font-medium text-[#999999] lg:text-[18px] md:text-base max-sm:text-[14px] leading-[150%]">
         {description}   
        </p>
      </div>

  
      <div className="shrink-0 max-sm:hidden md:flex">
        <Button
          text="View All FAQ's"
          variant="secondary"
           onClick={onReadMore}
        />
      </div>
    </div>
  );
};