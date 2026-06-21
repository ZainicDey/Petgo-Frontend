'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

import AddToCart from '@/components/ecommerce/addToCart';

import ecommerce1 from '@/assets/images/ecoomerce1.png';
import ecommerce2 from '@/assets/images/ecoomerce2.png';
import ecommerce3 from '@/assets/images/ecoomerce3.png';
import ecommerce4 from '@/assets/images/ecoomerce4.png';
import ecommerce5 from '@/assets/images/ecoomerce5.png';
import ecommerce6 from '@/assets/images/ecoomerce6.png';

/* ── Types ─────────────────────────────────────────────────── */

interface Product {
  id: number;
  image: StaticImageData;
  name: string;
  category: string;
  animalType: string;
  price: number;
}

/* ── Mock Data ─────────────────────────────────────────────── */

const ECOMMERCE_IMAGES: StaticImageData[] = [
  ecommerce1,
  ecommerce2,
  ecommerce3,
  ecommerce4,
  ecommerce5,
  ecommerce6,
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    image: ECOMMERCE_IMAGES[0],
    name: 'Premium Dog Food – Chicken & Rice',
    category: 'Food & Treats',
    animalType: 'Dog',
    price: 1200,
  },
  {
    id: 2,
    image: ECOMMERCE_IMAGES[1],
    name: 'Gourmet Cat Food – Salmon',
    category: 'Food & Treats',
    animalType: 'Cat',
    price: 600,
  },
  {
    id: 3,
    image: ECOMMERCE_IMAGES[2],
    name: 'Premium Wild Bird Seed Mix – 1kg',
    category: 'Food & Treats',
    animalType: 'Bird',
    price: 1000,
  },
  {
    id: 4,
    image: ECOMMERCE_IMAGES[3],
    name: 'Cat Favorite Scratching Post Tower',
    category: 'Toys & Accessories',
    animalType: 'Cat',
    price: 6200,
  },
  {
    id: 5,
    image: ECOMMERCE_IMAGES[4],
    name: 'All In One Interactive Pet Toy Set',
    category: 'Toys & Accessories',
    animalType: 'Dog',
    price: 3200,
  },
  {
    id: 6,
    image: ECOMMERCE_IMAGES[5],
    name: 'Adjustable Dog Leash & Collar Set',
    category: 'Accessories',
    animalType: 'Dog',
    price: 900,
  },
  {
    id: 7,
    image: ECOMMERCE_IMAGES[0],
    name: 'Organic Puppy Treats – Variety Pack',
    category: 'Food & Treats',
    animalType: 'Dog',
    price: 800,
  },
  {
    id: 8,
    image: ECOMMERCE_IMAGES[1],
    name: 'Aquarium Fish Food – Tropical Flakes',
    category: 'Food & Treats',
    animalType: 'Fish',
    price: 450,
  },
  {
    id: 9,
    image: ECOMMERCE_IMAGES[2],
    name: 'Pet Grooming Brush – Self-Cleaning',
    category: 'Grooming',
    animalType: 'Dog',
    price: 1500,
  },
];

/* ── Filter Options ────────────────────────────────────────── */

const CATEGORIES = [
  'All Products',
  'Food & Treats',
  'Toys & Accessories',
  'Bedding',
  'Grooming',
  'Housing',
  'Hygiene',
  'Accessories',
];

const ANIMAL_TYPES = ['All Animals', 'Dog', 'Cat', 'Bird', 'Fish'];

const SORT_OPTIONS = [
  'Default',
  'Price: Low to High',
  'Price: High to Low',
  'Name A-Z',
];

/* ── Animation Variants ────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/* ── Component ─────────────────────────────────────────────── */

