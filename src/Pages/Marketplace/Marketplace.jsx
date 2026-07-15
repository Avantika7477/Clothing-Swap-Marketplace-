import MainLayout from "../../layouts/MainLayout";

import MarketplaceHeader from "./MarketplaceHeader";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import CategoryGrid from "./CategoryGrid";
import ItemGrid from "./ItemGrid";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

const Marketplace = () => {
  return (
    <MainLayout>
      <MarketplaceHeader />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <SearchBar />

        <CategoryGrid />

        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          <FilterSidebar />

          <div className="lg:col-span-3">
            <ItemGrid />

            <Pagination />
          </div>
        </div>

        <EmptyState />
      </section>
    </MainLayout>
  );
};

export default Marketplace;
