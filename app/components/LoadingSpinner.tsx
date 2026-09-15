// app/components/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 relative animate-spin">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="4" />
          <path d="M5 50 A45 45 0 0 1 95 50" fill="#ef4444" stroke="black" strokeWidth="4" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="black" strokeWidth="4" />
          <circle cx="50" cy="50" r="12" fill="white" stroke="black" strokeWidth="4" />
        </svg>
      </div>
      <p className="mt-4 text-gray-500">Đang tải...</p>
    </div>
  );
}