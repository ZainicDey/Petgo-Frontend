'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import dogCatData from '@/assets/images/DogCatData.png';

/* ─── Animated Counter Hook ─── */
function useCountUp(
  target: number,
  duration: number = 2000,
  startCounting: boolean = false
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startCounting || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    let frameId: number;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, startCounting]);

  return count;
}

/* ─── Number Formatter ─── */
function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/* ─── Main Section ─── */
export default function Data() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to trigger animation when section scrolls into view
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    []
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [observerCallback]);

  // Animated values
  const petsDie = useCountUp(50000, 2200, isVisible);
  const withoutTreatment = useCountUp(35000, 2000, isVisible);
  const strayAbused = useCountUp(100000, 2600, isVisible);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle background texture / radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F7941D]/[0.03] blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── Left: Dog & Cat Image ── */}
          <div
            className={`
              w-full max-w-[420px] lg:max-w-[480px] shrink-0
              transition-all duration-1000 ease-out
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
            `}
          >
            <Image
              src={dogCatData}
              alt="A loyal dog with an adorable kitten sitting on its head"
              width={480}
              height={600}
              className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              priority
            />
          </div>

          {/* ── Right: Content ── */}
          <div
            className={`
              flex flex-col gap-6 w-full lg:flex-1
              transition-all duration-1000 delay-200 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            {/* Heading */}
            <div>
              <h2 className="text-white text-[36px] md:text-[48px] font-semibold leading-[1.1] uppercase tracking-tight">
                What Makes
              </h2>
              <h2 className="text-[#F7941D] text-[36px] md:text-[48px] font-semibold leading-[1.1] uppercase tracking-tight">
                Us Care for Them?
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-white/50 text-[18px] md:text-[24px] font-normal max-w-md leading-relaxed">
              Well, look at these numbers...
            </p>

            {/* ── Stats Cards (unified block) ── */}
            <div
              className={`
                mt-2
                transition-all duration-700 delay-500 ease-out
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
              `}
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row">
                {/* Card 1 – Pets Die */}
                <div
                  className="flex-1 px-6 py-6 sm:py-8"
                  style={{
                    borderRadius: '24px 0 0 0',
                    border: '1px solid rgba(247, 148, 29, 0.30)',
                    background: 'rgba(247, 148, 29, 0.15)',
                  }}
                >
                  <p className="text-[#F7941D] text-[40px] sm:text-[52px] md:text-[64px] font-semibold leading-none tracking-tight">
                    {formatNumber(petsDie)}
                  </p>
                  <p className="text-white/70 text-[14px] md:text-[16px] font-semibold mt-2 leading-snug" style={{ fontFamily: 'var(--font-opensans)' }}>
                    <span className="text-white">Pets Die</span>{' '}
                    Each Year in Bangladesh
                  </p>
                </div>

                {/* Card 2 – Without Treatment */}
                <div
                  className="flex-1 px-6 py-6 sm:py-8"
                  style={{
                    borderRadius: '0 24px 0 0',
                    border: '1px solid rgba(190, 30, 45, 0.30)',
                    background: 'rgba(190, 30, 45, 0.15)',
                  }}
                >
                  <p className="text-[#E50914] text-[40px] sm:text-[52px] md:text-[64px] font-semibold leading-none tracking-tight">
                    {formatNumber(withoutTreatment)}
                  </p>
                  <p className="text-white/70 text-[14px] md:text-[16px] font-semibold mt-2 leading-snug" style={{ fontFamily: 'var(--font-opensans)' }}>
                    Pets Die Each Year without{' '}
                    <span className="text-white">Treatment</span>
                  </p>
                </div>
              </div>

              {/* Card 3 – Stray Abused (full width) */}
              <div
                className="px-6 py-6 sm:py-8 text-center"
                style={{
                  borderRadius: '0 0 24px 24px',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  background: 'rgba(0, 0, 0, 0.25)',
                }}
              >
                <p className="text-white text-[44px] sm:text-[52px] md:text-[64px] font-semibold leading-none tracking-tight">
                  {formatNumber(strayAbused)}
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] font-semibold mt-2 leading-snug" style={{ fontFamily: 'var(--font-opensans)' }}>
                  Stray Animals are{' '}
                  <span className="text-white">Abused</span> Each Year
                </p>
              </div>
            </div>

            {/* Source footnote */}
            <p className="text-white/30 text-[12px] md:text-[14px] mt-1 font-light">
              *Data collected from various{' '}
              <span className="text-[#f71d1d] font-light">
                sources
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
