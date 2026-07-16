import clothingData from "../../../assets/data/clothingData";

const ImageGallery = () => {
  const item = clothingData[0];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((img) => (
          <div
            key={img}
            className="rounded-xl overflow-hidden border hover:border-green-500 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-24 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
