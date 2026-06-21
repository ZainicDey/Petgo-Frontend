'use client';

import React from 'react';

interface AddToCartProps {
  productId: number | string;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddToCart?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function AddToCart({
  productId,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  className = '',
}: AddToCartProps) {
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(e);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(e);
    }
  };

  return (
    <div className={`flex items-center gap-2 mt-3 ${className}`}>
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="flex-1 flex items-center justify-center gap-2 px-4 h-[42px] rounded-[12px] bg-[#BE1E2D] text-[#FFF] font-(family-name:--font-opensans) text-[15px] font-semibold leading-[20px] transition-colors duration-300 hover:bg-[#a01926] active:bg-[#7a131c] active:scale-[0.98] cursor-pointer"
        id={`add-to-cart-${productId}`}
      >
        {/* Cart Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clipPath="url(#clip0_2022_1387)">
            <path
              d="M16.6668 18.3334C17.1271 18.3334 17.5002 17.9603 17.5002 17.5C17.5002 17.0398 17.1271 16.6667 16.6668 16.6667C16.2066 16.6667 15.8335 17.0398 15.8335 17.5C15.8335 17.9603 16.2066 18.3334 16.6668 18.3334Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.49984 18.3334C7.96007 18.3334 8.33317 17.9603 8.33317 17.5C8.33317 17.0398 7.96007 16.6667 7.49984 16.6667C7.0396 16.6667 6.6665 17.0398 6.6665 17.5C6.6665 17.9603 7.0396 18.3334 7.49984 18.3334Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0.833496 0.833313H4.16683L6.40016 11.9916C6.47637 12.3753 6.68509 12.7199 6.98978 12.9652C7.29448 13.2105 7.67574 13.3408 8.06683 13.3333H16.1668C16.5579 13.3408 16.9392 13.2105 17.2439 12.9652C17.5486 12.7199 17.7573 12.3753 17.8335 11.9916L19.1668 4.99998H5.00016"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2022_1387">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Add to Cart
      </button>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className={`group flex items-center justify-center w-[42px] h-[42px] rounded-[12px] transition-all duration-200 cursor-pointer active:scale-[0.98] ${
          isFavorite
            ? 'bg-[#fde8ea] text-[#BE1E2D]'
            : 'bg-white text-[#1D1D1F] hover:bg-[#fde8ea] hover:text-[#BE1E2D]'
        }`}
        id={`favorite-${productId}`}
        aria-label={
          isFavorite ? 'Remove from favorites' : 'Add to favorites'
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={isFavorite ? 'currentColor' : 'none'}
        >
          <path
            d="M17.3666 3.84166C16.941 3.41583 16.4356 3.07803 15.8794 2.84757C15.3232 2.6171 14.727 2.49847 14.1249 2.49847C13.5229 2.49847 12.9267 2.6171 12.3705 2.84757C11.8143 3.07803 11.3089 3.41583 10.8833 3.84166L9.99994 4.725L9.1166 3.84166C8.25686 2.98192 7.0908 2.49892 5.87494 2.49892C4.65908 2.49892 3.49301 2.98192 2.63327 3.84166C1.77353 4.70141 1.29053 5.86747 1.29053 7.08333C1.29053 8.29919 1.77353 9.46525 2.63327 10.325L3.5166 11.2083L9.99994 17.6917L16.4833 11.2083L17.3666 10.325C17.7924 9.89937 18.1302 9.39401 18.3607 8.83779C18.5912 8.28158 18.7098 7.6854 18.7098 7.08333C18.7098 6.48126 18.5912 5.88508 18.3607 5.32887C18.1302 4.77265 17.7924 4.26729 17.3666 3.84166V3.84166Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-200"
          />
        </svg>
      </button>
    </div>
  );
}
