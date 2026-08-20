import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    { icon: "/assets/Icon_1.png", heading: "Find Your Dream Home" },
    { icon: "/assets/Icon_2.png", heading: "Unlock Property Value" },
    { icon: "/assets/Icon_3.png", heading: "Effortless Property Management" },
    {
      icon: "/assets/Icon 4.png",
      heading: "Smart Investments, Informed Decisions",
    },
  ];
  return (
    <div className="bg-bg-dark grid grid-cols-2 lg:grid-cols-4 p-2.5 w-full justify-center gap-2.5">
      {services.map((service) => (
        <ServiceCard type="vertical" heading={service.heading} icon={service.icon} />
      ))}
    </div>
  );
};

export default Services;
