import { HiCheckCircle, HiClock, HiXCircle } from "react-icons/hi";

const RecentSwaps = () => {
  const swaps = [
    {
      id: 1,
      user: "Rahul Sharma",
      item: "Nike Hoodie",
      status: "Accepted",
    },
    {
      id: 2,
      user: "Priya Singh",
      item: "Denim Jacket",
      status: "Pending",
    },
    {
      id: 3,
      user: "Aman Verma",
      item: "Summer Dress",
      status: "Declined",
    },
  ];

  const getStatus = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <HiCheckCircle />
            Accepted
          </span>
        );

      case "Pending":
        return (
          <span className="flex items-center gap-1 text-yellow-500 font-medium">
            <HiClock />
            Pending
          </span>
        );

      case "Declined":
        return (
          <span className="flex items-center gap-1 text-red-500 font-medium">
            <HiXCircle />
            Declined
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Swap Requests</h2>

        <button className="text-green-600 hover:underline font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {swaps.map((swap) => (
          <div
            key={swap.id}
            className="flex flex-col md:flex-row justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="font-semibold text-lg">{swap.user}</h3>

              <p className="text-gray-500">Requested: {swap.item}</p>
            </div>

            <div className="mt-3 md:mt-0">{getStatus(swap.status)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSwaps;
