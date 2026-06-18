'use client';

import vetFinder from '@/assets/images/Vet-finder.svg';
import fosterFinder from '@/assets/images/Foster House Finder.svg';
import Training from '@/assets/images/Training & Grooming.svg';
import petAdopt from '@/assets/images/Pet adoption.svg';
import petEcommerce from '@/assets/images/Pet ecommerce.svg';

import Card from '@/components/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const cards = [
  {
    image: vetFinder,
    variant: 'search' as const,
    title: 'Vet Finder',
    description: 'Find your vet right from your fingertips.',
    href: '/vet-finder',
  },
  {
    image: fosterFinder,
    variant: 'search' as const,
    title: 'Foster House Finder',
    description: 'Give pets a loving temporary home.',
    href: '/foster-house',
  },
  {
    image: Training,
    variant: 'zoom' as const,
    title: 'Training & Grooming',
    description: 'Pamper and train your pets effortlessly.',
    href: '/training-grooming',
  },
  {
    image: petAdopt,
    variant: 'zoom' as const,
    title: 'Pet Adoption',
    description: 'Adopt a pet, save a life.',
    href: '/pet-adoption',
  },
  {
    image: petEcommerce,
    variant: 'zoom' as const,
    title: 'Pet E-commerce',
    description: 'Shop pet essentials with just a tap.',
    href: '/pet-shop'
  },
];

export default function Service() {
  return (
    <section className="bg-[#111111] py-22">
      <h1 className="text-center text-6xl font-bold text-white mb-16">
        OUR SERVICES
      </h1>

      <div className="px-4 md:px-20 max-w-[1280px] mx-auto">
        <Carousel
          opts={{
            align: 'start',
            loop: false,
            dragFree: true,
          }}
          className="w-full select-none"
        >
          <CarouselContent className="-ml-5">
            {cards.map((card, i) => (
              <CarouselItem key={i} className="pl-5 basis-auto">
                <Card {...card} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:-translate-y-1/2 text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white disabled:opacity-50 -left-16 h-14 w-14 [&_svg]:size-8" />
          <CarouselNext className="hidden md:flex z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:-translate-y-1/2 text-white border-white/20 bg-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-black disabled:opacity-50 -right-16 h-14 w-14 [&_svg]:size-8" />

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center justify-center gap-6 mt-8">
            <CarouselPrevious className="static translate-y-0 z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:translate-y-0 text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white disabled:opacity-50 h-14 w-14 [&_svg]:size-8" />
            <CarouselNext className="static translate-y-0 z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:translate-y-0 text-white border-white/20 bg-white/10 hover:bg-orange-400 hover:border-orange-400 hover:text-black disabled:opacity-50 h-14 w-14 [&_svg]:size-8" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
