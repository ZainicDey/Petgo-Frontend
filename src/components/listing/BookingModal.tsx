'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { ListingData } from './ListingCard';

/* ── Icons ─────────────────────────────────────────────────── */

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M4.16663 10H15.8333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 4.16669L15.8333 10L10 15.8334"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M16.6663 8.33335C16.6663 12.4942 12.0505 16.8275 10.5005 18.1659C10.3561 18.2744 10.1803 18.3331 9.99967 18.3331C9.81901 18.3331 9.64324 18.2744 9.49884 18.1659C7.94884 16.8275 3.33301 12.4942 3.33301 8.33335C3.33301 6.56524 4.03539 4.86955 5.28563 3.61931C6.53587 2.36907 8.23156 1.66669 9.99967 1.66669C11.7678 1.66669 13.4635 2.36907 14.7137 3.61931C15.964 4.86955 16.6663 6.56524 16.6663 8.33335Z"
      stroke="#F7941D"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10.8333C11.3807 10.8333 12.5 9.71402 12.5 8.33331C12.5 6.9526 11.3807 5.83331 10 5.83331C8.61929 5.83331 7.5 6.9526 7.5 8.33331C7.5 9.71402 8.61929 10.8333 10 10.8333Z"
      stroke="#F7941D"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 5V10L13.3333 11.6667"
      stroke="#F7941D"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6023 1.66669 9.99996 1.66669C5.39759 1.66669 1.66663 5.39765 1.66663 10C1.66663 14.6024 5.39759 18.3334 9.99996 18.3334Z"
      stroke="#F7941D"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CallIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip_call)">
      <path
        d="M12.5415 4.16665C13.3555 4.32545 14.1035 4.72353 14.6899 5.30993C15.2763 5.89632 15.6744 6.64437 15.8332 7.45831M12.5415 0.833313C14.2326 1.02118 15.8095 1.77846 17.0134 2.98082C18.2173 4.18318 18.9765 5.75915 19.1665 7.44998M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2744C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1112 17.2005 18.1856C16.9806 18.2599 16.7477 18.2875 16.5165 18.2666C13.9522 17.988 11.489 17.1118 9.32486 15.7083C7.31139 14.4289 5.60431 12.7218 4.32486 10.7083C2.91651 8.53432 2.04007 6.05914 1.76653 3.48331C1.7457 3.25287 1.77309 3.02061 1.84695 2.80133C1.9208 2.58205 2.03951 2.38055 2.1955 2.20966C2.3515 2.03877 2.54137 1.90224 2.75302 1.80875C2.96468 1.71526 3.19348 1.66686 3.42486 1.66665H5.92486C6.32928 1.66267 6.72136 1.80588 7.028 2.06959C7.33464 2.3333 7.53493 2.69952 7.59153 3.09998C7.69705 3.90003 7.89274 4.68559 8.17486 5.44165C8.28698 5.73992 8.31125 6.06408 8.24478 6.37571C8.17832 6.68735 8.02392 6.97341 7.79986 7.19998L6.74153 8.25831C7.92783 10.3446 9.65524 12.072 11.7415 13.2583L12.7999 12.2C13.0264 11.9759 13.3125 11.8215 13.6241 11.7551C13.9358 11.6886 14.2599 11.7129 14.5582 11.825C15.3143 12.1071 16.0998 12.3028 16.8999 12.4083C17.3047 12.4654 17.6744 12.6693 17.9386 12.9812C18.2029 13.2931 18.3433 13.6913 18.3332 14.1Z"
        stroke="#1D1D1F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip_call">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M17.0502 2.91C16.1332 1.98392 15.0411 1.24965 13.8376 0.750437C12.634 0.251219 11.3432 -0.00317281 10.0402 1.03455e-05C4.5802 1.03455e-05 0.130196 4.45001 0.130196 9.91001C0.130196 11.66 0.590196 13.36 1.4502 14.86L0.0502005 20L5.3002 18.63C6.7502 19.41 8.3802 19.82 10.0402 19.82C15.5002 19.82 19.9502 15.37 19.9502 9.91001C19.9502 7.25001 18.9302 4.73001 17.0502 2.91ZM10.0402 18.15C8.5602 18.15 7.1102 17.75 5.8402 17L5.5402 16.82L2.4202 17.64L3.2502 14.6L3.0502 14.29C2.22753 12.977 1.79189 11.4594 1.7902 9.91001C1.7902 5.37001 5.4902 1.67001 10.0302 1.67001C12.2302 1.67001 14.3002 2.53001 15.8502 4.09001C16.6177 4.85389 17.2257 5.76261 17.6393 6.76306C18.0529 7.76352 18.264 8.83554 18.2602 9.91801C18.2802 14.45 14.5802 18.15 10.0402 18.15ZM14.5602 11.99C14.3102 11.87 13.0902 11.27 12.8702 11.18C12.6402 11.1 12.4802 11.06 12.3102 11.3C12.1402 11.55 11.6702 12.11 11.5302 12.27C11.3902 12.44 11.2402 12.46 10.9902 12.33C10.7402 12.21 9.9402 11.94 9.0002 11.1C8.2602 10.44 7.7702 9.63001 7.6202 9.38001C7.4802 9.13001 7.6002 9.00001 7.7302 8.87001C7.8402 8.76001 7.9802 8.58001 8.1002 8.44001C8.2202 8.30001 8.2702 8.19001 8.3502 8.03001C8.4302 7.86001 8.3902 7.72001 8.3302 7.60001C8.2702 7.48001 7.7702 6.26001 7.5702 5.76001C7.3802 5.28001 7.1802 5.34001 7.0302 5.33001H6.5602C6.3902 5.33001 6.1302 5.39001 5.9002 5.64001C5.6802 5.89001 5.0402 6.49001 5.0402 7.71001C5.0402 8.93001 5.9302 10.11 6.0502 10.27C6.1702 10.44 7.7702 12.94 10.2502 14.01C10.8402 14.27 11.3002 14.42 11.6602 14.53C12.2502 14.72 12.7902 14.69 13.2202 14.63C13.7002 14.56 14.6902 14.03 14.8902 13.45C15.1002 12.87 15.1002 12.38 15.0302 12.27C14.9602 12.16 14.8102 12.11 14.5602 11.99Z"
      fill="white"
    />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask id="path-1-inside-1_2042_4754" fill="white">
      <path d="M18.267 9.66665C16.5836 5.75831 13.417 3.33331 10.0003 3.33331C6.58363 3.33331 3.41697 5.75831 1.73363 9.66665C1.68775 9.77178 1.66406 9.88526 1.66406 9.99998C1.66406 10.1147 1.68775 10.2282 1.73363 10.3333C3.41697 14.2416 6.58363 16.6666 10.0003 16.6666C13.417 16.6666 16.5836 14.2416 18.267 10.3333C18.3129 10.2282 18.3365 10.1147 18.3365 9.99998C18.3365 9.88526 18.3129 9.77178 18.267 9.66665ZM10.0003 15C7.35863 15 4.85863 13.0916 3.41697 9.99998C4.85863 6.90831 7.35863 4.99998 10.0003 4.99998C12.642 4.99998 15.142 6.90831 16.5836 9.99998C15.142 13.0916 12.642 15 10.0003 15ZM10.0003 6.66665C9.34103 6.66665 8.69656 6.86214 8.1484 7.22841C7.60024 7.59469 7.17299 8.11528 6.9207 8.72437C6.66841 9.33345 6.6024 10.0037 6.73102 10.6503C6.85963 11.2969 7.1771 11.8908 7.64328 12.357C8.10945 12.8232 8.7034 13.1406 9.35 13.2693C9.9966 13.3979 10.6668 13.3319 11.2759 13.0796C11.885 12.8273 12.4056 12.4 12.7719 11.8519C13.1381 11.3037 13.3336 10.6593 13.3336 9.99998C13.3336 9.11592 12.9824 8.26808 12.3573 7.64296C11.7322 7.01784 10.8844 6.66665 10.0003 6.66665ZM10.0003 11.6666C9.67066 11.6666 9.34843 11.5689 9.07435 11.3858C8.80027 11.2026 8.58665 10.9423 8.4605 10.6378C8.33435 10.3332 8.30135 9.99813 8.36566 9.67483C8.42997 9.35153 8.5887 9.05456 8.82179 8.82147C9.05488 8.58838 9.35185 8.42965 9.67515 8.36534C9.99845 8.30103 10.3336 8.33403 10.6381 8.46018C10.9426 8.58633 11.2029 8.79995 11.3861 9.07403C11.5692 9.34811 11.667 9.67034 11.667 9.99998C11.667 10.442 11.4914 10.8659 11.1788 11.1785C10.8663 11.4911 10.4423 11.6666 10.0003 11.6666Z"/>
    </mask>
    <path d="M1.73363 9.66665L3.56668 10.4667L3.5705 10.4578L1.73363 9.66665ZM1.66406 9.99998H-0.335938H1.66406ZM1.73363 10.3333L3.57052 9.54216L3.56666 9.53331L1.73363 10.3333ZM18.267 10.3333L16.4339 9.5333L16.4301 9.54217L18.267 10.3333ZM3.41697 9.99998L1.60435 9.15474L1.21021 9.99998L1.60435 10.8452L3.41697 9.99998ZM16.5836 9.99998L18.3962 10.8452L18.7904 9.99998L18.3962 9.15474L16.5836 9.99998ZM13.3336 9.99998H15.3336H13.3336ZM9.07435 11.3858L7.96321 13.0487L9.07435 11.3858ZM18.267 9.66665L20.1038 8.8755C18.1998 4.45484 14.4318 1.33331 10.0003 1.33331V3.33331V5.33331C12.4022 5.33331 14.9674 7.06179 16.4301 10.4578L18.267 9.66665ZM10.0003 3.33331V1.33331C5.56885 1.33331 1.80076 4.45484 -0.103236 8.8755L1.73363 9.66665L3.5705 10.4578C5.03317 7.06179 7.59842 5.33331 10.0003 5.33331V3.33331ZM1.73363 9.66665L-0.0993972 8.86665C-0.25541 9.22412 -0.335938 9.60995 -0.335938 9.99998H1.66406H3.66406C3.66406 10.1606 3.6309 10.3195 3.56666 10.4666L1.73363 9.66665ZM1.66406 9.99998H-0.335938C-0.335938 10.39 -0.25541 10.7758 -0.0993972 11.1333L1.73363 10.3333L3.56666 9.53331C3.6309 9.68051 3.66406 9.83938 3.66406 9.99998H1.66406ZM1.73363 10.3333L-0.103236 11.1245C1.80076 15.5451 5.56885 18.6666 10.0003 18.6666V16.6666V14.6666C7.59842 14.6666 5.03317 12.9382 3.5705 9.54217L1.73363 10.3333ZM10.0003 16.6666V18.6666C14.4318 18.6666 18.1998 15.5451 20.1038 11.1245L18.267 10.3333L16.4301 9.54217C14.9674 12.9382 12.4022 14.6666 10.0003 14.6666V16.6666ZM18.267 10.3333L20.1 11.1333C20.256 10.7758 20.3365 10.39 20.3365 9.99998H18.3365H16.3365C16.3365 9.83938 16.3697 9.68051 16.4339 9.53331L18.267 10.3333ZM18.3365 9.99998H20.3365C20.3365 9.60995 20.256 9.22412 20.1 8.86665L18.267 9.66665L16.4339 10.4666C16.3697 10.3195 16.3365 10.1606 16.3365 9.99998H18.3365ZM10.0003 15V13C8.38091 13 6.46075 11.795 5.22958 9.15474L3.41697 9.99998L1.60435 10.8452C3.25652 14.3883 6.33636 17 10.0003 17V15ZM3.41697 9.99998L5.22958 10.8452C6.46075 8.20497 8.38091 6.99998 10.0003 6.99998V4.99998V2.99998C6.33636 2.99998 3.25652 5.61165 1.60435 9.15474L3.41697 9.99998ZM10.0003 4.99998V6.99998C11.6197 6.99998 13.5399 8.20497 14.771 10.8452L16.5836 9.99998L18.3962 9.15474C16.7441 5.61165 13.6642 2.99998 10.0003 2.99998V4.99998ZM16.5836 9.99998L14.771 9.15474C13.5399 11.795 11.6197 13 10.0003 13V15V17C13.6642 17 16.7441 14.3883 18.3962 10.8452L16.5836 9.99998ZM10.0003 6.66665V4.66665C8.94547 4.66665 7.91432 4.97944 7.03726 5.56548L8.1484 7.22841L9.25954 8.89135C9.47881 8.74484 9.73659 8.66665 10.0003 8.66665V6.66665ZM8.1484 7.22841L7.03726 5.56548C6.1602 6.15151 5.47661 6.98446 5.07294 7.959L6.9207 8.72437L8.76846 9.48973C8.86938 9.2461 9.04027 9.03786 9.25954 8.89135L8.1484 7.22841ZM6.9207 8.72437L5.07294 7.959C4.66927 8.93354 4.56366 10.0059 4.76944 11.0405L6.73102 10.6503L8.69259 10.2601C8.64114 10.0015 8.66754 9.73337 8.76846 9.48973L6.9207 8.72437ZM6.73102 10.6503L4.76944 11.0405C4.97523 12.075 5.48318 13.0253 6.22906 13.7712L7.64328 12.357L9.05749 10.9428C8.87102 10.7563 8.74403 10.5187 8.69259 10.2601L6.73102 10.6503ZM7.64328 12.357L6.22906 13.7712C6.97494 14.5171 7.92525 15.025 8.95982 15.2308L9.35 13.2693L9.74018 11.3077C9.48154 11.2562 9.24396 11.1293 9.05749 10.9428L7.64328 12.357ZM9.35 13.2693L8.95982 15.2308C9.99438 15.4366 11.0667 15.331 12.0413 14.9273L11.2759 13.0796L10.5105 11.2318C10.2669 11.3327 9.99882 11.3591 9.74018 11.3077L9.35 13.2693ZM11.2759 13.0796L12.0413 14.9273C13.0158 14.5237 13.8488 13.8401 14.4348 12.963L12.7719 11.8519L11.1089 10.7407C10.9624 10.96 10.7542 11.1309 10.5105 11.2318L11.2759 13.0796ZM12.7719 11.8519L14.4348 12.963C15.0208 12.086 15.3336 11.0548 15.3336 9.99998H13.3336H11.3336C11.3336 10.2637 11.2554 10.5215 11.1089 10.7407L12.7719 11.8519ZM13.3336 9.99998H15.3336C15.3336 8.58549 14.7717 7.22894 13.7715 6.22874L12.3573 7.64296L10.9431 9.05717C11.1932 9.30722 11.3336 9.64636 11.3336 9.99998H13.3336ZM12.3573 7.64296L13.7715 6.22874C12.7713 5.22855 11.4148 4.66665 10.0003 4.66665V6.66665V8.66665C10.3539 8.66665 10.6931 8.80712 10.9431 9.05717L12.3573 7.64296ZM10.0003 11.6666V9.66665C10.0662 9.66665 10.1307 9.6862 10.1855 9.72282L9.07435 11.3858L7.96321 13.0487C8.56619 13.4516 9.2751 13.6666 10.0003 13.6666V11.6666ZM9.07435 11.3858L10.1855 9.72282C10.2403 9.75945 10.283 9.81151 10.3083 9.87242L8.4605 10.6378L6.61274 11.4032C6.89026 12.0731 7.36023 12.6458 7.96321 13.0487L9.07435 11.3858ZM8.4605 10.6378L10.3083 9.87242C10.3335 9.93333 10.3401 10.0003 10.3272 10.065L8.36566 9.67483L6.40409 9.28465C6.26261 9.99591 6.33522 10.7332 6.61274 11.4032L8.4605 10.6378ZM8.36566 9.67483L10.3272 10.065C10.3144 10.1297 10.2826 10.1891 10.236 10.2357L8.82179 8.82147L7.40758 7.40726C6.89478 7.92005 6.54557 8.57338 6.40409 9.28465L8.36566 9.67483ZM8.82179 8.82147L10.236 10.2357C10.1894 10.2823 10.13 10.314 10.0653 10.3269L9.67515 8.36534L9.28497 6.40377C8.5737 6.54525 7.92037 6.89446 7.40758 7.40726L8.82179 8.82147ZM9.67515 8.36534L10.0653 10.3269C10.0007 10.3398 9.93365 10.3332 9.87274 10.3079L10.6381 8.46018L11.4035 6.61242C10.7335 6.3349 9.99623 6.26229 9.28497 6.40377L9.67515 8.36534ZM10.6381 8.46018L9.87274 10.3079C9.81183 10.2827 9.75977 10.24 9.72314 10.1852L11.3861 9.07403L13.049 7.96289C12.6461 7.35991 12.0735 6.88994 11.4035 6.61242L10.6381 8.46018ZM11.3861 9.07403L9.72314 10.1852C9.68652 10.1304 9.66697 10.0659 9.66697 9.99998H11.667H13.667C13.667 9.27478 13.4519 8.56587 13.049 7.96289L11.3861 9.07403ZM11.667 9.99998H9.66697C9.66697 9.91157 9.70209 9.82679 9.7646 9.76428L11.1788 11.1785L12.593 12.5927C13.2807 11.9051 13.667 10.9724 13.667 9.99998H11.667ZM11.1788 11.1785L9.7646 9.76428C9.82711 9.70177 9.91189 9.66665 10.0003 9.66665V11.6666V13.6666C10.9728 13.6666 11.9054 13.2803 12.593 12.5927L11.1788 11.1785Z" fill="white" mask="url(#path-1-inside-1_2042_4754)"/>
  </svg>
);

const InfoRedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#BE1E2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V12" stroke="#BE1E2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8H12.01" stroke="#BE1E2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneCallOutlineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip_phone_outline)">
      <path d="M12.5415 4.16671C13.3555 4.32551 14.1035 4.72359 14.6899 5.30999C15.2763 5.89639 15.6744 6.64443 15.8332 7.45837M12.5415 0.833374C14.2326 1.02124 15.8095 1.77852 17.0134 2.98088C18.2173 4.18324 18.9765 5.75922 19.1665 7.45004M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2745C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1113 17.2005 18.1856C16.9806 18.26 16.7477 18.2876 16.5165 18.2667C13.9522 17.9881 11.489 17.1118 9.32486 15.7084C7.31139 14.4289 5.60431 12.7219 4.32486 10.7084C2.91651 8.53438 2.04007 6.0592 1.76653 3.48337C1.7457 3.25293 1.77309 3.02067 1.84695 2.80139C1.9208 2.58211 2.03951 2.38061 2.1955 2.20972C2.3515 2.03883 2.54137 1.9023 2.75302 1.80881C2.96468 1.71532 3.19348 1.66693 3.42486 1.66671H5.92486C6.32928 1.66273 6.72136 1.80594 7.028 2.06965C7.33464 2.33336 7.53493 2.69958 7.59153 3.10004C7.69705 3.9001 7.89274 4.68565 8.17486 5.44171C8.28698 5.73998 8.31125 6.06414 8.24478 6.37577C8.17832 6.68741 8.02392 6.97347 7.79986 7.20004L6.74153 8.25837C7.92783 10.3447 9.65524 12.0721 11.7415 13.2584L12.7999 12.2C13.0264 11.976 13.3125 11.8216 13.6241 11.7551C13.9358 11.6887 14.2599 11.7129 14.5582 11.825C15.3143 12.1072 16.0998 12.3029 16.8999 12.4084C17.3047 12.4655 17.6744 12.6694 17.9386 12.9813C18.2029 13.2932 18.3433 13.6914 18.3332 14.1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip_phone_outline">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