export default function PetShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedAnimalType, setSelectedAnimalType] = useState('All Animals');
  const [sortBy, setSortBy] = useState('Default');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  /* ── Filtering & Sorting ─────────────────────────────────── */

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter((product) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (
        selectedCategory !== 'All Products' &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      // Animal type filter
      if (
        selectedAnimalType !== 'All Animals' &&
        product.animalType !== selectedAnimalType
      ) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case 'Price: Low to High':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'Name A-Z':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedAnimalType, sortBy]);

  const handleSearch = useCallback(() => {
    // Search is reactive via useMemo, this is just for the Enter key UX
  }, []);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Background Rectangle ── */}
      <div className="absolute -top-5 inset-x-0 z-0 flex justify-center pointer-events-none mt-9">
        <div
          className="w-full h-[750px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(136, 136, 136, 0.00) 0%, rgba(104, 104, 104, 0.25) 50%, rgba(136, 136, 136, 0.00) 100%)',
          }}
        />
      </div>

      {/* ── Hero Header ── */}
      <div className="relative text-center pt-20 pb-8 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,148,29,0.06)_0%,transparent_70%)] pointer-events-none" />

        <h1 className="relative text-4xl md:text-5xl lg:text-[58px] font-bold text-[#F7941D] mb-3">
          PET SHOP
        </h1>
        <p className="relative text-white font-sans text-sm md:text-base max-w-md mx-auto">
          Everything your pet needs, delivered to your doorstep
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mb-12 relative z-30">
        <div className="flex flex-col mt-8 sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl mx-auto">
          <div className="flex-1 flex items-center min-h-[50px] rounded-[18px] bg-[rgba(255,240,222,0.10)] border border-[rgba(255,240,222,0.10)] pl-5 pr-2 py-2 sm:py-0">
            {/* Search Icon */}
            <svg
              className="w-5 h-5 text-[#8a8a8a] shrink-0 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 w-full h-full min-h-[40px] bg-transparent text-white text-medium placeholder-[#8a8a8a] focus:outline-none"
              id="search-petshop-input"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="h-[50px] px-8 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] font-[family-name:var(--font-opensans)] text-[16px] font-semibold transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98] cursor-pointer"
            id="search-petshop-btn"
          >
            Search
          </button>
        </div>
      </div>

      {/* ── Main Content: Sidebar + Products ── */}
      <div className="mx-12 px-4 md:px-8 lg:px-16 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar Filters ── */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="sticky top-24 bg-[#1A1A1D] border border-[#2a2a2d] rounded-2xl p-6 font-(family-name:--font-opensans)">
              {/* Filters Title */}
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#2a2a2d]">
                <svg
                  className="w-5 h-5 text-[#FFF0DE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <h3 className="text-[#FFF0DE] text-lg font-normal">Filters</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-[#F7941D] text-base font-medium mb-3">
                  Category
                </h4>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                        selectedCategory === category
                          ? 'bg-[#F7941D] text-[#1D1D1F] font-bold'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animal Type Filter */}
              <div>
                <h4 className="text-[#F7941D] text-base font-medium mb-3">
                  Animal Type
                </h4>
                <div className="flex flex-col gap-1">
                  {ANIMAL_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedAnimalType(type)}
                      className={`text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                        selectedAnimalType === type
                          ? 'bg-[#F7941D] text-[#1D1D1F] font-bold'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Products Section ── */}
          <div className="flex-1 min-w-0">
            {/* Results Header + Sort */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-white/50 font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
                Search Results:{' '}
                <span className="text-white font-[Gabarito] text-[18px] font-medium leading-[22px] ml-1">
                  {filteredProducts.length} Products Found
                </span>
              </p>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-2 h-[36px] px-4 rounded-[9px] border border-[rgba(255,240,222,0.10)] bg-[rgba(255,240,222,0.05)] text-white text-sm cursor-pointer focus:outline-none transition-colors select-none"
                  id="sort-select"
                >
                  <span className="text-white/50">Sort:</span>
                  <span>{sortBy}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`transition-transform duration-200 ${
                      sortDropdownOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#FFF0DE"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {sortDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 z-50 w-[200px] bg-[#1A1A1D]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
                    style={{ fontFamily: '"Open Sans", sans-serif' }}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-[14px] font-normal leading-[20px] transition-colors cursor-pointer ${
                          sortBy === option
                            ? 'text-[#F7941D] bg-white/5'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg
                  className="w-16 h-16 text-white/20 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-white/40 text-lg">No products found</p>
                <p className="text-white/25 text-sm mt-1">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                key={`${selectedCategory}-${selectedAnimalType}-${sortBy}-${searchQuery}`}
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={cardVariants}>
                    <Link href={`/pet-shop/${product.id}`} className="block">
                      <ProductCard
                        product={product}
                        isFavorite={favorites.has(product.id)}
                        onToggleFavorite={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Product Card Component ────────────────────────────────── */

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col h-[600px] overflow-hidden rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] transition-all duration-300 hover:border-[#BE1E2D]/60 hover:shadow-[0_0_40px_rgba(190,30,45,0.20)]">
      {/* Product Image */}
      <div className="relative w-full h-[370px] overflow-hidden bg-[#111]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category Tag */}
        <span className="text-white font-(family-name:--font-opensans) text-[14px] font-normal leading-[20px] block h-[20px] truncate">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-[#FFF0DE] font-[Gabarito] text-[27px] font-normal leading-[32px] line-clamp-2 h-[64px]">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-[#F7941D] font-[Gabarito] text-[26px] font-normal leading-[32px] h-[32px] truncate mt-1">
          ৳ {product.price.toLocaleString()} BDT
        </p>

        <AddToCart
          productId={product.id}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={() => {
            console.log(`Product ${product.id} added to cart`);
          }}
        />
      </div>
    </div>
  );
}
