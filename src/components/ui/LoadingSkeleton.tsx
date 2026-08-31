interface LoadingSkeletonProps {
  variant?: 'grid' | 'slider' | 'list' | 'stats';
  count?: number;
}

export function LoadingSkeleton({ variant = 'grid', count = 3 }: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div
            key={i}
            className="bg-[#111111] border border-[#262626] rounded-2xl p-4 animate-pulse"
          >
            <div className="w-full h-48 bg-[#262626] rounded-xl mb-4" />
            <div className="h-5 bg-[#262626] rounded w-3/4 mb-2" />
            <div className="h-4 bg-[#262626] rounded w-full mb-1" />
            <div className="h-4 bg-[#262626] rounded w-5/6 mb-4" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-[#262626] rounded w-24" />
              <div className="h-10 bg-[#262626] rounded w-36" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'slider') {
    return (
      <div className="flex gap-4 overflow-hidden">
        {items.map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[calc(33%-8px)] bg-[#111111] border border-[#262626] rounded-2xl p-4 animate-pulse"
          >
            <div className="w-full h-48 bg-[#262626] rounded-xl mb-4" />
            <div className="h-5 bg-[#262626] rounded w-3/4 mb-2" />
            <div className="h-4 bg-[#262626] rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'stats') {
    return (
      <div className="flex gap-6">
        {items.map((_, i) => (
          <div key={i} className="flex flex-col gap-2 animate-pulse">
            <div className="h-8 bg-[#262626] rounded w-20" />
            <div className="h-4 bg-[#262626] rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  // list variant
  return (
    <div className="flex flex-col gap-4">
      {items.map((_, i) => (
        <div
          key={i}
          className="bg-[#111111] border border-[#262626] rounded-xl p-4 flex gap-4 animate-pulse"
        >
          <div className="w-12 h-12 bg-[#262626] rounded-lg flex-shrink-0" />
          <div className="flex-1">
            <div className="h-5 bg-[#262626] rounded w-1/2 mb-2" />
            <div className="h-4 bg-[#262626] rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
