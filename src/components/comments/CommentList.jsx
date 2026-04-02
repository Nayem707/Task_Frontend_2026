import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addComment,
  fetchCommentsByPost,
} from "../../features/comments/commentsAPI";
import Button from "../common/Button";
import Input from "../common/Input";
import Comment from "./Comment";

function CommentList({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) => state.comments.byPostId[postId] || [],
  );
  const loading = useSelector(
    (state) => state.comments.loadingByPostId[postId],
  );
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });

  useEffect(() => {
    dispatch(fetchCommentsByPost(postId));
  }, [dispatch, postId]);

  const onSubmit = async ({ content }) => {
    if (!content.trim()) return;
    await dispatch(addComment({ postId, content })).unwrap();
    reset();
  };

  return (
    <section className="mt-4 space-y-3">
      <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="h-10"
          placeholder="Write a comment"
          {...register("content", { required: true })}
        />
        <Button type="submit" className="h-10 px-3">
          Post
        </Button>
      </form>

      {loading ? (
        <p className="text-xs text-[#7f8aa0]">Loading comments...</p>
      ) : null}

      <div className="space-y-2">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} postId={postId} />
        ))}
      </div>
    </section>
  );
}

export default CommentList;
