import { motion } from 'framer-motion';
import { staggerItem } from '../../common/StaggerContainer';

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
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col bg-(--bg-main) rounded-xl border border-(--color-border) overflow-hidden transition-colors duration-300 hover:shadow-xl hover:shadow-black/10 hover:border-primary/40"
    >
      {/* ── image ── */}
      <div className="w-full aspect-video overflow-hidden rounded-[10px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* ── content ── */}
      <div className="flex flex-col gap-3 p-4">

        {/* Tag — Properties Page فقط */}
        {tag && (
          <p className="text-(--text-main) text-base">{tag}</p>
        )}

        {/* name*/}
        <h3 className="text-(--text-main) text-xl font-semibold">{name}</h3>

        {/*description+ Read More */}
        <p className="text-gray text-base font-medium">
          {description}{" "}
          {onReadMore && (
            <button
              onClick={onReadMore}
              className="text-(--text-main) underline underline-offset-2 hover:text-white/80 transition-colors"
            >
              Read More
            </button>
          )}
        </p>

        {/* Tags — Home Page فقط */}
        {showTags && (
          <>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-(--text-main) text-sm bg-(--bg-secondary) border border-(--color-border) rounded-[28px] px-3 py-1 transition-colors duration-300">
                {bedroomIcon
                  ? <img src={bedroomIcon} alt="bedroom" className="w-3.5 h-3.5" />
                  : null
                }
                {bedrooms}-Bedroom
              </span>
              <span className="flex items-center gap-1.5 text-(--text-main) text-sm bg-(--bg-secondary) border border-(--color-border) rounded-[28px] px-3 py-1 transition-colors duration-300">
                {bathroomIcon
                  ? <img src={bathroomIcon} alt="bathroom" className="w-3.5 h-3.5" />
                  : null
                }
                {bathrooms}-Bathroom
              </span>
              <span className="flex items-center gap-1.5 text-(--text-main) text-sm bg-(--bg-secondary) border border-(--color-border) rounded-[28px] px-3 py-1 transition-colors duration-300">
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
            <span className="text-(--text-main) text-xl font-semibold">
              {currency}{price.toLocaleString()}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewDetails}
            className="bg-primary hover:bg-[#5f2ee0] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            View Property Details
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
}
