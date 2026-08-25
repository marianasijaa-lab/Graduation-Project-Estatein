import { useSlider } from "../../../hooks/useSlider";
import BaseSlider from "./BaseSlider";
import SliderButtons from "./SliderButtons";
import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  clientId: number;
  title: string;
  description: string;
  avatar: string;
  clientName: string;
  clientLocation: string;
}
const TestimonialsSlider = () => {
  const testimonials: TestimonialCardProps[] = [
    {
      clientId: 1,
      avatar: "/assets/Profile_1.png",
      title: "Exceptional Service!",
      description: `Our experience with Estatein was outstanding.
       Their team's dedication and professionalism made finding our 
       dream home a breeze. Highly recommended!`,
      clientName: "Wade Warren",
      clientLocation: "USA, California",
    },
    {
      clientId: 2,
      avatar: "/assets/Profile_2.png",
      title: "Efficient and Reliable",
      description: `Estatein provided us with top-notch service. 
      They helped us sell our property quickly and at a great price.
       We couldn't be happier with the results.`,
      clientName: "Emelie Thomson",
      clientLocation: "USA, Florida",
    },
    {
      clientId: 3,
      avatar: "/assets/Profile_3.png",
      title: "Trusted Advisors",
      description: `The Estatein team guided us through the 
      entire buying process. Their knowledge and commitment
       to our needs were impressive. Thank you for your support!`,
      clientName: "John Mans",
      clientLocation: "USA, Nevada",
    },
    {
      clientId: 4,
      avatar: "/assets/Profile_2.png",
      title: "Efficient and Reliable",
      description: `Estatein provided us with top-notch service. 
      They helped us sell our property quickly and at a great price.
       We couldn't be happier with the results.`,
      clientName: "Emelie Thomson",
      clientLocation: "USA, Florida",
    },
    {
      clientId: 5,
      avatar: "/assets/Profile_3.png",
      title: "Trusted Advisors",
      description: `The Estatein team guided us through the 
      entire buying process. Their knowledge and commitment
       to our needs were impressive. Thank you for your support!`,
      clientName: "John Mans",
      clientLocation: "USA, Nevada",
    },
  ];
 const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(testimonials);
  return (
    <div className="w-full max-w-384 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.clientId}
            className="flex"
            style={{ width: `${100 / itemsToShow}%`, padding: "0 12px" }}
          >
            <TestimonialCard testimony={testimonial} />
          </div>
        ))}
      </BaseSlider>
      <SliderButtons
        currentIndex={currentIndex}
        goNext={goNext}
        goPrev={goPrev}
        itemsLength={testimonials.length}
        itemsToShow={itemsToShow}
        maxIndex={maxIndex}
      />
    </div>
  );
};

function Star() {
  return (
    <div className="p-2.5 rounded-full bg-(--bg-secondary) transition-colors duration-300">
      <FaStar  size={24} color="#FFE500" />
    </div>
  );
}

function TestimonialCard({testimony}:{testimony:TestimonialCardProps}) {
return (
    <div className="card flex items-start flex-col gap-4 lg:gap-5 xl:gap-7.5">
        <div className="flex gap-2.5">
        {Array.from({length:5},(_)=><Star/>)}
        </div>
        <div className="flex flex-col gap-1.5 lg:gap-2.5 xl:gap-3.5">
            <h3 className="font-semibold text-2xl text-(--text-main)">{testimony.title}</h3>
            <p className="text-[18px] text-(--text-main)">{testimony.description}</p>
        </div>
        <div className="flex gap-3">
            <div className="">
                <img src={testimony.avatar} alt={testimony.clientName}/>
            </div>
            <div className="flex flex-col gap-0.5">
                <h4 className="text-xl text-(--text-main)">{testimony.clientName}</h4>
                <p className="text-gray">{testimony.clientLocation}</p>
            </div>
        </div>
    </div>
)
}
export default TestimonialsSlider;
