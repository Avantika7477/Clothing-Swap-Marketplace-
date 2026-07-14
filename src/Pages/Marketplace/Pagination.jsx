import Button from "../../components/common/Button";

const Pagination = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
      {/* Previous Button */}
      <Button variant="secondary">← Previous</Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        <button className="h-10 w-10 rounded-lg bg-green-600 text-white">
          1
        </button>

        <button className="h-10 w-10 rounded-lg border border-gray-300 hover:bg-gray-100">
          2
        </button>

        <button className="h-10 w-10 rounded-lg border border-gray-300 hover:bg-gray-100">
          3
        </button>

        <button className="h-10 w-10 rounded-lg border border-gray-300 hover:bg-gray-100">
          4
        </button>
      </div>

      {/* Next Button */}
      <Button variant="secondary">Next →</Button>
    </div>
  );
};

export default Pagination;
