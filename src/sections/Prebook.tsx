import prebookImage from '@/assets/images/Preebook image.png';
import Image from 'next/image';
import Button from '@/components/Buttton';

export default function PreBook() {
  return (
    <section className="bg-black py-16 md:py-12">
      <div className="container mx-auto px-6 md:px-16">
        <div className="relative flex flex-col md:flex-row items-center rounded-3xl bg-[#212A2C] overflow-hidden">
          {/* Badge */}
          {/* <div className="shrink-0 z-10 pt-8 md:pt-0 pl-0 md:pl-14">
            <div
              className="flex items-center gap-3 rounded-[18px] px-5 py-3"
              style={{
                background: 'linear-gradient(90deg, #F7941D 0%, #BE1E2D 100%)',
                boxShadow: '0 8px 32px 0 rgba(190, 30, 45, 0.16)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 11L12 14L22 4"
                  stroke="#FFF0DE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                  stroke="#FFF0DE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-[#FFF0DE] text-base md:text-lg font-bold tracking-wide whitespace-nowrap">
                PRE-BOOK TODAY!
              </h3>
            </div>
          </div> */}

          <div className="shrink-0 z-10 pt-8 md:pt-0 pl-0 md:pl-14">
            <Button
              variant="gradient"
              label="BROWSE OUR PRODUCTS"
              href="/pet-shop"
            />
          </div>

          {/* Heading */}
          <p className="flex-1 text-white text-[25px] md:text-[32px] font-normal leading-normal text-center md:text-left font-[Gabarito] px-6 md:px-10 py-4 md:py-8">
            Be the first to experience the future of pet care!
          </p>

          {/* Right Image - sticks to the end */}
          <div className="shrink-0 self-end">
            <Image
              src={prebookImage}
              alt="PetGo app preview"
              width={420}
              height={280}
              className="w-[250px] md:w-[350px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
