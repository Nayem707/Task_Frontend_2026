import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT, DELETE } from "../../services/httpMethods";
import { ENDPOINT } from "../../services/httpEndpoint";
import { apiExecutor } from "../../services/apiExecutor";
import { PAGINATION_LIMIT } from "../../utils/constants";

// ✅ Fetch public feed with page-based pagination
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (
    { page = 1, limit = PAGINATION_LIMIT } = {},
    { rejectWithValue, signal },
  ) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.POSTS.LIST,
          { page, limit },
          signal,
        );
        return {
          posts: response.data.data,
          pagination: response.data.pagination,
        };
      },
      rejectWithValue,
      signal,
    ),
);

// ✅ Fetch authenticated user's own feed
export const fetchMyFeed = createAsyncThunk(
  "posts/fetchMyFeed",
  async (
    { page = 1, limit = PAGINATION_LIMIT } = {},
    { rejectWithValue, signal },
  ) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.POSTS.MY_FEED,
          { page, limit },
          signal,
        );
        return {
          posts: response.data.data,
          pagination: response.data.pagination,
        };
      },
      rejectWithValue,
      signal,
    ),
);

// ✅ Fetch posts by a specific user
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (
    { userId, page = 1, limit = PAGINATION_LIMIT },
    { rejectWithValue, signal },
  ) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.POSTS.BY_USER(userId),
          { page, limit },
          signal,
        );
        return {
          posts: response.data.data,
          pagination: response.data.pagination,
        };
      },
      rejectWithValue,
      signal,
    ),
);

// ✅ Fetch a single post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.POSTS.GET(postId),
          undefined,
          signal,
        );
        return response.data.data;
      },
      rejectWithValue,
      signal,
    ),
);

// ✅ Create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    { content, visibility = "PUBLIC", image },
    { rejectWithValue, signal },
  ) =>
    apiExecutor(
      async () => {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("visibility", visibility);
        if (image) formData.append("image", image);
        const response = await POST(ENDPOINT.POSTS.CREATE, formData, signal);
        return response.data.data;
      },
      rejectWithValue,
      signal,
    ),
);

// ✅ Update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (
    { postId, content, visibility, imageUrl },
    { rejectWithValue, signal },
  ) =>
    apiExecutor(
      async () => {
        const response = await PUT(
          ENDPOINT.POSTS.UPDATE(postId),
          { content, visibility, imageUrl },
          signal,
        );
        return response.data.data;
      },
      rejectWithValue,
      signal,
    ),
);

// ✅ Delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        await DELETE(ENDPOINT.POSTS.DELETE(postId), signal);
        return postId;
      },
      rejectWithValue,
      signal,
    ),
);

// ✅ Toggle like on a post
export const togglePostLike = createAsyncThunk(
  "posts/togglePostLike",
  async (postId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await POST(
          ENDPOINT.LIKES.TOGGLE_POST(postId),
          undefined,
          signal,
        );
        return { postId, liked: response.data.data.liked };
      },
      rejectWithValue,
      signal,
    ),
);
