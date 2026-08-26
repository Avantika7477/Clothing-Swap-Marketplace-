const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-moss-950/40 p-4 backdrop-blur-sm">
      <div className="clay w-[92%] max-w-lg p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="min-w-0 truncate font-display text-xl font-bold text-ink">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="clay-sm flex h-10 w-10 shrink-0 items-center justify-center text-xl text-ink/70 transition hover:-translate-y-0.5"
          >
            ×
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
