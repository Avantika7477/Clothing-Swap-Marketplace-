import { Link } from "react-router-dom";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 via-white to-green-100">
      <div className="container mx-auto flex flex-col items-center px-6 py-20 text-center lg:flex-row lg:justify-between lg:text-left">
        {/* Left Content */}
        <div className="max-w-xl">
          <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            🌿 Sustainable Fashion Marketplace
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-800">
            Exchange Clothes,
            <br />
            <span className="text-green-600">Not the Planet.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Give your unused clothes a second life. Browse thousands of
            listings, swap with nearby people, and help reduce textile waste
            while refreshing your wardrobe.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/marketplace">
              <Button size="lg">Explore Marketplace</Button>
            </Link>

            <Link to="/add-item">
              <Button variant="secondary" size="lg">
                List an Item
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}

        <div className="mt-12 lg:mt-0">
          <img
            src="/images/hero-clothes.png"
            alt="Clothing Exchange"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
