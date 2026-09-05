import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/api";
import { getDisplayCategory } from "../../utils/category";

const ItemCard = ({ item }) => {
  const id = item._id || item.id;
  const image = getImageUrl(item.images?.[0] || item.image);
  const value = item.estimatedValue ?? item.value ?? 0;
  const available = item.status ? item.status === "available" : true;

  return (
    <article className="store-card group">
      <Link to={`/item/${id}`} className="relative block overflow-hidden bg-moss-50">
        <img
          src={image}
          alt={item.title}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {!available && (
          <span className="absolute left-3 top-3 bg-moss-900 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Sold out
          </span>
        )}
      </Link>

      <div className="p-3 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45 sm:text-[11px]">
          {item.brand || "Fashion Swap"}
        </p>
        <Link to={`/item/${id}`}>
          <h3 className="mt-1 line-clamp-2 font-display text-xs font-bold leading-snug text-ink hover:text-moss-800 sm:text-sm md:text-base">
            {item.title}
          </h3>
        </Link>
        <p className="mt-1.5 text-xs font-bold text-moss-800 sm:mt-2 sm:text-sm">
          {value} swap pts
        </p>
        <p className="mt-1 line-clamp-1 text-[11px] text-ink/45 sm:text-xs">
          {getDisplayCategory(item)} · {item.size} · {item.condition}
        </p>
      </div>
    </article>
  );
};

export default ItemCard;
