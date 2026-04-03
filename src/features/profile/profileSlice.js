import { createSlice } from "@reduxjs/toolkit";

import {
  fetchFollowers,
  fetchFollowing,
  fetchUserPosts,
  fetchUserProfile,
  toggleFollow,
  updateUserProfile,
} from "./profileAPI";

// Initial State
const initialState = {
  user: null,
  posts: [],
  followers: [],
  following: [],
  loading: false,
  error: null,
  currentPage: 1,
};

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.posts = [];
      state.followers = [];
      state.following = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch User Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch User Posts
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload?.items ?? [];
        state.currentPage =
          action.payload?.pagination?.page ?? state.currentPage;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Followers
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers = action.payload?.items ?? [];
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Fetch Following
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload?.items ?? [];
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Toggle Follow
    builder
      .addCase(toggleFollow.fulfilled, (state, action) => {
        if (state.user) {
          const followAction = action.payload?.action;
          if (followAction === "followed") {
            state.user.isFollowing = true;
            state.user.followers = (state.user.followers ?? 0) + 1;
          }
          if (followAction === "unfollowed") {
            state.user.isFollowing = false;
            state.user.followers = Math.max((state.user.followers ?? 1) - 1, 0);
          }
        }
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Update User Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
