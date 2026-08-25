const Pagination = ({ page = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        className="btn-premium btn-premium-secondary px-4 py-2 text-sm disabled:opacity-40"
      >
        Previous
      </button>

      <span className="clay-inset px-4 py-2 text-sm text-ink/60">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange?.(page + 1)}
        className="btn-premium btn-premium-secondary px-4 py-2 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
