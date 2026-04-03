import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EMPTY_ARRAY = [];
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Mic, Smile } from "lucide-react";
import {
  addComment,
  fetchCommentsByPost,
} from "../../features/comments/commentsAPI";
import Comment from "./Comment";

/* Mic icon */
const MicIcon = () => <Mic size={16} className="text-[#9aa5b8]" />;

/* Sticker / emoji icon */
const StickerIcon = () => <Smile size={16} className="text-[#9aa5b8]" />;

/* Shared comment input row used in CommentList and Comment (for replies) */
export function CommentInputRow({
  onSubmit: submitHandler,
  placeholder = "Write a comment",
  avatarSrc = "/images/profile.png",
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });

  const submit = async (data) => {
    if (!data.content.trim()) return;
    await submitHandler(data);
    reset();
  };

  return (
    <form className="flex items-center gap-2.5" onSubmit={handleSubmit(submit)}>
      <img
        src={avatarSrc}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 items-center gap-2 rounded-full border border-[#e7edf8] bg-[#f5f7fb] px-4 py-2">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-[#112032] outline-none placeholder:text-[#aab4c4]"
          {...register("content", { required: true })}
        />
        <button type="submit" className="sr-only">
          Send
        </button>
        <button
          type="button"
          className="shrink-0 text-[#9aa5b8] hover:text-[#738098]"
        >
          <MicIcon />
        </button>
        <button
          type="button"
          className="shrink-0 text-[#9aa5b8] hover:text-[#738098]"
        >
          <StickerIcon />
        </button>
      </div>
    </form>
  );
}

function CommentList({ postId, totalCount = 0 }) {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const comments = useSelector(
    (state) => state.comments.byPostId[postId] ?? EMPTY_ARRAY
  );

  console.log("comment: ", comments);

  const loading = useSelector(
    (state) => state.comments.loadingByPostId[postId]
  );

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchCommentsByPost(postId));
  }, [dispatch, postId]);

  const handleAddComment = async ({ content }) => {
    await dispatch(addComment({ postId, content })).unwrap();
  };

  const hiddenCount = totalCount > 1 ? totalCount - 1 : comments.length - 1;
  const visibleComments = showAll ? comments : comments.slice(-1);

  return (
    <section className="my-4 space-y-4">
      {/* Write a comment */}
      <CommentInputRow
        onSubmit={handleAddComment}
        avatarSrc={currentUser?.avatarUrl || "/images/profile.png"}
      />

      {loading ? (
        <p className="text-xs text-[#7f8aa0]">Loading comments…</p>
      ) : null}

      {/* View previous comments toggle */}
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="text-sm font-medium text-[#738098] hover:text-[#112032]"
        >
          {showAll ? (
            <>
              Hide previous comments <ChevronUp size={14} className="inline" />
            </>
          ) : (
            <>
              View {hiddenCount} previous comment{hiddenCount !== 1 ? "s" : ""}{" "}
              <ChevronDown size={14} className="inline" />
            </>
          )}
        </button>
      ) : null}

      {/* Comment list */}
      <div className="space-y-4">
        {visibleComments.map((comment) => (
          <Comment key={comment.id} comment={comment} postId={postId} />
        ))}
      </div>
    </section>
  );
}

export default CommentList;
