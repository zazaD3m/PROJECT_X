import { apiSlice } from "../api/apiSlice";
import { clearCredentials, setCredentials } from "./authSlice";
import { clearUser, setUser } from "../user/userSlice";
import { AUTH_URL } from "../../lib/constants";
import { userApiSlice } from "../user/userApiSlice";

// this will inject endpoints into main apiSlice
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const { accessToken, userInfo } = res.data;

          dispatch(setCredentials({ accessToken }));
          dispatch(setUser({ userInfo }));
        } catch (err) {
          console.log("devERR:", err);
          dispatch(clearCredentials());
          dispatch(clearUser());
        }
      },
    }),
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/admin-login`,
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const { accessToken } = res.data;
          dispatch(setCredentials({ accessToken }));
          dispatch(userApiSlice.endpoints.getMe.initiate());
        } catch (err) {
          console.log("devERR:", err);
          dispatch(clearCredentials());
          dispatch(clearUser());
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(clearCredentials());
          dispatch(clearUser());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log("devERR:", err);
          dispatch(clearCredentials());
          dispatch(clearUser());
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const { accessToken, userInfo } = res.data;

          dispatch(setCredentials({ accessToken }));
          dispatch(setUser({ userInfo }));
        } catch (err) {
          console.log("devErr:", err);
          dispatch(clearCredentials());
          dispatch(clearUser());
        }
      },
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/update`,
        method: "PUT",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const { userInfo } = res.data;
          dispatch(setUser({ userInfo }));
        } catch (err) {
          console.log("devErr:", err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useAdminLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = authApiSlice;
