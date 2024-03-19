/* eslint-disable no-unused-vars */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

import { SALES_URL } from "../../lib/constants";

const salesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => `${SALES_URL}`,
      providesTags: ["Sale"],
    }),
    // getSaleById: builder.query({
    //   query: (saleId) => `${SALES_URL}/sale/${saleId}`,
    // }),
    createSale: builder.mutation({
      query: ({ saleName, discount, expiry }) => ({
        url: `${SALES_URL}`,
        method: "POST",
        body: { saleName, discount, expiry },
      }),
      invalidatesTags: ["Sale"],
    }),
    // updateSale: builder.mutation({
    //   query: ({ saleId, saleName }) => ({
    //     url: `${SALES_URL}/sale/${saleId}`,
    //     method: "PUT",
    //     body: { saleName },
    //   }),
    //   async onQueryStarted(
    //     { saleId, saleName },
    //     { dispatch, queryFulfilled },
    //   ) {
    //     const putResult = dispatch(
    //       salesApiSlice.util.updateQueryData(
    //         "getSaleById",
    //         saleId,
    //         (draft) => {
    //           draft.saleName = saleName;
    //         },
    //       ),
    //     );
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       putResult.undo();
    //     }
    //   },
    //   invalidatesTags: (result, error, arg) => [{ type: "Sale", id: "LIST" }],
    // }),
    deleteSale: builder.mutation({
      query: ({ saleId }) => ({
        url: `${SALES_URL}/sale/${saleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sale"],
    }),
  }),
});

export const {
  useCreateSaleMutation,
  // useUpdateSaleMutation,
  useGetSalesQuery,
  // useGetSaleByIdQuery,
  useDeleteSaleMutation,
} = salesApiSlice;
