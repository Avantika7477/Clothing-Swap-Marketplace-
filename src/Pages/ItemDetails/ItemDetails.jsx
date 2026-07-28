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
        <section className="min-h-screen flex items-center justify-center">
          <Loader />
        </section>
      </MainLayout>
    );
  }

  if (error || !listing) {
    return (
      <MainLayout>
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
            {error || "Item not found."}
          </div>
          <Link to="/marketplace" className="inline-block mt-6 text-moss-800 hover:underline">
            Back to Marketplace
          </Link>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-moss-800">
            Home
          </Link>
          {" / "}
          <Link to="/marketplace" className="hover:text-moss-800">
            Marketplace
          </Link>
          {" / "}
          <span className="text-gray-800">{listing.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <ImageGallery listing={listing} />

          <div className="space-y-6">
            <ItemInformation listing={listing} />
            <SwapValueCard listing={listing} />
            <SwapAction listing={listing} />
          </div>
        </div>

        <div className="mt-16">
          <OwnerInformation owner={listing.owner} />
        </div>

        <div className="mt-16">
          <SimilarItems items={similar} />
        </div>
      </section>
    </MainLayout>
  );
};

export default ItemDetails;
