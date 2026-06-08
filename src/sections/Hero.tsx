"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/Buttton";
import HeroMockup from "@/assets/images/Hero App-Mockup.png";
import HeroRectangle from "@/assets/images/Hero Rectangle.png";
import Paw from "@/assets/images/Paw.png";
import PetgoAnimation from "@/components/PetgoAnimation";

export default function Hero() {
  return (
    <section className="mx-auto relative w-full overflow-hidden pt-10">
      {/* ── Main Content Area ── */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center px-6 pt-10 pb-64 md:pt-12 pointer-events-none gap-8 md:gap-5">
        {/* ── Left Column: Heading + CTA ── */}
        <div className="relative z-10 flex flex-col pl-0 md:pl-54 gap-10 md:gap-15 pointer-events-auto md:bottom-8 items-center md:items-start text-center md:text-left">
          <h1 className="text-[40px] md:text-[82px] font-[650] leading-[1.05] tracking-tight text-[#ffffff] uppercase">
            Redefining
            <span className="flex items-baseline justify-center md:justify-start gap-4 font-[650] tracking-[0.001em]">
              <span className="text-[#dc871f]">Pet</span>
              <span className="text-[#e68d21]">Care</span>
              <span className="mb-2">IN</span>
            </span>
            Bangladesh
          </h1>

          <div>
            <Button label="TAKE OUR SURVEY" href="/survey" variant="gradient" />
          </div>
        </div>

        {/* ── Right Column: Phone Mockups ── */}
        <div className="relative pointer-events-auto pb-8 mt-10 md:mt-0 px-4 md:px-0 w-full md:w-auto">
          <Image
            src={HeroMockup}
            alt="PetGo App Mockup"
            priority
            className="w-full h-auto md:w-[930px] md:h-[500px] object-cover"
          />
        </div>
      </div>

      {/* ── Background Rectangle ── */}
      <div className="absolute bottom-[150px] inset-x-0 z-0 flex justify-center">
        <Image src={HeroRectangle} alt="" className="h-100 w-700" />
      </div>

      {/* ── Decorative Paw Prints ── */}
      <div className="absolute top-13 left-[515px] z-20 opacity-100 rotate">
        <Image src={Paw} alt="" width={35} height={35} aria-hidden="true" />
      </div>
      <div className="absolute top-113 left-[670px] z-20 opacity-100 rotate">
        <Image src={Paw} alt="" width={35} height={35} aria-hidden="true" />
      </div>

      <div className="absolute top-32 right-[140px] z-20 opacity-100 rotate-120">
        <Image src={Paw} alt="" width={40} height={40} aria-hidden="true" />
      </div>
      <div className="absolute top-[790px] right-[500px] z-20 opacity-100 rotate-120">
        <Image src={Paw} alt="" width={40} height={40} aria-hidden="true" />
      </div>

      {/* ── Scrolling PETGO Marquee pinned to bottom ── */}
      <div className="absolute bottom-[80px] w-full overflow-hidden z-0">
        <PetgoAnimation />
      </div>
    </section>
  );
}
