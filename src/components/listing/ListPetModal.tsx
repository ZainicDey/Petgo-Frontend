'use client';

import React, { useState, useEffect } from 'react';

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

function CustomDropdown({
  options,
  defaultSelected,
}: {
  options: string[];
  defaultSelected: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <div className="relative flex items-center w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-left text-[14px] focus:outline-none focus:border-[#F7941D]/60 flex items-center justify-between"
      >
        <span>{selected}</span>
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
          open ? 'rotate-180' : ''
        }`}
      >
        <g opacity="0.5">
          <path
            d="M4 6L8 10L12 6"
            stroke="#717182"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full bg-[#1A1A1D]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-white/10 text-white text-[14px] transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ListPetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ListPetModal({ isOpen, onClose }: ListPetModalProps) {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      setTimeout(() => setShow(true), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target === e.currentTarget && !show) {
      setRender(false);
    }
  };

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-[500px] h-full bg-[#0a0a0a] border-l border-[#2a2a2d] flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          show ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-1.5 cursor-pointer rounded-full hover:bg-[#2a2a2d]"
          >
            <CloseIcon />
          </button>

          {/* Header */}
          <div className="flex flex-col gap-2 mt-4">
            <h2
              style={{
                color: '#FFF',
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
              }}
            >
              List Your Pet for Adoption
            </h2>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.60)',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              Fill in the details to help find a perfect home for your pet. All fields are required.
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5 mt-2" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Pet Name *</label>
                <input
                  type="text"
                  placeholder="Enter pet name"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Pet Type *</label>
                <CustomDropdown
                  options={['Dog', 'Cat', 'Bird', 'Other']}
                  defaultSelected="Dog"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Breed *</label>
                <input
                  type="text"
                  placeholder="Enter breed"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Age *</label>
                <input
                  type="text"
                  placeholder="e.g., 2 years, 6 months"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Gender *</label>
                <CustomDropdown
                  options={['Male', 'Female']}
                  defaultSelected="Male"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Location *</label>
                <input
                  type="text"
                  placeholder="City, Area"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-[14px]">Description *</label>
              <textarea
                placeholder="Tell us about your pet's personality, behavior etc..."
                rows={4}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60 resize-none"
              ></textarea>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Your Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">NID *</label>
                <input
                  type="text"
                  placeholder="Your contact information"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Contact (Phone)</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-[14px]">Emergency Contact *</label>
                <input
                  type="text"
                  placeholder="Your contact information"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#F7941D]/60"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer text-white text-[14px]">
                <input type="checkbox" className="appearance-none w-4 h-4 rounded-[4px] border border-white/30 bg-white checked:bg-[#2563EB] checked:border-[#2563EB] checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:ring-offset-0 cursor-pointer transition-all" />
                Healthy
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-white text-[14px]">
                <input type="checkbox" className="appearance-none w-4 h-4 rounded-[4px] border border-white/30 bg-white checked:bg-[#2563EB] checked:border-[#2563EB] checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:ring-offset-0 cursor-pointer transition-all" />
                Vaccinated
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-white text-[14px]">
                <input type="checkbox" className="appearance-none w-4 h-4 rounded-[4px] border border-white/30 bg-white checked:bg-[#2563EB] checked:border-[#2563EB] checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:ring-offset-0 cursor-pointer transition-all" />
                Not-Vaccinated
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full mt-4 bg-[#BE1E2D] hover:bg-[#a01925] text-white font-semibold py-3.5 rounded-xl transition-colors active:scale-[0.98]"
              style={{ fontSize: '15px' }}
            >
              List Pet for Adoption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
