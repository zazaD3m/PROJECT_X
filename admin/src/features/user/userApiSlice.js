/* eslint-disable no-unused-vars */
import { apiSlice } from "../api/apiSlice";
import { USERS_URL } from "../../lib/constants";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
  sortComparer: (a, b) => a.firstName.localeCompare(b.firstName),
});

const initialState = usersAdapter.getInitialState();

const userApiSlice = apiSlice.injectEndpoints({
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
    getAUser: builder.query({
      query: () => `${USERS_URL}/test`,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAUserQuery } = userApiSlice;

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
