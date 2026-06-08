import Image from 'next/image';
import dogImage from '@/assets/images/Dog image.png';
import newspaper from '@/assets/images/Newspaper.jpg';
import star from '@/assets/images/star.svg';
import Paw from '@/assets/images/Paw.png';
export default function AboutUS() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-6 md:px-16 relative">
        {/* ── Two-Column Layout ── */}
        <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto gap-12 md:gap-16">
          {/* ── Left Column: Title + Dog Image ── */}
          <div className="flex flex-col gap-8 w-full md:w-[440px] md:shrink-0">
            <h2 className="text-[48px] md:text-[72px] font-bold leading-none uppercase text-white">
              About Us
            </h2>
            <div className="relative w-full max-w-[440px] h-[650px] rounded-[24px] overflow-hidden">
              <Image
                src={dogImage}
                alt="About us - a friendly dog waving"
                width={440}
                height={650}
                className="w-full h-full object-cover"
                style={{ objectPosition: '-439.5px 0px' }}
                unoptimized
              />
            </div>
          </div>

          {/* ── Right Column: Newspaper + Badge + Headings + Description ── */}
          <div className="flex flex-col gap-8 w-full md:flex-1 md:pl-12">
            {/* Newspaper Image */}
            <div className="relative w-full max-w-[444px] rounded-[20px] overflow-hidden">
              <Image
                src={newspaper}
                alt="PetGo featured in national newspapers"
                width={444}
                height={437}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Featured Badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-[18px] border border-white/10 bg-gradient-to-b from-[rgba(247,148,29,0.20)] to-[rgba(190,30,45,0.20)] w-fit">
              <Image
                src={star}
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
              <span className="text-white text-[16px] md:text-[20px] font-normal">
                We have been featured in National Dailies!
              </span>
            </div>

            {/* Headings */}
            <div>
              <h2 className="text-[32px] md:text-[40px] font-semibold leading-[44px] uppercase text-white">
                Rooted in Love,
              </h2>
              <h2 className="text-[32px] md:text-[40px] font-semibold leading-[44px] uppercase text-[#F7941D]">
                Built for Pets
              </h2>
            </div>

            {/* Description */}
            <div className="w-full max-w-[500px]">
              <p className="text-white/70 text-[16px] md:text-[18px] leading-relaxed">
                At PetGo, every solution begins with compassion. We blend
                technology with heart to create a safer, healthier, and more
                joyful world for pets and their owners.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-120 right-45 z-20 opacity-100 rotate">
          <Image src={Paw} alt="" width={35} height={35} aria-hidden="true" />
        </div>

        <div className="absolute top-42 left-179 z-20 opacity-100 rotate-120">
          <Image src={Paw} alt="" width={40} height={40} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
