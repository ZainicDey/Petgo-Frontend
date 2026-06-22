'use client';

import { useState } from 'react';
import QuestionMarkIcon from '@/components/Question';
const faqs = [
  {
    question: 'What is PetGo and how does it work?',
    answer:
      'PetGo is a platform that connects pet owners with trusted service providers. It works by allowing you to browse, book, and manage services for your beloved companions.',
  },
  {
    question: 'Is PetGo available in my area?',
    answer:
      'We are rapidly expanding! Please check our app or website by entering your zip code to see if we currently serve your specific location.',
  },
  {
    question: 'How can PetGo help with stray animal welfare?',
    answer:
      'PetGo partners with local shelters and rescue organizations, donating a portion of our proceeds and facilitating adoptions through our platform.',
  },
  {
    question: 'How can I join the PetGo community?',
    answer:
      'You can join by signing up on our website or mobile app. Create a profile for yourself and your pets to start connecting with other pet lovers and professionals!',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* ── Background Question Marks ── */}

      {/* Top Left Red ? */}
      <QuestionMarkIcon
        className="absolute left-[15%] top-[15%] select-none pointer-events-none"
        size={96}
        color="#BE1E2D"
        opacity={0.3}
        // dotGap={0.8}
        rotation={30}
      />

      {/* Bottom Right Red ? */}
      <QuestionMarkIcon
        className="absolute right-[16%] bottom-[13%] select-none pointer-events-none"
        size={96}
        color="#BE1E2D"
        opacity={0.3}
        // dotGap={0.8}
        rotation={30}
      />

      {/* Bottom Left Yellow ? */}
      <QuestionMarkIcon
        className="absolute left-[20%] bottom-[25%] select-none pointer-events-none"
        size={48}
        color="#F7941D"
        opacity={0.3}
        // dotGap={4}
        rotation={-30}
      />

      {/* Top Right Yellow ? */}
      <QuestionMarkIcon
        className="absolute right-[35%] top-[11%] select-none pointer-events-none"
        size={48}
        color="#F7941D"
        opacity={0.3}
        // dotGap={0.8}
        rotation={-30}
      />

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <h2 className="text-[#FFF0DE] text-[32px] md:text-[40px] font-bold text-center mb-12 uppercase tracking-wide">
          FAQ
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1c1919] border border-white/20 rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full my-3 flex items-center gap-3 text-left focus:outline-none"
              >
                <div className="ml-5 shrink-0 text-[#F7941D] flex items-center justify-center w-6 h-6">
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  )}
                </div>
                <span className="text-white/90 text-[22px] md:text-[21px] font-[family-name:var(--font-opensans)] flex-1">
                  {faq.question}
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? 'max-h-[500px] opacity-100 pb-5'
                    : 'max-h-0 opacity-0 pb-0'
                }`}
              >
                <p className="text-white/60 text-[15px] md:text-[17px] leading-relaxed pl-11">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
