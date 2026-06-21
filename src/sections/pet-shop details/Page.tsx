'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import RelatedProduct from './RelatedProduct';

import ecommerce1 from '@/assets/images/ecoomerce1.png';
import ecommerce2 from '@/assets/images/ecoomerce2.png';
import ecommerce3 from '@/assets/images/ecoomerce3.png';
import ecommerce4 from '@/assets/images/ecoomerce4.png';
import ecommerce5 from '@/assets/images/ecoomerce5.png';
import ecommerce6 from '@/assets/images/ecoomerce6.png';

/* ── Types ──────────────────────────────────────────────────── */

interface Specification {
  label: string;
  value: string;
}

export interface ProductDetail {
  id: number;
  image: typeof ecommerce1;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  description: string;
  keyFeatures: string[];
  specifications: Specification[];
}

/* ── Mock Data ──────────────────────────────────────────────── */

export const PRODUCTS: ProductDetail[] = [
  {
    id: 1,
    image: ecommerce1,
    name: 'Premium Dog Food – Chicken & Rice',
    category: 'Food & Treats',
    price: 1200,
    originalPrice: 2000,
    inStock: true,
    description:
      'Reward your loyal companion with our Natural Dog Treats. Made from wholesome ingredients without artificial additives, these treats are perfect for training sessions or just showing your love. Each bite is packed with flavor your dog will adore.',
    keyFeatures: [
      '100% natural ingredients',
      'Perfect for training rewards',
      'Low calorie and healthy',
      'No artificial preservatives',
    ],
    specifications: [
      { label: 'Weight', value: '500g' },
      { label: 'Suitable For', value: 'All Dog Breeds' },
      { label: 'Calories', value: '3 kcal/treat' },
      { label: 'Shelf Life', value: '6 months' },
    ],
  },
  {
    id: 2,
    image: ecommerce2,
    name: 'Gourmet Cat Food – Salmon',
    category: 'Food & Treats',
    price: 600,
    originalPrice: 900,
    inStock: true,
    description:
      'Indulge your feline friend with premium salmon-based gourmet cat food. Rich in Omega-3 fatty acids, this formula supports a healthy coat and immune system. Formulated by veterinary nutritionists for complete and balanced meals.',
    keyFeatures: [
      'Rich in Omega-3 fatty acids',
      'Supports healthy coat',
      'Vet-approved formula',
      'Grain-free recipe',
    ],
    specifications: [
      { label: 'Weight', value: '400g' },
      { label: 'Suitable For', value: 'All Cat Breeds' },
      { label: 'Flavour', value: 'Salmon' },
      { label: 'Shelf Life', value: '12 months' },
    ],
  },
  {
    id: 3,
    image: ecommerce3,
    name: 'Premium Wild Bird Seed Mix – 1kg',
    category: 'Food & Treats',
    price: 1000,
    originalPrice: 1400,
    inStock: true,
    description:
      'Attract a wide variety of wild birds to your garden with our premium seed mix. Carefully blended with millet, sunflower seeds, and peanut pieces, it provides the perfect nutrition for birds of all sizes throughout the year.',
    keyFeatures: [
      'Attracts diverse bird species',
      'High-energy blend',
      'No fillers or husks',
      'Weather-resistant packaging',
    ],
    specifications: [
      { label: 'Weight', value: '1kg' },
      { label: 'Contents', value: 'Millet, Sunflower, Peanut' },
      { label: 'Suitable For', value: 'Wild Birds' },
      { label: 'Shelf Life', value: '18 months' },
    ],
  },
  {
    id: 4,
    image: ecommerce4,
    name: 'Cat Favorite Scratching Post Tower',
    category: 'Toys & Accessories',
    price: 6200,
    originalPrice: 8000,
    inStock: true,
    description:
      'Keep your cat entertained and your furniture safe with our multi-level scratching post tower. Covered in premium sisal rope, it satisfies natural scratching instincts while providing a comfortable perch for lounging and watching the world go by.',
    keyFeatures: [
      'Premium sisal rope covering',
      'Multi-level design',
      'Sturdy non-slip base',
      'Easy to assemble',
    ],
    specifications: [
      { label: 'Height', value: '90cm' },
      { label: 'Base Diameter', value: '38cm' },
      { label: 'Material', value: 'Sisal, Plush, Wood' },
      { label: 'Max Weight', value: '10kg' },
    ],
  },
  {
    id: 5,
    image: ecommerce5,
    name: 'All In One Interactive Pet Toy Set',
    category: 'Toys & Accessories',
    price: 3200,
    originalPrice: 4500,
    inStock: false,
    description:
      'Keep your pet mentally stimulated and physically active with our comprehensive interactive toy set. Includes puzzle feeders, rope toys, squeaky balls, and more — everything you need to keep your dog or cat engaged for hours.',
    keyFeatures: [
      'Includes 12 different toys',
      'Suitable for dogs and cats',
      'BPA-free safe materials',
      'Encourages mental stimulation',
    ],
    specifications: [
      { label: 'Pieces', value: '12 items' },
      { label: 'Suitable For', value: 'Dogs & Cats' },
      { label: 'Material', value: 'BPA-free plastic, Cotton' },
      { label: 'Age', value: '3 months+' },
    ],
  },
  {
    id: 6,
    image: ecommerce6,
    name: 'Adjustable Dog Leash & Collar Set',
    category: 'Accessories',
    price: 900,
    originalPrice: 1300,
    inStock: true,
    description:
      'Take control of your walks with our durable and stylish adjustable leash and collar set. Made from reinforced nylon with a quick-release buckle and padded handle, this set provides comfort for both you and your dog on every adventure.',
    keyFeatures: [
      'Quick-release safety buckle',
      'Padded ergonomic handle',
      'Reflective stitching for night safety',
      'Adjustable fit for all sizes',
    ],
    specifications: [
      { label: 'Leash Length', value: '1.8m' },
      { label: 'Collar Sizes', value: 'S, M, L, XL' },
      { label: 'Material', value: 'Reinforced Nylon' },
      { label: 'Color Options', value: 'Red, Blue, Black' },
    ],
  },
  {
    id: 7,
    image: ecommerce1,
    name: 'Organic Puppy Treats – Variety Pack',
    category: 'Food & Treats',
    price: 800,
    originalPrice: 1100,
    inStock: true,
    description:
      'Give your puppy the best start with our organic variety pack. Featuring three irresistible flavours — chicken, beef, and sweet potato — these soft treats are gentle on sensitive tummies and perfect for early training and bonding.',
    keyFeatures: [
      'Certified organic ingredients',
      'Soft texture for puppies',
      '3 delicious flavours',
      'Supports healthy development',
    ],
    specifications: [
      { label: 'Weight', value: '300g (3×100g)' },
      { label: 'Suitable For', value: 'Puppies 2 months+' },
      { label: 'Flavours', value: 'Chicken, Beef, Sweet Potato' },
      { label: 'Shelf Life', value: '9 months' },
    ],
  },
  {
    id: 8,
    image: ecommerce2,
    name: 'Aquarium Fish Food – Tropical Flakes',
    category: 'Food & Treats',
    price: 450,
    originalPrice: 650,
    inStock: true,
    description:
      'Nourish your tropical fish with a scientifically formulated flake food that enhances vibrant colours and promotes healthy growth. Enriched with spirulina and vitamins, it keeps your aquarium fish thriving and your water crystal clear.',
    keyFeatures: [
      'Enhances natural colouration',
      'Spirulina enriched',
      'Minimal water clouding',
      'Suitable for all tropical species',
    ],
    specifications: [
      { label: 'Weight', value: '100g' },
      { label: 'Suitable For', value: 'Tropical Fish' },
      { label: 'Formula', value: 'Spirulina & Vitamins' },
      { label: 'Shelf Life', value: '24 months' },
    ],
  },
  {
    id: 9,
    image: ecommerce3,
    name: 'Pet Grooming Brush – Self-Cleaning',
    category: 'Grooming',
    price: 1500,
    originalPrice: 2200,
    inStock: true,
    description:
      'Make grooming a breeze with our self-cleaning slicker brush. One press of the button retracts the bristles and removes collected fur instantly. The ergonomic handle reduces hand fatigue, making it perfect for long grooming sessions with your pet.',
    keyFeatures: [
      'One-click self-cleaning button',
      'Ergonomic anti-slip handle',
      'Fine bent wire bristles',
      'Suitable for all coat types',
    ],
    specifications: [
      { label: 'Head Size', value: '9cm × 7cm' },
      { label: 'Suitable For', value: 'Dogs & Cats' },
      { label: 'Material', value: 'ABS Plastic, Stainless Steel' },
      { label: 'Weight', value: '180g' },
    ],
  },
];

