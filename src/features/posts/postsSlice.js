import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  fetchMyFeed,
  fetchPostById,
  fetchPosts,
  fetchUserPosts,
  togglePostLike,
  updatePost,
} from "./postsAPI";

const initialState = {
  items: [],
  nextCursor: null,
  hasMore: true,
  loading: false,
  creating: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostsError: (state) => {
      state.error = null;
    },
    patchPostLikeOptimistic: (state, action) => {
      const { postId, liked } = action.payload;
      const post = state.items.find((item) => item.id === postId);
      if (!post) return;
      post.likedByMe = liked;
      post.likesCount += liked ? 1 : -1;
      if (post.likesCount < 0) post.likesCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { posts, nextCursor } = action.payload;
        const isFirstPage = !action.meta.arg?.cursor;
        state.items = isFirstPage ? posts : [...state.items, ...posts];
        state.nextCursor = nextCursor;
        state.hasMore = nextCursor !== null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load feed.";
      })
      .addCase(createPost.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload || "Unable to create post.";
      })
      .addCase(togglePostLike.fulfilled, (state, action) => {
        const { postId, liked } = action.payload;
        const post = state.items.find((item) => item.id === postId);
        if (!post) return;
        // Count is already updated optimistically via patchPostLikeOptimistic.
        // Only correct likedByMe from the server's authoritative response.
        post.likedByMe = liked;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((item) => item.id === updated.id);
        if (idx !== -1) state.items[idx] = { ...state.items[idx], ...updated };
      })
      .addCase(fetchMyFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyFeed.fulfilled, (state, action) => {
        state.loading = false;
        const posts = action.payload.posts || [];
        const { pagination } = action.payload;
        const isFirstPage =
          !action.meta.arg?.page || action.meta.arg.page === 1;
        state.items = isFirstPage
          ? [...posts].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          : [...state.items, ...posts];
        state.currentPage = pagination?.page ?? 1;
        state.hasMore = pagination ? pagination.page < pagination.pages : false;
      })
      .addCase(fetchMyFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load feed.";
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        const posts = action.payload.posts || [];
        const { pagination } = action.payload;
        const isFirstPage =
          !action.meta.arg?.page || action.meta.arg.page === 1;
        state.items = isFirstPage ? posts : [...state.items, ...posts];
        state.currentPage = pagination?.page ?? 1;
        state.hasMore = pagination ? pagination.page < pagination.pages : false;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load user posts.";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        const post = action.payload;
        const idx = state.items.findIndex((item) => item.id === post.id);
        if (idx !== -1) state.items[idx] = post;
      });
  },
});

export const { clearPostsError, patchPostLikeOptimistic } = postsSlice.actions;
export default postsSlice.reducer;
