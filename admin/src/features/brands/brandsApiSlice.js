/* eslint-disable no-unused-vars */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

import { BRANDS_URL } from "../../lib/constants";

const brandsAdapter = createEntityAdapter({
  selectId: (brand) => brand._id,
  sortComparer: (a, b) => a.brandName.localeCompare(b.brandName),
});

const initialState = brandsAdapter.getInitialState();

const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => `${BRANDS_URL}`,
      transformResponse: (responseData) => {
        return brandsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Brand", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Brand", id })),
            ]
          : [{ type: "Brand", id: "LIST" }],
    }),
    getBrandById: builder.query({
      query: (brandId) => `${BRANDS_URL}/brand/${brandId}`,
    }),
    createBrand: builder.mutation({
      query: ({ brandName }) => ({
        url: `${BRANDS_URL}`,
        method: "POST",
        body: { brandName },
      }),
      invalidatesTags: [{ type: "Brand", id: "LIST" }],
    }),
    updateBrand: builder.mutation({
      query: ({ brandId, brandName }) => ({
        url: `${BRANDS_URL}/brand/${brandId}`,
        method: "PUT",
        body: { brandName },
      }),
      async onQueryStarted(
        { brandId, brandName },
        { dispatch, queryFulfilled },
      ) {
        const putResult = dispatch(
          brandsApiSlice.util.updateQueryData(
            "getBrandById",
            brandId,
            (draft) => {
              draft.brandName = brandName;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (err) {
          putResult.undo();
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Brand", id: "LIST" }],
    }),
    deleteBrand: builder.mutation({
      query: ({ brandId }) => ({
        url: `${BRANDS_URL}/brand/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Brand", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useDeleteBrandMutation,
} = brandsApiSlice;

export const selectBrandsResult = brandsApiSlice.endpoints.getBrands.select();

export const selectBrandsData = createSelector(
  selectBrandsResult,
  (brandsResult) => brandsResult.data, // normalized state object with ids & entities
);

export const {
  selectAll: selectAllBrands, // maps over ids array, and returns sorted array of entities
  selectById: selectBrandById, // needs state and entity ID , returns entity with that ID
  selectEntities: selectBrandEntities, // returns entities lookup table
  selectIds: selectBrandIds, // selects array of ids
  selectTotal: selectTotalBrands, // returns total num of entities stored in state

  // Pass in a selector that returns the brands slice of state
} = brandsAdapter.getSelectors(
  (state) => selectBrandsData(state) ?? initialState,
);