/* ── Icons ──────────────────────────────────────────────────── */

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip0_2029_2035)">
      <path d="M16.6663 18.3334C17.1266 18.3334 17.4997 17.9603 17.4997 17.5C17.4997 17.0398 17.1266 16.6667 16.6663 16.6667C16.2061 16.6667 15.833 17.0398 15.833 17.5C15.833 17.9603 16.2061 18.3334 16.6663 18.3334Z" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.50033 18.3334C7.96056 18.3334 8.33366 17.9603 8.33366 17.5C8.33366 17.0398 7.96056 16.6667 7.50033 16.6667C7.04009 16.6667 6.66699 17.0398 6.66699 17.5C6.66699 17.9603 7.04009 18.3334 7.50033 18.3334Z" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.833008 0.833344H4.16634L6.39967 11.9917C6.47588 12.3753 6.6846 12.72 6.9893 12.9653C7.29399 13.2105 7.67526 13.3408 8.06634 13.3333H16.1663C16.5574 13.3408 16.9387 13.2105 17.2434 12.9653C17.5481 12.72 17.7568 12.3753 17.833 11.9917L19.1663 5.00001H4.99967" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_2029_2035">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4.16699 10H15.8337" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4.16699 10H15.8337" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 4.16666V15.8333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none" className="shrink-0 mt-[7px]">
    <circle cx="3" cy="3" r="3" fill="#F7941D" />
  </svg>
);

