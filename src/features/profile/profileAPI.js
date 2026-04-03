import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiExecutor } from "../../services/apiExecutor";
import { POST, GET, PATCH } from "../../services/httpMethods";
import { ENDPOINT } from "../../services/httpEndpoint";

const unwrapResponse = (payload) => payload?.data ?? payload;

const normalizeUser = (payload) => {
  const response = unwrapResponse(payload);
  const rawUser = response?.data ?? response ?? {};
  const counts = rawUser?._count ?? {};

  return {
    ...rawUser,
    followers: rawUser.followers ?? counts.followers ?? 0,
    following: rawUser.following ?? counts.following ?? 0,
    postsCount: counts.posts ?? 0,
  };
};

const normalizePost = (post) => ({
  ...post,
  author: post.user
    ? {
        id: post.user.id,
        firstName: post.user.firstName,
        lastName: post.user.lastName,
        avatarUrl: post.user.avatarUrl || null,
      }
    : (post.author ?? null),
});

const normalizeList = (payload) => {
  const response = unwrapResponse(payload);
  const root = response?.data ?? response;

  if (Array.isArray(root)) {
    return { items: root, pagination: response?.pagination ?? null };
  }

  return {
    items: Array.isArray(root?.data) ? root.data : [],
    pagination: response?.pagination ?? {
      total: root?.total ?? 0,
      page: root?.page ?? 1,
      limit: root?.limit ?? 10,
    },
  };
};

// Async Thunks
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId, { rejectWithValue, signal }) => {
    const endpoint = userId ? ENDPOINT.USERS.GET(userId) : ENDPOINT.USERS.ME;
    const payload = await apiExecutor(
      (sig) => GET(endpoint, {}, sig),
      rejectWithValue,
      signal
    );
    return normalizeUser(payload);
  }
);

export const fetchUserPosts = createAsyncThunk(
  "profile/fetchUserPosts",
  async ({ userId, page = 1 }, { rejectWithValue, signal }) => {
    const endpoint = userId
      ? ENDPOINT.POSTS.BY_USER(userId)
      : ENDPOINT.POSTS.MY_WON_POSTS;
    const payload = await apiExecutor(
      (sig) => GET(endpoint, { page, limit: 10 }, sig),
      rejectWithValue,
      signal
    );
    const result = normalizeList(payload);
    return { ...result, items: result.items.map(normalizePost) };
  }
);

export const fetchFollowers = createAsyncThunk(
  "profile/fetchFollowers",
  async (userId, { rejectWithValue, signal }) => {
    const payload = await apiExecutor(
      (sig) => GET(ENDPOINT.USERS.FOLLOWERS(userId), {}, sig),
      rejectWithValue,
      signal
    );
    return normalizeList(payload);
  }
);

export const fetchFollowing = createAsyncThunk(
  "profile/fetchFollowing",
  async (userId, { rejectWithValue, signal }) => {
    const payload = await apiExecutor(
      (sig) => GET(ENDPOINT.USERS.FOLLOWING(userId), {}, sig),
      rejectWithValue,
      signal
    );
    return normalizeList(payload);
  }
);

export const toggleFollow = createAsyncThunk(
  "profile/toggleFollow",
  async (userId, { rejectWithValue, signal }) => {
    const payload = await apiExecutor(
      (sig) => POST(ENDPOINT.USERS.TOGGLE_FOLLOW(userId), {}, sig),
      rejectWithValue,
      signal
    );
    const response = unwrapResponse(payload);
    return response?.data ?? response;
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (data, { rejectWithValue, signal }) => {
    const payload = await apiExecutor(
      (sig) => PATCH(ENDPOINT.USERS.UPDATE_ME, data, sig),
      rejectWithValue,
      signal
    );
    return normalizeUser(payload);
  }
);
