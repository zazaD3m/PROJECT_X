/* eslint-disable no-unused-vars */
import { apiSlice } from "../api/apiSlice";
import { USERS_URL } from "../../lib/constants";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { clearUser, setUser, updateWishlist } from "./userSlice";
import { clearCredentials } from "../auth/authSlice";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});

const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${USERS_URL}`,
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Users", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Users", id })),
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getMe: builder.mutation({
      query: () => ({ url: `${USERS_URL}/user`, method: "GET" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(setUser({ userInfo: res.data.userInfo }));
        } catch (error) {
          console.log("devERR:", error);
          dispatch(clearUser());
          dispatch(clearCredentials());
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),
    addProductToWishlist: builder.mutation({
      query: (product) => ({
        url: `${USERS_URL}/user/wishlist`,
        method: "PUT",
        body: { productId: product._id },
      }),
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        dispatch(updateWishlist({ method: "add", product }));
        try {
          await queryFulfilled;
        } catch (err) {
          console.log("devERR:", err);
          dispatch(updateWishlist({ method: "remove", product }));
        }
      },
    }),
    removeProductFromWishlist: builder.mutation({
      query: (product) => ({
        url: `${USERS_URL}/user/wishlist`,
        method: "DELETE",
        body: { productId: product._id },
      }),
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        dispatch(updateWishlist({ method: "remove", product }));
        try {
          await queryFulfilled;
        } catch (err) {
          console.log("devERR:", err);
          dispatch(updateWishlist({ method: "add", product }));
        }
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAUserQuery,
  useAddProductToWishlistMutation,
  useRemoveProductFromWishlistMutation,
  useGetMeMutation,
} = userApiSlice;

export const selectUsersResult =
  userApiSlice.endpoints.getAllUsers.select("getAllUsers");

export const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data,
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState,
);
