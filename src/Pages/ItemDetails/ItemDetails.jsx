import MainLayout from "../../layouts/MainLayout";

import ImageGallery from "./sections/ImageGallery";
import ItemInformation from "./sections/ItemInformation";
import OwnerInformation from "./sections/OwnerInformation";
import SwapValueCard from "./sections/SwapValueCard";
import SwapAction from "./sections/SwapAction";
import SimilarItems from "./sections/SimilarItems";

const ItemDetails = () => {
  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500">
          Home / Marketplace / Item Details
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <ImageGallery />

          {/* Right */}
          <div className="space-y-6">
            <ItemInformation />
            <SwapValueCard />
            <SwapAction />
          </div>
        </div>

        {/* Owner */}
        <div className="mt-16">
          <OwnerInformation />
        </div>

        {/* Similar Items */}
        <div className="mt-16">
          <SimilarItems />
        </div>
      </section>
    </MainLayout>
  );
};

export default ItemDetails;
