import MainLayout from "../../layouts/MainLayout";

import HeroSection from "./sections/HeroSection";
import TrustStrip from "./sections/TrustStrip";
import CategoriesSection from "./sections/CategoriesSection";
import FeaturedItemsSection from "./sections/FeaturedItemsSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import CTASection from "./sections/CTASection";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <TrustStrip />
      <CategoriesSection />
      <FeaturedItemsSection />
      <HowItWorksSection />
      <CTASection />
    </MainLayout>
  );
};

export default Home;
