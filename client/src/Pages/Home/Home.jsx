import MainLayout from "../../layouts/MainLayout";

import HeroSection from "./sections/HeroSection";
import CategoriesSection from "./sections/CategoriesSection";
import FeaturedItemsSection from "./sections/FeaturedItemsSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import CTASection from "./sections/CTASection";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <div className="space-y-8 py-8 md:space-y-12 md:py-12">
        <CategoriesSection />
        <FeaturedItemsSection />
        <HowItWorksSection />
        <CTASection />
      </div>
    </MainLayout>
  );
};

export default Home;
