'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import AddToCart from '@/components/ecommerce/addToCart';
import { ProductDetail } from './Page';

interface RelatedProductProps {
  products: ProductDetail[];
}

export default function RelatedProduct({ products }: RelatedProductProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-white text-3xl font-bold mb-8">Related Products</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
          dragFree: true,
        }}
        className="w-full select-none"
      >
        <CarouselContent className="-ml-5">
          {products.map((p) => (
            <CarouselItem key={p.id} className="pl-5 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Link href={`/pet-shop/${p.id}`} className="block">
                <div className="group relative flex flex-col h-[520px] overflow-hidden rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d]">
                  <div className="relative w-full h-[280px]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5 gap-2">
                    <span style={{ color: '#FFF', fontFamily: '"Open Sans", sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: '20px' }} className="block truncate">
                      {p.category}
                    </span>
                    <h3 style={{ color: '#FFF0DE', fontFamily: 'Gabarito, sans-serif', fontSize: '24px', fontWeight: 400, lineHeight: 'normal' }} className="line-clamp-2 h-[64px]">
                      {p.name}
                    </h3>
                    <p style={{ color: '#F7941D', fontFamily: 'Gabarito, sans-serif', fontSize: '24px', fontWeight: 400, lineHeight: 'normal' }} className="mt-auto truncate">
                      ৳ {p.price.toLocaleString()} BDT
                    </p>
                    <AddToCart
                      productId={p.id}
                      isFavorite={false}
                      onToggleFavorite={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onAddToCart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="hidden md:flex z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:-translate-y-1/2 text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white disabled:opacity-50 -left-16 h-14 w-14 [&_svg]:size-8" />
        <CarouselNext className="hidden md:flex z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:-translate-y-1/2 text-white border-white/20 bg-white/10 hover:bg-[#F7941D] hover:border-[#F7941D] hover:text-black disabled:opacity-50 -right-16 h-14 w-14 [&_svg]:size-8" />
      </Carousel>
    </div>
  );
}