const StockDot = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="#00C950" />
  </svg>
);

/* ── Main Component ─────────────────────────────────────────── */

export default function PetShopDetailPage({ id }: { id: number }) {
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const [quantity, setQuantity] = useState(1);

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  return (
    <section className="min-h-screen bg-black py-10 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* ── Back Button ── */}
        <Link
          href="/pet-shop"
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#F7941D] transition-colors duration-200 text-[14px] mb-8 group"
        >
          <BackIcon />
          <span className="group-hover:underline">Back to Pet Shop</span>
        </Link>

        {/* ── Main Product Area ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* ── Left: Product Image ── */}
          <div className="w-full lg:w-[540px] xl:w-[600px] shrink-0">
            <div className="relative w-full aspect-square rounded-[24px] bg-[#1A1A1D] border border-white/10 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 540px, 600px"
                priority
              />
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Category */}
            <span
              style={{
                color: '#F7941D',
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: '20px',
              }}
            >
              {product.category}
            </span>

            {/* Title */}
            <h1
              style={{
                color: '#FFF',
                fontFamily: 'var(--font-sans), sans-serif',
                fontSize: '36px',
                fontWeight: 400,
                lineHeight: '44px',
              }}
            >
              {product.name}
            </h1>

            {/* Prices */}
            <div className="flex items-center gap-4">
              <span
                style={{
                  color: '#F7941D',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontSize: '42px',
                  fontWeight: 400,
                  lineHeight: '50px',
                }}
              >
                ৳{product.price.toLocaleString()}
              </span>
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.60)',
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '34px',
                  textDecoration: 'line-through',
                }}
              >
                ৳{product.originalPrice.toLocaleString()}
              </span>
            </div>

            {/* In Stock */}
            <div className="flex items-center gap-2">
              <StockDot />
              <span
                style={{
                  color: '#00C950',
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '20px',
                }}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                color: 'rgba(255,255,255,0.60)',
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: '24.375px',
              }}
            >
              {product.description}
            </p>
            
            <div
              style={{
                color: '#FFF',
                fontFamily: 'var(--font-sans), sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                marginTop: '8px'
              }}
            >
              Quantity
            </div>
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div
                className="flex items-center gap-3 px-4 h-[52px]"
                style={{
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 240, 222, 0.10)',
                  background: 'rgba(255, 240, 222, 0.10)',
                }}
              >
                <button
                  onClick={decrement}
                  className="flex items-center justify-center w-6 h-6 cursor-pointer transition-opacity hover:opacity-70 active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon />
                </button>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Gabarito, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    minWidth: '24px',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={increment}
                  className="flex items-center justify-center w-6 h-6 cursor-pointer transition-opacity hover:opacity-70 active:scale-90"
                  aria-label="Increase quantity"
                >
                  <PlusIcon />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                className="flex-1 flex items-center justify-center gap-2.5 h-[52px] px-6 cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{
                  borderRadius: '18px',
                  background: '#F7941D',
                }}
                id="add-to-cart-detail"
                disabled={!product.inStock}
              >
                <CartIcon />
                <span
                  style={{
                    color: '#1D1D1F',
                    fontFamily: 'Gabarito, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '20px',
                  }}
                >
                  Add to Cart
                </span>
              </button>
            </div>

            {/* Key Features + Specifications */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">

              {/* Key Features */}
              <div
                className="flex-1 p-5 flex flex-col gap-3"
                style={{
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 240, 222, 0.10)',
                  background: 'rgba(255, 240, 222, 0.05)',
                }}
              >
                <h3
                  style={{
                    color: '#FFF0DE',
                    fontFamily: 'var(--font-sans), sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: '26px',
                  }}
                >
                  Key Features
                </h3>
                <ul className="flex flex-col gap-2">
                  {product.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <DotIcon />
                      <span
                        style={{
                          color: '#FFF',
                          fontFamily: '"Open Sans", sans-serif',
                          fontSize: '15px',
                          fontWeight: 400,
                          lineHeight: '22px',
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div
                className="flex-1 p-5 flex flex-col gap-3"
                style={{
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 240, 222, 0.10)',
                  background: 'rgba(255, 240, 222, 0.05)',
                }}
              >
                <h3
                  style={{
                    color: '#FFF0DE',
                    fontFamily: 'var(--font-sans), sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: '26px',
                  }}
                >
                  Specifications
                </h3>
                <div className="flex flex-col gap-2">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <span
                        style={{
                          color: 'rgba(255,255,255,0.60)',
                          fontFamily: '"Open Sans", sans-serif',
                          fontSize: '15px',
                          fontWeight: 400,
                          lineHeight: '22px',
                        }}
                      >
                        {spec.label}
                      </span>
                      <span
                        style={{
                          color: '#FFF',
                          fontFamily: '"Open Sans", sans-serif',
                          fontSize: '15px',
                          fontWeight: 400,
                          lineHeight: '22px',
                          textAlign: 'right',
                        }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        <RelatedProduct products={PRODUCTS.filter((p) => p.id !== product.id)} />
      </div>
    </section>
  );
}
