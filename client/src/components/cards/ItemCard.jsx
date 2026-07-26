import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/api";

const ItemCard = ({ item }) => {
  const id = item._id || item.id;
  const image = getImageUrl(item.images?.[0] || item.image);
  const value = item.estimatedValue ?? item.value ?? 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-moss-800/10 bg-white/80 transition hover:border-moss-800/25">
      <Link to={`/item/${id}`} className="block overflow-hidden">
        <img
          src={image}
          alt={item.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-medium text-ink">{item.title}</h3>
            <p className="mt-1 text-sm text-ink/55">{item.brand}</p>
          </div>
          <p className="shrink-0 text-sm font-semibold text-moss-800">{value} pts</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/60">
          <span>{item.size}</span>
          <span>{item.condition}</span>
          <span>{item.location}</span>
        </div>

        <Link
          to={`/item/${id}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-moss-800 py-3 text-sm font-semibold text-white transition hover:bg-moss-700"
        >
          View details
        </Link>
      </div>
    </article>
  );
};

export default ItemCard;
