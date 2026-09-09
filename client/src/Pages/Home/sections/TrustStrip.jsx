const items = [
  {
    title: "Local swaps",
    copy: "Exchange with people in your city",
  },
  {
    title: "Fair value",
    copy: "Match items by points, not price",
  },
  {
    title: "Sustainable",
    copy: "Keep clothes out of landfill",
  },
  {
    title: "Secure chat",
    copy: "Negotiate swaps in-app",
  },
];

const TrustStrip = () => {
  return (
    <section className="store-trust-strip">
      <div className="page-shell">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 sm:gap-x-4 md:grid-cols-4 md:gap-0">
          {items.map((item) => (
            <div key={item.title} className="store-trust-item">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
