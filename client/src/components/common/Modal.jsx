const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-moss-950/40 p-4 backdrop-blur-sm">
      <div className="clay w-[92%] max-w-lg p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ink">{title}</h2>

          <button
            onClick={onClose}
            className="clay-sm flex h-10 w-10 items-center justify-center text-xl text-ink/70 transition hover:-translate-y-0.5"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
