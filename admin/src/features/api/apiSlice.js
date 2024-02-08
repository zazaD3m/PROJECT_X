/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials, setCredentials } from "../auth/authSlice";
import { clearUser } from "../user/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error &&
    result.error.status === 403 &&
    result.error.data.message === "Not admin"
  ) {
    api.dispatch(clearCredentials());
    api.dispatch(clearUser());
    api.abort();
  }

  if (
    result?.error &&
    result.error.status === 401 &&
    result.error.data.message === "accessToken expired"
  ) {
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
      api.dispatch(clearUser());
      return refreshResult;
    }
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Brand", "Color", "Users", "Category"],
  endpoints: (builder) => ({}),
});

export { apiSlice };
