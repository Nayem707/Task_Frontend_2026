import { createSlice } from "@reduxjs/toolkit";
import { fetchConversations } from "./messagesAPI";

const initialState = {
  conversations: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload ?? [];
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messagesSlice.reducer;
