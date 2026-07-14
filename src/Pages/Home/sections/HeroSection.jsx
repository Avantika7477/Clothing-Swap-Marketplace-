import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-green-50">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            Sustainable Fashion
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
            Exchange Clothes,
            <br />
            Not the Planet 🌍
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Discover clothing from people near you, swap instead of shop, and
            reduce textile waste while refreshing your wardrobe.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/marketplace"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Browse Marketplace
            </Link>

            <Link
              to="/register"
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              Join Community
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-96 rounded-3xl bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Hero Image (Coming Soon)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
