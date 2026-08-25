import { SectionHeader } from "../common/SectionHeader";

const TeamCard = () => {
  return (
    <section
      className="rounded-xl bg-cover bg-center bg-no-repeat p-6 md:p-8"
      style={{
        backgroundImage: "url('/assets/background_2.png')",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <img
          src="/assets/Contact1.webp"
          alt=""
          className="w-full h-45 object-cover rounded-lg"
        />

        <img
          src="/assets/Contact3.webp"
          alt=""
          className="w-full h-45 object-cover rounded-lg"
        />

        <img
          src="/assets/Contact2.webp"
          alt=""
          className="w-full h-45 object-cover rounded-lg"
        />

        <div className="grid grid-cols-2 gap-2.5">
          <img
            src="/assets/Contact5.webp"
            alt=""
            className="w-full h-45 object-cover rounded-lg"
          />

          <img
            src="/assets/Contact4.webp"
            alt=""
            className="w-full h-45 object-cover rounded-lg"
          />
        </div>

        <div className="flex items-center">
          <SectionHeader
            title="Discover Our Office Locations"
            subtitle="Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you"
            className="mb-10"
            fullWidth
          />
        </div>

        <img
          src="/assets/Contact6.webp"
          alt=""
          className="w-full h-45 object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default TeamCard;
