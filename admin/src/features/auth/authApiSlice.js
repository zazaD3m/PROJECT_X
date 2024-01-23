import { apiSlice } from "../api/apiSlice";
import { clearCredentials, setCredentials } from "./authSlice";
import { clearUser, setUser } from "../user/userSlice";
import { AUTH_URL } from "../../lib/constants";

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
    getMe: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/me`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const { userInfo } = res.data;

          dispatch(setUser({ userInfo }));
        } catch (err) {
          dispatch(clearCredentials());
          dispatch(clearUser());
          console.log("devERR:", err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetMeMutation,
  useUpdateUserMutation,
} = authApiSlice;
