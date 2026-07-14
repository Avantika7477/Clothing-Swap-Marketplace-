import MainLayout from "../../layouts/MainLayout";
import Hero from "../../components/layout/Hero";

import SearchBar from "./SearchBar";
import CategoryGrid from "./CategoryGrid";
import FilterSidebar from "./FilterSidebar";
import ItemGrid from "./ItemGrid";
import Pagination from "./Pagination";

const Marketplace = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <SearchBar />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <CategoryGrid />
      </section>

      {/* Marketplace */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters */}
          <aside>
            <FilterSidebar />
          </aside>

          {/* Items */}
          <main className="lg:col-span-3">
            <ItemGrid />

            <Pagination />
          </main>
        </div>
      </section>
    </MainLayout>
  );
};

export default Marketplace;
