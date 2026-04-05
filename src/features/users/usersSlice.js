import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFollowers,
  fetchFollowing,
  fetchSuggestedPeople,
  toggleFollow,
} from "./usersAPI";

const initialState = {
  followers: [],
  following: [],
  suggestedPeople: [],
  followersLoading: false,
  followingLoading: false,
  suggestedLoading: false,
  followLoadingId: null,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Followers
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.followersLoading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followersLoading = false;
        state.followers = action.payload.data || [];
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.followersLoading = false;
        state.error = action.payload || "Failed to fetch followers";
      });

    // Fetch Following
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.followingLoading = true;
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.followingLoading = false;
        state.following = action.payload.data || [];
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.followingLoading = false;
        state.error = action.payload || "Failed to fetch following";
      });

    // Fetch Suggested People
    builder
      .addCase(fetchSuggestedPeople.pending, (state) => {
        state.suggestedLoading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedPeople.fulfilled, (state, action) => {
        state.suggestedLoading = false;
        state.suggestedPeople = action.payload;
      })
      .addCase(fetchSuggestedPeople.rejected, (state, action) => {
        state.suggestedLoading = false;
        state.error = action.payload || "Failed to fetch suggested people";
      });

    // Toggle Follow
    builder
      .addCase(toggleFollow.pending, (state, action) => {
        state.followLoadingId = action.meta.arg;
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        const { userId, action: followAction } = action.payload;
        state.followLoadingId = null;

        if (followAction === "followed") {
          state.suggestedPeople = state.suggestedPeople.filter(
            (user) => user.id !== userId
          );
          state.following = state.following.filter(
            (user) => user.id !== userId
          );
        }
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        state.followLoadingId = null;
        state.error = action.payload || "Failed to toggle follow";
      });
  },
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
