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
      <div className="clay clay-media overflow-hidden bg-moss-50">
        <img
          src={activeImage}
          alt={listing?.title}
          className="h-72 w-full object-cover sm:h-96 md:h-[500px]"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.slice(0, 4).map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-xl border-2 ${
                activeIndex === index
                  ? "border-moss-700"
                  : "border-transparent hover:border-moss-600/40"
              }`}
            >
              <img
                src={getImageUrl(img)}
                alt={`${listing?.title} ${index + 1}`}
                className="h-16 w-full object-cover sm:h-24"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
