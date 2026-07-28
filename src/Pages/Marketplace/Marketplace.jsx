import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import CategoryGrid from "./CategoryGrid";
import ItemGrid from "./ItemGrid";
import Pagination from "./Pagination";
import Loader from "../../components/common/Loader";
import { getListings } from "../../services/clothingApi";

const Marketplace = () => {
  const location = useLocation();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || "All"
  );
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSize("All");
    setSelectedCondition("All");
    setSelectedLocation("All");
    setSelectedAvailability("All");
    setSearch("");
    setPage(1);
  };

  const loadListings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit: 12,
        search: search || undefined,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        size: selectedSize !== "All" ? selectedSize : undefined,
        condition: selectedCondition !== "All" ? selectedCondition : undefined,
        location: selectedLocation !== "All" ? selectedLocation : undefined,
      };

      const { data } = await getListings(params);
      let nextListings = data.listings || [];

      if (selectedAvailability === "Available") {
        nextListings = nextListings.filter((item) => item.status === "available");
      } else if (selectedAvailability === "Unavailable") {
        nextListings = nextListings.filter((item) => item.status !== "available");
      }

      setListings(nextListings);
      setTotalPages(data.pagination?.pages || 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load listings.");
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    search,
    selectedCategory,
    selectedSize,
    selectedCondition,
    selectedLocation,
    selectedAvailability,
  ]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    selectedCategory,
    selectedSize,
    selectedCondition,
    selectedLocation,
    selectedAvailability,
  ]);

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 max-w-2xl">
          <h1 className="font-display text-4xl font-medium text-ink">Marketplace</h1>
          <p className="mt-2 text-ink/60">
            Browse wearable clothes and send swap requests that feel fair.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setPage(1);
          }}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-4">
          <aside>
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedCondition={selectedCondition}
              setSelectedCondition={setSelectedCondition}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedAvailability={selectedAvailability}
              setSelectedAvailability={setSelectedAvailability}
              resetFilters={resetFilters}
            />
          </aside>

          <div className="lg:col-span-3">
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                {error}
              </div>
            ) : (
              <>
                <ItemGrid listings={listings} />
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
