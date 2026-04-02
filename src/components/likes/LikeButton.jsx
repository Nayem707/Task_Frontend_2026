import { useState } from "react";

function LikeButton({ liked, count, onToggle, onShowLikes }) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    await onToggle?.();
    setBusy(false);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={handleClick}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
          liked
            ? "bg-[#e8f0ff] text-[#1d64e7]"
            : "bg-[#f2f5fa] text-[#5d6d86] hover:bg-[#e6edf8]"
        }`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
      <button
        type="button"
        onClick={onShowLikes}
        className="text-xs font-medium text-[#5d6d86] hover:text-[#112032]"
      >
        {count || 0}
      </button>
    </div>
  );
}

export default LikeButton;
