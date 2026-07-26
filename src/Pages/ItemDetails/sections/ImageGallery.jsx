import { useState } from "react";
import { getImageUrl } from "../../../services/api";

const ImageGallery = ({ listing }) => {
  const images =
    listing?.images?.length > 0
      ? listing.images
      : [listing?.image].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = getImageUrl(images[activeIndex] || images[0]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={activeImage}
          alt={listing?.title}
          className="w-full h-[500px] object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-xl overflow-hidden border ${
                activeIndex === index
                  ? "border-green-500 ring-2 ring-moss-100"
                  : "hover:border-green-500"
              }`}
            >
              <img
                src={getImageUrl(img)}
                alt={`${listing?.title} ${index + 1}`}
                className="w-full h-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
