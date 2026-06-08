import Hero from '@/sections/Hero';
import InfoSection from '@/sections/InfoSection';
import Service from '@/sections/Service';
import AboutUS from '@/sections/About_Us';
import Adopt from '@/sections/Adopt';
import Prebook from '@/sections/Prebook';
import TopCategories from '@/sections/TopCategories';
import Data from '@/sections/Data'
import Review from '@/sections/Reviews'
import Faq from '@/sections/Faq'
import Campaign from '@/sections/Campaign';
import Pawsletter from '@/sections/Pawsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <InfoSection />
      <Service />
      <AboutUS />
      <Prebook />
      <Adopt />
      <TopCategories />
      <Data />
      <Review />
      <Faq />
      <Campaign />
      <Pawsletter />
    </main>
  );
}
