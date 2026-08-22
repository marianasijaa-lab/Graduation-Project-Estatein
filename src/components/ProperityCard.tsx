
interface PropertyCardProps {
  image: string;
  tag?: string;
  name: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  bedroomIcon?: string;
  bathroomIcon?: string;
  propertyTypeIcon?: string;
  showTags?: boolean;
  price: number;
  currency?: string;
  onViewDetails: () => void;
  onReadMore?: () => void;
}

export function PropertyCard({
  image,
  tag,
  name,
  description,
  bedrooms,
  bathrooms,
  propertyType,
  bedroomIcon,
  bathroomIcon,
  propertyTypeIcon,
  showTags = true,
  price,
  currency = "$",
  onViewDetails,
  onReadMore,
}: PropertyCardProps) {
  return (
    <div className="flex flex-col bg-bg-dark-1 rounded-xl border border-bg-dark overflow-hidden">

      {/* ── image ── */}
      <div className="w-full aspect-video overflow-hidden rounded-[10px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── content ── */}
      <div className="flex flex-col gap-3 p-4">

        {/* Tag — Properties Page فقط */}
        {tag && (
          <p className="text-white text-base">{tag}</p>
        )}

        {/* name*/}
        <h3 className="text-white text-xl font-semibold">{name}</h3>

        {/*description+ Read More */}
        <p className="text-gray text-base font-medium">
          {description}{" "}
          {onReadMore && (
            <button
              onClick={onReadMore}
              className="text-white underline underline-offset-2 hover:text-white/80 transition-colors"
            >
              Read More
            </button>
          )}
        </p>

        {/* Tags — Home Page فقط */}
        {showTags && (
          <>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-white text-sm bg-bg-dark-1 border border-bg-dark rounded-[28px] px-3 py-1">
                {bedroomIcon
                  ? <img src={bedroomIcon} alt="bedroom" className="w-3.5 h-3.5" />
                  : null
                }
                {bedrooms}-Bedroom
              </span>
              <span className="flex items-center gap-1.5 text-white text-sm bg-bg-dark-1 border border-bg-dark rounded-[28px] px-3 py-1">
                {bathroomIcon
                  ? <img src={bathroomIcon} alt="bathroom" className="w-3.5 h-3.5" />
                  : null
                }
                {bathrooms}-Bathroom
              </span>
              <span className="flex items-center gap-1.5 text-white text-sm bg-bg-dark-1 border border-bg-dark rounded-[28px] px-3 py-1">
                {propertyTypeIcon
                  ? <img src={propertyTypeIcon} alt="type" className="w-3.5 h-3.5" />
                  : null
                }
                {propertyType}
              </span>
            </div>
            
          </>
        )}

        {/* price & button*/}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-gray text-xs">Price</span>
            <span className="text-white text-xl font-semibold">
              {currency}{price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={onViewDetails}
            className="bg-primary hover:bg-[#5f2ee0] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            View Property Details
          </button>
        </div>

      </div>
    </div>
  );
}
