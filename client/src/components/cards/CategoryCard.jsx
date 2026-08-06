const CategoryCard = ({ title, image, onClick, active = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative aspect-[3/4] w-full overflow-hidden text-left transition ${
        active ? "outline outline-2 outline-offset-2 outline-moss-700" : ""
      }`}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-moss-950/78 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 font-display text-lg text-white">
        {title}
      </span>
    </button>
  );
};

export default CategoryCard;
