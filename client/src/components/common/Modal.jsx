const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
      <div className="premium-surface w-[92%] max-w-lg rounded-[1.75rem] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-xl font-medium text-ink">{title}</h2>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-moss-800/10 text-xl text-ink/70 transition hover:bg-white"
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
