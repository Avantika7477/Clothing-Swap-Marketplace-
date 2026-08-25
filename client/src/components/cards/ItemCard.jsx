import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/api";

const ItemCard = ({ item }) => {
  const id = item._id || item.id;
  const image = getImageUrl(item.images?.[0] || item.image);
  const value = item.estimatedValue ?? item.value ?? 0;

  return (
    <article className="clay group overflow-hidden transition duration-300 hover:-translate-y-1">
      <Link to={`/item/${id}`} className="block overflow-hidden rounded-t-[1.55rem]">
        <img
          src={image}
          alt={item.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-[1.2rem] font-bold text-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-ink/50">{item.brand}</p>
          </div>
          <p className="shrink-0 rounded-2xl bg-moss-50 px-2.5 py-1 text-sm font-bold text-moss-800 shadow-[inset_2px_2px_6px_rgba(163,177,198,0.25)]">
            {value} pts
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.8rem] text-ink/55">
          <span>{item.size}</span>
          <span className="text-moss-800/25">·</span>
          <span>{item.condition}</span>
          <span className="text-moss-800/25">·</span>
          <span>{item.location}</span>
        </div>

        <Link
          to={`/item/${id}`}
          className="btn-premium btn-premium-primary mt-5 inline-flex w-full py-2.5 text-sm"
        >
          View details
        </Link>
      </div>
    </article>
  );
};

export default ItemCard;
