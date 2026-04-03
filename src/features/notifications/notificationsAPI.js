import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiExecutor } from "../../services/apiExecutor";
import { GET, PATCH } from "../../services/httpMethods";
import { ENDPOINT } from "../../services/httpEndpoint";

const unwrapResponse = (payload) => payload?.data ?? payload;

const normalizeList = (payload) => {
  const response = unwrapResponse(payload);
  const root = response?.data ?? response;

  if (Array.isArray(root)) {
    return { items: root, total: root.length };
  }

  return {
    items: Array.isArray(root?.data) ? root.data : [],
    total: root?.total ?? 0,
  };
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async ({ page = 1 } = {}, { rejectWithValue }) => {
    try {
      const res = await apiExecutor({
        method: GET,
        url: `${ENDPOINT.NOTIFICATIONS.LIST}?page=${page}&limit=20`,
      });
      return normalizeList(res);
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ?? "Failed to load notifications"
      );
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async (id, { rejectWithValue }) => {
    try {
      await apiExecutor({
        method: PATCH,
        url: ENDPOINT.NOTIFICATIONS.MARK_READ(id),
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ?? "Failed to mark notification"
      );
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      await apiExecutor({
        method: PATCH,
        url: ENDPOINT.NOTIFICATIONS.MARK_ALL_READ,
      });
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ?? "Failed to mark all notifications"
      );
    }
  }
);
