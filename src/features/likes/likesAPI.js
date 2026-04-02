import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET } from "../../services/httpMethods";
import { ENDPOINT } from "../../services/httpEndpoint";
import { apiExecutor } from "../../services/apiExecutor";

// ✅ Fetch the list of users who liked a post or comment
export const fetchLikesList = createAsyncThunk(
  "likes/fetchLikesList",
  async ({ entityType, entityId }, { rejectWithValue, signal }) => {
    const endpoint =
      entityType === "post"
        ? ENDPOINT.LIKES.LIST_POST(entityId)
        : entityType === "comment"
          ? ENDPOINT.LIKES.LIST_COMMENT(entityId)
          : null;

    if (!endpoint) return rejectWithValue("Invalid entity type");

    return apiExecutor(
      async () => {
        const response = await GET(endpoint, undefined, signal);
        return {
          key: `${entityType}:${entityId}`,
          users: response.data.data || [],
        };
      },
      rejectWithValue,
      signal,
    );
  },
);

// ✅ Fetch like count statistics for a post
export const fetchPostLikeStats = createAsyncThunk(
  "likes/fetchPostLikeStats",
  async (postId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.LIKES.POST_STATS(postId),
          undefined,
          signal,
        );
        return { postId, stats: response.data.data };
      },
      rejectWithValue,
      signal,
    ),
);

// ✅ Fetch like count statistics for a comment
export const fetchCommentLikeStats = createAsyncThunk(
  "likes/fetchCommentLikeStats",
  async (commentId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.LIKES.COMMENT_STATS(commentId),
          undefined,
          signal,
        );
        return { commentId, stats: response.data.data };
      },
      rejectWithValue,
      signal,
    ),
);
