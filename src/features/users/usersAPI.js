import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST } from "../../services/httpMethods";
import { ENDPOINT } from "../../services/httpEndpoint";
import { apiExecutor } from "../../services/apiExecutor";

/**
 * Normalize user data for consistent structure
 */
const normalizeUser = (user) => ({
  id: user.id,
  name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Unknown",
  email: user.email,
  avatarUrl: user.avatarUrl || null,
  bio: user.bio || null,
  followersCount: user._count?.followers ?? user.followersCount ?? 0,
  followingCount: user._count?.following ?? user.followingCount ?? 0,
  isFollowing: user.isFollowing ?? false,
});

/**
 * Fetch followers for a user
 */
export const fetchFollowers = createAsyncThunk(
  "users/fetchFollowers",
  async (userId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.USERS.FOLLOWERS(userId),
          undefined,
          signal
        );
        return {
          data: (response.data.data || []).map(normalizeUser),
          pagination: response.data.pagination,
        };
      },
      rejectWithValue,
      signal
    )
);

/**
 * Fetch following list for a user
 */
export const fetchFollowing = createAsyncThunk(
  "users/fetchFollowing",
  async (userId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.USERS.FOLLOWING(userId),
          undefined,
          signal
        );
        return {
          data: (response.data.data || []).map(normalizeUser),
          pagination: response.data.pagination,
        };
      },
      rejectWithValue,
      signal
    )
);

/**
 * Fetch suggested people (users not yet followed)
 */
export const fetchSuggestedPeople = createAsyncThunk(
  "users/fetchSuggestedPeople",
  async (_, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(
          ENDPOINT.USERS.SEARCH,
          { page: 1, limit: 6 },
          signal
        );
        const users = response.data.data?.data ?? [];
        return users
          .filter((user) => user.isFollowing !== true)
          .map(normalizeUser);
      },
      rejectWithValue,
      signal
    )
);

/**
 * Toggle follow/unfollow a user
 */
export const toggleFollow = createAsyncThunk(
  "users/toggleFollow",
  async (userId, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await POST(
          ENDPOINT.USERS.TOGGLE_FOLLOW(userId),
          undefined,
          signal
        );
        return {
          userId,
          action: response.data.data?.action,
          isFollowing: response.data.data?.isFollowing ?? false,
          message: response.data.message,
        };
      },
      rejectWithValue,
      signal
    )
);
