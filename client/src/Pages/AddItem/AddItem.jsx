import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlinePhotograph, HiX, HiSparkles } from "react-icons/hi";
import MainLayout from "../../layouts/MainLayout";
import { createListing, estimateValue } from "../../services/clothingApi";
import { useAuth } from "../../context/AuthContext";
import { LISTING_CATEGORIES, LISTING_CONDITIONS } from "../../utils/category";

const initialForm = {
  title: "",
  description: "",
  brand: "",
  category: "",
  customCategory: "",
  size: "",
  condition: "",
  location: "",
  city: "",
};

const AddItem = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [estimatedValue, setEstimatedValue] = useState(null);
  const [estimating, setEstimating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      location: prev.location || user?.location || "",
      city: prev.city || user?.city || "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { brand, condition, category, customCategory } = form;
    if (!brand || !condition || !category) {
      setEstimatedValue(null);
      return;
    }

    if (category === "Other" && !customCategory.trim()) {
      setEstimatedValue(null);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setEstimating(true);
        const { data } = await estimateValue({
          brand,
          condition,
          category,
          customCategory: category === "Other" ? customCategory.trim() : "",
        });
        setEstimatedValue(data.estimatedValue);
      } catch {
        setEstimatedValue(null);
      } finally {
        setEstimating(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [form.brand, form.condition, form.category, form.customCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "category" && value !== "Other") {
        next.customCategory = "";
      }
      return next;
    });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const combined = [...images, ...files].slice(0, 5);
    setImages(combined);
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return combined.map((file) => URL.createObjectURL(file));
    });
    e.target.value = "";
  };

  const removeImage = (index) => {
    const nextImages = images.filter((_, i) => i !== index);
    setImages(nextImages);
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required.";
    if (!form.brand.trim()) return "Brand is required.";
    if (!form.category) return "Please select a category.";
    if (form.category === "Other" && !form.customCategory.trim()) {
      return "Please describe your category when selecting Other.";
    }
    if (!form.size.trim()) return "Size is required.";
    if (!form.condition) return "Please select a condition.";
    if (!form.location.trim()) return "Location is required.";
    if (images.length === 0) return "Please upload at least one image.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "customCategory" && form.category !== "Other") return;
        formData.append(key, value);
      });
      images.forEach((file) => formData.append("images", file));

      const { data } = await createListing(formData);

      toast.success("Listing created successfully!");

      if (data?.listing?._id) {
        navigate(`/item/${data.listing._id}`);
      } else {
        navigate("/marketplace");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to create listing. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">List a New Item</h1>
            <p className="text-gray-500 mt-1">
              Add details about the clothing item you want to swap.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Photos</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previews.map((src, index) => (
                  <div
                    key={src}
                    className="relative h-32 rounded-xl overflow-hidden border"
                  >
                    <img
                      src={src}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                    >
                      <HiX />
                    </button>
                  </div>
                ))}

                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-32 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:text-moss-800 transition"
                  >
                    <HiOutlinePhotograph className="text-3xl mb-1" />
                    <span className="text-sm">Add Photo</span>
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageSelect}
              />

              <p className="text-sm text-gray-400 mt-3">
                Upload up to 5 images (JPEG, PNG, WEBP, GIF).
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
              <h2 className="text-xl font-bold">Item Details</h2>

              <div>
                <label className="block mb-2 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Blue Denim Jacket"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                  rows="4"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the item, its fit, and any flaws..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="e.g. Nike, Zara, Levi's"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700 bg-white"
                  >
                    <option value="">Select category</option>
                    {LISTING_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {form.category === "Other" && (
                <div>
                  <label className="block mb-2 font-medium">
                    Describe your category
                  </label>
                  <input
                    type="text"
                    name="customCategory"
                    value={form.customCategory}
                    onChange={handleChange}
                    placeholder="e.g. Winter coat, Sports bra, Sunglasses"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    We use this to estimate swap points for your item.
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    placeholder="e.g. M, L, 32, 8 UK"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Condition</label>
                  <select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700 bg-white"
                  >
                    <option value="">Select condition</option>
                    {LISTING_CONDITIONS.map((cond) => (
                      <option key={cond} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Mohali, Punjab"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Mohali"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moss-700"
                  />
                </div>
              </div>
            </div>

            <div className="bg-moss-50 border border-moss-800/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <HiSparkles className="text-moss-800 text-xl" />
                <h2 className="text-xl font-bold text-moss-800">
                  Estimated Swap Value
                </h2>
              </div>

              {estimating ? (
                <p className="text-gray-500">Calculating...</p>
              ) : estimatedValue !== null ? (
                <p className="text-4xl font-bold text-moss-800">
                  {estimatedValue}{" "}
                  <span className="text-lg font-medium">points</span>
                </p>
              ) : (
                <p className="text-gray-500">
                  {form.category === "Other" && !form.customCategory.trim()
                    ? "Enter your custom category, brand, and condition to see points."
                    : "Fill in brand, category, and condition to see an estimated value."}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-premium btn-premium-primary flex-1 py-3 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Publishing..." : "Publish Listing"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/marketplace")}
                className="btn-premium btn-premium-secondary px-6 py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default AddItem;
