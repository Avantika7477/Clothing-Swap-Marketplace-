const CategoryCard = ({ title, image, items, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <p className="mt-1 text-sm text-gray-500">{items} Items</p>
      </div>
    </div>
  );
};

export default CategoryCard;
