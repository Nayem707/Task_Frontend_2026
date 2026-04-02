import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCommentLikeStats,
  fetchLikesList,
  fetchPostLikeStats,
} from "./likesAPI";

const initialState = {
  likesByEntity: {},
  statsByEntity: {},
  loading: false,
  error: null,
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearLikesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikesList.fulfilled, (state, action) => {
        state.loading = false;
        state.likesByEntity[action.payload.key] = action.payload.users;
      })
      .addCase(fetchLikesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch likes list.";
      })
      .addCase(fetchPostLikeStats.fulfilled, (state, action) => {
        state.statsByEntity[`post:${action.payload.postId}`] =
          action.payload.stats;
      })
      .addCase(fetchCommentLikeStats.fulfilled, (state, action) => {
        state.statsByEntity[`comment:${action.payload.commentId}`] =
          action.payload.stats;
      });
  },
});

export const { clearLikesError } = likesSlice.actions;
export default likesSlice.reducer;
