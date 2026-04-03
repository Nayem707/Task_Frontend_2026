import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addReply,
  deleteComment,
  fetchCommentReplies,
  fetchCommentsByPost,
  toggleCommentLike,
  updateComment,
} from "./commentsAPI";

const initialState = {
  byPostId: {},
  loadingByPostId: {},
  submitting: false,
  error: null,
};

const updateNestedLike = (comments, commentId, liked) =>
  comments.map((comment) => {
    if (comment.id === commentId) {
      const delta = liked ? 1 : -1;
      return {
        ...comment,
        likedByMe: liked,
        likesCount: Math.max(0, (comment.likesCount || 0) + delta),
        _count: comment._count
          ? {
              ...comment._count,
              likes: Math.max(0, (comment._count.likes || 0) + delta),
            }
          : comment._count,
      };
    }
    if (comment.replies?.length) {
      return {
        ...comment,
        replies: updateNestedLike(comment.replies, commentId, liked),
      };
    }
    return comment;
  });

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCommentsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPost.pending, (state, action) => {
        state.loadingByPostId[action.meta.arg] = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.loadingByPostId[action.payload.postId] = false;
        state.byPostId[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        const postId = action.meta.arg;
        state.loadingByPostId[postId] = false;
        state.error = action.payload || "Unable to load comments.";
      })
      .addCase(addComment.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.submitting = false;
        const { postId, comment } = action.payload;
        if (!state.byPostId[postId]) state.byPostId[postId] = [];
        state.byPostId[postId].push(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || "Unable to add comment.";
      })
      .addCase(addReply.fulfilled, (state, action) => {
        const { postId, parentCommentId, reply } = action.payload;
        const list = state.byPostId[postId] || [];
        state.byPostId[postId] = list.map((comment) => {
          if (comment.id !== parentCommentId) return comment;
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        });
      })
      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        const { postId, commentId, liked } = action.payload;
        const list = state.byPostId[postId] || [];
        state.byPostId[postId] = updateNestedLike(list, commentId, liked);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        if (!state.byPostId[postId]) return;
        state.byPostId[postId] = state.byPostId[postId].filter(
          (c) => c.id !== commentId
        );
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const { postId, commentId, comment } = action.payload;
        if (!state.byPostId[postId]) return;
        state.byPostId[postId] = state.byPostId[postId].map((c) =>
          c.id === commentId ? { ...c, ...comment } : c
        );
      })
      .addCase(fetchCommentReplies.fulfilled, (state, action) => {
        const { postId, commentId, replies } = action.payload;
        if (!state.byPostId[postId]) return;
        state.byPostId[postId] = state.byPostId[postId].map((c) =>
          c.id === commentId ? { ...c, replies } : c
        );
      });
  },
});

export const { clearCommentsError } = commentsSlice.actions;
export default commentsSlice.reducer;
