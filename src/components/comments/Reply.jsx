import { useState } from "react";
import { formatDateTime } from "../../utils/helpers";
import LikeButton from "../likes/LikeButton";

function Reply({ reply, onToggleLike }) {
  const [busy, setBusy] = useState(false);

  const toggleLike = async () => {
    if (busy) return;
    setBusy(true);
    await onToggleLike(reply.id);
    setBusy(false);
  };

  return (
    <article className="rounded-lg bg-[#f8faff] p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[#112032]">
          {reply.author?.name || "User"}
        </p>
        <p className="text-[11px] text-[#8a95a7]">
          {formatDateTime(reply.createdAt)}
        </p>
      </div>
      <p className="mb-2 text-sm text-[#3b4658]">{reply.content}</p>
      <LikeButton
        liked={reply.likedByMe}
        count={reply.likesCount}
        onToggle={toggleLike}
      />
    </article>
  );
}

export default Reply;