interface BookingItemType {
  name: string;
  image?: string;
  street?: string;
  area?: string;
  city?: string;
  phone_number?: string;
  tags?: string[];
  status?: string;
}

/* ── Shared Card Preview (left side of modal) ────────────── */

interface ModalCardPreviewProps {
  item: BookingItemType;
}

function ModalCardPreview({ item }: ModalCardPreviewProps) {
  const tags = item.tags ? item.tags.slice(0, 3) : [];
  const locationText = item.street 
    ? `${item.street}, ${item.area || ''}, ${item.city || ''}` 
    : (item.area || 'Location not specified');

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] w-full">
      {/* Image */}
      {item.image && (
        <div className="relative w-full aspect-[16/9] md:aspect-[6/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col p-4 gap-3">
        {/* Name & Rating */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-[Gabarito] text-[24px] font-medium leading-normal line-clamp-1">
            {item.name}
          </h3>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[#FFF0DE] font-[family-name:var(--font-opensans)] text-[12px] font-normal leading-[17px] bg-[#2a2a2d] rounded-full px-2.5 py-0.5 border border-[#3a3a3d]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Location */}
        <div className="flex items-start gap-2 text-[#D1D5DC] font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
          <LocationIcon />
          <span className="line-clamp-1">{locationText}</span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-[#D1D5DC] font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
          <ClockIcon />
          <span>Available for Services</span>
          <span className={`px-2 py-0.5 rounded-full font-[family-name:var(--font-opensans)] text-[12px] font-normal leading-[17px] ${
            item.status === 'Open'
              ? 'text-[#05DF72] bg-[#05DF72]/10 border border-[#05DF72]/30'
              : 'text-red-400 bg-red-400/10 border border-red-400/30'
          }`}>
            {item.status === 'Open' ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Appointment Form ────────────────────────────── */

interface Step1Props {
  item: BookingItemType;
  name: string;
  phone: string;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onNext: () => void;
}

function Step1({
  item,
  name,
  phone,
  onNameChange,
  onPhoneChange,
  onNext,
}: Step1Props) {
  return (
    <div className="flex flex-col gap-5">
      {/* Header Wrapper */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h2
          style={{
            color: '#FFF',
            fontFamily: '"Gabarito", sans-serif',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
          }}
        >
          Book your Appointment
        </h2>

        {/* Description */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
        >
          Enter your details to contact {item.name} for booking information.
        </p>
      </div>

      {/* Inputs Group Wrapper */}
      <div className="flex flex-col gap-2">
        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full text-white placeholder:text-white/50 focus:outline-none focus:border-[#F7941D]/60 transition-colors"
          style={{
            display: 'flex',
            padding: '16px 4px 16px 24px',
            alignItems: 'center',
            gap: '24px',
            alignSelf: 'stretch',
            borderRadius: '18px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            background: '#1D1D1F',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px',
          }}
        />

        {/* Phone Input */}
        <div
          className="flex items-center w-full focus-within:border-[#F7941D]/60 transition-colors"
          style={{
            padding: '0 4px 0 0',
            borderRadius: '18px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            background: '#1D1D1F',
          }}
        >
          <span
            className="shrink-0 text-white select-none"
            style={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '20px',
              padding: '16px 20px 16px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRight: '1px solid rgba(255, 255, 255, 0.0)',
              borderTopLeftRadius: '17px',
              borderBottomLeftRadius: '17px',
            }}
          >
            +880
          </span>
          <input
            type="tel"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
            style={{
              padding: '16px 4px 16px 12px',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '20px',
            }}
          />
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] cursor-pointer transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
      >
        Next
        <ArrowRightIcon />
      </button>
    </div>
  );
}

/* ── Step 2: Contact Info ────────────────────────────────── */

interface Step2Props {
  item: BookingItemType;
  onContinue: () => void;
}

function Step2({ item, onContinue }: Step2Props) {
  const phoneNumber = item.phone_number || '+8801966-440001';

  return (
    <div className="flex flex-col gap-4">
      {/* Thank you */}
      <p
        style={{
          color: '#F7941D',
          fontFamily: '"Gabarito", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: 'normal',
        }}
      >
        Thank you!
      </p>

      {/* Title */}
      <h2
        style={{
          color: '#FFF',
          fontFamily: '"Gabarito", sans-serif',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          marginTop: '-8px',
        }}
      >
        Book your Appointment
      </h2>

      {/* Description */}
      <p
        style={{
          color: 'rgba(255, 255, 255, 0.60)',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        Contact {item.name} from the information given below
      </p>

      {/* Mobile Number */}
      <div className="flex items-center gap-2">
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.50)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontWeight: 400,
          }}
        >
          Mobile.
        </span>
        <span
          style={{
            color: '#FFF',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '20px',
            fontWeight: 500,
          }}
        >
          {phoneNumber}
        </span>
      </div>

      {/* Call Now Button */}
      <button
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] cursor-pointer transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
        onClick={() => window.open(`tel:${phoneNumber}`)}
      >
        <CallIcon />
        Call Now
      </button>

      {/* WhatsApp Button */}
      <button
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#128C7E] text-white cursor-pointer transition-colors duration-300 hover:bg-[#0e7a6d] active:scale-[0.98]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
        onClick={() =>
          window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`)
        }
      >
        <WhatsappIcon />
        Whatsapp
      </button>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-transparent text-white border border-white/25 cursor-pointer transition-colors duration-300 hover:border-[#F7941D]/40 active:scale-[0.98]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
      >
        Continue
        <ArrowRightIcon />
      </button>
    </div>
  );
}

/* ── Step 2: Adoption Warning ────────────────────────────── */

interface Step2AdoptionProps {
  onShowDonor: () => void;
}

function Step2Adoption({ onShowDonor }: Step2AdoptionProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[500px] mx-auto items-center text-center">
      <div className="flex flex-col">
        <p style={{ color: '#F7941D', fontFamily: '"Gabarito", sans-serif', fontSize: '24px', fontWeight: 600 }}>
          Thank you!
        </p>
        <h2 style={{ color: '#FFF', fontFamily: '"Gabarito", sans-serif', fontSize: '24px', fontWeight: 500 }}>
          Contact Donor from the<br />information below.
        </h2>
      </div>

      <div className="w-full flex flex-col gap-3 p-4 rounded-xl border border-dashed border-[#BE1E2D] bg-[#BE1E2D]/10 text-left">
        <span style={{ color: '#FFF', fontFamily: '"Gabarito", sans-serif', fontSize: '18px', fontWeight: 500 }}>
          Donor Information
        </span>
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5"><InfoRedIcon /></div>
          <p style={{ color: 'rgba(255, 227, 229, 0.8)', fontFamily: '"Open Sans", sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: '20px' }}>
            This is a free platform connecting adopters with donors. Please meet in safe, public places and verify all information before proceeding with adoption.
          </p>
        </div>
      </div>

      <button
        onClick={onShowDonor}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-transparent text-white border border-white/25 cursor-pointer transition-colors duration-300 hover:border-white/50 active:scale-[0.98]"
        style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '14px', fontWeight: 600 }}
      >
        Show Donor Information
        <EyeIcon />
      </button>
    </div>
  );
}

/* ── Step 3: Adoption Donor Info ─────────────────────────── */

interface Step3AdoptionProps {
  item: BookingItemType;
}

function Step3Adoption({ item }: Step3AdoptionProps) {
  const phoneNumber = item.phone_number || '+8801966-440001';
  // Use a sensible default name if it's formatted weirdly or missing
  const donorName = item.name.includes('The ') ? 'Sara Rahman' : (item.name || 'Sara Rahman');

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px] mx-auto items-center text-center">
      <h2 style={{ color: '#F7941D', fontFamily: '"Gabarito", sans-serif', fontSize: '24px', fontWeight: 600 }}>
        Donor Information
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap">
          <span style={{ color: '#F7941D', fontFamily: '"Open Sans", sans-serif', fontSize: '14px', fontWeight: 600 }}>Donor Name</span>
          <span style={{ color: '#FFF', fontFamily: '"Open Sans", sans-serif', fontSize: '24px', fontWeight: 500 }}>{donorName}</span>
        </div>
        <div className="flex flex-col items-center">
          <span style={{ color: '#F7941D', fontFamily: '"Open Sans", sans-serif', fontSize: '14px', fontWeight: 600 }}>Contact</span>
          <div className="flex items-center gap-2">
            <PhoneCallOutlineIcon />
            <span style={{ color: '#FFF', fontFamily: '"Open Sans", sans-serif', fontSize: '24px', fontWeight: 500 }}>{phoneNumber}</span>
          </div>
        </div>
      </div>

      <div className="w-full p-5 rounded-xl border border-dashed border-[#F7941D] text-left" style={{ backgroundColor: 'rgba(247, 148, 29, 0.11)' }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.80)', fontFamily: '"Open Sans", sans-serif', fontSize: '14px', lineHeight: '20px' }}>
          <strong style={{ color: '#F7941D' }}>Important:</strong> Always verify the pet's health records, meet in a safe public location, and take your time to ensure this is the right match for you and the pet.
        </p>
      </div>

      <div className="w-full flex gap-4">
        <button
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] cursor-pointer transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98]"
          style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '14px', fontWeight: 600 }}
          onClick={() => window.open(`tel:${phoneNumber}`)}
        >
          <PhoneCallOutlineIcon />
          Call Now
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#128C7E] text-white cursor-pointer transition-colors duration-300 hover:bg-[#0e7a6d] active:scale-[0.98]"
          style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '14px', fontWeight: 600 }}
          onClick={() => window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`)}
        >
          <WhatsappIcon />
          Whatsapp
        </button>
      </div>
    </div>
  );
}

/* ── Main Modal Shell ────────────────────────────────────────── */

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BookingItemType;
  hideCard?: boolean;
  variant?: 'default' | 'pet-adoption';
}

function ModalShell({
  children,
  onClose,
  onClick,
  style,
  className = '',
  onTransitionEnd,
  hideCard = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  onTransitionEnd?: (e: React.TransitionEvent) => void;
  hideCard?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col bg-[#111111] border border-[#2a2a2d] rounded-2xl w-full min-h-[500px] overflow-y-auto shadow-2xl max-w-[1000px] max-h-[90vh] ${className}`}
      onClick={onClick}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors p-1.5 cursor-pointer rounded-full hover:bg-[#2a2a2d]"
        aria-label="Close modal"
      >
        <CloseIcon />
      </button>
      {children}
    </div>
  );
}

export default function BookingModal({
  isOpen,
  onClose,
  item,
  hideCard = false,
  variant = 'default',
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Animation states: 'idle' = step1 only, 'entering' = step2 sliding in, 'done' = step2 settled
  const [animState, setAnimState] = useState<'idle' | 'entering' | 'done'>(
    'idle'
  );

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setName('');
      setPhone('');
      setAnimState('idle');
    }
  }, [isOpen]);

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setStep(2);
    setAnimState('idle');
    setTimeout(() => {
      setAnimState('entering');
    }, 50);
  }, []);

  const handleShowDonor = useCallback(() => {
    setStep(3);
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== e.currentTarget) return;
      if (animState === 'entering') {
        setAnimState('done');
      }
    },
    [animState]
  );

  if (!isOpen) return null;

  const step2Active = step === 2;
  const step3Active = step === 3;
  const slidingStepActive = step2Active || step3Active;
  const slidingStepVisible =
    slidingStepActive && (animState === 'entering' || animState === 'done');

  const modalContent = (rightSide: React.ReactNode) => (
    <div className="flex flex-col flex-1 justify-center items-center w-full py-8">
      {hideCard ? (
        /* Single Column Layout (No Card) */
        <div className="w-full max-w-[500px] px-8 flex flex-col justify-start">
          {rightSide}
        </div>
      ) : (
        /* Split Layout (With Card) */
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-start w-full mx-auto max-w-[1000px]">
          {/* Left Side – Card Preview */}
          <div className="w-full md:w-[56%] p-6 md:p-8 md:pr-0">
            <ModalCardPreview item={item} />
          </div>
          {/* Right Side */}
          <div className="w-full md:w-[50%] p-6 md:p-8 md:pl-0 flex flex-col justify-start">
            {rightSide}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* ── Step 1 Modal ── blurs & fades when step2 enters */}
      <ModalShell
        onClose={onClose}
        onClick={(e) => e.stopPropagation()}
        className="animate-in zoom-in-95 duration-200"
        hideCard={hideCard}
        style={{
          transition:
            'opacity 0.45s ease, filter 0.45s ease, transform 0.45s ease',
          opacity: slidingStepVisible ? 0 : 1,
          filter: slidingStepVisible ? 'blur(10px)' : 'blur(0px)',
          transform: slidingStepVisible ? 'scale(0.96)' : 'scale(1)',
          ...(animState === 'done' ? { display: 'none' as const } : {}),
        }}
      >
        {modalContent(
          <Step1
            item={item}
            name={name}
            phone={phone}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onNext={handleNext}
          />
        )}
      </ModalShell>

      {/* ── Sliding Modal ── slides in from the right */}
      {slidingStepActive && (
        <ModalShell
          onClose={onClose}
          onClick={(e) => e.stopPropagation()}
          onTransitionEnd={handleTransitionEnd}
          hideCard={hideCard}
          style={{
            position: 'absolute',
            transition:
              'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: animState === 'idle' ? 0 : 1,
            transform:
              animState === 'idle' ? 'translateX(80px)' : 'translateX(0)',
          }}
        >
          {modalContent(
            step === 2 && variant === 'pet-adoption' ? (
              <Step2Adoption onShowDonor={handleShowDonor} />
            ) : step === 3 && variant === 'pet-adoption' ? (
              <Step3Adoption item={item} />
            ) : (
              <Step2 item={item} onContinue={onClose} />
            )
          )}
        </ModalShell>
      )}
    </div>
  );
}
