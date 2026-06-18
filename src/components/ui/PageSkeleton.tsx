/**
 * PageSkeleton – a reusable skeleton system for PetGo.
 *
 * Usage:
 *  – <Skeleton /> renders a single placeholder block.
 *  – Compose blocks inside <PageSkeleton> for a full page skeleton.
 */

// ─── Primitive: a single skeleton block ─────────────────────────────────────
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded-lg bg-white/5 ${className}`}
      aria-hidden="true"
    />
  );
}

// ─── Card skeleton: mirrors the pet listing card shape ───────────────────────
export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
      {/* image area */}
      <Skeleton className="w-full h-48" />
      <div className="p-4 space-y-3">
        {/* badge row */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-16" />
        </div>
        {/* title */}
        <Skeleton className="h-5 w-3/4" />
        {/* subtitle */}
        <Skeleton className="h-4 w-1/2" />
        {/* footer */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Hero / banner skeleton ──────────────────────────────────────────────────
export function HeroSkeleton() {
  return (
    <div className="w-full px-4 pt-16 pb-12 flex flex-col items-center gap-5">
      {/* eyebrow badge */}
      <Skeleton className="h-6 w-32 rounded-full" />
      {/* headline 1 */}
      <Skeleton className="h-10 w-2/3" />
      {/* headline 2 */}
      <Skeleton className="h-10 w-1/2" />
      {/* sub text */}
      <Skeleton className="h-4 w-96 max-w-full" />
      <Skeleton className="h-4 w-72 max-w-full" />
      {/* CTA buttons */}
      <div className="flex gap-4 mt-4">
        <Skeleton className="h-12 w-36 rounded-full" />
        <Skeleton className="h-12 w-36 rounded-full" />
      </div>
    </div>
  );
}

// ─── Full-page skeleton (navbar + hero + grid of cards) ─────────────────────
export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white" aria-label="Loading…" role="status">
      {/* Hero placeholder */}
      <HeroSkeleton />

      {/* Filter bar placeholder */}
      <div className="flex gap-3 px-6 pb-6 flex-wrap justify-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-full" />
        ))}
      </div>

      {/* Cards grid placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-6 pb-16 max-w-7xl mx-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Screen-reader announcement */}
      <span className="sr-only">Loading page content…</span>
    </div>
  );
}
