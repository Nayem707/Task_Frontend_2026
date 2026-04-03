import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addReply,
  toggleCommentLike,
} from "../../features/comments/commentsAPI";
import { timeAgo } from "../../utils/helpers";
import { CommentInputRow } from "./CommentList";
import Reply from "./Reply";
import { ThumbsUp } from "lucide-react";

function Comment({ postId, comment }) {
  const dispatch = useDispatch();
  const [replyOpen, setReplyOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const handleToggleLike = () => {
    dispatch(toggleCommentLike({ postId, commentId: comment.id }));
  };

  const handleAddReply = async ({ content }) => {
    await dispatch(
      addReply({ postId, parentCommentId: comment.id, content })
    ).unwrap();
    setReplyOpen(false);
  };

  return (
    <div className="flex items-start gap-2">
      {/* Avatar */}
      <Link to={`/profile/${comment.author?.id}`}>
        <img
          src={comment.author?.avatarUrl || "/images/comment_img.png"}
          alt={comment.author?.name || "User"}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
          loading="lazy"
        />
      </Link>

      <div className="min-w-0 flex-1">
        {/* Bubble */}
        <div className="relative rounded-xl bg-[#f5f7fb] px-3 py-2.5">
          <Link
            to={`/profile/${comment.author?.id}`}
            className="mb-0.5 text-sm font-semibold text-[#112032] hover:underline"
          >
            {comment.author?.name || "User"}
          </Link>
          <p className="text-sm leading-snug text-[#4c5a71]">
            {comment.content}
          </p>

          {/* Reaction badge — bottom-right corner */}
          {(comment.likesCount ?? 0) > 0 ? (
            <div className="absolute right-2 -bottom-3 flex items-center gap-1 rounded-full border border-[#e7edf8] bg-white px-2 py-0.5 shadow-sm">
              <ThumbsUp size={12} className="text-[#377DFF]" />
              <span className="text-xs text-[#738098]">
                {comment.likesCount}
              </span>
            </div>
          ) : null}
        </div>

        {/* Actions row */}
        <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#738098]">
          {comment.createdAt ? (
            <span className="ml-1 font-normal text-[#9aa5b8]">
              {timeAgo(comment.createdAt)}
            </span>
          ) : null}
          <span>●</span>
          <button
            type="button"
            onClick={handleToggleLike}
            className={`hover:text-[#112032] ${comment.likedByMe ? "text-[#377DFF]" : ""}`}
          >
            {comment.likedByMe ? "Unlike" : "Like"}
          </button>
          <span>●</span>
          <button
            type="button"
            onClick={() => setReplyOpen((v) => !v)}
            className="hover:text-[#112032]"
          >
            {" "}
            Reply
          </button>
        </div>

        {/* Reply input */}
        {replyOpen ? (
          <div className="mt-2">
            <CommentInputRow
              onSubmit={handleAddReply}
              placeholder="Write a comment"
              avatarSrc={currentUser?.avatarUrl || "/images/profile.png"}
            />
          </div>
        ) : null}

        {/* Replies */}
        {comment.replies?.length ? (
          <div className="mt-2 space-y-3 border-l-2 border-[#ebf0f7] pl-4">
            {comment.replies.map((reply) => (
              <Reply
                key={reply.id}
                reply={reply}
                postId={postId}
                parentCommentId={comment.id}
                onToggleLike={(replyId) =>
                  dispatch(toggleCommentLike({ postId, commentId: replyId }))
                }
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Comment;
