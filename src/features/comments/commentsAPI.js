import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT, DELETE } from "../../services/httpMethods";
import { ENDPOINT } from "../../services/httpEndpoint";
import { apiExecutor } from "../../services/apiExecutor";

const normalizeComment = (c) => ({
  ...c,
  author: c.user
    ? {
        id: c.user.id,
        name: [c.user.firstName, c.user.lastName].filter(Boolean).join(" "),
        avatarUrl: c.user.avatarUrl || null,
      }
    : c.author ?? null,
  likedByMe: c.likedByMe ?? false,
  likesCount: c._count?.likes ?? c.likesCount ?? 0,
  replies: (c.replies ?? []).map((r) => ({
    ...r,
    author: r.user
      ? {
          id: r.user.id,
          name: [r.user.firstName, r.user.lastName].filter(Boolean).join(" "),
          avatarUrl: r.user.avatarUrl || null,
        }
      : r.author ?? null,
    likedByMe: r.likedByMe ?? false,
    likesCount: r._count?.likes ?? r.likesCount ?? 0,
  })),
});

// ✅ Fetch comments for a post
export const fetchCommentsByPost = createAsyncThunk(
  "comments/fetchCommentsByPost",
  async (postId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.COMMENTS.LIST(postId),
          undefined,
          signal
        );
        return {
          postId,
          comments: (response.data.data || []).map(normalizeComment),
        };
      },
      rejectWithValue,
      signal
    )
);

// ✅ Add a comment to a post
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, content }, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await POST(
          ENDPOINT.COMMENTS.CREATE(postId),
          { content },
          signal
        );
        return { postId, comment: normalizeComment(response.data.data) };
      },
      rejectWithValue,
      signal
    )
);

// ✅ Update a comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ postId, commentId, content }, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await PUT(
          ENDPOINT.COMMENTS.UPDATE(commentId),
          { content },
          signal
        );
        return { postId, commentId, comment: response.data.data };
      },
      rejectWithValue,
      signal
    )
);

// ✅ Delete a comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId }, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        await DELETE(ENDPOINT.COMMENTS.DELETE(commentId), signal);
        return { postId, commentId };
      },
      rejectWithValue,
      signal
    )
);

// ✅ Fetch replies for a comment
export const fetchCommentReplies = createAsyncThunk(
  "comments/fetchCommentReplies",
  async ({ postId, commentId }, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.COMMENTS.LIST_REPLIES(commentId),
          undefined,
          signal
        );
        return { postId, commentId, replies: response.data.data || [] };
      },
      rejectWithValue,
      signal
    )
);

// ✅ Add a reply to a comment
export const addReply = createAsyncThunk(
  "comments/addReply",
  async ({ postId, parentCommentId, content }, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await POST(
          ENDPOINT.COMMENTS.ADD_REPLY(parentCommentId),
          { content },
          signal
        );
        return { postId, parentCommentId, reply: response.data.data };
      },
      rejectWithValue,
      signal
    )
);

// ✅ Toggle like on a comment
export const toggleCommentLike = createAsyncThunk(
  "comments/toggleCommentLike",
  async ({ postId, commentId }, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await POST(
          ENDPOINT.COMMENTS.TOGGLE_LIKE(commentId),
          undefined,
          signal
        );
        return { postId, commentId, liked: response.data.data.liked };
      },
      rejectWithValue,
      signal
    )
);
