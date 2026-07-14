import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold">Ready to Start Swapping?</h2>

        <p className="mt-4 text-gray-600">
          Join thousands of users building a sustainable fashion community.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700"
        >
          Create Your Account
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
