/**
 * app/loading.tsx
 *
 * This file is automatically used by Next.js App Router as a global
 * React Suspense boundary. Whenever any route segment is loading —
 * initial page load, navigation between pages, or a slow server
 * component — Next.js will render this instead of a blank screen.
 *
 * No imports, no wiring, no context needed. It just works globally.
 */
export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh]">
      <div className="flex flex-col items-center gap-5">
        <svg
          className="animate-spin w-10 h-10 text-[#F7941D]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          ></circle>
          <path
            className="opacity-100"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
