import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import ImageGallery from "./sections/ImageGallery";
import ItemInformation from "./sections/ItemInformation";
import OwnerInformation from "./sections/OwnerInformation";
import SwapValueCard from "./sections/SwapValueCard";
import SwapAction from "./sections/SwapAction";
import SimilarItems from "./sections/SimilarItems";
import { getListingById } from "../../services/clothingApi";

const ItemDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await getListingById(id);
        setListing(data.listing);
        setSimilar(data.similar || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <section className="flex min-h-[60vh] items-center justify-center">
          <Loader />
        </section>
      </MainLayout>
    );
  }

  if (error || !listing) {
    return (
      <MainLayout>
        <section className="page-shell py-12 sm:py-16">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
            {error || "Item not found."}
          </div>
          <Link
            to="/marketplace"
            className="mt-6 inline-block font-semibold text-moss-800 hover:underline"
          >
            Back to Marketplace
          </Link>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="page-shell py-8 sm:py-10">
        <div className="mb-6 text-sm text-ink/50 sm:mb-8">
          <Link to="/" className="hover:text-moss-800">
            Home
          </Link>
          {" / "}
          <Link to="/marketplace" className="hover:text-moss-800">
            Marketplace
          </Link>
          {" / "}
          <span className="break-words text-ink/80">{listing.title}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <ImageGallery listing={listing} />

          <div className="space-y-5 sm:space-y-6">
            <ItemInformation listing={listing} />
            <SwapValueCard listing={listing} />
            <SwapAction listing={listing} />
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <OwnerInformation owner={listing.owner} />
        </div>

        <div className="mt-10 sm:mt-14">
          <SimilarItems items={similar} />
        </div>
      </section>
    </MainLayout>
  );
};

export default ItemDetails;
