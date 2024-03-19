/* eslint-disable no-unused-vars */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

import { SIZES_URL } from "../../lib/constants";

const sizesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSizes: builder.query({
      query: () => `${SIZES_URL}`,
      providesTags: ["Size"],
    }),
    // getSizeById: builder.query({
    //   query: (sizeId) => `${SIZES_URL}/size/${sizeId}`,
    // }),
    createSize: builder.mutation({
      query: ({ sizeName, sizeType }) => ({
        url: `${SIZES_URL}`,
        method: "POST",
        body: { sizeName, sizeType },
      }),
      invalidatesTags: ["Size"],
    }),
    // updateSize: builder.mutation({
    //   query: ({ sizeId, sizeName }) => ({
    //     url: `${SIZES_URL}/size/${sizeId}`,
    //     method: "PUT",
    //     body: { sizeName },
    //   }),
    //   async onQueryStarted(
    //     { sizeId, sizeName },
    //     { dispatch, queryFulfilled },
    //   ) {
    //     const putResult = dispatch(
    //       sizesApiSlice.util.updateQueryData(
    //         "getSizeById",
    //         sizeId,
    //         (draft) => {
    //           draft.sizeName = sizeName;
    //         },
    //       ),
    //     );
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       putResult.undo();
    //     }
    //   },
    //   invalidatesTags: (result, error, arg) => [{ type: "Size", id: "LIST" }],
    // }),
    deleteSize: builder.mutation({
      query: ({ sizeType, sizeName }) => ({
        url: `${SIZES_URL}`,
        method: "DELETE",
        body: { sizeType, sizeName },
      }),
      invalidatesTags: ["Size"],
    }),
  }),
});

export const {
  useCreateSizeMutation,
  useGetSizesQuery,
  useDeleteSizeMutation,
} = sizesApiSlice;
