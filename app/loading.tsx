export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="space-y-6 text-center">
        <div className="relative mx-auto w-24 h-24">
          {/* Circular Loading Animation */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="text-gray-600 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}