import { StaticImageData } from "next/image";
import search from "@/assets/images/Search.svg";

type CardProps = {
  image: StaticImageData;
  variant?: "search" | "zoom";
  title: string;
  description: string;
};

export default function Card({ image, variant = "search", title, description }: CardProps) {
  return (
    <div className="group relative inline-flex flex-col overflow-hidden rounded-2xl bg-[#1e1e1e] cursor-pointer">
      {/* Top Image Section */}
      <div className="relative overflow-hidden w-[310px] h-[310px]">
        {/* Base Map Image — native <img> so SVGs stay crisp on zoom */}
        <img
          src={image.src}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-350 ease-out ${
            variant === "search"
              ? "origin-[100%_0%] group-hover:scale-185"
              : "origin-center group-hover:scale-200"
          }`}
        />

        {/* Sliding Red Magnifying Glass Overlay (search variant only) */}
        {variant === "search" && (
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-350 ease-out translate-x-full translate-y-full group-hover:translate-x-4 group-hover:translate-y-4">
            <img
              src={search.src}
              alt="Search Zoom"
              className="h-70 w-70 object-cover"
            />
          </div>
        )}
      </div>

      <div className="relative p-5 bg-[#1e1e1e] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#1e1e1e] to-[#2a2a2a] opacity-0 transition-opacity duration-[2700ms] group-hover:opacity-100" />
        <h3 className="relative text-xl font-bold text-orange-400">{title}</h3>
        <p className="relative mt-1 text-sm text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}
