import { FiMapPin } from "react-icons/fi";
import Button from "../common/Button";

const ItemCard = ({
  image,
  title,
  brand,
  size,
  condition,
  location,
  swapValue,
  onSwap,
}) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}

      <div className="h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}

      <div className="p-5">
        {/* Title */}

        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

        {/* Brand */}

        <p className="mt-1 text-sm text-gray-500">Brand: {brand}</p>

        {/* Size */}

        <p className="mt-2">
          <span className="font-medium">Size:</span> {size}
        </p>

        {/* Condition */}

        <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {condition}
        </span>

        {/* Swap Value */}

        <p className="mt-4 text-green-700 font-semibold">
          Swap Value : {swapValue} Points
        </p>

        {/* Location */}

        <div className="mt-3 flex items-center gap-2 text-gray-500">
          <FiMapPin />

          <span>{location}</span>
        </div>

        {/* Button */}

        <div className="mt-5">
          <Button fullWidth onClick={onSwap}>
            Request Swap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
