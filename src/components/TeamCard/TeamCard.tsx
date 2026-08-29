import { SectionHeader } from "../common/SectionHeader";

const TeamCard = () => {
  return (
    <section
      className="rounded-xl border border-[#262626] bg-[#1A1A1A] bg-cover bg-center bg-no-repeat p-2.5 md:p-8"
      style={{
        backgroundImage: "url('/assets/background_2.png')",
      }}
    >
      <div className="grid grid-cols-4 gap-2.5 md:grid-cols-2">
        <img
          src="/assets/Contact1.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="col-span-2 h-20 w-full rounded-lg object-cover md:col-span-1 md:h-45"
        />

        <img
          src="/assets/Contact3.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="col-span-2 h-20 w-full rounded-lg object-cover md:col-span-1 md:h-45"
        />

        <img
          src="/assets/Contact2.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="col-span-2 h-20 w-full rounded-lg object-cover md:col-span-1 md:h-45"
        />

        <div className="col-span-2 grid grid-cols-2 gap-2.5 md:col-span-1">
          <img
            src="/assets/Contact5.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-20 w-full rounded-lg object-cover md:h-45"
          />

          <img
            src="/assets/Contact4.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-20 w-full rounded-lg object-cover md:h-45"
          />
        </div>

        <div className="col-span-4 flex items-center mt-4 md:col-span-1">
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
          loading="lazy"
          decoding="async"
          className="col-span-4 h-auto w-full rounded-lg object-contain md:col-span-1 md:h-45 md:object-cover"
        />
      </div>
    </section>
  );
};

export default TeamCard;
