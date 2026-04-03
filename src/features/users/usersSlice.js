import { createSlice } from "@reduxjs/toolkit";
import { fetchFollowers, fetchFollowing, toggleFollow } from "./usersAPI";

const initialState = {
  followers: [],
  following: [],
  followersLoading: false,
  followingLoading: false,
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

    // Toggle Follow
    builder
      .addCase(toggleFollow.fulfilled, (state, action) => {
        const { userId, isFollowing } = action.payload;

        if (isFollowing) {
          // Remove from following list if unfollowed
          state.following = state.following.filter(
            (user) => user.id !== userId
          );
        } else {
          // Add to following list if followed (would need user data)
          // This is handled by refetching in the component
        }
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle follow";
      });
  },
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
