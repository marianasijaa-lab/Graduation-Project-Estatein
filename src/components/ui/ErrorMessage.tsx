interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
        <span className="text-red-400 text-2xl">⚠</span>
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg mb-1">
          حدث خطأ في جلب البيانات
        </h3>
        <p className="text-gray-400 text-sm max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
        >
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
