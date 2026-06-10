'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

import kittenNibbles from '@/assets/images/kitten-nibbles.png';
import whiskasOceanFish from '@/assets/images/whiskas-ocean-fish.png';
import pedigreePuppy from '@/assets/images/pedigree-puppy.png';
import dogMedicine from '@/assets/images/dog-medicine.png';
import catTreats from '@/assets/images/cat-treats.png';
import petVitamins from '@/assets/images/pet-vitamins.png';
import foodIcon from '@/assets/images/foodicon.png';
import medicineIcon from '@/assets/images/medicineicon.png';
import toyIcon from '@/assets/images/toyicon.png';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

/* ─── Category types ─── */
type Category = 'all' | 'toys' | 'foods' | 'medicine';

interface Product {
  id: number;
  name: string;
  price: number;
  image: StaticImageData;
  category: Category;
}

/* ─── Product data ─── */
const products: Product[] = [
  {
    id: 1,
    name: 'Kitten Nibbles',
    price: 32,
    image: kittenNibbles,
    category: 'foods',
  },
  {
    id: 2,
    name: 'Ocean Fish Whiskas',
    price: 32,
    image: whiskasOceanFish,
    category: 'foods',
  },
  {
    id: 3,
    name: 'Puppy Chicken Milk',
    price: 32,
    image: pedigreePuppy,
    category: 'foods',
  },
  {
    id: 4,
    name: 'Pet Multivitamins',
    price: 45,
    image: petVitamins,
    category: 'medicine',
  },
  {
    id: 5,
    name: 'Cat Treats Premium',
    price: 18,
    image: catTreats,
    category: 'foods',
  },
  {
    id: 6,
    name: 'Dog Health Supplement',
    price: 55,
    image: dogMedicine,
    category: 'medicine',
  },
];

/* ─── Category tabs config ─── */
const categories: { key: Category; label: string; icon: React.ReactNode }[] = [
  {
    key: 'foods',
    label: 'FOODS',
    icon: <Image src={foodIcon} alt="Foods" width={22} height={22} className="object-contain" />,
  },
  {
    key: 'medicine',
    label: 'MEDICINE',
    icon: <Image src={medicineIcon} alt="Medicine" width={22} height={22} className="object-contain" />,
  },
  {
    key: 'toys',
    label: 'TOYS',
    icon: <Image src={toyIcon} alt="Toys" width={22} height={22} className="object-contain" />,
  },
  {
    key: 'all',
    label: 'ALL',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M18.3823 2H15.2058C14.0363 2 13.0882 2.9481 13.0882 4.11765V7.29413C13.0882 8.46367 14.0363 9.41176 15.2058 9.41176H18.3823C19.5519 9.41176 20.5 8.46367 20.5 7.29413V4.11765C20.5 2.9481 19.5519 2 18.3823 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.79412 2H4.61765C3.4481 2 2.5 2.9481 2.5 4.11765V7.29413C2.5 8.46367 3.4481 9.41176 4.61765 9.41176H7.79412C8.96366 9.41176 9.91177 8.46367 9.91177 7.29413V4.11765C9.91177 2.9481 8.96366 2 7.79412 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.3823 12.5884H15.2058C14.0363 12.5884 13.0882 13.5364 13.0882 14.706V17.8825C13.0882 19.0521 14.0363 20.0001 15.2058 20.0001H18.3823C19.5519 20.0001 20.5 19.0521 20.5 17.8825V14.706C20.5 13.5364 19.5519 12.5884 18.3823 12.5884Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.79412 12.5884H4.61765C3.4481 12.5884 2.5 13.5364 2.5 14.706V17.8825C2.5 19.0521 3.4481 20.0001 4.61765 20.0001H7.79412C8.96366 20.0001 9.91177 19.0521 9.91177 17.8825V14.706C9.91177 13.5364 8.96366 12.5884 7.79412 12.5884Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ─── Product Card ─── */
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col gap-4 mt-16 mx-auto w-full max-w-[372px]">
      {/* Card container */}
      <div className="relative w-full aspect-[372/424] rounded-[32px] bg-[#151515] border border-white/5 transition-colors duration-300">
        {/* Product image floating out of container */}
        <div className="absolute -top-[15%] left-0 right-0 bottom-6 flex justify-center items-end pointer-events-none">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={400}
            className="object-contain w-[85%] h-full drop-shadow-2xl transition-all duration-500"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-1 px-2 mt-2">
        <h3 className="text-white text-[20px] md:text-[28px] font-bold uppercase tracking-wide leading-tight">
          {product.name}
        </h3>
        <span className="text-[#A89E8C] text-[18px] md:text-[27px] font-normal tracking-wide">
          ${product.price}
        </span>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function TopCategories() {
  const [activeCategory, setActiveCategory] = useState<Category>('foods');

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-16">
        {/* ── Heading ── */}
        <div className="text-center mb-4">
          <h2 className="text-white text-[36px] sm:text-[48px] md:text-[74px] font-bold leading-[1.1] uppercase tracking-tight">
            Top Services &amp; Categories
          </h2>
        </div>

        {/* ── Subtitle ── */}
        <p className="text-white/70 text-[14px] md:text-[17px] text-center max-w-2xl mx-auto mb-10 leading-relaxed">
          From GPS tracking and vet care to wellness tools, products, and community support,
          PetGo brings everything your pet needs under one roof.
        </p>

        {/* ── Category Tabs ── */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                flex justify-center items-center gap-[10px] py-[14px] px-[25px] rounded-[18px] text-[13px] md:text-[14px] font-semibold uppercase tracking-wider
                border transition-all duration-300 cursor-pointer select-none
                ${
                  activeCategory === cat.key
                    ? 'bg-[#FFF0DE] text-[#212A2C] border-[#FFF0DE] shadow-[0_0_20px_rgba(255,240,222,0.15)]'
                    : 'bg-[#212A2C] text-white/70 border-[rgba(33,42,44,0.15)] hover:text-white hover:bg-[#2a3437]'
                }
              `}
            >
              <span className="flex items-center justify-center">
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Products Carousel ── */}
        <div className="max-w-[1100px] mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
            }}
            className="w-full select-none"
          >
            <CarouselContent className="-ml-5">
              {filteredProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation arrows – centered below on all screens */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <CarouselPrevious className="static translate-y-0 z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:translate-y-0 text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white disabled:opacity-50 h-11 w-11 [&_svg]:size-5 rounded-lg" />
              <CarouselNext className="static translate-y-0 z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:translate-y-0 text-white border-white/20 bg-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-black disabled:opacity-50 h-11 w-11 [&_svg]:size-5 rounded-lg" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
