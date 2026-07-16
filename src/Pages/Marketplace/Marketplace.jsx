import MainLayout from "../../layouts/MainLayout";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import CategoryGrid from "./CategoryGrid";
import ItemGrid from "./ItemGrid";
import Pagination from "./Pagination";

const Marketplace = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <SearchBar />
        </div>

        <CategoryGrid />

        <div className="grid lg:grid-cols-4 gap-8 mt-10">

          <aside>
            <FilterSidebar />
          </aside>

          <div className="lg:col-span-3">
            <ItemGrid />
            <Pagination />
          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default Marketplace;