import { FaArrowUp } from "react-icons/fa"

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

export default ServiceCard