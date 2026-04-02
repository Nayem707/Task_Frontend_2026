import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addReply,
  toggleCommentLike,
} from "../../features/comments/commentsAPI";
import { formatDateTime } from "../../utils/helpers";
import Button from "../common/Button";
import Input from "../common/Input";
import LikeButton from "../likes/LikeButton";
import Reply from "./Reply";

function Comment({ postId, comment }) {
  const dispatch = useDispatch();
  const [replyOpen, setReplyOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });

  const onSubmit = async ({ content }) => {
    if (!content.trim()) return;
    await dispatch(
      addReply({ postId, parentCommentId: comment.id, content }),
    ).unwrap();
    reset();
    setReplyOpen(false);
  };

  const handleToggleLike = async () => {
    await dispatch(toggleCommentLike({ postId, commentId: comment.id }));
  };

  return (
    <article className="rounded-xl border border-[#edf1f7] p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[#112032]">
          {comment.author?.name || "User"}
        </p>
        <p className="text-xs text-[#8a95a7]">
          {formatDateTime(comment.createdAt)}
        </p>
      </div>
      <p className="mb-2 text-sm text-[#3b4658]">{comment.content}</p>
      <div className="mb-3 flex items-center gap-3">
        <LikeButton
          liked={comment.likedByMe}
          count={comment.likesCount}
          onToggle={handleToggleLike}
        />
        <button
          type="button"
          className="text-xs font-semibold text-[#377DFF]"
          onClick={() => setReplyOpen((state) => !state)}
        >
          Reply
        </button>
      </div>

      {replyOpen ? (
        <form className="mb-3 flex gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="h-10"
            placeholder="Write a reply"
            {...register("content", { required: true })}
          />
          <Button type="submit" className="h-10 px-3">
            Send
          </Button>
        </form>
      ) : null}

      {comment.replies?.length ? (
        <div className="space-y-2 border-l border-[#ebf0f7] pl-3">
          {comment.replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              onToggleLike={(replyId) =>
                dispatch(toggleCommentLike({ postId, commentId: replyId }))
              }
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default Comment;
