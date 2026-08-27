import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../ui/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useProperties } from "../../../hooks/useProperties";
import { LoadingSkeleton } from "../../ui/LoadingSkeleton";
import { ErrorMessage } from "../../ui/ErrorMessage";
const ITEMS_PER_PAGE = 3;
const pad = (n: number) => String(n).padStart(2, "0");

export function PropertiesGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { properties, status, error } = useProperties();

  if (status === 'loading' || status === 'idle') {
    return <LoadingSkeleton variant="grid" count={3} />;
  }

  if (status === 'failed') {
    return (
      <ErrorMessage
        message={error ?? 'فشل جلب العقارات'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = properties.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="card flex h-full flex-col gap-4 lg:gap-5 xl:gap-7.5 bg-bg-dark-1 border border-[#262626] rounded-2xl p-4 lg:p-5"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full aspect-[16/10] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            />

            <div className="flex flex-1 flex-col gap-5 lg:gap-6 xl:gap-7.5">
              <div className="flex min-h-[9.5rem] flex-col gap-0.5 lg:gap-1 xl:gap-1.5">
                {/* Tag */}
                {item.tag && (
                  <span className="block text-gray-300 text-[13px] border border-[#262626] rounded-full px-3 py-1.5 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.tag}
                  </span>
                )}

                {/* Name */}
                <h3 className="card-title">{item.name}</h3>

                {/* Description */}
                <p className="font-medium text-gray">
                  {item.descriptionLong.length > 60
                    ? item.descriptionLong.slice(0, 60) + "... "
                    : item.descriptionLong + "... "}
                  <button className="text-white underline underline-offset-2 hover:text-white/80 transition-colors whitespace-nowrap">
                    Read More
                  </button>
                </p>
              </div>

              {/* Price & Button */}
              <div className="mt-auto flex items-center justify-between gap-4">
                <p className="font-semibold text-white">
                  <span className="block font-normal text-gray text-sm">Price</span>
                  ${item.priceProperties.toLocaleString()}
                </p>
                <Button
                  onClick={() => navigate(`/property-details/${item.id}`)}
                  text="View Property Details"
                  variant="primary"
                  className="text-sm px-4 py-3 md:py-3 md:px-5"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-bg-gray-1 pt-4 mt-6">
        <p className="text-gray text-sm">
          <span className="text-white">{pad(currentPage)}</span>
          {" of "}
          {pad(totalPages)}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FaArrowLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
