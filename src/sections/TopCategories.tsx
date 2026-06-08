'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

import kittenNibbles from '@/assets/images/kitten-nibbles.png';
import whiskasOceanFish from '@/assets/images/whiskas-ocean-fish.png';
import pedigreePuppy from '@/assets/images/pedigree-puppy.png';
import dogMedicine from '@/assets/images/dog-medicine.png';
import catTreats from '@/assets/images/cat-treats.png';
import petVitamins from '@/assets/images/pet-vitamins.png';

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
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: 'medicine',
    label: 'MEDICINE',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3h12v2H6V3zm6 4c-3.31 0-6 2.69-6 6v8h12v-8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4v1h-3v-2h-2v2H8v-1c0-2.21 1.79-4 4-4zm-4 7h8v4H8v-4z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: 'toys',
    label: 'TOYS',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: 'all',
    label: 'ALL',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" fill="currentColor"/>
      </svg>
    ),
  },
];

/* ─── Product Card ─── */
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col gap-4">
      {/* Card container */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#111111] border border-white/5">
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7941D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tilted dark panels behind the product (decorative) */}
        <div className="absolute inset-4 rounded-xl bg-[#222222] transform -rotate-3 origin-bottom-left" />
        <div className="absolute inset-4 rounded-xl bg-[#1e1e1e] transform rotate-2 origin-bottom-right" />

        {/* Product image */}
        <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
          <Image
            src={product.image}
            alt={product.name}
            width={280}
            height={380}
            className="object-contain w-full h-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-white text-[15px] md:text-[17px] font-bold uppercase tracking-wide leading-tight">
          {product.name}
        </h3>
        <span className="text-[#F7941D] text-[18px] md:text-[20px] font-bold">
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
          <h2 className="text-white text-[36px] sm:text-[48px] md:text-[64px] font-bold leading-[1.1] uppercase tracking-tight">
            Top Services &amp; Categories
          </h2>
        </div>

        {/* ── Subtitle ── */}
        <p className="text-white/50 text-[14px] md:text-[16px] text-center max-w-xl mx-auto mb-10 leading-relaxed">
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
                flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold uppercase tracking-wider
                border transition-all duration-300 cursor-pointer select-none
                ${
                  activeCategory === cat.key
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                }
              `}
            >
              <span className={activeCategory === cat.key ? 'text-black' : 'text-white/60'}>
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
