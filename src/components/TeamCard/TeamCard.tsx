import { SectionHeader } from "../common/SectionHeader";

const TeamCard = () => {
  return (
    <section
      className="rounded-xl border border-[#262626] bg-[#1A1A1A] bg-cover bg-center bg-no-repeat p-6 md:p-8"
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

        <div className="flex items-center mt-4">
          <SectionHeader
            title="Explore Estatein's World"
            subtitle="Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better."
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
