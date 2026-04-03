import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiExecutor } from "../../services/apiExecutor";
import { GET } from "../../services/httpMethods";
import { ENDPOINT } from "../../services/httpEndpoint";

const unwrapResponse = (payload) => payload?.data ?? payload;

export const fetchConversations = createAsyncThunk(
  "messages/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiExecutor({
        method: GET,
        url: ENDPOINT.MESSAGES.CONVERSATIONS,
      });
      const data = unwrapResponse(res);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ?? "Failed to load conversations"
      );
    }
  }
);
