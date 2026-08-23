<<<<<<< HEAD

// import { ContactForm } from '../components/ContactForm';
// import { CtaSection } from '../components/CTA';

// export const HomePage = () => {
//     return (
//         <>
//         <ContactForm />
//         <CtaSection
//             bgLeftImage="public/assets/Abstract2.png"
//             bgRightImage="public/assets/Abstract1.png"
//             renderButton={() => (
//                 <a
//                     href="/properties"
//                     className="w-full sm:w-auto text-center bg-primary hover:bg-[#5e2ed9] text-white text-sm font-medium px-6 py-3.5 rounded-lg transition-colors whitespace-nowrap inline-block"
//                 >
//                     Explore Properties
//                 </a>
//             )}
//         />
//         </>
//     );
// };
=======
import HomeHero from "../components/HomeHero";
import CompaniesSlider from "../components/Slider/CompaniesSlider";

export const HomePage = () => {
    return (
        <div className="flex flex-col gap-20 xl:gap-0">
    <HomeHero/>
    <div className="mt-10">

       <CompaniesSlider/>
    </div>
      </div>
    );
};
>>>>>>> 46cf8271d8dd0b5cbfddd560ef3ad40951e84a2d
