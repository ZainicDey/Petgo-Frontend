'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function MediaViewer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const src = searchParams.get('src');

  if (!src) {
    router.back();
    return null;
  }

  const handleClose = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/community');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer"
      onClick={handleClose}
    >
      {/* Close Button (Top Right) */}
      <button
        className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 border-none text-white cursor-pointer p-3 rounded-full flex items-center justify-center transition-all z-[10000]"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Full image */}
      <img
        src={decodeURIComponent(src)}
        alt="Media"
        className="max-w-[95vw] max-h-[95vh] object-contain cursor-default"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function MediaPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <MediaViewer />
    </Suspense>
  );
}
