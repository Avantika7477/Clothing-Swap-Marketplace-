import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import MarketplaceHeader from "./MarketplaceHeader";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import CategoryGrid from "./CategoryGrid";
import ItemGrid from "./ItemGrid";
import Pagination from "./Pagination";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import { getListings, getNearbyListings } from "../../services/clothingApi";

const Marketplace = () => {
  const routeLocation = useLocation();
  const { isAuthenticated, user } = useAuth();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [nearbyLabel, setNearbyLabel] = useState("");

  const canUseNearby =
    isAuthenticated && Boolean(user?.location || user?.city);

  const [selectedCategory, setSelectedCategory] = useState(
    routeLocation.state?.category || "All"
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
    setNearbyOnly(false);
    setSearch("");
    setPage(1);
  };

  const applyClientFilters = (items) => {
    let next = [...items];

    if (selectedCategory !== "All") {
      next = next.filter((item) => item.category === selectedCategory);
    }
    if (selectedSize !== "All") {
      next = next.filter((item) => item.size === selectedSize);
    }
    if (selectedCondition !== "All") {
      next = next.filter((item) => item.condition === selectedCondition);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      next = next.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.brand?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q)
      );
    }
    if (selectedAvailability === "Available") {
      next = next.filter((item) => item.status === "available");
    } else if (selectedAvailability === "Unavailable") {
      next = next.filter((item) => item.status !== "available");
    }

    return next;
  };

  const loadListings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (nearbyOnly && canUseNearby) {
        const { data } = await getNearbyListings({
          location: user.location || user.city,
        });
        const filtered = applyClientFilters(data.listings || []);
        setListings(filtered);
        setNearbyLabel(data.location || user.location || user.city);
        setTotalPages(1);
      } else {
        const params = {
          page,
          limit: 12,
          search: search || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          size: selectedSize !== "All" ? selectedSize : undefined,
          condition:
            selectedCondition !== "All" ? selectedCondition : undefined,
          location: selectedLocation !== "All" ? selectedLocation : undefined,
        };

        const { data } = await getListings(params);
        let nextListings = data.listings || [];

        if (selectedAvailability === "Available") {
          nextListings = nextListings.filter(
            (item) => item.status === "available"
          );
        } else if (selectedAvailability === "Unavailable") {
          nextListings = nextListings.filter(
            (item) => item.status !== "available"
          );
        }

        setListings(nextListings);
        setNearbyLabel("");
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load listings.");
      setListings([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    search,
    selectedCategory,
    selectedSize,
    selectedCondition,
    selectedLocation,
    selectedAvailability,
    nearbyOnly,
    canUseNearby,
    user?.location,
    user?.city,
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
    nearbyOnly,
  ]);

  useEffect(() => {
    if (!canUseNearby && nearbyOnly) {
      setNearbyOnly(false);
    }
  }, [canUseNearby, nearbyOnly]);

  return (
    <MainLayout>
      <MarketplaceHeader />

      <div className="page-shell py-8 sm:py-10">
        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {nearbyOnly && nearbyLabel && (
          <div className="mb-6 border border-moss-800/10 bg-moss-50 px-4 py-3 text-sm text-moss-800">
            Showing nearby swap opportunities around{" "}
            <span className="font-semibold">{nearbyLabel}</span>.
            {!isAuthenticated && (
              <Link to="/login" className="ml-2 font-semibold underline">
                Login
              </Link>
            )}
          </div>
        )}

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
              nearbyOnly={nearbyOnly}
              setNearbyOnly={setNearbyOnly}
              nearbyDisabled={!canUseNearby}
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
                {!nearbyOnly && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
