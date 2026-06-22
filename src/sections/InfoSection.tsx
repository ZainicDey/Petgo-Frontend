import Image from "next/image";
import infoImage from "@/assets/images/thumnail-info.png";

export default function InfoSection() {
  return (
    <section className="py-10 md:py-16 mb-42 bg-black">
      <div className="container mx-auto px-6 md:px-16 max-w-5xl">
        {/* Video / Image Container */}
        <div className="relative w-full rounded-[2rem] overflow-hidden group cursor-pointer">
          <Image
            src={infoImage}
            alt="Info Image"
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            priority
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-110">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 4v16l13-8L7 4z" />
              </svg>
            </div>
          </div>

          {/* Timestamp Overlay */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2 text-white font-medium bg-black/20 px-3 py-1.5 rounded-md backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
              <rect x="2" y="6" width="14" height="12" rx="2" />
            </svg>
            <span className="text-sm md:text-base">3:13</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-8 md:mt-10 px-2 md:px-0">
          <h3 className="text-[#FF8A00] font-medium text-sm md:text-xl tracking-wider uppercase mb-2 md:mb-4">
            Petgo Documentry
          </h3>
          <h2 className="text-white text-2xl md:text-4xl lg:text-[54px] font-bold leading-tight md:leading-[1.15] max-w-4xl">
            A silent revolutionary in the city struggles to become a 'mother' to
            homeless dogs and cats
          </h2>
        </div>
      </div>
    </section>
  );
}
