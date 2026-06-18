'use client';

import React, { useState, useRef, useEffect } from 'react';
import AdoptionCard, { AdoptionData } from './AdoptionCard';
import { motion, Variants } from 'framer-motion';
import BookingModal from '@/components/listing/BookingModal';
import ListPetModal from '@/components/listing/ListPetModal';

const PET_TYPES = ['All Types', 'Dogs', 'Cats', 'Other Pets'];

const ADOPTION_MOCK_DATA: AdoptionData[] = [
  {
    id: 1,
    image: '/foster-1.png',
    name: 'Max',
    breed: 'Golden Retriever',
    age: '3 Years',
    gender: 'Male',
    description:
      'Max is a friendly and energetic Golden Retriever who loves to play fetch and go on walks. He is great with children and other pets. Looking for a loving family with a yard.',
    location: 'Dhanmondi, Dhaka',
    postedDate: 'Posted 2 Days ago',
    health: 'Healthy, Vaccinated',
  },
  {
    id: 2,
    image: '/foster-2.png',
    name: 'Luna',
    breed: 'Persian',
    age: '1.5 years',
    gender: 'Female',
    description:
      'Luna is a beautiful Persian cat with a calm and affectionate personality. She enjoys quiet environments and loves to cuddle. Perfect for apartment living.',
    location: 'Gulshan, Dhaka',
    postedDate: 'Posted 1 Week ago',
    health: 'Healthy, Vaccinated',
  },
  {
    id: 3,
    image: '/foster-3.png',
    name: 'Charlie',
    breed: 'Labrador Mix',
    age: '5 months',
    gender: 'Male',
    description:
      'Charlie is a playful puppy looking for his forever home. He is very trainable and loves treats. Needs an active family who can give him plenty of exercise.',
    location: 'Banani, Dhaka',
    postedDate: 'Posted 3 Days ago',
    health: 'Healthy, Vaccinated',
  },
  {
    id: 4,
    image: '/foster-4.png',
    name: 'Bella',
    breed: 'Bengal',
    age: '2 years',
    gender: 'Female',
    description:
      'Bella is a curious and active Bengal cat. She is highly intelligent and loves interactive toys. She thrives in an engaging environment and gets along with cat-friendly dogs.',
    location: 'House 12, Road 5, Dhanmondi, Dhaka 1205',
    postedDate: 'Posted 2 Days ago',
    health: 'Healthy, Vaccinated',
  },
  {
    id: 5,
    image: '/vet-doctor-1.png',
    name: 'Rocky',
    breed: 'German Shepherd',
    age: '4 years',
    gender: 'Male',
    description:
      'Rocky is a loyal and protective German Shepherd. He has basic obedience training and is very smart. Best suited for an experienced owner.',
    location: 'House 12, Road 5, Dhanmondi, Dhaka 1205',
    postedDate: 'Posted 2 Days ago',
    health: 'Healthy, Vaccinated',
  },
  {
    id: 6,
    image: '/vet-hospital-1.png',
    name: 'Milo',
    breed: 'Holland Lop Rabbit',
    age: '8 months',
    gender: 'Male',
    description:
      'Milo is an adorable Holland Lop bunny. He is gentle, litter-box trained, and enjoys fresh greens. Looking for an indoor home where he can hop around freely.',
    location: 'House 12, Road 5, Dhanmondi, Dhaka 1205',
    postedDate: 'Posted 2 Days ago',
    health: 'Healthy, Not-Vaccinated',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M8.95801 2.15219C10.7476 2.10324 12.4881 2.74161 13.8213 3.93637C15.1543 5.13105 15.9791 6.79104 16.126 8.57504C16.2727 10.3593 15.7304 12.1326 14.6104 13.5291L14.3291 13.8797L14.6484 14.1971L17.7354 17.2596C17.7933 17.3213 17.8261 17.4024 17.8262 17.4872C17.8262 17.5727 17.7924 17.6547 17.7334 17.7166C17.703 17.7466 17.6674 17.7715 17.6279 17.7879C17.5875 17.8047 17.5438 17.8133 17.5 17.8133C17.4561 17.8133 17.4126 17.8048 17.3721 17.7879C17.3315 17.771 17.2946 17.7459 17.2637 17.7147L13.8789 14.3299L13.5293 14.6102C12.1327 15.7303 10.3594 16.2726 8.5752 16.1258C6.79119 15.979 5.1312 15.1542 3.93652 13.8211C2.74176 12.4879 2.10339 10.7474 2.15234 8.95786C2.20131 7.16828 2.93332 5.46496 4.19922 4.19907C5.46511 2.93317 7.16843 2.20116 8.95801 2.15219ZM11.5908 3.31528C10.4337 2.83597 9.16007 2.71066 7.93164 2.95493C6.70309 3.1993 5.57421 3.80259 4.68848 4.68832C3.80274 5.57406 3.19945 6.70294 2.95508 7.93149C2.71081 9.15991 2.83612 10.4335 3.31543 11.5907C3.7948 12.7478 4.60699 13.7366 5.64844 14.4325C6.68994 15.1284 7.9144 15.4998 9.16699 15.4998C10.8466 15.4998 12.4578 14.833 13.6455 13.6454C14.8332 12.4577 15.5 10.8465 15.5 9.16684C15.5 7.91425 15.1285 6.68978 14.4326 5.64828C13.7367 4.60684 12.748 3.79464 11.5908 3.31528Z"
      stroke="#FFF0DE"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 2.16667C11.0287 2.16667 12.0477 2.36969 12.998 2.76335C13.9482 3.15695 14.8118 3.73342 15.5391 4.46062C16.2665 5.18801 16.8436 6.05223 17.2373 7.00261C17.6309 7.95283 17.8339 8.97118 17.834 9.99968C17.834 11.549 17.3744 13.064 16.5137 14.3522C15.6529 15.6403 14.4293 16.6441 12.998 17.237C11.5667 17.8299 9.9912 17.9855 8.47168 17.6833C6.95229 17.381 5.55637 16.6342 4.46094 15.5387C3.3656 14.4433 2.6196 13.0474 2.31738 11.528C2.0152 10.0086 2.17085 8.43386 2.76367 7.00261C3.35656 5.57126 4.36026 4.34772 5.64844 3.48698C6.93653 2.62631 8.45083 2.16674 10 2.16667ZM12.7432 3.37859C11.4337 2.83619 9.99265 2.69491 8.60254 2.97136C7.21234 3.24789 5.93489 3.93002 4.93262 4.9323C3.93034 5.93457 3.24821 7.21202 2.97168 8.60222C2.69523 9.99233 2.83652 11.4334 3.37891 12.7428C3.92131 14.0522 4.84015 15.1712 6.01855 15.9587C7.19702 16.7461 8.58268 17.1666 10 17.1667C11.9007 17.1667 13.7243 16.412 15.0684 15.068C16.4124 13.724 17.167 11.9004 17.167 9.99968C17.1669 8.58236 16.7464 7.1967 15.959 6.01823C15.1715 4.83983 14.0526 3.92099 12.7432 3.37859ZM10 9.66667C10.0884 9.66667 10.1738 9.70182 10.2363 9.76433C10.2987 9.82675 10.3339 9.91147 10.334 9.99968V13.3337C10.3339 13.4219 10.2987 13.5066 10.2363 13.569C10.1738 13.6315 10.0884 13.6667 10 13.6667C9.91171 13.6666 9.82708 13.6315 9.76465 13.569C9.70221 13.5066 9.66708 13.422 9.66699 13.3337V9.99968C9.66708 9.91139 9.70221 9.82676 9.76465 9.76433C9.82708 9.70189 9.91171 9.66676 10 9.66667ZM9.87402 6.36296C9.95514 6.32968 10.0458 6.32964 10.127 6.36296L10.1367 6.36589C10.1745 6.38057 10.2083 6.40325 10.2383 6.43034C10.2967 6.49604 10.3304 6.57963 10.333 6.66765C10.3322 6.72104 10.3193 6.77392 10.2939 6.82097C10.2681 6.86888 10.2308 6.90989 10.1855 6.94011C10.1401 6.97039 10.0875 6.98842 10.0332 6.99382C9.9789 6.99921 9.92352 6.99112 9.87305 6.97038C9.83062 6.95224 9.79193 6.92703 9.75684 6.89714C9.72962 6.86778 9.70657 6.83465 9.69141 6.79753C9.67485 6.75696 9.66674 6.71341 9.66699 6.6696V6.65398C9.66619 6.62274 9.67222 6.59141 9.68555 6.56316L9.69043 6.55339L9.69531 6.54265C9.71281 6.50083 9.73674 6.46225 9.76562 6.42741C9.79496 6.40164 9.82778 6.38004 9.86426 6.36589L9.87402 6.36296Z"
      stroke="#FFF0DE"
    />
  </svg>
);

export default function PetAdoptionPage() {
  const [selectedType, setSelectedType] = useState(PET_TYPES[0]);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<AdoptionData | null>(null);
  const [listPetModalOpen, setListPetModalOpen] = useState(false);

  const handleContactDonor = (item: AdoptionData) => {
    setSelectedPet(item);
    setModalOpen(true);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setTypeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="min-h-screen pb-24 font-[family-name:var(--font-opensans)]">
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
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
          <h1 className="text-[#F7941D] font-[Gabarito] text-[40px] md:text-[64px] font-bold leading-tight mb-2 uppercase tracking-wide">
            PET ADOPTION
          </h1>
          <p className="text-white text-[14px] md:text-[16px] mb-4">
            Connect with loving pets looking for their forever home. 100% Free
            Platform.
          </p>

          <div
            className="inline-flex justify-center items-center mt-2"
            style={{
              padding: '4px 8px',
              gap: '4px',
              borderRadius: '8px',
              border: '1px solid rgba(247, 148, 29, 0.50)',
              background: 'rgba(190, 30, 45, 0.50)',
            }}
          >
            <InfoIcon />
            <span
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 540,
                lineHeight: '20px',
              }}
            >
              We connect pet adopters with pet donors - no fees, just love.
            </span>
          </div>
        </div>

        {/* Search and Action Bar */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-20 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full bg-[#2a2a2d] rounded-full border border-[#3a3a3d] hover:border-[#F7941D]/40 transition-colors focus-within:border-[#F7941D] overflow-hidden">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search by name, breed or location"
                className="w-full bg-transparent border-none text-white text-[14px] px-12 py-3.5 focus:outline-none placeholder:text-[#A0A4AB]"
              />
            </div>

            {/* Dropdown & Button Container */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Dropdown */}
              <div
                ref={typeDropdownRef}
                className="relative flex items-center w-full md:w-auto"
              >
                <button
                  onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                  className="h-[52px] w-full md:w-[140px] px-6 pr-4 rounded-full border border-[rgba(255,240,222,0.10)] bg-[rgba(255,240,222,0.05)] text-white text-left flex items-center justify-between cursor-pointer focus:outline-none transition-colors select-none"
                  style={{
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                  }}
                >
                  <span>{selectedType}</span>
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                    typeDropdownOpen ? 'rotate-180' : ''
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

                {typeDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 z-50 w-full bg-[#1A1A1D]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
                    style={{ fontFamily: '"Open Sans", sans-serif' }}
                  >
                    {PET_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedType(type);
                          setTypeDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 text-white text-[14px] font-normal leading-[20px] transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* List Pet Button */}
              <button
                onClick={() => setListPetModalOpen(true)}
                className="bg-[#BE1E2D] text-[#FFF] px-6 py-3.5 rounded-[18px] whitespace-nowrap hover:bg-[#a01925] active:scale-95 cursor-pointer transition-all flex items-center gap-2"
                style={{
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '20px',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                List A Pet
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-20 mb-6 flex flex-row items-center gap-2">
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.50)',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '22px',
            }}
          >
            Search Results:
          </span>
          <h2
            style={{
              color: '#FFF',
              fontFamily: '"Gabarito", sans-serif',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '22px',
            }}
          >
            6 Pets Available for Adoption
          </h2>
        </div>

        {/* Grid */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {ADOPTION_MOCK_DATA.map((item) => (
              <motion.div key={item.id} variants={cardVariants}>
                <AdoptionCard item={item} onContactDonor={handleContactDonor} />
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 rounded-[8px] border border-[#2a2a2d] text-white hover:border-[#F7941D] hover:text-[#F7941D] transition-colors text-[14px]">
              Load More
            </button>
          </div>
        </div>
      </div>
      {selectedPet && (
        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={{
            name: `The ${selectedPet.name} Family Home`,
            area: selectedPet.location,
            phone_number: '+8801966-440001',
          }}
          hideCard={true}
          variant="pet-adoption"
        />
      )}
      <ListPetModal isOpen={listPetModalOpen} onClose={() => setListPetModalOpen(false)} />
    </>
  );
}
