'use client';

import React from 'react';

export default function PetgoAnimation() {
  return (
    <section className="w-full overflow-hidden group">
      <div className="marquee-track flex w-max whitespace-nowrap group-hover:[animation-play-state:paused]">
        {/* Duplicate the text set twice for seamless loop */}
        {[0, 1].map((set) => (
          <div
            key={set}
            className="marquee-content flex shrink-0 items-center gap-4 pr-4"
            aria-hidden={set === 1}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <React.Fragment key={i}>
                {/* Outlined text */}
                <span className="petgo-text-outline font-[family-name:var(--font-poppins)] text-[140px] md:text-[220px] font-bold leading-none tracking-wider uppercase select-none">
                  PETGO
                </span>
                {/* Filled text */}
                <span className="font-[family-name:var(--font-poppins)] text-[140px] md:text-[220px] font-bold leading-none tracking-wider uppercase select-none text-white/7">
                  PETGO
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
