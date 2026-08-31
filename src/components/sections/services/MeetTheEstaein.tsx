import { SectionHeader } from "../../common/SectionHeader"; 
import { TeamCardsList } from "./TeamCardList"


const MeetTheEstaein = () => {
  const teamData = [
    { 
      id: 1, 
      name: "Max Mitchell", 
      role: "Founder", 
      image: "/assets/Team1.webp", 
      twitterIcon: "/assets/icon_12.png", 
      telegramIcon: "/assets/Icon_5.png"
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      role: "Chief Real Estate Officer", 
      image:  "/assets/Team2.webp", 
      twitterIcon: "/assets/icon_12.png", 
      telegramIcon: "/assets/Icon_5.png"
    },
    { 
      id: 3, 
      name: "David Brown", 
      role: "Head of Property Management", 
      image:  "/assets/Team3.webp", 
      twitterIcon:"/assets/icon_12.png", 
      telegramIcon: "/assets/Icon_5.png" 
    },
    { 
      id: 4, 
      name: "Michael Turner", 
      role: "Legal Counsel", 
      image:  "/assets/Team4.webp", 
      twitterIcon: "/assets/icon_12.png", 
      telegramIcon: "/assets/Icon_5.png"
    },
  ];
  return (
<section>
      <div>
      <SectionHeader
      title="Meet the Estatein Team"
      subtitle="At Estatein, our success is driven by the dedication and expertise of our team. Get to know the people behind our mission to make your real estate dreams a reality."
      />
     <TeamCardsList members={teamData} 
     hello="Say Hello 👋"/>
    </div>
</section>
  )
}

export default MeetTheEstaein