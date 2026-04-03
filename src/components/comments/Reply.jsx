import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDateTime, timeAgo } from "../../utils/helpers";
import LikeButton from "../likes/LikeButton";
import { Heart, MoreHorizontal, ThumbsUp } from "lucide-react";
import { CommentInputRow } from "./CommentList";
import { addReply } from "../../features/comments/commentsAPI";

function Reply({ reply, onToggleLike, postId, parentCommentId }) {
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const toggleLike = async () => {
    if (busy) return;
    setBusy(true);
    await onToggleLike(reply.id);
    setBusy(false);
  };

  const handleAddReply = async ({ content }) => {
    await dispatch(addReply({ postId, parentCommentId, content })).unwrap();
    setReplyOpen(false);
  };

  // Helper for avatar – fallback to first letter
  const authorName = reply.author?.name || "User";
  const avatarUrl = reply.author?.avatarUrl;
  const initial = authorName.charAt(0).toUpperCase();

  return (
    <article className="relative pt-2">
      {/* Header: Avatar + Author + Date + Menu */}
      <div className="flex gap-2">
        {/* Avatar */}
        <Link to={`/profile/${reply.author?.id}`} className="shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={authorName}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
              {initial}
            </div>
          )}
        </Link>

        {(reply.likesCount ?? 0) > 0 ? (
          <div className="absolute right-2 bottom-3 flex items-center gap-1 rounded-full border border-[#e7edf8] bg-white px-2 py-0.5 shadow-sm">
            <ThumbsUp size={12} className="text-[#377DFF]" />
            <span className="text-xs text-[#738098]">{reply.likesCount}</span>
          </div>
        ) : null}

        <div className="flex-1">
          {/* Content Area */}
          <div className="flex-1 px-0 py-0">
            {/* Author + Date row */}
            <div className="rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Link
                  to={`/profile/${reply.author?.id}`}
                  className="text-sm font-semibold text-gray-900 hover:underline"
                >
                  {authorName}
                </Link>
              </div>
              <p className="mt-1 text-sm text-gray-700">{reply.content}</p>
            </div>

            {/* Reply content */}
          </div>
          {/* Like button (Facebook style) */}
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <p className="text-xs text-gray-400">{timeAgo(reply.createdAt)}</p>
            <span>●</span>
            <button
              onClick={toggleLike}
              disabled={busy}
              className={`flex items-center gap-1 rounded-full text-xs font-medium transition ${
                reply.likedByMe
                  ? "px-1 text-blue-400 hover:text-blue-300"
                  : "text-gray-500 hover:text-blue-500"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <ThumbsUp
                size={14}
                className={reply.likedByMe ? "fill-current" : ""}
              />
            </button>
            <span>●</span>
            <button
              onClick={() => setReplyOpen((v) => !v)}
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {replyOpen ? (
        <div className="mt-2 ml-10">
          <CommentInputRow
            onSubmit={handleAddReply}
            placeholder="Write a reply..."
            avatarSrc={currentUser?.avatarUrl || "/images/profile.png"}
          />
        </div>
      ) : null}
    </article>
  );
}

export default Reply;
