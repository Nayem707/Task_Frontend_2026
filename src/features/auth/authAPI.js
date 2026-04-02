import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, GET } from "../../services/httpMethods";
import { ENDPOINT } from "../../services/httpEndpoint";
import { apiExecutor } from "../../services/apiExecutor";
import { setCookie, deleteCookie } from "../../utils/cookies";
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await POST(
          ENDPOINT.AUTH.LOGIN,
          { email, password },
          signal,
        );
        const { user, tokens } = response.data.data;
        setCookie(TOKEN_KEY, tokens.accessToken);
        if (tokens.refreshToken) setCookie(REFRESH_TOKEN_KEY, tokens.refreshToken);
        return user;
      },
      rejectWithValue,
      signal,
    ),
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await POST(
          ENDPOINT.AUTH.REGISTER,
          { email, password, name },
          signal,
        );
        const { user, tokens } = response.data.data;
        setCookie(TOKEN_KEY, tokens.accessToken);
        if (tokens.refreshToken) setCookie(REFRESH_TOKEN_KEY, tokens.refreshToken);
        return user;
      },
      rejectWithValue,
      signal,
    ),
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        await POST(ENDPOINT.AUTH.LOGOUT, {}, signal);
        deleteCookie(TOKEN_KEY);
        deleteCookie(REFRESH_TOKEN_KEY);
      },
      rejectWithValue,
      signal,
    ),
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(ENDPOINT.AUTH.PROFILE, undefined, signal);
        return response.data;
      },
      rejectWithValue,
      signal,
    ),
);
