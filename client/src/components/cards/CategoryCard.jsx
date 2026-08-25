const CategoryCard = ({ title, image, onClick, active = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`clay group relative aspect-[3/4] w-full overflow-hidden text-left transition duration-300 hover:-translate-y-1 ${
        active ? "ring-2 ring-moss-600 ring-offset-2 ring-offset-linen" : ""
      }`}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-moss-950/70 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 font-display text-lg font-bold text-white drop-shadow-sm">
        {title}
      </span>
    </button>
  );
};

export default CategoryCard;
