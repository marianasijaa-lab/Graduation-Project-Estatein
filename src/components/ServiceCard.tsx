/*import { FaArrowUp } from "react-icons/fa"

interface ServiceCardProps{
    type:"horizontal"|"vertical",
    icon:string,
    heading:string

}
const ServiceCard = ({type,heading,icon}:ServiceCardProps) => {
  return (
    <>
        {type ==="vertical"?
        <div className=" relative bg-bg-card flex-1 rounded-xl px-3.5 py-5 lg:px-4 lg:py-7.5 xl:px-5 xl:py-10">
            <div className="flex flex-col items-center justify-center gap-3.5 lg:gap-4 xl:gap-5">
                
                    <img src={icon} alt={heading}  className="w-12 h-12 lg:w-15 lg:h-15 xl:w-20.5 xl:h-20.5"/>
                    <h3 className="max-w-103.5 font-semibold text-white">{heading}</h3>
                </div> 
                      <FaArrowUp size={26} color="#4D4D4D" className="absolute right-5 top-5 rotate-45" />
           
        </div>
        :
        <div>
            </div>
            }
    </>
  )
}

export default ServiceCard */


import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

interface ServiceCardProps {
  type: 'horizontal' | 'vertical';
  icon: string;
  heading: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ type, heading, icon }) => {
  if (type === 'vertical') {
    return (
      <div className="group relative flex flex-col items-center justify-center text-center bg-[#1A1A1A] border border-[#262626] rounded-2xl p-6 sm:p-8 min-h-[220px] hover:border-[#703BF7]/50 hover:bg-[#1e1e1e] transition-all duration-300 cursor-pointer">
        {/* السهم في الزاوية العلوية اليمنى */}
        <FaArrowUp 
          size={20} 
          className="absolute right-5 top-5 text-[#4D4D4D] rotate-45 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
        />

        {/* الأيقونة داخل الحاوية الدائرية المتوهجة */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-[#703BF7]/25 flex items-center justify-center bg-[#703BF7]/5 group-hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-[#703BF7]/15 flex items-center justify-center">
              <img 
                src={icon} 
                alt={heading} 
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
        </div>

        {/* عنوان الكرت */}
        <h3 className="font-semibold text-white text-sm sm:text-base leading-snug px-2">
          {heading}
        </h3>
      </div>
    );
  }

  return <div></div>;
};

export default ServiceCard;