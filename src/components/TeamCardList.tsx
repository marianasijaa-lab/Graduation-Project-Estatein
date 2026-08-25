


interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  twitterIcon: string;    
  telegramIcon: string;   
}

interface TeamCardsListProps {
  members: TeamMember[];
  hello:string 
}

export const TeamCardsList = ({ members,hello }:TeamCardsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 2xl:gap-[30px]">
      {members.map((member) => (
        <div 
          key={member.id} 
          className=" relative border border-bg-gray-1 rounded-xl  max-sm:p-5 max-2xl:p-6 2xl:p-[30px] flex flex-col items-center text-center"
        >
         <div className="relative w-full mb-[50px]">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full   max-sm:h-[268px] max-2xl:h-[220px] 2xl:h-[253px] object-cover rounded-xl" 
            />
            
       
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10 bg-primary  px-5 2xl:px-[26px] py-[10px] 2xl:py-[14px] rounded-[43px] shadow-lg flex items-center justify-center ">
              <img 
                src={member.twitterIcon } 
                alt="Twitter" 
                className="  w-5 h-5 2xl:w-6 2xl:h-6 object-contain" 
              />
            </div>
          </div>

         
          <h3 className="text-white   max-sm:text-lg max-2xl:text-xl 2xl:text-2xl font-semibold text-center   max-sm:pb-[2px] max-2xl:pb-1 2xl:pb-[6px]">{member.name}</h3>
          <p className="text-gray font-medium text-center  max-sm:text-sm max-2xl:text-base 2xl:text-lg   max-sm:pb-4 max-2xl:pb-5 2xl:pb-6 ">{member.role}</p>

       
          <div className="w-full bg-bg-dark border border-bg-gray-1 rounded-[100px] max-sm:py-2 max-2xl:py-[10px] 2xl:py-[14px]  max-sm:pr-2 max-2xl:pr-[10px] 2xl:pr-[14px]  max-sm:pl-6 max-2xl:pl-5 2xl:pl-6 flex items-center justify-between gap-5">
            <span className="text-white max-sm:text-sm max-2xl:text-base 2xl:text-lg font-medium">{hello}</span>
            

            <div className="bg-primary max-sm:p-[14px] max-2xl:p-2 2xl:p-[10px] rounded-full cursor-pointer hover:bg-opacity-80 transition flex items-center justify-center">
              <img 
                src={member.telegramIcon } 
                alt="Telegram" 
                className=" w-5 h-5 2xl:w-6 2xl:h-6 object-contain" 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};